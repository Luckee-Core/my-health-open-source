'use client';

import { useMemo, useState } from 'react';
import type { Appointment } from '@/model';
import { deleteAppointmentThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { AppointmentRow } from './row';

export const AppointmentsTable = () => {
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
    const status = await dispatch(deleteAppointmentThunk(appointment.id));
    setBusyId(null);
    if (status !== 200) {
      setActionError('Failed to delete');
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
              <AppointmentRow
                key={row.id}
                row={row}
                busy={busyId === row.id}
                doctorName={doctor?.name ?? '—'}
                hospitalName={hospital?.name ?? '—'}
                hospitalAddress={hospital?.address ?? '—'}
                onDelete={(appointment) => void handleDelete(appointment)}
              />
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
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
