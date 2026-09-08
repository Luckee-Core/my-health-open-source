'use client';

import type { Condition } from '@/model';
import { CurrentConditionActions } from '@/store/current';
import { useAppDispatch } from '@/store';

type Props = {
  row: Condition;
  busy: boolean;
  onDelete: (condition: Condition) => void;
};

export const ConditionRow = ({ row, busy, onDelete }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <tr className={styles.row}>
      <td className={styles.td}>{row.name}</td>
      <td className={styles.td}>{row.status}</td>
      <td className={styles.td}>{row.noted_on ?? '—'}</td>
      <td className={styles.td}>{row.diagnosed_on ?? '—'}</td>
      <td className={styles.tdActions}>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => dispatch(CurrentConditionActions.setCurrentCondition(row))}
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
  tdActions: `px-4 py-2 text-right align-top`,
  actions: `flex justify-end gap-2`,
  linkButton: `text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50`,
  dangerButton: `text-sm text-red-600 hover:text-red-800 disabled:opacity-50`,
} as const;
