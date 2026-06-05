'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { DailyEntry } from '@/model/daily-entry';
import { FOCUS_AREAS_PATH } from '@/config/routes';
import { formatEntryDate } from '../format-entry-date';
import { deleteDailyEntryThunk } from '@/store/thunks/daily-entries/delete-daily-entry-thunk';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

type Props = {
  onEdit: (dailyEntry: DailyEntry) => void;
};

const truncate = (value: string | null, max = 60): string => {
  if (!value) return '—';
  return value.length > max ? `${value.slice(0, max)}…` : value;
};

export const DailyEntriesTable = ({ onEdit }: Props) => {
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
    const result = await dispatch(deleteDailyEntryThunk(entry.id));
    setBusyId(null);
    if (result.status !== 200) {
      setActionError(result.message ?? 'Failed to delete');
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
            <tr key={row.id} className={styles.row}>
              <td className={styles.td}>{formatEntryDate(row.entry_date)}</td>
              <td className={styles.td}>{focusAreasDump[row.focus_area_id]?.name ?? 'Unknown'}</td>
              <td className={styles.tdMuted}>{truncate(row.notes)}</td>
              <td className={styles.tdActions}>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => onEdit(row)}
                    disabled={busyId === row.id}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={styles.dangerButton}
                    onClick={() => void handleDelete(row)}
                    disabled={busyId === row.id}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
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
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
  tdMuted: `px-4 py-2 align-top text-gray-600`,
  tdActions: `px-4 py-2 text-right align-top`,
  actions: `flex justify-end gap-2`,
  linkButton: `text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50`,
  dangerButton: `text-sm text-red-600 hover:text-red-800 disabled:opacity-50`,
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
