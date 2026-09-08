'use client';

import type { MedicalHistoryEvent } from '@/model';
import { MEDICAL_HISTORY_CATEGORY_LABELS } from '@/model';
import { CurrentMedicalHistoryEventActions } from '@/store/current';
import { useAppDispatch } from '@/store';

type Props = {
  row: MedicalHistoryEvent;
  busy: boolean;
  doctorName: string;
  onDelete: (event: MedicalHistoryEvent) => void;
};

const truncate = (value: string | null, max = 80): string => {
  if (!value) return '—';
  return value.length > max ? `${value.slice(0, max)}…` : value;
};

export const MedicalHistoryEventRow = ({ row, busy, doctorName, onDelete }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <tr className={styles.row}>
      <td className={styles.td}>{row.event_date}</td>
      <td className={styles.td}>{row.title}</td>
      <td className={styles.td}>
        <span className={styles.badge}>{MEDICAL_HISTORY_CATEGORY_LABELS[row.category]}</span>
      </td>
      <td className={styles.tdMuted}>{truncate(row.description)}</td>
      <td className={styles.tdMuted}>{doctorName}</td>
      <td className={styles.tdActions}>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.linkButton}
            onClick={() =>
              dispatch(CurrentMedicalHistoryEventActions.setCurrentMedicalHistoryEvent(row))
            }
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
  badge: `inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700`,
  actions: `flex justify-end gap-2`,
  linkButton: `text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50`,
  dangerButton: `text-sm text-red-600 hover:text-red-800 disabled:opacity-50`,
} as const;
