import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { attendanceConfig } from "@/lib/attendance/config";
import {
  type AttendanceStore,
  type EditRequestRecord,
  type TimeEntryRecord,
  type UserRecord,
} from "@/lib/attendance/types";
import { getLocalDateKey, getLocalTimeKey, getMinutesBetweenTimes } from "@/lib/attendance/time";

const storeFilePath = path.join(process.cwd(), "data", "attendance-store.json");

const defaultStore: AttendanceStore = {
  users: [],
  entries: [],
  editRequests: [],
  reportRuns: [],
};

let writeQueue = Promise.resolve();

export class AttendanceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AttendanceError";
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeStore(candidate: unknown): AttendanceStore {
  if (!isObject(candidate)) {
    return structuredClone(defaultStore);
  }

  return {
    users: Array.isArray(candidate.users) ? (candidate.users as UserRecord[]) : [],
    entries: Array.isArray(candidate.entries) ? (candidate.entries as TimeEntryRecord[]) : [],
    editRequests: Array.isArray(candidate.editRequests) ? (candidate.editRequests as EditRequestRecord[]) : [],
    reportRuns: Array.isArray(candidate.reportRuns) ? candidate.reportRuns : [],
  };
}

async function ensureStoreFile(): Promise<void> {
  await fs.mkdir(path.dirname(storeFilePath), { recursive: true });

  try {
    await fs.access(storeFilePath);
  } catch {
    await fs.writeFile(storeFilePath, `${JSON.stringify(defaultStore, null, 2)}\n`, "utf8");
  }
}

async function persistStore(store: AttendanceStore): Promise<void> {
  const tempFilePath = `${storeFilePath}.tmp`;
  await fs.writeFile(tempFilePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
  await fs.rename(tempFilePath, storeFilePath);
}

export async function readAttendanceStore(): Promise<AttendanceStore> {
  await ensureStoreFile();
  const raw = await fs.readFile(storeFilePath, "utf8");
  return normalizeStore(JSON.parse(raw));
}

async function mutateStore<T>(mutator: (store: AttendanceStore) => Promise<T> | T): Promise<T> {
  const operation = writeQueue.then(async () => {
    const store = await readAttendanceStore();
    const result = await mutator(store);
    await persistStore(store);
    return result;
  });

  writeQueue = operation.then(
    () => undefined,
    () => undefined,
  );

  return operation;
}

export async function getUserById(userId: string): Promise<UserRecord | null> {
  const store = await readAttendanceStore();
  return store.users.find((user) => user.id === userId) ?? null;
}

export async function upsertGoogleUser(input: {
  googleSub: string;
  email: string;
  name: string;
  picture: string | null;
}): Promise<UserRecord> {
  const normalizedEmail = input.email.trim().toLowerCase();
  const now = new Date().toISOString();

  return mutateStore((store) => {
    const existingUser =
      store.users.find((user) => user.googleSub === input.googleSub) ??
      store.users.find((user) => user.email === normalizedEmail);

    const role = normalizedEmail === attendanceConfig.adminEmail ? "admin" : "employee";

    if (existingUser) {
      existingUser.googleSub = input.googleSub;
      existingUser.email = normalizedEmail;
      existingUser.name = input.name.trim() || normalizedEmail;
      existingUser.picture = input.picture;
      existingUser.role = role;
      existingUser.updatedAt = now;
      existingUser.lastLoginAt = now;
      return existingUser;
    }

    const newUser: UserRecord = {
      id: randomUUID(),
      googleSub: input.googleSub,
      email: normalizedEmail,
      name: input.name.trim() || normalizedEmail,
      picture: input.picture,
      role,
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
    };

    store.users.push(newUser);
    return newUser;
  });
}

export async function clockInUser(userId: string): Promise<TimeEntryRecord> {
  const now = new Date().toISOString();
  const workDate = getLocalDateKey();
  const checkInTime = getLocalTimeKey();

  return mutateStore((store) => {
    const openEntry = store.entries.find((entry) => entry.userId === userId && entry.checkOutTime === null);
    if (openEntry) {
      if (openEntry.workDate === workDate) {
        throw new AttendanceError(`You are already checked in since ${openEntry.checkInTime}.`);
      }

      throw new AttendanceError(
        `You still have an open shift from ${openEntry.workDate}. Ask the admin to correct it before checking in again.`,
      );
    }

    const todayEntry = store.entries.find((entry) => entry.userId === userId && entry.workDate === workDate);
    if (todayEntry) {
      throw new AttendanceError("You already logged hours for today. Submit an edit request if the times need correction.");
    }

    const entry: TimeEntryRecord = {
      id: randomUUID(),
      userId,
      workDate,
      checkInTime,
      checkOutTime: null,
      minutesWorked: null,
      source: "clock",
      createdAt: now,
      updatedAt: now,
    };

    store.entries.push(entry);
    return entry;
  });
}

export async function clockOutUser(userId: string): Promise<TimeEntryRecord> {
  const now = new Date().toISOString();
  const workDate = getLocalDateKey();
  const checkOutTime = getLocalTimeKey();

  return mutateStore((store) => {
    const openEntry = [...store.entries]
      .reverse()
      .find((entry) => entry.userId === userId && entry.checkOutTime === null);

    if (!openEntry) {
      throw new AttendanceError("You are not currently checked in.");
    }

    if (openEntry.workDate !== workDate) {
      throw new AttendanceError(
        `This open shift started on ${openEntry.workDate}. v1 only supports same-day clock-out, so ask the admin to edit the record.`,
      );
    }

    openEntry.checkOutTime = checkOutTime;
    openEntry.minutesWorked = getMinutesBetweenTimes(openEntry.checkInTime, checkOutTime);
    openEntry.updatedAt = now;
    return openEntry;
  });
}

export async function submitEditRequest(input: {
  userId: string;
  workDate: string;
  requestedCheckInTime: string;
  requestedCheckOutTime: string;
  reason: string;
}): Promise<EditRequestRecord> {
  const now = new Date().toISOString();
  const requestedMinutes = getMinutesBetweenTimes(input.requestedCheckInTime, input.requestedCheckOutTime);

  return mutateStore((store) => {
    const pendingForDay = store.editRequests.find(
      (request) =>
        request.userId === input.userId && request.workDate === input.workDate && request.status === "pending",
    );

    if (pendingForDay) {
      throw new AttendanceError("There is already a pending edit request for that day.");
    }

    const currentEntry = store.entries.find(
      (entry) => entry.userId === input.userId && entry.workDate === input.workDate,
    );

    const request: EditRequestRecord = {
      id: randomUUID(),
      userId: input.userId,
      entryId: currentEntry?.id ?? null,
      workDate: input.workDate,
      requestedCheckInTime: input.requestedCheckInTime,
      requestedCheckOutTime: input.requestedCheckOutTime,
      requestedMinutes,
      reason: input.reason.trim(),
      status: "pending",
      adminNote: null,
      createdAt: now,
      updatedAt: now,
      resolvedAt: null,
      resolvedByUserId: null,
    };

    store.editRequests.push(request);
    return request;
  });
}

export async function reviewEditRequest(input: {
  requestId: string;
  reviewerUserId: string;
  decision: "approved" | "rejected";
  adminNote: string;
}): Promise<EditRequestRecord> {
  const now = new Date().toISOString();

  return mutateStore((store) => {
    const request = store.editRequests.find((item) => item.id === input.requestId);
    if (!request) {
      throw new AttendanceError("That edit request no longer exists.");
    }

    if (request.status !== "pending") {
      throw new AttendanceError("That edit request has already been reviewed.");
    }

    request.status = input.decision;
    request.adminNote = input.adminNote.trim() || null;
    request.updatedAt = now;
    request.resolvedAt = now;
    request.resolvedByUserId = input.reviewerUserId;

    if (input.decision === "approved") {
      let entry = store.entries.find(
        (item) => item.userId === request.userId && item.workDate === request.workDate,
      );

      if (!entry) {
        entry = {
          id: randomUUID(),
          userId: request.userId,
          workDate: request.workDate,
          checkInTime: request.requestedCheckInTime,
          checkOutTime: request.requestedCheckOutTime,
          minutesWorked: request.requestedMinutes,
          source: "admin_edit",
          createdAt: now,
          updatedAt: now,
        };
        store.entries.push(entry);
      } else {
        entry.checkInTime = request.requestedCheckInTime;
        entry.checkOutTime = request.requestedCheckOutTime;
        entry.minutesWorked = request.requestedMinutes;
        entry.source = "admin_edit";
        entry.updatedAt = now;
      }

      request.entryId = entry.id;
    }

    return request;
  });
}

export async function recordWeeklyReportRun(run: AttendanceStore["reportRuns"][number]): Promise<void> {
  await mutateStore((store) => {
    store.reportRuns.push(run);
  });
}
