import type {
  AdminDashboardData,
  CalendarDay,
  EmployeeDashboardData,
  TimeEntryRecord,
  UserRecord,
  WeeklySummary,
} from "@/lib/attendance/types";
import { readAttendanceStore } from "@/lib/attendance/store";
import {
  addDays,
  getLocalDateKey,
  getMonthGrid,
  getPreviousCompletedWeekStart,
  getWeekEnd,
  getWeekStart,
} from "@/lib/attendance/time";

function sumMinutes(entries: Array<{ minutesWorked: number | null }>): number {
  return entries.reduce((total, entry) => total + (entry.minutesWorked ?? 0), 0);
}

function getEntrySortValue(entry: TimeEntryRecord): string {
  return `${entry.workDate}-${entry.checkInTime}`;
}

export async function getEmployeeDashboard(user: UserRecord): Promise<EmployeeDashboardData> {
  const store = await readAttendanceStore();
  const today = getLocalDateKey();
  const weekStart = getWeekStart(today);
  const weekEnd = getWeekEnd(weekStart);
  const monthKey = today.slice(0, 7);
  const entries = store.entries
    .filter((entry) => entry.userId === user.id)
    .toSorted((left, right) => getEntrySortValue(right).localeCompare(getEntrySortValue(left)));
  const editRequests = store.editRequests
    .filter((request) => request.userId === user.id)
    .toSorted((left, right) => right.createdAt.localeCompare(left.createdAt));
  const openEntry = entries.find((entry) => entry.checkOutTime === null) ?? null;
  const todayEntry = entries.find((entry) => entry.workDate === today) ?? null;
  const weekEntries = entries.filter((entry) => entry.workDate >= weekStart && entry.workDate <= weekEnd);
  const monthEntries = entries.filter((entry) => entry.workDate.startsWith(monthKey));
  const pendingRequests = editRequests.filter((request) => request.status === "pending");

  const historyDays = Array.from({ length: 14 }, (_, index) => addDays(today, -index)).map((dateKey) => ({
    dateKey,
    entry: entries.find((entry) => entry.workDate === dateKey) ?? null,
    pendingRequest: pendingRequests.find((request) => request.workDate === dateKey) ?? null,
  }));

  const monthGrid = getMonthGrid(today);
  const calendarDays: CalendarDay[] = monthGrid.map((dateKey) => ({
    dateKey,
    dayOfMonth: Number(dateKey.slice(8, 10)),
    isCurrentMonth: dateKey.startsWith(monthKey),
    isToday: dateKey === today,
    entry: entries.find((entry) => entry.workDate === dateKey) ?? null,
    pendingRequest: pendingRequests.find((request) => request.workDate === dateKey) ?? null,
  }));

  return {
    user,
    todayEntry,
    openEntry,
    weekStart,
    weekEnd,
    weekMinutes: sumMinutes(weekEntries),
    monthMinutes: sumMinutes(monthEntries),
    completedDaysThisMonth: monthEntries.filter((entry) => (entry.minutesWorked ?? 0) > 0).length,
    historyDays,
    calendarDays,
    pendingRequests,
    recentClosedEntries: entries.filter((entry) => entry.checkOutTime !== null).slice(0, 8),
  };
}

export async function getAdminDashboard(): Promise<AdminDashboardData> {
  const store = await readAttendanceStore();
  const today = getLocalDateKey();
  const weekStart = getWeekStart(today);
  const weekEnd = getWeekEnd(weekStart);
  const monthKey = today.slice(0, 7);
  const usersById = new Map(store.users.map((user) => [user.id, user]));

  const employeeSummaries = store.users
    .toSorted((left, right) => left.name.localeCompare(right.name))
    .map((user) => {
      const userEntries = store.entries
        .filter((entry) => entry.userId === user.id)
        .toSorted((left, right) => getEntrySortValue(right).localeCompare(getEntrySortValue(left)));

      return {
        user,
        weekMinutes: sumMinutes(userEntries.filter((entry) => entry.workDate >= weekStart && entry.workDate <= weekEnd)),
        monthMinutes: sumMinutes(userEntries.filter((entry) => entry.workDate.startsWith(monthKey))),
        lastEntry: userEntries[0] ?? null,
        openEntry: userEntries.find((entry) => entry.checkOutTime === null) ?? null,
        pendingEditCount: store.editRequests.filter(
          (request) => request.userId === user.id && request.status === "pending",
        ).length,
      };
    });

  const pendingRequests = store.editRequests
    .filter((request) => request.status === "pending")
    .toSorted((left, right) => left.createdAt.localeCompare(right.createdAt))
    .flatMap((request) => {
      const user = usersById.get(request.userId);
      if (!user) {
        return [];
      }

      return [
        {
          ...request,
          user,
          entry: store.entries.find((entry) => entry.id === request.entryId) ?? null,
        },
      ];
    });

  const recentEntries = store.entries
    .toSorted((left, right) => getEntrySortValue(right).localeCompare(getEntrySortValue(left)))
    .slice(0, 36)
    .flatMap((entry) => {
      const user = usersById.get(entry.userId);
      if (!user) {
        return [];
      }

      return [{ ...entry, user }];
    });

  const previousWeekStart = getPreviousCompletedWeekStart(today);
  const lastReportRun =
    store.reportRuns
      .filter((run) => run.weekStart === previousWeekStart)
      .toSorted((left, right) => right.createdAt.localeCompare(left.createdAt))[0] ?? null;

  return {
    weekStart,
    weekEnd,
    totalWeekMinutes: sumMinutes(store.entries.filter((entry) => entry.workDate >= weekStart && entry.workDate <= weekEnd)),
    employeeCount: store.users.length,
    pendingCount: pendingRequests.length,
    openShiftCount: store.entries.filter((entry) => entry.checkOutTime === null).length,
    employeeSummaries,
    pendingRequests,
    recentEntries,
    lastReportRun,
  };
}

export async function getWeeklySummary(weekStart: string): Promise<WeeklySummary> {
  const store = await readAttendanceStore();
  const weekEnd = getWeekEnd(weekStart);

  const employees = store.users
    .map((user) => {
      const entries = store.entries
        .filter((entry) => entry.userId === user.id && entry.workDate >= weekStart && entry.workDate <= weekEnd)
        .toSorted((left, right) => getEntrySortValue(left).localeCompare(getEntrySortValue(right)));

      return {
        user,
        entries,
        totalMinutes: sumMinutes(entries),
        daysWorked: entries.filter((entry) => (entry.minutesWorked ?? 0) > 0).length,
      };
    })
    .filter((summary) => summary.entries.length > 0)
    .toSorted((left, right) => right.totalMinutes - left.totalMinutes || left.user.name.localeCompare(right.user.name));

  return {
    weekStart,
    weekEnd,
    employees,
    totalMinutes: employees.reduce((total, employee) => total + employee.totalMinutes, 0),
    pendingRequestCount: store.editRequests.filter(
      (request) => request.status === "pending" && request.workDate >= weekStart && request.workDate <= weekEnd,
    ).length,
  };
}
