import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  generateRegistrationId,
  isValidEmail,
  isValidIndianMobile,
} from "@/lib/utils";
import { AudienceStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.email || !body.mobile || !body.attendanceDay) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }
    if (!isValidEmail(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (!isValidIndianMobile(body.mobile)) {
      return NextResponse.json({ error: "Invalid Indian mobile number" }, { status: 400 });
    }
    if (!body.consent) {
      return NextResponse.json({ error: "Consent is required" }, { status: 400 });
    }

    const event = await prisma.event.findFirst({ orderBy: { createdAt: "desc" } });
    if (!event) {
      return NextResponse.json({ error: "Event not configured. Run setup first." }, { status: 500 });
    }

    const attendanceDay = new Date(body.attendanceDay);
    if (isNaN(attendanceDay.getTime())) {
      return NextResponse.json({ error: "Invalid attendance day" }, { status: 400 });
    }

    // Duplicate check (same email + same day)
    const existing = await prisma.audienceRegistration.findFirst({
      where: {
        email: body.email.toLowerCase().trim(),
        attendanceDay,
        status: { notIn: [AudienceStatus.CANCELLED, AudienceStatus.REJECTED] },
      },
    });
    if (existing) {
      return NextResponse.json(
        { error: "You already have a registration for this day with this email." },
        { status: 409 }
      );
    }

    // Capacity check (optional – only if capacity is set)
    if (event.audienceCapacityPerDay > 0) {
      const dayCount = await prisma.audienceRegistration.count({
        where: {
          eventId: event.id,
          attendanceDay,
          status: {
            in: [
              AudienceStatus.PAID,
              AudienceStatus.CONFIRMED,
              AudienceStatus.PENDING_PAYMENT,
              AudienceStatus.PAYMENT_PROOF_SUBMITTED,
            ],
          },
        },
      });
      if (dayCount >= event.audienceCapacityPerDay) {
        return NextResponse.json(
          { error: "Audience tickets for this day are sold out." },
          { status: 403 }
        );
      }
    }

    const registrationId = generateRegistrationId("AUD");
    const holdExpiresAt = new Date(Date.now() + event.holdHours * 60 * 60 * 1000);
    const referenceCode = `PAY-${registrationId}`;

    const result = await prisma.$transaction(async (tx) => {
      const registration = await tx.audienceRegistration.create({
        data: {
          eventId: event.id,
          registrationId,
          fullName: body.fullName.trim(),
          email: body.email.toLowerCase().trim(),
          mobile: body.mobile.replace(/\D/g, "").slice(-10),
          city: body.city?.trim() || null,
          organization: body.organization?.trim() || null,
          attendeeType: body.attendeeType || null,
          interests: body.interests?.trim() || null,
          attendanceDay,
          quantity: 1,
          status: AudienceStatus.PENDING_PAYMENT,
          holdExpiresAt,
          consentAccepted: true,
        },
      });

      const payment = await tx.payment.create({
        data: {
          amountPaise: event.audienceFeePaise,
          status: "PENDING",
          referenceCode,
          audienceRegistrationId: registration.id,
        },
      });

      return { registration, payment };
    });

    return NextResponse.json({
      success: true,
      registrationId: result.registration.registrationId,
      paymentRef: result.payment.referenceCode,
      amount: event.audienceFeePaise / 100,
    });
  } catch (error: any) {
    console.error("Audience registration error:", error);

    // Surface common setup problems clearly
    const msg = error?.message || String(error);
    if (
      msg.includes("Can't reach database") ||
      msg.includes("P1001") ||
      msg.includes("connection")
    ) {
      return NextResponse.json(
        { error: "Database not connected. Please check DATABASE_URL in Vercel environment variables." },
        { status: 500 }
      );
    }
    if (
      msg.includes("does not exist") ||
      msg.includes("P2021") ||
      msg.includes("relation") ||
      msg.includes("table")
    ) {
      return NextResponse.json(
        { error: "Database tables missing. Open /setup once to initialize the database, or run prisma db push." },
        { status: 500 }
      );
    }
    if (msg.includes("Unique constraint") || msg.includes("P2002")) {
      return NextResponse.json(
        { error: "A registration with this email for this day already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? `Registration failed: ${msg}`
            : "Registration failed. Please try again or contact support. If this is a new deploy, visit /setup first.",
      },
      { status: 500 }
    );
  }
}
