'use client';

import { useMemo, useState } from 'react';
import type { Specialty } from '@/model';
import { deleteSpecialtyThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { SpecialtyRow } from './row';

export const SpecialtiesTable = () => {
  const dispatch = useAppDispatch();
  const specialtiesDump = useAppSelector((state) => state.specialties);
  const doctorsDump = useAppSelector((state) => state.doctors);

  const specialties = useMemo(() => Object.values(specialtiesDump), [specialtiesDump]);
  const doctors = useMemo(() => Object.values(doctorsDump), [doctorsDump]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const doctorCountBySpecialtyId = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const doctor of doctors) {
      counts[doctor.specialty_id] = (counts[doctor.specialty_id] ?? 0) + 1;
    }
    return counts;
  }, [doctors]);

  const sorted = useMemo(
    () => [...specialties].sort((a, b) => a.name.localeCompare(b.name)),
    [specialties],
  );

  const handleDelete = async (specialty: Specialty) => {
    const count = doctorCountBySpecialtyId[specialty.id] ?? 0;
    const warning =
      count > 0
        ? `Delete "${specialty.name}"? ${count} doctor${count === 1 ? '' : 's'} use this specialty.`
        : `Delete specialty "${specialty.name}"?`;
    if (!window.confirm(warning)) return;

    setActionError(null);
    setBusyId(specialty.id);
    const status = await dispatch(deleteSpecialtyThunk(specialty.id));
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
            <th className={styles.thRight}>Doctors</th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <SpecialtyRow
              key={row.id}
              row={row}
              busy={busyId === row.id}
              doctorCount={doctorCountBySpecialtyId[row.id] ?? 0}
              onDelete={(specialty) => void handleDelete(specialty)}
            />
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={3} className={styles.empty}>
                No specialties yet.
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
