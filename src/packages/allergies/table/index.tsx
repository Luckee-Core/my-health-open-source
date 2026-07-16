'use client';

import { useMemo } from 'react';
import { useAppSelector } from '@/store';

export const AllergiesTable = () => {
  const dump = useAppSelector((state) => state.allergies);
  const rows = useMemo(() => Object.values(dump), [dump]);

  const sorted = useMemo(
    () => [...rows].sort((a, b) => a.substance.localeCompare(b.substance)),
    [rows],
  );

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Substance</th>
            <th className={styles.th}>Reaction</th>
            <th className={styles.th}>Criticality</th>
            <th className={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id} className={styles.row}>
              <td className={styles.td}>{row.substance}</td>
              <td className={styles.td}>{row.reaction ?? '—'}</td>
              <td className={styles.td}>{row.criticality ?? '—'}</td>
              <td className={styles.td}>{row.status}</td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={4} className={styles.empty}>
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
  table: `min-w-full overflow-x-auto rounded-lg border border-gray-200 bg-white text-sm`,
  thead: `bg-gray-50 text-left text-gray-600`,
  th: `px-4 py-2 font-medium`,
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
  empty: `px-4 py-8 text-center text-gray-500`,
  muted: `text-gray-500`,
} as const;
