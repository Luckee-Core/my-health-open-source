'use client';

import type { VitalSign } from '@/model';

type Props = {
  row: VitalSign;
};

export const VitalSignRow = ({ row }: Props) => {
  return (
    <tr className={styles.row}>
      <td className={styles.td}>{new Date(row.recorded_at).toLocaleString()}</td>
      <td className={styles.td}>{row.metric}</td>
      <td className={styles.td}>{row.value_text}</td>
      <td className={styles.td}>{row.unit ?? '—'}</td>
    </tr>
  );
};

const styles = {
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
} as const;
