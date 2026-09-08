'use client';

import { useMemo, useState } from 'react';
import type { Condition } from '@/model';
import { deleteConditionThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { ConditionRow } from './row';

export const ConditionsTable = () => {
  const dispatch = useAppDispatch();
  const dump = useAppSelector((state) => state.conditions);
  const rows = useMemo(() => Object.values(dump), [dump]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...rows].sort((a, b) => a.name.localeCompare(b.name)),
    [rows],
  );

  const handleDelete = async (condition: Condition) => {
    if (!window.confirm(`Delete condition "${condition.name}"?`)) return;

    setActionError(null);
    setBusyId(condition.id);
    const status = await dispatch(deleteConditionThunk(condition.id));
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
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Noted</th>
            <th className={styles.th}>Diagnosed</th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <ConditionRow
              key={row.id}
              row={row}
              busy={busyId === row.id}
              onDelete={(condition) => void handleDelete(condition)}
            />
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={5} className={styles.empty}>
                No conditions yet.
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
