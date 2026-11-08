"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearSessionCookie, getAdminSessionUser, getSessionUser } from "@/lib/attendance/auth";
import { sendWeeklyReport } from "@/lib/attendance/reports";
import { AttendanceError, clockInUser, clockOutUser, reviewEditRequest, submitEditRequest } from "@/lib/attendance/store";
import { getPreviousCompletedWeekStart, isDateKey, isTimeKey } from "@/lib/attendance/time";

function buildRedirectPath(pathname: string, params: Record<string, string>): string {
  const searchParams = new URLSearchParams(params);
  return searchParams.size > 0 ? `${pathname}?${searchParams.toString()}` : pathname;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof AttendanceError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/");
}

export async function clockInAction(): Promise<void> {
  const user = await getSessionUser();

  if (!user) {
    redirect(buildRedirectPath("/", { error: "Please sign in first." }));
  }

  try {
    const entry = await clockInUser(user.id);
    revalidatePath("/");
    revalidatePath("/admin");
    redirect(buildRedirectPath("/", { status: `Checked in at ${entry.checkInTime}.` }));
  } catch (error) {
    redirect(buildRedirectPath("/", { error: getErrorMessage(error) }));
  }
}

export async function clockOutAction(): Promise<void> {
  const user = await getSessionUser();

  if (!user) {
    redirect(buildRedirectPath("/", { error: "Please sign in first." }));
  }

  try {
    const entry = await clockOutUser(user.id);
    revalidatePath("/");
    revalidatePath("/admin");
    redirect(buildRedirectPath("/", { status: `Checked out at ${entry.checkOutTime}.` }));
  } catch (error) {
    redirect(buildRedirectPath("/", { error: getErrorMessage(error) }));
  }
}

export async function requestEditAction(formData: FormData): Promise<void> {
  const user = await getSessionUser();

  if (!user) {
    redirect(buildRedirectPath("/", { error: "Please sign in first." }));
  }

  const workDate = String(formData.get("workDate") ?? "").trim();
  const requestedCheckInTime = String(formData.get("requestedCheckInTime") ?? "").trim();
  const requestedCheckOutTime = String(formData.get("requestedCheckOutTime") ?? "").trim();
  const reason = String(formData.get("reason") ?? "").trim();

  if (!isDateKey(workDate) || !isTimeKey(requestedCheckInTime) || !isTimeKey(requestedCheckOutTime)) {
    redirect(buildRedirectPath("/", { error: "Use a valid work date and time range." }));
  }

  if (!reason) {
    redirect(buildRedirectPath("/", { error: "Add a short reason for the edit request." }));
  }

  try {
    await submitEditRequest({
      userId: user.id,
      workDate,
      requestedCheckInTime,
      requestedCheckOutTime,
      reason,
    });
    revalidatePath("/");
    revalidatePath("/admin");
    redirect(buildRedirectPath("/", { status: `Edit request submitted for ${workDate}.` }));
  } catch (error) {
    redirect(buildRedirectPath("/", { error: getErrorMessage(error) }));
  }
}

export async function reviewEditRequestAction(formData: FormData): Promise<void> {
  const user = await getAdminSessionUser();

  if (!user) {
    redirect(buildRedirectPath("/", { error: "Admin access is required." }));
  }

  const requestId = String(formData.get("requestId") ?? "").trim();
  const decision = String(formData.get("decision") ?? "").trim();
  const adminNote = String(formData.get("adminNote") ?? "").trim();

  if (!requestId || (decision !== "approved" && decision !== "rejected")) {
    redirect(buildRedirectPath("/admin", { error: "Invalid review submission." }));
  }

  try {
    await reviewEditRequest({
      requestId,
      reviewerUserId: user.id,
      decision,
      adminNote,
    });
    revalidatePath("/");
    revalidatePath("/admin");
    redirect(buildRedirectPath("/admin", { status: `Edit request ${decision}.` }));
  } catch (error) {
    redirect(buildRedirectPath("/admin", { error: getErrorMessage(error) }));
  }
}

export async function sendPreviousWeekReportAction(formData: FormData): Promise<void> {
  const user = await getAdminSessionUser();

  if (!user) {
    redirect(buildRedirectPath("/", { error: "Admin access is required." }));
  }

  const force = String(formData.get("force") ?? "") === "1";

  try {
    const result = await sendWeeklyReport({
      weekStart: getPreviousCompletedWeekStart(),
      triggeredBy: user.email,
      force,
    });

    revalidatePath("/admin");

    if (result.alreadySent) {
      redirect(buildRedirectPath("/admin", { status: "Last completed week was already sent. Use force to resend." }));
    }

    redirect(
      buildRedirectPath("/admin", {
        status: `Weekly report sent. Email: ${result.email.status}. WhatsApp: ${result.whatsapp.status}.`,
      }),
    );
  } catch (error) {
    redirect(buildRedirectPath("/admin", { error: getErrorMessage(error) }));
  }
}
