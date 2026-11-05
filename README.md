# VentureSpark: The Founders’ Arena

Complete event platform for the live startup pitch event in Mumbai (30 Nov – 1 Dec 2026).

## What is included (Phase 1)

- Public website (Home, About, Agenda, Judges, Pitch registration, Audience tickets, Transport request, Venue, FAQ, Contact, Privacy, Terms)
- Database-driven content (Neon Postgres + Prisma)
- Pitch registration with server-side validation, deadline (15 Nov 2026), 50-slot / 25-per-day limits, temporary holds
- Audience registration (one day per ticket, capacity 200/day default)
- Manual UPI / bank-transfer payments with proof upload
- Admin payment verification queue
- Ticket + unique QR generation after payment approval
- Role-based admin (Super Admin via one-time setup)
- Resend email templates ready
- Seed data with judges, agenda, UPI ID `918446331503@waaxis`, no-refund policy, etc.

## Deployment (no local Node required)

### 1. Create GitHub repository
1. Go to [github.com/new](https://github.com/new)
2. Name it `venturespark` (or any name)
3. Do **not** initialize with README
4. Create repository

### 2. Upload the project
1. Download / extract this ZIP
2. On the empty GitHub repo page click **“uploading an existing file”**
3. Drag **all** files and folders from the extracted project into the browser
4. Commit

### 3. Create Neon database
1. Go to [neon.tech](https://neon.tech) → New Project
2. Copy the connection string → this is `DATABASE_URL`

### 4. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → Add New → Project
2. Import the GitHub repository
3. Framework Preset: Next.js (auto-detected)
4. **Environment Variables** – add these (Production + Preview):

| Name | Value | Notes |
|------|-------|-------|
| `DATABASE_URL` | (Neon pooled string) | Required |
| `AUTH_SECRET` | long random string (≥32 chars) | Required |
| `NEXT_PUBLIC_APP_URL` | `https://your-project.vercel.app` | Update after first deploy |
| `RESEND_API_KEY` | `re_...` | Required for emails |
| `RESEND_FROM_EMAIL` | verified sender | Required for emails |
| `RESEND_FROM_NAME` | VentureSpark | Optional |
| `BLOB_READ_WRITE_TOKEN` | (from Vercel Blob) | Optional for now |

5. Click **Deploy**

### 5. First-time database setup
After the first successful deploy:
1. Open `https://your-project.vercel.app/setup`
2. Create the Super Admin account (email + strong password)
3. The setup page will also push the schema and seed the event data
4. After setup the page becomes inaccessible

### 6. Resend setup
1. Create account at [resend.com](https://resend.com)
2. Add and verify a domain (or use the temporary `onboarding@resend.dev` for testing)
3. Create an API key and add it as `RESEND_API_KEY`
4. Set `RESEND_FROM_EMAIL` to a verified address

### 7. (Optional) Vercel Blob
1. In Vercel project → Storage → Create Blob store
2. Copy the `BLOB_READ_WRITE_TOKEN` into environment variables
3. Redeploy

## Local development (only if you want)
```bash
cp .env.example .env
# fill values
npm install
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

## Important notes
- Prices, deadlines, UPI ID, venue, judges, pages and FAQ live in the database and are editable from the admin dashboard.
- Pitch fee covers up to 3 attending team members.
- Audience tickets are valid for one selected day only.
- No refunds / no cancellations (as confirmed).
- UPI ID is pre-seeded as `918446331503@waaxis`.
- Investment is not guaranteed – this notice appears on all relevant pages.

## Phase 2 & 3 (coming next)
- Slot scheduling UI
- Judge photo approval
- SPOC management
- QR check-in scanner
- Transport confirmation workflow
- Email campaigns
- Full reports & CSV exports
- Audit logs polish

**Note:** This project does not use any cron jobs or scheduled background tasks.

---

Built for a non-technical deployer. If anything fails during setup, check the Vercel build logs and the `/setup` page error messages.
