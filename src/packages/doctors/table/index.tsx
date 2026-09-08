'use client';

import { useMemo, useState } from 'react';
import type { Doctor } from '@/model';
import { deleteDoctorThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { DoctorRow } from './row';

export const DoctorsTable = () => {
  const dispatch = useAppDispatch();
  const doctorsDump = useAppSelector((state) => state.doctors);
  const hospitals = useAppSelector((state) => state.hospitals);
  const specialties = useAppSelector((state) => state.specialties);
  const appointmentsDump = useAppSelector((state) => state.appointments);

  const doctors = useMemo(() => Object.values(doctorsDump), [doctorsDump]);
  const appointments = useMemo(() => Object.values(appointmentsDump), [appointmentsDump]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const appointmentCountByDoctorId = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const appt of appointments) {
      counts[appt.doctor_id] = (counts[appt.doctor_id] ?? 0) + 1;
    }
    return counts;
  }, [appointments]);

  const sorted = useMemo(
    () => [...doctors].sort((a, b) => a.name.localeCompare(b.name)),
    [doctors],
  );

  const handleDelete = async (doctor: Doctor) => {
    const count = appointmentCountByDoctorId[doctor.id] ?? 0;
    const warning =
      count > 0
        ? `Delete "${doctor.name}"? ${count} appointment${count === 1 ? '' : 's'} will be blocked.`
        : `Delete doctor "${doctor.name}"?`;
    if (!window.confirm(warning)) return;

    setActionError(null);
    setBusyId(doctor.id);
    const status = await dispatch(deleteDoctorThunk(doctor.id));
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
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Facility</th>
            <th className={styles.th}>Specialty</th>
            <th className={styles.thRight}>Appointments</th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <DoctorRow
              key={row.id}
              row={row}
              busy={busyId === row.id}
              hospitalName={hospitals[row.hospital_id]?.name ?? '—'}
              specialtyName={specialties[row.specialty_id]?.name ?? '—'}
              appointmentCount={appointmentCountByDoctorId[row.id] ?? 0}
              onDelete={(doctor) => void handleDelete(doctor)}
            />
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={5} className={styles.empty}>
                No doctors yet. Add facilities and specialties first.
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
  thRight: `px-4 py-2 font-medium text-right`,
  thActions: `px-4 py-2 font-medium text-right`,
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
