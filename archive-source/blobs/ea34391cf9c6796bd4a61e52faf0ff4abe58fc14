import { NextResponse } from "next/server";
import { getAdminSessionUser } from "@/lib/attendance/auth";
import { buildWeeklySummaryCsv } from "@/lib/attendance/reports";
import { getWeeklySummary } from "@/lib/attendance/selectors";
import { getWeekStart, isDateKey } from "@/lib/attendance/time";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const adminUser = await getAdminSessionUser();

  if (!adminUser) {
    return NextResponse.json({ error: "Admin access is required." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const requestedWeekStart = searchParams.get("weekStart") ?? getWeekStart();
  const weekStart = isDateKey(requestedWeekStart) ? requestedWeekStart : getWeekStart();
  const summary = await getWeeklySummary(weekStart);
  const csv = buildWeeklySummaryCsv(summary);

  return new NextResponse(csv, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Disposition": `attachment; filename="attendance-week-${summary.weekStart}.csv"`,
      "Content-Type": "text/csv; charset=utf-8",
    },
  });
}
