'use client';

import { useMemo } from 'react';
import { useAppSelector } from '@/store';
import { ReferralRow } from './row';

export const ReferralsTable = () => {
  const dump = useAppSelector((state) => state.referrals);
  const rows = useMemo(() => Object.values(dump), [dump]);

  const sorted = useMemo(
    () => [...rows].sort((a, b) => (b.referred_on ?? '').localeCompare(a.referred_on ?? '')),
    [rows],
  );

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Specialty</th>
            <th className={styles.th}>Referred on</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Reason</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <ReferralRow key={row.id} row={row} />
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={4} className={styles.empty}>
                No referrals yet.
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
