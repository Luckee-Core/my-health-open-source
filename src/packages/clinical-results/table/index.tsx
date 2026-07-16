'use client';

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { loadClinicalResultsThunk } from '@/store/thunks';

export const ClinicalResultsTable = () => {
  const dump = useAppSelector((state) => state.clinicalResults);
  const rows = useMemo(() => Object.values(dump), [dump]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(loadClinicalResultsThunk());
  }, [dispatch]);

  const sorted = useMemo(
    () => [...rows].sort((a, b) => (b.observed_at ?? '').localeCompare(a.observed_at ?? '')),
    [rows],
  );

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Observed</th>
            <th className={styles.th}>Value</th>
            <th className={styles.th}>Category</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id} className={styles.row}>
              <td className={styles.td}>{row.name}</td>
              <td className={styles.td}>{row.observed_at ? new Date(row.observed_at).toLocaleString() : '—'}</td>
              <td className={styles.td}>{row.value_text ?? '—'}</td>
              <td className={styles.td}>{row.category}</td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={4} className={styles.empty}>
                No clinical results yet.
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
  table: `min-w-full overflow-x-auto rounded-lg border border-gray-200 bg-white text-sm`,
  thead: `bg-gray-50 text-left text-gray-600`,
  th: `px-4 py-2 font-medium`,
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
  empty: `px-4 py-8 text-center text-gray-500`,
  muted: `text-gray-500`,
} as const;
