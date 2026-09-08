'use client';

import type { ClinicalNote } from '@/model';

type Props = {
  row: ClinicalNote;
};

export const ClinicalNoteRow = ({ row }: Props) => {
  return (
    <tr className={styles.row}>
      <td className={styles.td}>{new Date(row.note_at).toLocaleString()}</td>
      <td className={styles.td}>{row.title}</td>
      <td className={styles.td}>{row.author_name ?? '—'}</td>
    </tr>
  );
};

const styles = {
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
} as const;
