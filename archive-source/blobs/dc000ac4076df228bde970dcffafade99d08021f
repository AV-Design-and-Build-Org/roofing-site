export type UserRole = "admin" | "employee";

export type UserRecord = {
  id: string;
  googleSub: string;
  email: string;
  name: string;
  picture: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
};

export type TimeEntryRecord = {
  id: string;
  userId: string;
  workDate: string;
  checkInTime: string;
  checkOutTime: string | null;
  minutesWorked: number | null;
  source: "clock" | "admin_edit";
  createdAt: string;
  updatedAt: string;
};

export type EditRequestStatus = "pending" | "approved" | "rejected";

export type EditRequestRecord = {
  id: string;
  userId: string;
  entryId: string | null;
  workDate: string;
  requestedCheckInTime: string;
  requestedCheckOutTime: string;
  requestedMinutes: number;
  reason: string;
  status: EditRequestStatus;
  adminNote: string | null;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  resolvedByUserId: string | null;
};

export type DeliveryStatus = {
  status: "sent" | "skipped" | "failed";
  message: string;
};

export type WeeklyReportRunRecord = {
  id: string;
  weekStart: string;
  weekEnd: string;
  createdAt: string;
  triggeredBy: string;
  email: DeliveryStatus;
  whatsapp: DeliveryStatus;
  summarySnapshot: string;
};

export type AttendanceStore = {
  users: UserRecord[];
  entries: TimeEntryRecord[];
  editRequests: EditRequestRecord[];
  reportRuns: WeeklyReportRunRecord[];
};

export type CalendarDay = {
  dateKey: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  entry: TimeEntryRecord | null;
  pendingRequest: EditRequestRecord | null;
};

export type EmployeeDashboardData = {
  user: UserRecord;
  todayEntry: TimeEntryRecord | null;
  openEntry: TimeEntryRecord | null;
  weekStart: string;
  weekEnd: string;
  weekMinutes: number;
  monthMinutes: number;
  completedDaysThisMonth: number;
  historyDays: Array<{
    dateKey: string;
    entry: TimeEntryRecord | null;
    pendingRequest: EditRequestRecord | null;
  }>;
  calendarDays: CalendarDay[];
  pendingRequests: EditRequestRecord[];
  recentClosedEntries: TimeEntryRecord[];
};

export type AdminEmployeeSummary = {
  user: UserRecord;
  weekMinutes: number;
  monthMinutes: number;
  lastEntry: TimeEntryRecord | null;
  openEntry: TimeEntryRecord | null;
  pendingEditCount: number;
};

export type AdminDashboardData = {
  weekStart: string;
  weekEnd: string;
  totalWeekMinutes: number;
  employeeCount: number;
  pendingCount: number;
  openShiftCount: number;
  employeeSummaries: AdminEmployeeSummary[];
  pendingRequests: Array<EditRequestRecord & { user: UserRecord; entry: TimeEntryRecord | null }>;
  recentEntries: Array<TimeEntryRecord & { user: UserRecord }>;
  lastReportRun: WeeklyReportRunRecord | null;
};

export type WeeklyEmployeeSummary = {
  user: UserRecord;
  entries: TimeEntryRecord[];
  totalMinutes: number;
  daysWorked: number;
};

export type WeeklySummary = {
  weekStart: string;
  weekEnd: string;
  employees: WeeklyEmployeeSummary[];
  totalMinutes: number;
  pendingRequestCount: number;
};
