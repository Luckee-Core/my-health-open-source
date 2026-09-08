'use client';

import type { InsuranceCoverage } from '@/model';

type Props = {
  row: InsuranceCoverage;
};

export const InsuranceCoverageRow = ({ row }: Props) => {
  return (
    <tr className={styles.row}>
      <td className={styles.td}>{row.payer_name}</td>
      <td className={styles.td}>{row.plan_name ?? '—'}</td>
      <td className={styles.td}>{row.member_id ?? '—'}</td>
      <td className={styles.td}>{row.status ?? '—'}</td>
    </tr>
  );
};

const styles = {
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
} as const;
