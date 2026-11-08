import { attendanceConfig } from "@/lib/attendance/config";

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: attendanceConfig.timezone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: attendanceConfig.timezone,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: attendanceConfig.timezone,
  weekday: "short",
  month: "short",
  day: "numeric",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: attendanceConfig.timezone,
  month: "long",
  year: "numeric",
});

export function getLocalDateKey(date = new Date()): string {
  return dateFormatter.format(date);
}

export function getLocalTimeKey(date = new Date()): string {
  return timeFormatter.format(date);
}

export function isDateKey(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function isTimeKey(value: string): boolean {
  if (!/^\d{2}:\d{2}$/.test(value)) {
    return false;
  }

  const [hours, minutes] = value.split(":").map(Number);
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

export function addDays(dateKey: string, amount: number): string {
  const date = new Date(`${dateKey}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
}

export function getWeekStart(dateKey = getLocalDateKey()): string {
  const date = new Date(`${dateKey}T12:00:00Z`);
  const weekday = date.getUTCDay();
  const offset = (weekday + 6) % 7;
  return addDays(dateKey, -offset);
}

export function getPreviousCompletedWeekStart(dateKey = getLocalDateKey()): string {
  return addDays(getWeekStart(dateKey), -7);
}

export function getWeekEnd(weekStart: string): string {
  return addDays(weekStart, 6);
}

export function listDateKeys(start: string, end: string): string[] {
  const values: string[] = [];
  let cursor = start;

  while (cursor <= end) {
    values.push(cursor);
    cursor = addDays(cursor, 1);
  }

  return values;
}

export function getMinutesBetweenTimes(startTime: string, endTime: string): number {
  if (!isTimeKey(startTime) || !isTimeKey(endTime)) {
    throw new Error("Invalid time value.");
  }

  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);
  const startTotal = startHours * 60 + startMinutes;
  const endTotal = endHours * 60 + endMinutes;
  const minutes = endTotal - startTotal;

  if (minutes <= 0) {
    throw new Error("End time must be later than start time.");
  }

  return minutes;
}

export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}m`;
  }

  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}m`;
}

export function formatDecimalHours(minutes: number): string {
  return (minutes / 60).toFixed(2);
}

export function formatDateLabel(dateKey: string): string {
  return dayFormatter.format(new Date(`${dateKey}T12:00:00Z`));
}

export function formatMonthLabel(dateKey: string): string {
  return monthFormatter.format(new Date(`${dateKey}T12:00:00Z`));
}

export function toTitleCaseDay(dateKey: string): string {
  return new Date(`${dateKey}T12:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "short",
  });
}

export function getMonthGrid(anchorDate = getLocalDateKey()): string[] {
  const monthStart = `${anchorDate.slice(0, 7)}-01`;
  const monthStartDate = new Date(`${monthStart}T12:00:00Z`);
  const leadDays = (monthStartDate.getUTCDay() + 6) % 7;
  const gridStart = addDays(monthStart, -leadDays);
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
}
