import type { AppointmentStatus } from '@/model/appointment';

/**
 * Formats an ISO timestamp for datetime-local input value.
 */
export const toDatetimeLocalValue = (iso: string): string => {
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

/**
 * Converts datetime-local input value to ISO string.
 */
export const fromDatetimeLocalValue = (value: string): string => {
  return new Date(value).toISOString();
};

export const STATUS_LABELS: Record<AppointmentStatus, string> = {
  scheduled: 'Scheduled',
  completed: 'Completed',
  cancelled: 'Cancelled',
};
