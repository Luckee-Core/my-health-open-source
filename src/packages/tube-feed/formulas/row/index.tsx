'use client';

import type { FeedFormula } from '@/model';
import { CurrentFeedFormulaActions } from '@/store/current';
import { useAppDispatch } from '@/store';

type Props = {
  row: FeedFormula;
  busy: boolean;
  onDelete: (formula: FeedFormula) => void;
};

export const FeedFormulaRow = ({ row, busy, onDelete }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <tr className={styles.row}>
      <td className={styles.td}>{row.brand}</td>
      <td className={styles.td}>{row.name}</td>
      <td className={styles.td}>{row.calories_per_1000_ml}</td>
      <td className={styles.td}>{row.container_volume_ml} mL</td>
      <td className={styles.td}>
        {[
          row.volume_fl_oz != null ? `${row.volume_fl_oz} fl oz` : null,
          row.volume_qt != null ? `${row.volume_qt} qt` : null,
          row.volume_l != null ? `${row.volume_l} L` : null,
        ]
          .filter(Boolean)
          .join(' · ') || '—'}
      </td>
      <td className={styles.td}>{row.is_active ? 'Active' : 'Inactive'}</td>
      <td className={styles.tdActions}>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => dispatch(CurrentFeedFormulaActions.setCurrentFeedFormula(row))}
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
