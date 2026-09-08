'use client';

import { useMemo } from 'react';
import { useAppSelector } from '@/store';
import { buildConsumptionHistoryRows } from '../build-consumption-history-rows';
import { IceCubeHistoryRow } from './row';

/**
 * Newest-first consumption history by date, type, and amount.
 */
export const IceCubeHistoryTable = () => {
  const dump = useAppSelector((state) => state.speechTherapyConsumption);
  const rows = useMemo(() => buildConsumptionHistoryRows(dump), [dump]);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Type</th>
            <th className={styles.th}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <IceCubeHistoryRow key={row.id} row={row} />
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={3} className={styles.empty}>
                No consumption logged yet. Use +1 to start today.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  wrapper: `overflow-x-auto`,
  table: `min-w-full rounded-lg border border-gray-200 bg-white text-sm`,
  thead: `bg-gray-50 text-left text-gray-600`,
  th: `px-4 py-2 font-medium`,
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
