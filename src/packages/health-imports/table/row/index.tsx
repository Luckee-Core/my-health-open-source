'use client';

import type { HealthImport } from '@/model';

type Props = {
  row: HealthImport;
};

export const HealthImportRow = ({ row }: Props) => {
  return (
    <tr className={styles.row}>
      <td className={styles.td}>{row.filename}</td>
      <td className={styles.td}>{row.status}</td>
      <td className={styles.td}>{String(row.document_count)}</td>
      <td className={styles.td}>{new Date(row.created_at).toLocaleString()}</td>
    </tr>
  );
};

const styles = {
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
} as const;
