import Link from "next/link";
import { redirect } from "next/navigation";
import { reviewEditRequestAction, sendPreviousWeekReportAction } from "@/app/actions";
import { SubmitButton } from "@/components/attendance/submit-button";
import { getAdminSessionUser } from "@/lib/attendance/auth";
import { getAdminDashboard } from "@/lib/attendance/selectors";
import { formatDateLabel, formatDecimalHours, formatMinutes, getPreviousCompletedWeekStart } from "@/lib/attendance/time";

type AdminPageProps = {
  searchParams: Promise<{
    error?: string;
    status?: string;
  }>;
};

function buildNotice(params: Awaited<AdminPageProps["searchParams"]>) {
  if (params.error) {
    return <div className="notice notice-error">{params.error}</div>;
  }

  if (params.status) {
    return <div className="notice notice-success">{params.status}</div>;
  }

  return null;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const adminUser = await getAdminSessionUser();

  if (!adminUser) {
    redirect("/?error=Admin%20access%20is%20required");
  }

  const dashboard = await getAdminDashboard();
  const exportWeekStart = dashboard.weekStart;
  const lastCompletedWeekStart = getPreviousCompletedWeekStart();

  return (
    <div className="space-y-6">
      {buildNotice(params)}

      <section className="panel-grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-card rounded-[2rem] px-6 py-7 lg:px-8 lg:py-9">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--muted-ink)]">Admin dashboard</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl leading-[0.92] tracking-[0.05em] text-[color:var(--ink)]">
            Hours, approvals, and reports.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--muted-ink)]">
            Review pending employee edit requests, watch live attendance, and export the current week or send the last completed week through email and WhatsApp.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-[1.5rem] border border-[color:var(--border-soft)] bg-white/75 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--muted-ink)]">Employees</p>
              <p className="mt-3 text-3xl font-black uppercase tracking-[0.08em] text-[color:var(--ink)]">{dashboard.employeeCount}</p>
            </div>
            <div className="rounded-[1.5rem] border border-[color:var(--border-soft)] bg-white/75 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--muted-ink)]">Week total</p>
              <p className="mt-3 text-3xl font-black uppercase tracking-[0.08em] text-[color:var(--ink)]">
                {formatMinutes(dashboard.totalWeekMinutes)}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[color:var(--border-soft)] bg-white/75 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--muted-ink)]">Pending edits</p>
              <p className="mt-3 text-3xl font-black uppercase tracking-[0.08em] text-[color:var(--ink)]">{dashboard.pendingCount}</p>
            </div>
            <div className="rounded-[1.5rem] border border-[color:var(--border-soft)] bg-white/75 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--muted-ink)]">Open shifts</p>
              <p className="mt-3 text-3xl font-black uppercase tracking-[0.08em] text-[color:var(--ink)]">{dashboard.openShiftCount}</p>
            </div>
          </div>
        </div>

        <aside className="surface-card rounded-[2rem] px-6 py-7 lg:px-8 lg:py-9">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--muted-ink)]">Reports</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[0.04em] text-[color:var(--ink)]">
            Export or send
          </h2>
          <p className="mt-3 text-base leading-7 text-[color:var(--muted-ink)]">
            CSV export uses the current week. Automatic email and WhatsApp delivery targets the last completed week.
          </p>

          <div className="mt-7 space-y-4">
            <Link
              className="flex items-center justify-between rounded-[1.5rem] border border-[color:var(--border-soft)] bg-white px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[color:var(--ink)] transition hover:-translate-y-0.5"
              href={`/api/reports/export?weekStart=${exportWeekStart}`}
            >
              Export current week CSV
              <span>{dashboard.weekStart}</span>
            </Link>

            <form action={sendPreviousWeekReportAction} className="rounded-[1.5rem] border border-[color:var(--border-soft)] bg-[color:var(--paper-strong)] p-5">
              <input name="force" type="hidden" value="0" />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">Last completed week</p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--ink)]">
                {lastCompletedWeekStart}
                {dashboard.lastReportRun ? ` • last sent ${dashboard.lastReportRun.createdAt.slice(0, 16).replace("T", " ")}` : " • not sent yet"}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <SubmitButton
                  className="rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[color:var(--paper)] transition hover:bg-[color:var(--ink-soft)]"
                  pendingLabel="Sending…"
                >
                  Send weekly report
                </SubmitButton>
              </div>
            </form>

            <div className="rounded-[1.5rem] border border-[color:var(--border-soft)] bg-white/70 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">Last delivery result</p>
              {dashboard.lastReportRun ? (
                <div className="mt-4 space-y-2 text-sm text-[color:var(--ink)]">
                  <p>Email: {dashboard.lastReportRun.email.status} • {dashboard.lastReportRun.email.message}</p>
                  <p>WhatsApp: {dashboard.lastReportRun.whatsapp.status} • {dashboard.lastReportRun.whatsapp.message}</p>
                </div>
              ) : (
                <p className="mt-4 text-sm text-[color:var(--muted-ink)]">No completed-week report has been sent yet.</p>
              )}
            </div>
          </div>
        </aside>
      </section>

      <section className="panel-grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card rounded-[2rem] px-6 py-7 lg:px-8 lg:py-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--muted-ink)]">Pending edit requests</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[0.04em] text-[color:var(--ink)]">
                Approval queue
              </h2>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">{dashboard.pendingCount} open</p>
          </div>

          <div className="mt-6 space-y-4">
            {dashboard.pendingRequests.length > 0 ? (
              dashboard.pendingRequests.map((request) => (
                <form
                  key={request.id}
                  action={reviewEditRequestAction}
                  className="rounded-[1.5rem] border border-[color:var(--border-soft)] bg-white/75 p-5"
                >
                  <input name="requestId" type="hidden" value={request.id} />
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-lg font-bold text-[color:var(--ink)]">{request.user.name}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">
                        {request.user.email}
                      </p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-sm font-bold text-[color:var(--ink)]">{request.workDate}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">
                        {request.requestedCheckInTime} → {request.requestedCheckOutTime} • {formatMinutes(request.requestedMinutes)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-[1rem] bg-[color:var(--paper-strong)] px-4 py-4 text-sm leading-6 text-[color:var(--ink)]">
                    <p>
                      <span className="font-bold">Employee reason:</span> {request.reason}
                    </p>
                    <p className="mt-2">
                      <span className="font-bold">Current record:</span>{" "}
                      {request.entry
                        ? `${request.entry.checkInTime} → ${request.entry.checkOutTime ?? "open"}`
                        : "No attendance record exists yet"}
                    </p>
                  </div>

                  <label className="mt-4 block space-y-2">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">Admin note</span>
                    <textarea
                      className="min-h-24 w-full rounded-[1rem] border border-[color:var(--border-soft)] bg-white px-4 py-3 text-[color:var(--ink)] outline-none ring-0 transition focus:border-[color:var(--accent)]"
                      name="adminNote"
                      placeholder="Optional context for the employee"
                    />
                  </label>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <SubmitButton
                      className="rounded-full bg-[color:var(--success)] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5"
                      name="decision"
                      pendingLabel="Approving…"
                      value="approved"
                    >
                      Approve
                    </SubmitButton>
                    <SubmitButton
                      className="rounded-full border border-[color:var(--border-strong)] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[color:var(--ink)] transition hover:bg-[color:var(--paper-strong)]"
                      name="decision"
                      pendingLabel="Rejecting…"
                      value="rejected"
                    >
                      Reject
                    </SubmitButton>
                  </div>
                </form>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-[color:var(--border-soft)] bg-white/75 px-5 py-6 text-sm leading-6 text-[color:var(--muted-ink)]">
                No pending edit requests right now.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <section className="surface-card rounded-[2rem] px-6 py-7 lg:px-8 lg:py-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--muted-ink)]">Employees</p>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[0.04em] text-[color:var(--ink)]">
                  Weekly totals
                </h2>
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">
                {formatDateLabel(dashboard.weekStart)} to {formatDateLabel(dashboard.weekEnd)}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {dashboard.employeeSummaries.map((summary) => (
                <div
                  key={summary.user.id}
                  className="flex items-center justify-between rounded-[1.25rem] border border-[color:var(--border-soft)] bg-white/70 px-4 py-4"
                >
                  <div>
                    <p className="text-sm font-bold text-[color:var(--ink)]">
                      {summary.user.name}
                      {summary.user.role === "admin" ? " • admin" : ""}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">
                      {summary.user.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black uppercase tracking-[0.12em] text-[color:var(--ink)]">
                      {formatMinutes(summary.weekMinutes)}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">
                      {formatDecimalHours(summary.weekMinutes)}h • pending {summary.pendingEditCount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="surface-card rounded-[2rem] px-6 py-7 lg:px-8 lg:py-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--muted-ink)]">Attendance feed</p>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[0.04em] text-[color:var(--ink)]">
                  Recent entries
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {dashboard.recentEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between rounded-[1.25rem] border border-[color:var(--border-soft)] bg-white/70 px-4 py-4"
                >
                  <div>
                    <p className="text-sm font-bold text-[color:var(--ink)]">{entry.user.name}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">
                      {entry.workDate} • {entry.checkInTime} → {entry.checkOutTime ?? "live"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black uppercase tracking-[0.12em] text-[color:var(--ink)]">
                      {entry.minutesWorked ? formatMinutes(entry.minutesWorked) : "Open"}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">
                      {entry.source === "admin_edit" ? "Admin edit" : "Clock"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
