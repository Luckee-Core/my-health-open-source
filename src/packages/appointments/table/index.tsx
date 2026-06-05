'use client';

import { useMemo, useState } from 'react';
import type { Appointment, AppointmentStatus } from '@/model/appointment';
import { STATUS_LABELS } from '../format-datetime-local';
import { deleteAppointmentThunk } from '@/store/thunks/appointments/delete-appointment-thunk';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

type Props = {
  onEdit: (appointment: Appointment) => void;
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

export const AppointmentsTable = ({ onEdit }: Props) => {
  const dispatch = useAppDispatch();
  const appointmentsDump = useAppSelector((state) => state.appointments);
  const doctors = useAppSelector((state) => state.doctors);
  const hospitals = useAppSelector((state) => state.hospitals);

  const appointments = useMemo(
    () => Object.values(appointmentsDump),
    [appointmentsDump],
  );
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const sorted = useMemo(() => {
    return [...appointments].sort(
      (a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime(),
    );
  }, [appointments]);

  const handleDelete = async (appointment: Appointment) => {
    if (!window.confirm('Delete this appointment?')) return;

    setActionError(null);
    setBusyId(appointment.id);
    const result = await dispatch(deleteAppointmentThunk(appointment.id));
    setBusyId(null);
    if (result.status !== 200) {
      setActionError(result.message ?? 'Failed to delete');
    }
  };

  return (
    <div className={styles.wrapper}>
      {actionError && <p className={styles.error}>{actionError}</p>}
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Scheduled</th>
            <th className={styles.th}>Doctor</th>
            <th className={styles.th}>Facility</th>
            <th className={styles.th}>Address</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Type</th>
            <th className={styles.th}>Reason</th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => {
            const doctor = doctors[row.doctor_id];
            const hospital = doctor ? hospitals[doctor.hospital_id] : undefined;
            return (
              <tr key={row.id} className={styles.row}>
                <td className={styles.td}>{formatScheduledAt(row.scheduled_at)}</td>
                <td className={styles.td}>{doctor?.name ?? '—'}</td>
                <td className={styles.td}>{hospital?.name ?? '—'}</td>
                <td className={styles.td}>{hospital?.address ?? '—'}</td>
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
                      onClick={() => onEdit(row)}
                      disabled={busyId === row.id}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className={styles.dangerButton}
                      onClick={() => void handleDelete(row)}
                      disabled={busyId === row.id}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={8} className={styles.empty}>
                No appointments yet. Add doctors first, then schedule visits.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  wrapper: `space-y-2`,
  error: `text-sm text-red-600`,
  table: `min-w-full overflow-x-auto rounded-lg border border-gray-200 bg-white text-sm`,
  thead: `bg-gray-50 text-left text-gray-600`,
  th: `px-4 py-2 font-medium`,
  thActions: `px-4 py-2 font-medium text-right`,
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
  tdActions: `px-4 py-2 text-right align-top`,
  actions: `flex justify-end gap-2`,
  linkButton: `text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50`,
  dangerButton: `text-sm text-red-600 hover:text-red-800 disabled:opacity-50`,
  empty: `px-4 py-8 text-center text-gray-500`,
  badgeScheduled: `inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700`,
  badgeCompleted: `inline-flex rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700`,
  badgeCancelled: `inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600`,
} as const;
