'use client';

import { useMemo, useState } from 'react';
import type { Hospital } from '@/model';
import { deleteHospitalThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { HospitalRow } from './row';

export const HospitalsTable = () => {
  const dispatch = useAppDispatch();
  const hospitalsDump = useAppSelector((state) => state.hospitals);
  const doctorsDump = useAppSelector((state) => state.doctors);

  const hospitals = useMemo(() => Object.values(hospitalsDump), [hospitalsDump]);
  const doctors = useMemo(() => Object.values(doctorsDump), [doctorsDump]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const doctorCountByHospitalId = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const doctor of doctors) {
      counts[doctor.hospital_id] = (counts[doctor.hospital_id] ?? 0) + 1;
    }
    return counts;
  }, [doctors]);

  const sorted = useMemo(
    () => [...hospitals].sort((a, b) => a.name.localeCompare(b.name)),
    [hospitals],
  );

  const handleDelete = async (hospital: Hospital) => {
    const count = doctorCountByHospitalId[hospital.id] ?? 0;
    const warning =
      count > 0
        ? `Delete "${hospital.name}"? ${count} doctor${count === 1 ? '' : 's'} are linked to this facility.`
        : `Delete facility "${hospital.name}"?`;
    if (!window.confirm(warning)) return;

    setActionError(null);
    setBusyId(hospital.id);
    const status = await dispatch(deleteHospitalThunk(hospital.id));
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
            <th className={styles.th}>Address</th>
            <th className={styles.th}>Phone</th>
            <th className={styles.th}>Email</th>
            <th className={styles.thRight}>Doctors</th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <HospitalRow
              key={row.id}
              row={row}
              busy={busyId === row.id}
              doctorCount={doctorCountByHospitalId[row.id] ?? 0}
              onDelete={(hospital) => void handleDelete(hospital)}
            />
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={6} className={styles.empty}>
                No facilities yet. Add one to link doctors.
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
