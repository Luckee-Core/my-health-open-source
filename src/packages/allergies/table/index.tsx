'use client';

import { useMemo, useState } from 'react';
import type { Allergy } from '@/model';
import { deleteAllergyThunk } from '@/store/thunks';
import { CurrentAllergyActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

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
            <tr key={row.id} className={styles.row}>
              <td className={styles.td}>{row.substance}</td>
              <td className={styles.td}>{row.reaction ?? '—'}</td>
              <td className={styles.td}>{row.criticality ?? '—'}</td>
              <td className={styles.td}>{row.status}</td>
              <td className={styles.tdActions}>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => dispatch(CurrentAllergyActions.setCurrentAllergy(row))}
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
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
  tdActions: `px-4 py-2 text-right align-top`,
  actions: `flex justify-end gap-2`,
  linkButton: `text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50`,
  dangerButton: `text-sm text-red-600 hover:text-red-800 disabled:opacity-50`,
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
