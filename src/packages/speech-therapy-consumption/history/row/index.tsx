'use client';

import { SPEECH_THERAPY_CONSUMPTION_TYPE_LABELS } from '@/model';
import type { ConsumptionHistoryRow } from '../../build-consumption-history-rows';

type Props = {
  row: ConsumptionHistoryRow;
};

export const IceCubeHistoryRow = ({ row }: Props) => {
  return (
    <tr className={styles.row}>
      <td className={styles.td}>{row.log_date}</td>
      <td className={styles.td}>
        {SPEECH_THERAPY_CONSUMPTION_TYPE_LABELS[row.consumption_type]}
      </td>
      <td className={styles.td}>{row.quantity}</td>
    </tr>
  );
};

const styles = {
  row: `border-t border-gray-100`,
  td: `px-4 py-2`,
} as const;
