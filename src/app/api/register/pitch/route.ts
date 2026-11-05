import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  generateRegistrationId,
  isValidEmail,
  isValidIndianMobile,
} from "@/lib/utils";
import { PitchStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body.founderName || !body.email || !body.mobile || !body.city || !body.startupName) {
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

    const attendingCount = Math.min(3, Math.max(1, parseInt(body.attendingCount || "1", 10)));

    // Get event
    const event = await prisma.event.findFirst({ orderBy: { createdAt: "desc" } });
    if (!event) {
      return NextResponse.json({ error: "Event not configured. Run setup first." }, { status: 500 });
    }

    // Deadline check (server-side)
    const now = new Date();
    if (now > event.pitchDeadline) {
      return NextResponse.json(
        { error: "Pitch registration has closed (deadline was 15 November 2026)." },
        { status: 403 }
      );
    }

    // Slot limits (count only paid + temporary holds that have not expired)
    const activeCount = await prisma.pitchApplication.count({
      where: {
        eventId: event.id,
        OR: [
          { status: { in: [PitchStatus.PAID, PitchStatus.UNDER_REVIEW, PitchStatus.CONFIRMED] } },
          {
            status: { in: [PitchStatus.PENDING_PAYMENT, PitchStatus.PAYMENT_PROOF_SUBMITTED] },
            holdExpiresAt: { gt: now },
          },
        ],
      },
    });

    if (activeCount >= event.capacityPitches) {
      return NextResponse.json(
        { error: "Pitch slots are full. You may join the waitlist (feature coming soon)." },
        { status: 403 }
      );
    }

    // Duplicate check
    const existing = await prisma.pitchApplication.findFirst({
      where: {
        email: body.email.toLowerCase().trim(),
        startupName: body.startupName.trim(),
        status: { notIn: [PitchStatus.REJECTED, PitchStatus.WITHDRAWN] },
      },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A registration with this email and startup name already exists." },
        { status: 409 }
      );
    }

    const registrationId = generateRegistrationId("PITCH");
    const holdExpiresAt = new Date(now.getTime() + event.holdHours * 60 * 60 * 1000);
    const referenceCode = `PAY-${registrationId}`;

    // Transaction: create application + payment record
    const result = await prisma.$transaction(async (tx) => {
      const application = await tx.pitchApplication.create({
        data: {
          eventId: event.id,
          registrationId,
          founderName: body.founderName.trim(),
          email: body.email.toLowerCase().trim(),
          mobile: body.mobile.replace(/\D/g, "").slice(-10),
          city: body.city.trim(),
          designation: body.designation?.trim() || null,
          startupName: body.startupName.trim(),
          website: body.website?.trim() || null,
          industry: body.industry?.trim() || null,
          stage: body.stage || null,
          yearFounded: body.yearFounded ? parseInt(body.yearFounded, 10) : null,
          oneLiner: body.oneLiner?.trim() || null,
          summary: body.summary?.trim() || null,
          problem: body.problem?.trim() || null,
          targetCustomers: body.targetCustomers?.trim() || null,
          businessModel: body.businessModel?.trim() || null,
          traction: body.traction?.trim() || null,
          fundingRaised: body.fundingRaised?.trim() || null,
          wantsFromEvent: body.wantsFromEvent?.trim() || null,
          teamSize: body.teamSize ? parseInt(body.teamSize, 10) : null,
          attendingCount,
          preferredDay: body.preferredDay || "no_preference",
          status: PitchStatus.PENDING_PAYMENT,
          holdExpiresAt,
          consentAccepted: true,
        },
      });

      const payment = await tx.payment.create({
        data: {
          amountPaise: event.pitchFeePaise,
          status: "PENDING",
          referenceCode,
          pitchApplicationId: application.id,
        },
      });

      return { application, payment };
    });

    return NextResponse.json({
      success: true,
      registrationId: result.application.registrationId,
      paymentRef: result.payment.referenceCode,
      amount: event.pitchFeePaise / 100,
      holdExpiresAt: holdExpiresAt.toISOString(),
    });
  } catch (error: any) {
    console.error("Pitch registration error:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again or contact support." },
      { status: 500 }
    );
  }
}
