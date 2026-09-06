'use client';

import { useMemo, useState } from 'react';
import type { TherapyExercise } from '@/model';
import { THERAPY_TRACKING_KIND_LABELS } from '@/model';
import { CurrentTherapyExerciseActions } from '@/store/current';
import { deleteTherapyExerciseThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';

export const TherapyExercisesTable = () => {
  const dispatch = useAppDispatch();
  const dump = useAppSelector((state) => state.therapyExercises);
  const rows = useMemo(() => Object.values(dump), [dump]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const sorted = useMemo(
    () =>
      [...rows].sort((a, b) => {
        const byOrder = a.sort_order - b.sort_order;
        if (byOrder !== 0) return byOrder;
        return a.name.localeCompare(b.name);
      }),
    [rows],
  );

  const handleDelete = async (exercise: TherapyExercise) => {
    if (!window.confirm(`Delete exercise "${exercise.name}"?`)) return;
    setActionError(null);
    setBusyId(exercise.id);
    const status = await dispatch(deleteTherapyExerciseThunk(exercise.id));
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
            <th className={styles.th}>Type</th>
            <th className={styles.th}>Target</th>
            <th className={styles.th}>Active</th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id} className={styles.row}>
              <td className={styles.td}>{row.name}</td>
              <td className={styles.td}>{THERAPY_TRACKING_KIND_LABELS[row.tracking_kind]}</td>
              <td className={styles.td}>
                {row.tracking_kind === 'timed_attempts'
                  ? `${row.target_count} × ${row.unit_size}s`
                  : `${row.target_count} × ${row.unit_size} reps`}
              </td>
              <td className={styles.td}>{row.is_active ? 'Yes' : 'No'}</td>
              <td className={styles.tdActions}>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() =>
                      dispatch(CurrentTherapyExerciseActions.setCurrentTherapyExercise(row))
                    }
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
                No exercises yet. Add one manually or import from a photo.
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
  table: `min-w-full divide-y divide-gray-200 text-sm`,
  thead: `bg-gray-50`,
  th: `px-3 py-2 text-left font-medium text-gray-700`,
  thActions: `px-3 py-2 text-right font-medium text-gray-700`,
  row: `hover:bg-gray-50`,
  td: `px-3 py-2 text-gray-900`,
  tdActions: `px-3 py-2 text-right`,
  actions: `inline-flex gap-2`,
  linkButton: `text-gray-700 underline-offset-2 hover:underline disabled:opacity-50`,
  dangerButton: `text-red-700 underline-offset-2 hover:underline disabled:opacity-50`,
  empty: `px-3 py-6 text-center text-gray-500`,
} as const;
