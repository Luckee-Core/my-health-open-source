'use client';

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { loadHealthImportsThunk } from '@/store/thunks';
import { HealthImportRow } from './row';

export const HealthImportsTable = () => {
  const dump = useAppSelector((state) => state.healthImports);
  const rows = useMemo(() => Object.values(dump), [dump]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(loadHealthImportsThunk());
  }, [dispatch]);

  const sorted = useMemo(
    () => [...rows].sort((a, b) => b.created_at.localeCompare(a.created_at)),
    [rows],
  );

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Filename</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Documents</th>
            <th className={styles.th}>Created</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <HealthImportRow key={row.id} row={row} />
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={4} className={styles.empty}>
                No health imports yet.
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
