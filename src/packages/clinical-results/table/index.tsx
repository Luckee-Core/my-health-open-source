'use client';

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { loadClinicalResultsThunk } from '@/store/thunks';
import { ClinicalResultRow } from './row';

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
            <ClinicalResultRow key={row.id} row={row} />
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
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
