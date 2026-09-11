'use client';

import { useMemo, useState } from 'react';
import { deleteFeedLogThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { buildFeedDayRows } from '../utils';
import { FeedHistoryRow } from './row';

export const FeedHistoryTable = () => {
  const dispatch = useAppDispatch();
  const logsDump = useAppSelector((state) => state.feedLogs);
  const formulasDump = useAppSelector((state) => state.feedFormulas);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const rows = useMemo(
    () => buildFeedDayRows(logsDump, formulasDump),
    [logsDump, formulasDump],
  );

  const handleDelete = async (id: string, dateKey: string) => {
    if (!window.confirm(`Delete the snapshot for ${dateKey}?`)) return;
    setActionError(null);
    setBusyId(id);
    const status = await dispatch(deleteFeedLogThunk(id));
    setBusyId(null);
    if (status !== 200) {
      setActionError('Failed to delete snapshot');
    }
  };

  return (
    <div className={styles.wrapper}>
      {actionError && <p className={styles.error}>{actionError}</p>}
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Formula</th>
            <th className={styles.th}>Rate</th>
            <th className={styles.th}>Feed left</th>
            <th className={styles.th}>Total fed</th>
            <th className={styles.th}>Since prior</th>
            <th className={styles.th}>Calories</th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <FeedHistoryRow
              key={row.log.id}
              row={row}
              busy={busyId === row.log.id}
              onDelete={(id, dateKey) => void handleDelete(id, dateKey)}
            />
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={8} className={styles.empty}>
                No snapshots yet. Save this morning’s pump total to start history.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  wrapper: `space-y-2 overflow-x-auto`,
  error: `text-sm text-red-600`,
  table: `min-w-full rounded-lg border border-gray-200 bg-white text-sm`,
  thead: `bg-gray-50 text-left text-gray-600`,
  th: `px-4 py-2 font-medium`,
  thActions: `px-4 py-2 font-medium text-right`,
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
