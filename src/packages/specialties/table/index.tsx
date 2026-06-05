'use client';

import { useMemo, useState } from 'react';
import type { Specialty } from '@/model/specialty';
import { deleteSpecialtyThunk } from '@/store/thunks/specialties/delete-specialty-thunk';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

type Props = {
  onEdit: (specialty: Specialty) => void;
};

export const SpecialtiesTable = ({ onEdit }: Props) => {
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
    const result = await dispatch(deleteSpecialtyThunk(specialty.id));
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
            <th className={styles.th}>Name</th>
            <th className={styles.thRight}>Doctors</th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id} className={styles.row}>
              <td className={styles.td}>{row.name}</td>
              <td className={styles.tdRight}>{doctorCountBySpecialtyId[row.id] ?? 0}</td>
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
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
  tdRight: `px-4 py-2 text-right align-top`,
  tdActions: `px-4 py-2 text-right align-top`,
  actions: `flex justify-end gap-2`,
  linkButton: `text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50`,
  dangerButton: `text-sm text-red-600 hover:text-red-800 disabled:opacity-50`,
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
