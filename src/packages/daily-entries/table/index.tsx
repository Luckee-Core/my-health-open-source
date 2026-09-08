'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { DailyEntry } from '@/model';
import { FOCUS_AREAS_PATH } from '@/config/routes';
import { formatEntryDate } from '../format-entry-date';
import { deleteDailyEntryThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { DailyEntryRow } from './row';

export const DailyEntriesTable = () => {
  const dispatch = useAppDispatch();
  const dailyEntriesDump = useAppSelector((state) => state.dailyEntries);
  const focusAreasDump = useAppSelector((state) => state.focusAreas);

  const dailyEntries = useMemo(() => Object.values(dailyEntriesDump), [dailyEntriesDump]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const sorted = useMemo(() => {
    return [...dailyEntries].sort((a, b) => {
      const dateCompare = b.entry_date.localeCompare(a.entry_date);
      if (dateCompare !== 0) return dateCompare;
      const aName = focusAreasDump[a.focus_area_id]?.name ?? '';
      const bName = focusAreasDump[b.focus_area_id]?.name ?? '';
      return aName.localeCompare(bName);
    });
  }, [dailyEntries, focusAreasDump]);

  const handleDelete = async (entry: DailyEntry) => {
    const areaName = focusAreasDump[entry.focus_area_id]?.name ?? 'this area';
    if (!window.confirm(`Delete log for ${formatEntryDate(entry.entry_date)} (${areaName})?`)) {
      return;
    }

    setActionError(null);
    setBusyId(entry.id);
    const status = await dispatch(deleteDailyEntryThunk(entry.id));
    setBusyId(null);
    if (status !== 200) {
      setActionError('Failed to delete');
    }
  };

  const hasFocusAreas = Object.keys(focusAreasDump).length > 0;

  return (
    <div className={styles.wrapper}>
      {actionError && <p className={styles.error}>{actionError}</p>}
      {!hasFocusAreas && (
        <p className={styles.hint}>
          <Link href={FOCUS_AREAS_PATH} className={styles.link}>
            Define focus areas
          </Link>{' '}
          before you start logging.
        </p>
      )}
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Focus area</th>
            <th className={styles.th}>Notes</th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <DailyEntryRow
              key={row.id}
              row={row}
              busy={busyId === row.id}
              focusAreaName={focusAreasDump[row.focus_area_id]?.name ?? 'Unknown'}
              onDelete={(entry) => void handleDelete(entry)}
            />
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={4} className={styles.empty}>
                No daily logs yet.
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
  hint: `text-sm text-gray-600`,
  link: `text-gray-900 underline hover:no-underline`,
  table: `min-w-full overflow-x-auto rounded-lg border border-gray-200 bg-white text-sm`,
  thead: `bg-gray-50 text-left text-gray-600`,
  th: `px-4 py-2 font-medium`,
  thActions: `px-4 py-2 font-medium text-right`,
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
