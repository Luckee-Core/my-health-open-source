'use client';

import type { ResearchNote } from '@/model';
import { RESEARCH_NOTE_CATEGORY_LABELS } from '@/model';
import { CurrentResearchNoteActions } from '@/store/current';
import { useAppDispatch } from '@/store';

type Props = {
  row: ResearchNote;
  busy: boolean;
  focusAreaName: string;
  onOpen: (note: ResearchNote) => void;
  onDelete: (note: ResearchNote) => void;
};

const truncate = (value: string | null, max = 100): string => {
  if (!value) return '—';
  return value.length > max ? `${value.slice(0, max)}…` : value;
};

export const ResearchNoteRow = ({ row, busy, focusAreaName, onOpen, onDelete }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <tr className={styles.row}>
      <td className={styles.td}>
        <button type="button" className={styles.titleButton} onClick={() => onOpen(row)}>
          {row.title}
        </button>
      </td>
      <td className={styles.td}>
        <span className={styles.badge}>{RESEARCH_NOTE_CATEGORY_LABELS[row.category]}</span>
      </td>
      <td className={styles.tdMuted}>{truncate(row.summary)}</td>
      <td className={styles.tdMuted}>{focusAreaName}</td>
      <td className={styles.tdActions}>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => onOpen(row)}
            disabled={busy}
          >
            Open
          </button>
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => dispatch(CurrentResearchNoteActions.setCurrentResearchNote(row))}
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
  titleButton: `text-left text-sm font-medium text-gray-900 hover:underline`,
  badge: `inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700`,
  actions: `flex justify-end gap-2`,
  linkButton: `text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50`,
  dangerButton: `text-sm text-red-600 hover:text-red-800 disabled:opacity-50`,
} as const;
