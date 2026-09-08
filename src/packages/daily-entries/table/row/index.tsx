'use client';

import type { DailyEntry } from '@/model';
import { formatEntryDate } from '../../format-entry-date';
import { CurrentDailyEntryActions } from '@/store/current';
import { useAppDispatch } from '@/store';

type Props = {
  row: DailyEntry;
  busy: boolean;
  focusAreaName: string;
  onDelete: (entry: DailyEntry) => void;
};

const truncate = (value: string | null, max = 60): string => {
  if (!value) return '—';
  return value.length > max ? `${value.slice(0, max)}…` : value;
};

export const DailyEntryRow = ({ row, busy, focusAreaName, onDelete }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <tr className={styles.row}>
      <td className={styles.td}>{formatEntryDate(row.entry_date)}</td>
      <td className={styles.td}>{focusAreaName}</td>
      <td className={styles.tdMuted}>{truncate(row.notes)}</td>
      <td className={styles.tdActions}>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => dispatch(CurrentDailyEntryActions.setCurrentDailyEntry(row))}
            disabled={busy}
          >
            Edit
          </button>
          <button
            type="button"
            className={styles.dangerButton}
            onClick={() => onDelete(row)}
            disabled={busy}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

const styles = {
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
  tdMuted: `px-4 py-2 align-top text-gray-600`,
  tdActions: `px-4 py-2 text-right align-top`,
  actions: `flex justify-end gap-2`,
  linkButton: `text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50`,
  dangerButton: `text-sm text-red-600 hover:text-red-800 disabled:opacity-50`,
} as const;
