import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    // Only allow if no Super Admin exists yet
    const existingAdmin = await prisma.user.findFirst({
      where: { role: Role.SUPER_ADMIN },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Setup already completed. Super Admin exists." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
    }

    if (password.length < 10) {
      return NextResponse.json({ error: "Password must be at least 10 characters" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Create Super Admin
    await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        passwordHash,
        name: name.trim(),
        role: Role.SUPER_ADMIN,
        isActive: true,
      },
    });

    // Check if event already seeded
    const eventCount = await prisma.event.count();
    if (eventCount === 0) {
      // Minimal seed if full seed was not run
      // Full seed is recommended via `npx tsx prisma/seed.ts` or build-time
      // For zero-config we create the core event here
      await prisma.event.create({
        data: {
          name: "VentureSpark: The Founders’ Arena",
          tagline: "Where bold ideas meet sharp questions.",
          description:
            "VentureSpark is a live startup pitch event where founders present their businesses to a judging panel, answer questions, and receive feedback. Investment is not guaranteed.",
          disclaimer:
            "VentureSpark is an independent event inspired by the live pitch-show format and is not affiliated with or endorsed by Shark Tank India.",
          startDate: new Date("2026-11-30T09:00:00+05:30"),
          endDate: new Date("2026-12-01T19:30:00+05:30"),
          timezone: "Asia/Kolkata",
          venueName: "Near Bandra Railway Station, Bandra West, Mumbai",
          capacityPitches: 50,
          capacityPerDay: 25,
          audienceCapacityPerDay: 200,
          pitchDeadline: new Date("2026-11-15T23:59:59+05:30"),
          pitchFeePaise: 1599900,
          audienceFeePaise: 159900,
          holdHours: 48,
          isPublished: true,
          settings: {
            create: [
              { key: "upi_id", value: "918446331503@waaxis" },
              { key: "contact_phone", value: "8446331503" },
              { key: "contact_email", value: "venturespark50@gmail.com" },
              { key: "refund_policy", value: "No refunds or cancellations. All payments are final once verified." },
            ],
          },
        },
      });
    }

    return NextResponse.json({ success: true, message: "Super Admin created" });
  } catch (error: any) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: error.message || "Setup failed. Check database connection." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const admin = await prisma.user.findFirst({ where: { role: Role.SUPER_ADMIN } });
    return NextResponse.json({ setupComplete: !!admin });
  } catch {
    return NextResponse.json({ setupComplete: false, dbError: true });
  }
}
