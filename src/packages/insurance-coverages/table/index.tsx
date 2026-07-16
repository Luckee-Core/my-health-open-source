'use client';

import { useMemo } from 'react';
import { useAppSelector } from '@/store';

export const InsuranceCoveragesTable = () => {
  const dump = useAppSelector((state) => state.insuranceCoverages);
  const rows = useMemo(() => Object.values(dump), [dump]);

  const sorted = useMemo(
    () => [...rows].sort((a, b) => a.payer_name.localeCompare(b.payer_name)),
    [rows],
  );

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Payer</th>
            <th className={styles.th}>Plan</th>
            <th className={styles.th}>Member ID</th>
            <th className={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id} className={styles.row}>
              <td className={styles.td}>{row.payer_name}</td>
              <td className={styles.td}>{row.plan_name ?? '—'}</td>
              <td className={styles.td}>{row.member_id ?? '—'}</td>
              <td className={styles.td}>{row.status ?? '—'}</td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={4} className={styles.empty}>
                No insurance coverages yet.
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
