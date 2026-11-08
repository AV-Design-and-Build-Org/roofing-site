import { randomUUID } from "node:crypto";
import { attendanceConfig } from "@/lib/attendance/config";
import { getWeeklySummary } from "@/lib/attendance/selectors";
import { recordWeeklyReportRun, readAttendanceStore } from "@/lib/attendance/store";
import type { DeliveryStatus, WeeklySummary } from "@/lib/attendance/types";
import { formatDateLabel, formatDecimalHours, formatMinutes, getWeekEnd } from "@/lib/attendance/time";

function splitRecipients(rawValue: string): string[] {
  return rawValue
    .split(/[,\n;]/)
    .map((value) => value.trim())
    .filter(Boolean);
}

export function buildWeeklySummaryCsv(summary: WeeklySummary): string {
  const rows = [
    ["Employee", "Email", "Week Start", "Week End", "Days Worked", "Hours", "Minutes"],
    ...summary.employees.map((employee) => [
      employee.user.name,
      employee.user.email,
      summary.weekStart,
      summary.weekEnd,
      String(employee.daysWorked),
      formatDecimalHours(employee.totalMinutes),
      String(employee.totalMinutes),
    ]),
  ];

  return rows
    .map((row) =>
      row
        .map((value) => `"${String(value).replaceAll('"', '""')}"`)
        .join(","),
    )
    .join("\n");
}

export function buildWeeklySummaryText(summary: WeeklySummary): string {
  const lines = [
    `Weekly hours report`,
    `${formatDateLabel(summary.weekStart)} to ${formatDateLabel(summary.weekEnd)}`,
    "",
    ...summary.employees.map(
      (employee) =>
        `${employee.user.name}: ${formatMinutes(employee.totalMinutes)} across ${employee.daysWorked} day${
          employee.daysWorked === 1 ? "" : "s"
        }`,
    ),
  ];

  if (summary.pendingRequestCount > 0) {
    lines.push("", `Pending edit requests: ${summary.pendingRequestCount}`);
  }

  return lines.join("\n");
}

function buildWeeklySummaryHtml(summary: WeeklySummary): string {
  const rows = summary.employees
    .map(
      (employee) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e7dcc8;">${employee.user.name}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e7dcc8;">${employee.daysWorked}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e7dcc8;">${formatMinutes(employee.totalMinutes)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e7dcc8;">${formatDecimalHours(employee.totalMinutes)}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;background:#f6f1e8;color:#151515;padding:24px;">
      <h1 style="margin:0 0 8px;font-size:24px;">Weekly hours report</h1>
      <p style="margin:0 0 20px;">${formatDateLabel(summary.weekStart)} to ${formatDateLabel(summary.weekEnd)}</p>
      <table style="width:100%;border-collapse:collapse;background:#fff;">
        <thead>
          <tr style="background:#f3e5d1;text-align:left;">
            <th style="padding:10px 12px;">Employee</th>
            <th style="padding:10px 12px;">Days</th>
            <th style="padding:10px 12px;">Worked</th>
            <th style="padding:10px 12px;">Hours</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="margin:20px 0 0;">Pending edit requests: ${summary.pendingRequestCount}</p>
    </div>
  `;
}

async function sendEmailReport(summary: WeeklySummary): Promise<DeliveryStatus> {
  const recipients = splitRecipients(attendanceConfig.reportEmailTo);

  if (!attendanceConfig.resendApiKey || !attendanceConfig.reportEmailFrom || recipients.length === 0) {
    return {
      status: "skipped",
      message: "Email delivery skipped because Resend or email recipients are not configured.",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${attendanceConfig.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: attendanceConfig.reportEmailFrom,
      to: recipients,
      subject: `Weekly hours report: ${summary.weekStart} to ${summary.weekEnd}`,
      text: buildWeeklySummaryText(summary),
      html: buildWeeklySummaryHtml(summary),
    }),
  });

  if (!response.ok) {
    return {
      status: "failed",
      message: await response.text(),
    };
  }

  return {
    status: "sent",
    message: `Sent to ${recipients.join(", ")}`,
  };
}

async function sendWhatsappReport(summary: WeeklySummary): Promise<DeliveryStatus> {
  const recipients = splitRecipients(attendanceConfig.twilioWhatsappTo);

  if (
    !attendanceConfig.twilioAccountSid ||
    !attendanceConfig.twilioAuthToken ||
    !attendanceConfig.twilioWhatsappFrom ||
    recipients.length === 0
  ) {
    return {
      status: "skipped",
      message: "WhatsApp delivery skipped because Twilio or WhatsApp recipients are not configured.",
    };
  }

  const body = buildWeeklySummaryText(summary);
  const authToken = Buffer.from(
    `${attendanceConfig.twilioAccountSid}:${attendanceConfig.twilioAuthToken}`,
  ).toString("base64");

  for (const recipient of recipients) {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${attendanceConfig.twilioAccountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${authToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          From: attendanceConfig.twilioWhatsappFrom.startsWith("whatsapp:")
            ? attendanceConfig.twilioWhatsappFrom
            : `whatsapp:${attendanceConfig.twilioWhatsappFrom}`,
          To: recipient.startsWith("whatsapp:") ? recipient : `whatsapp:${recipient}`,
          Body: body,
        }),
      },
    );

    if (!response.ok) {
      return {
        status: "failed",
        message: await response.text(),
      };
    }
  }

  return {
    status: "sent",
    message: `Sent to ${recipients.join(", ")}`,
  };
}

export async function sendWeeklyReport(options: {
  weekStart: string;
  triggeredBy: string;
  force?: boolean;
}): Promise<{
  summary: WeeklySummary;
  alreadySent: boolean;
  email: DeliveryStatus;
  whatsapp: DeliveryStatus;
}> {
  const store = await readAttendanceStore();
  const existingRun = store.reportRuns.find((run) => run.weekStart === options.weekStart);

  if (existingRun && !options.force) {
    return {
      summary: await getWeeklySummary(options.weekStart),
      alreadySent: true,
      email: existingRun.email,
      whatsapp: existingRun.whatsapp,
    };
  }

  const summary = await getWeeklySummary(options.weekStart);
  const email = await sendEmailReport(summary);
  const whatsapp = await sendWhatsappReport(summary);

  await recordWeeklyReportRun({
    id: randomUUID(),
    weekStart: options.weekStart,
    weekEnd: getWeekEnd(options.weekStart),
    createdAt: new Date().toISOString(),
    triggeredBy: options.triggeredBy,
    email,
    whatsapp,
    summarySnapshot: buildWeeklySummaryText(summary),
  });

  return {
    summary,
    alreadySent: false,
    email,
    whatsapp,
  };
}
