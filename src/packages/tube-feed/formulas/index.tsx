'use client';

import { useMemo, useState } from 'react';
import type { FeedFormula } from '@/model';
import { deleteFeedFormulaThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { FeedFormulaRow } from './row';

export const FeedFormulasTable = () => {
  const dispatch = useAppDispatch();
  const dump = useAppSelector((state) => state.feedFormulas);
  const rows = useMemo(() => Object.values(dump), [dump]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const sorted = useMemo(
    () =>
      [...rows].sort((a, b) => {
        const brand = a.brand.localeCompare(b.brand);
        if (brand !== 0) return brand;
        return a.name.localeCompare(b.name);
      }),
    [rows],
  );

  const handleDelete = async (formula: FeedFormula) => {
    if (!window.confirm(`Delete formula "${formula.brand} ${formula.name}"?`)) return;

    setActionError(null);
    setBusyId(formula.id);
    const status = await dispatch(deleteFeedFormulaThunk(formula.id));
    setBusyId(null);
    if (status !== 200) {
      setActionError('Failed to delete. Formulas with history cannot be removed.');
    }
  };

  return (
    <div className={styles.wrapper}>
      {actionError && <p className={styles.error}>{actionError}</p>}
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Brand</th>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>kcal / 1000 mL</th>
            <th className={styles.th}>Container</th>
            <th className={styles.th}>Label</th>
            <th className={styles.th}>Status</th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <FeedFormulaRow
              key={row.id}
              row={row}
              busy={busyId === row.id}
              onDelete={(formula) => void handleDelete(formula)}
            />
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={7} className={styles.empty}>
                No formulas yet. Add the formula on your can first.
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
