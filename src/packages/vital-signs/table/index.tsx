'use client';

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { loadVitalSignsThunk } from '@/store/thunks';
import { VitalSignRow } from './row';

export const VitalSignsTable = () => {
  const dump = useAppSelector((state) => state.vitalSigns);
  const rows = useMemo(() => Object.values(dump), [dump]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(loadVitalSignsThunk());
  }, [dispatch]);

  const sorted = useMemo(
    () => [...rows].sort((a, b) => b.recorded_at.localeCompare(a.recorded_at)),
    [rows],
  );

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>When</th>
            <th className={styles.th}>Metric</th>
            <th className={styles.th}>Value</th>
            <th className={styles.th}>Unit</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <VitalSignRow key={row.id} row={row} />
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={4} className={styles.empty}>
                No vital signs yet.
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
