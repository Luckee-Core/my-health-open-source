'use client';

import { useMemo, useState } from 'react';
import type { Allergy } from '@/model';
import { deleteAllergyThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { AllergyRow } from './row';

export const AllergiesTable = () => {
  const dispatch = useAppDispatch();
  const dump = useAppSelector((state) => state.allergies);
  const rows = useMemo(() => Object.values(dump), [dump]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...rows].sort((a, b) => a.substance.localeCompare(b.substance)),
    [rows],
  );

  const handleDelete = async (allergy: Allergy) => {
    if (!window.confirm(`Delete allergy "${allergy.substance}"?`)) return;

    setActionError(null);
    setBusyId(allergy.id);
    const status = await dispatch(deleteAllergyThunk(allergy.id));
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
            <th className={styles.th}>Substance</th>
            <th className={styles.th}>Reaction</th>
            <th className={styles.th}>Criticality</th>
            <th className={styles.th}>Status</th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <AllergyRow
              key={row.id}
              row={row}
              busy={busyId === row.id}
              onDelete={(allergy) => void handleDelete(allergy)}
            />
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={5} className={styles.empty}>
                No allergies yet.
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
