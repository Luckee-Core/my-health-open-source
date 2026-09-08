'use client';

import type { Referral } from '@/model';

type Props = {
  row: Referral;
};

export const ReferralRow = ({ row }: Props) => {
  return (
    <tr className={styles.row}>
      <td className={styles.td}>{row.specialty ?? '—'}</td>
      <td className={styles.td}>{row.referred_on ?? '—'}</td>
      <td className={styles.td}>{row.status ?? '—'}</td>
      <td className={styles.td}>{row.reason ?? '—'}</td>
    </tr>
  );
};

const styles = {
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
} as const;
