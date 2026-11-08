import { NextResponse } from "next/server";
import { getAdminSessionUser } from "@/lib/attendance/auth";
import { attendanceConfig } from "@/lib/attendance/config";
import { sendWeeklyReport } from "@/lib/attendance/reports";
import { getPreviousCompletedWeekStart } from "@/lib/attendance/time";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authorization = request.headers.get("authorization");
  const force = searchParams.get("force") === "1";
  const hasCronAccess = Boolean(
    attendanceConfig.cronSecret && authorization === `Bearer ${attendanceConfig.cronSecret}`,
  );

  let triggeredBy = "cron";

  if (!hasCronAccess) {
    const adminUser = await getAdminSessionUser();

    if (!adminUser) {
      return NextResponse.json({ error: "Cron secret or admin session is required." }, { status: 401 });
    }

    triggeredBy = adminUser.email;
  }

  const result = await sendWeeklyReport({
    weekStart: getPreviousCompletedWeekStart(),
    triggeredBy,
    force,
  });

  return NextResponse.json({
    ok: true,
    alreadySent: result.alreadySent,
    weekStart: result.summary.weekStart,
    weekEnd: result.summary.weekEnd,
    email: result.email,
    whatsapp: result.whatsapp,
  });
}
