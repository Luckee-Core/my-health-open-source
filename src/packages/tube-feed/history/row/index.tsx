'use client';

import type { FeedDayRow } from '../../utils';
import { formatFeedCalories, formatFeedVolume, normalizeFeedLogDateKey } from '../../utils';

type Props = {
  row: FeedDayRow;
  busy: boolean;
  onDelete: (id: string, dateKey: string) => void;
};

export const FeedHistoryRow = ({ row, busy, onDelete }: Props) => {
  const dateKey = normalizeFeedLogDateKey(row.log.log_date);

  return (
    <tr className={styles.row}>
      <td className={styles.td}>{dateKey}</td>
      <td className={styles.td}>{row.formulaLabel}</td>
      <td className={styles.td}>{row.log.intermittent_rate_ml_per_hr} mL/hr</td>
      <td className={styles.td}>{formatFeedVolume(row.log.feed_left_ml)}</td>
      <td className={styles.td}>{formatFeedVolume(row.log.total_fed_ml)}</td>
      <td className={styles.td}>
        {row.log.is_start
          ? 'Starting point'
          : row.isBaseline
            ? 'Baseline'
            : formatFeedVolume(row.volumeMl)}
        {row.log.pump_reset ? ' (reset)' : ''}
        {row.isImplicitReset ? ' (reset inferred)' : ''}
      </td>
      <td className={styles.td}>{formatFeedCalories(row.calories)}</td>
      <td className={styles.tdActions}>
        <button
          type="button"
          className={styles.dangerButton}
          onClick={() => onDelete(row.log.id, dateKey)}
          disabled={busy}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const styles = {
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
  tdActions: `px-4 py-2 text-right align-top`,
  dangerButton: `text-sm text-red-600 hover:text-red-800 disabled:opacity-50`,
} as const;
