import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding VentureSpark database...");

  // Clear existing data carefully (order matters for FKs)
  await prisma.auditLog.deleteMany();
  await prisma.checkIn.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.refund.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.registrationAnswer.deleteMany();
  await prisma.pitchApplication.deleteMany();
  await prisma.audienceRegistration.deleteMany();
  await prisma.transportRequest.deleteMany();
  await prisma.transportLocation.deleteMany();
  await prisma.spocAssignment.deleteMany();
  await prisma.spoc.deleteMany();
  await prisma.emailLog.deleteMany();
  await prisma.emailTemplate.deleteMany();
  await prisma.contactEnquiry.deleteMany();
  await prisma.mediaAsset.deleteMany();
  await prisma.faqItem.deleteMany();
  await prisma.eventSection.deleteMany();
  await prisma.eventPage.deleteMany();
  await prisma.launchChecklistItem.deleteMany();
  await prisma.agendaItem.deleteMany();
  await prisma.agendaDay.deleteMany();
  await prisma.judge.deleteMany();
  await prisma.eventSetting.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();
  await prisma.registrationFormField.deleteMany();

  // ---- Event ----
  const event = await prisma.event.create({
    data: {
      name: "VentureSpark: The Founders’ Arena",
      tagline: "Where bold ideas meet sharp questions.",
      description:
        "VentureSpark is a live startup pitch event where founders present their businesses to a judging panel, answer questions, and receive feedback. It offers a platform to showcase your brand and connect with the startup community. Founders may have the opportunity to connect with investors; investment is not guaranteed.",
      disclaimer:
        "VentureSpark is an independent event inspired by the live pitch-show format and is not affiliated with or endorsed by Shark Tank India.",
      startDate: new Date("2026-11-30T09:00:00+05:30"),
      endDate: new Date("2026-12-01T19:30:00+05:30"),
      timezone: "Asia/Kolkata",
      venueName: "Near Bandra Railway Station, Bandra West, Mumbai",
      venueAddress: null, // to be filled by admin
      venueMapsUrl: null,
      capacityPitches: 50,
      capacityPerDay: 25,
      audienceCapacityPerDay: 200,
      pitchDeadline: new Date("2026-11-15T23:59:59+05:30"),
      pitchFeePaise: 1599900, // ₹15,999
      audienceFeePaise: 159900, // ₹1,599
      holdHours: 48,
      isPublished: true,
    },
  });

  // ---- Settings (including UPI) ----
  const settings = [
    { key: "upi_id", value: "918446331503@waaxis" },
    { key: "upi_qr_url", value: "" },
    { key: "bank_account_name", value: "" },
    { key: "bank_account_number", value: "" },
    { key: "bank_ifsc", value: "" },
    { key: "bank_name", value: "" },
    { key: "contact_phone", value: "8446331503" },
    { key: "contact_email", value: "venturespark50@gmail.com" },
    { key: "primary_color", value: "#f59e0b" },
    { key: "logo_url", value: "" },
    { key: "favicon_url", value: "" },
    { key: "banner_url", value: "" },
    { key: "refund_policy", value: "No refunds or cancellations. All payments are final once verified." },
    { key: "transport_payment_enabled", value: "false" },
  ];

  for (const s of settings) {
    await prisma.eventSetting.create({
      data: { eventId: event.id, key: s.key, value: s.value },
    });
  }

  // ---- Judges ----
  const judges = [
    {
      name: "Aadit Palicha",
      roleTitle: "Co-founder of Zepto",
      feedbackAreas: "Quick commerce, logistics, operations, customer demand, scaling",
      sortOrder: 1,
    },
    {
      name: "Alakh Pandey",
      roleTitle: "Co-founder of PhysicsWallah",
      feedbackAreas: "Education, digital learning, affordability, reaching learners at scale",
      sortOrder: 2,
    },
    {
      name: "Nikhil Kamath",
      roleTitle: "Co-founder of Zerodha",
      feedbackAreas: "Business models, finance, growth strategy",
      sortOrder: 3,
    },
    {
      name: "Vijay Shekhar Sharma",
      roleTitle: "Founder of Paytm",
      feedbackAreas: "Fintech, digital products, technology-led businesses",
      sortOrder: 4,
    },
    {
      name: "Peyush Bansal",
      roleTitle: "Co-founder and CEO of Lenskart",
      feedbackAreas: "Customer experience, branding, retail, scaling a consumer business",
      sortOrder: 5,
    },
  ];

  for (const j of judges) {
    await prisma.judge.create({
      data: {
        eventId: event.id,
        ...j,
        photoApproved: false,
        isPublished: true,
      },
    });
  }

  // ---- Agenda (same for both days) ----
  const agendaItems = [
    { startTime: "08:00", endTime: "08:45", activity: "Venue setup and technical checks", sortOrder: 1 },
    { startTime: "08:45", endTime: "09:00", activity: "Judges arrive and check in", sortOrder: 2 },
    { startTime: "09:00", endTime: "09:15", activity: "Welcome, event briefing, and judging format", sortOrder: 3 },
    { startTime: "09:15", endTime: "12:35", activity: "Pitches 1–10", sortOrder: 4 },
    { startTime: "12:35", endTime: "13:20", activity: "Lunch break", sortOrder: 5 },
    { startTime: "13:20", endTime: "16:40", activity: "Pitches 11–20", sortOrder: 6 },
    { startTime: "16:40", endTime: "16:55", activity: "Short break", sortOrder: 7 },
    { startTime: "16:55", endTime: "18:35", activity: "Pitches 21–25", sortOrder: 8 },
    { startTime: "18:35", endTime: "19:00", activity: "Judges’ deliberation", sortOrder: 9 },
    { startTime: "19:00", endTime: "19:20", activity: "Closing remarks and next steps", sortOrder: 10 },
  ];

  const day1 = await prisma.agendaDay.create({
    data: {
      eventId: event.id,
      date: new Date("2026-11-30"),
      label: "30 November 2026",
      note: "Final pitch order depends on registrations and judge availability; final timings may change.",
      sortOrder: 1,
    },
  });

  const day2 = await prisma.agendaDay.create({
    data: {
      eventId: event.id,
      date: new Date("2026-12-01"),
      label: "1 December 2026",
      note: "Final pitch order depends on registrations and judge availability; final timings may change.",
      sortOrder: 2,
    },
  });

  for (const item of agendaItems) {
    await prisma.agendaItem.create({ data: { agendaDayId: day1.id, ...item } });
    await prisma.agendaItem.create({ data: { agendaDayId: day2.id, ...item } });
  }

  // ---- Transport locations ----
  const locations = [
    { name: "Bandra Railway Station", suggestedFarePaise: 19900, sortOrder: 1 },
    { name: "Mumbai Central Bus Station", suggestedFarePaise: 49900, sortOrder: 2 },
    { name: "Chhatrapati Shivaji Maharaj International Airport (BOM)", suggestedFarePaise: 69900, sortOrder: 3 },
  ];

  for (const loc of locations) {
    await prisma.transportLocation.create({
      data: {
        eventId: event.id,
        ...loc,
        serviceStarts: "07:00",
        isActive: true,
      },
    });
  }

  // ---- Pages ----
  const pages = [
    { slug: "home", title: "Home", sortOrder: 1 },
    { slug: "about", title: "About VentureSpark", sortOrder: 2 },
    { slug: "agenda", title: "Agenda", sortOrder: 3 },
    { slug: "judges", title: "Judges", sortOrder: 4 },
    { slug: "pitch", title: "Pitch Your Startup", sortOrder: 5 },
    { slug: "tickets", title: "Audience Tickets", sortOrder: 6 },
    { slug: "transport", title: "Transport", sortOrder: 7 },
    { slug: "venue", title: "Venue & Location", sortOrder: 8 },
    { slug: "faq", title: "FAQ", sortOrder: 9 },
    { slug: "contact", title: "Contact", sortOrder: 10 },
    { slug: "privacy", title: "Privacy Policy", sortOrder: 11 },
    { slug: "terms", title: "Terms, Refund & Cancellation", sortOrder: 12 },
  ];

  for (const p of pages) {
    await prisma.eventPage.create({
      data: {
        eventId: event.id,
        ...p,
        isEnabled: true,
        content:
          p.slug === "terms"
            ? "No refunds or cancellations. All payments are final once verified. Investment is not guaranteed."
            : p.slug === "about"
            ? "VentureSpark is a live startup pitch event where founders present their businesses to a judging panel, answer questions, and receive feedback. Investment is not guaranteed.\n\nVentureSpark is an independent event inspired by the live pitch-show format and is not affiliated with or endorsed by Shark Tank India."
            : null,
      },
    });
  }

  // ---- FAQ ----
  const faqPage = await prisma.eventPage.findFirst({ where: { slug: "faq" } });
  if (faqPage) {
    const faqs = [
      {
        question: "Is investment guaranteed?",
        answer: "No. Investment is not guaranteed. The event is a platform for pitching and feedback.",
      },
      {
        question: "Can I attend both days as an audience member?",
        answer: "Each audience ticket is valid for one day only. To attend both days you need two separate tickets.",
      },
      {
        question: "What is included in the pitch fee?",
        answer: "The ₹15,999 pitch fee covers one pitch slot and up to 3 attending team members (each receives a QR ticket).",
      },
      {
        question: "When does pitch registration close?",
        answer: "Pitch registration closes on 15 November 2026 at 11:59 p.m. IST (or earlier if slots fill).",
      },
      {
        question: "How do I pay?",
        answer: "Payment is by UPI or bank transfer. After registration you will receive payment instructions and a unique reference code. Upload the payment proof for verification.",
      },
    ];
    for (let i = 0; i < faqs.length; i++) {
      await prisma.faqItem.create({
        data: {
          pageId: faqPage.id,
          question: faqs[i].question,
          answer: faqs[i].answer,
          sortOrder: i + 1,
        },
      });
    }
  }

  // ---- Checklist ----
  const checklist = [
    "Add the exact venue address and Google Maps link",
    "Confirm transport pickup points and fares, and confirm operator costs",
    "Confirm each judge photo is correct and approved for website use",
    "Confirm refund and cancellation policy (currently set to No refunds)",
    "Confirm the audience capacity per day (currently 200)",
    "Add the UPI QR image and bank account details used for receiving payments",
  ];

  for (let i = 0; i < checklist.length; i++) {
    await prisma.launchChecklistItem.create({
      data: {
        eventId: event.id,
        title: checklist[i],
        isDone: i === 3 || i === 4, // refund and capacity already decided
        sortOrder: i + 1,
      },
    });
  }

  // ---- Email templates (basic) ----
  await prisma.emailTemplate.createMany({
    data: [
      {
        key: "pitch_application_received",
        name: "Pitch Application Received",
        subject: "VentureSpark – Application received & payment instructions",
        heading: "Thank you for applying to pitch",
        bodyHtml: `<p>Hi {{participant_name}},</p><p>We have received your pitch application for <strong>{{startup_name}}</strong>.</p><p>Please complete payment of ₹15,999 using the details on your payment page. Reference code: <strong>{{registration_id}}</strong>.</p><p>Investment is not guaranteed.</p>`,
      },
      {
        key: "payment_approved_pitch",
        name: "Pitch Payment Approved",
        subject: "VentureSpark – Payment confirmed & ticket",
        heading: "Your pitch is confirmed",
        bodyHtml: `<p>Hi {{participant_name}},</p><p>Payment for {{startup_name}} has been verified. Your ticket number is <strong>{{ticket_number}}</strong>.</p><p>QR code is attached / available on your ticket page.</p>`,
      },
      {
        key: "audience_ticket",
        name: "Audience Ticket",
        subject: "VentureSpark – Your audience ticket",
        heading: "You’re in!",
        bodyHtml: `<p>Hi {{participant_name}},</p><p>Your audience ticket for {{event_date}} is confirmed. Ticket number: <strong>{{ticket_number}}</strong>.</p>`,
      },
      {
        key: "payment_rejected",
        name: "Payment Rejected",
        subject: "VentureSpark – Payment verification failed",
        heading: "Action required",
        bodyHtml: `<p>Hi {{participant_name}},</p><p>We could not verify your payment. Reason: {{rejection_reason}}. You may resubmit proof from your registration page.</p>`,
      },
    ],
  });

  console.log("Seed completed successfully.");
  console.log("Event ID:", event.id);
  console.log("UPI ID set to: 918446331503@waaxis");
  console.log("No Super Admin created yet – use /setup on first deploy.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
