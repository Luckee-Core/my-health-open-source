'use client';

import type { ClinicalResult } from '@/model';

type Props = {
  row: ClinicalResult;
};

export const ClinicalResultRow = ({ row }: Props) => {
  return (
    <tr className={styles.row}>
      <td className={styles.td}>{row.name}</td>
      <td className={styles.td}>{row.observed_at ? new Date(row.observed_at).toLocaleString() : '—'}</td>
      <td className={styles.td}>{row.value_text ?? '—'}</td>
      <td className={styles.td}>{row.category}</td>
    </tr>
  );
};

const styles = {
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
} as const;
