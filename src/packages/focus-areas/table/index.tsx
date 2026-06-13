'use client';

import { useMemo, useState } from 'react';
import type { FocusArea } from '@/model';
import { deleteFocusAreaThunk } from '@/store/thunks';
import { CurrentFocusAreaActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

const truncate = (value: string | null, max = 80): string => {
  if (!value) return '—';
  return value.length > max ? `${value.slice(0, max)}…` : value;
};

export const FocusAreasTable = () => {
  const dispatch = useAppDispatch();
  const focusAreasDump = useAppSelector((state) => state.focusAreas);
  const dailyEntriesDump = useAppSelector((state) => state.dailyEntries);

  const focusAreas = useMemo(() => Object.values(focusAreasDump), [focusAreasDump]);
  const dailyEntries = useMemo(() => Object.values(dailyEntriesDump), [dailyEntriesDump]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const entryCountByFocusAreaId = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const entry of dailyEntries) {
      counts[entry.focus_area_id] = (counts[entry.focus_area_id] ?? 0) + 1;
    }
    return counts;
  }, [dailyEntries]);

  const sorted = useMemo(
    () => [...focusAreas].sort((a, b) => a.name.localeCompare(b.name)),
    [focusAreas],
  );

  const handleDelete = async (focusArea: FocusArea) => {
    const count = entryCountByFocusAreaId[focusArea.id] ?? 0;
    const warning =
      count > 0
        ? `Delete "${focusArea.name}"? ${count} daily log entr${count === 1 ? 'y uses' : 'ies use'} this area.`
        : `Delete focus area "${focusArea.name}"?`;
    if (!window.confirm(warning)) return;

    setActionError(null);
    setBusyId(focusArea.id);
    const status = await dispatch(deleteFocusAreaThunk(focusArea.id));
    setBusyId(null);
    if (status !== 200) {
      setActionError('Failed to delete');
    }
  };

  return (
    <div className={styles.wrapper}>
      {actionError && <p className={styles.error}>{actionError}</p>}
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Description</th>
            <th className={styles.thRight}>Entries</th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id} className={styles.row}>
              <td className={styles.td}>{row.name}</td>
              <td className={styles.tdMuted}>{truncate(row.description)}</td>
              <td className={styles.tdRight}>{entryCountByFocusAreaId[row.id] ?? 0}</td>
              <td className={styles.tdActions}>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => dispatch(CurrentFocusAreaActions.setCurrentFocusArea(row))}
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
                No focus areas yet. Add what you want to track each day.
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
  table: `min-w-full overflow-x-auto rounded-lg border border-gray-200 bg-white text-sm`,
  thead: `bg-gray-50 text-left text-gray-600`,
  th: `px-4 py-2 font-medium`,
  thRight: `px-4 py-2 font-medium text-right`,
  thActions: `px-4 py-2 font-medium text-right`,
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
  tdMuted: `px-4 py-2 align-top text-gray-600`,
  tdRight: `px-4 py-2 text-right align-top`,
  tdActions: `px-4 py-2 text-right align-top`,
  actions: `flex justify-end gap-2`,
  linkButton: `text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50`,
  dangerButton: `text-sm text-red-600 hover:text-red-800 disabled:opacity-50`,
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
