'use client';

import type { Appointment, AppointmentStatus } from '@/model';
import { STATUS_LABELS } from '../../format-datetime-local';
import { CurrentAppointmentActions } from '@/store/current';
import { useAppDispatch } from '@/store';

type Props = {
  row: Appointment;
  busy: boolean;
  doctorName: string;
  hospitalName: string;
  hospitalAddress: string;
  onDelete: (appointment: Appointment) => void;
};

const formatScheduledAt = (iso: string): string => {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const statusBadgeClass = (status: AppointmentStatus): string => {
  if (status === 'completed') return styles.badgeCompleted;
  if (status === 'cancelled') return styles.badgeCancelled;
  return styles.badgeScheduled;
};

export const AppointmentRow = ({
  row,
  busy,
  doctorName,
  hospitalName,
  hospitalAddress,
  onDelete,
}: Props) => {
  const dispatch = useAppDispatch();

  return (
    <tr className={styles.row}>
      <td className={styles.td}>{formatScheduledAt(row.scheduled_at)}</td>
      <td className={styles.td}>{doctorName}</td>
      <td className={styles.td}>{hospitalName}</td>
      <td className={styles.td}>{hospitalAddress}</td>
      <td className={styles.td}>
        <span className={statusBadgeClass(row.status)}>{STATUS_LABELS[row.status]}</span>
      </td>
      <td className={styles.td}>{row.appointment_type ?? '—'}</td>
      <td className={styles.td}>{row.reason ?? '—'}</td>
      <td className={styles.tdActions}>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => dispatch(CurrentAppointmentActions.setCurrentAppointment(row))}
            disabled={busy}
          >
            Edit
          </button>
          <button
            type="button"
            className={styles.dangerButton}
            onClick={() => onDelete(row)}
            disabled={busy}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

const styles = {
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
  tdActions: `px-4 py-2 text-right align-top`,
  actions: `flex justify-end gap-2`,
  linkButton: `text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50`,
  dangerButton: `text-sm text-red-600 hover:text-red-800 disabled:opacity-50`,
  badgeScheduled: `inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700`,
  badgeCompleted: `inline-flex rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700`,
  badgeCancelled: `inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600`,
} as const;
