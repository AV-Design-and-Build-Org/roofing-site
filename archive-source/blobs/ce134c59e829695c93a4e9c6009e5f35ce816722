export const attendanceConfig = {
  appName: "Airduct Hours",
  companyName: "Airduct",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  timezone: process.env.ATTENDANCE_TIMEZONE ?? "America/Los_Angeles",
  sessionDays: 30,
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
  googleHostedDomain: process.env.GOOGLE_HOSTED_DOMAIN?.trim().toLowerCase() ?? "",
  adminEmail: process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "",
  sessionSecret: process.env.SESSION_SECRET ?? "dev-only-session-secret-change-me",
  reportEmailFrom: process.env.REPORT_EMAIL_FROM ?? "",
  reportEmailTo: process.env.REPORT_EMAIL_TO ?? "",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID ?? "",
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN ?? "",
  twilioWhatsappFrom: process.env.TWILIO_WHATSAPP_FROM ?? "",
  twilioWhatsappTo: process.env.TWILIO_WHATSAPP_TO ?? "",
  cronSecret: process.env.REPORTS_CRON_SECRET ?? process.env.CRON_SECRET ?? "",
};

export const SESSION_COOKIE_NAME = "airduct-hours-session";

export const isProduction = process.env.NODE_ENV === "production";
