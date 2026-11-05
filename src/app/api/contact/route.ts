import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isValidEmail } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await prisma.contactEnquiry.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || null,
        message: message.trim(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact enquiry error:", error);
    // If DB is not ready yet, still accept the message gracefully
    return NextResponse.json(
      { error: "Could not save enquiry. Please email venturespark50@gmail.com directly." },
      { status: 500 }
    );
  }
}
