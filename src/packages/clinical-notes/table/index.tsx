'use client';

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { loadClinicalNotesThunk } from '@/store/thunks';

export const ClinicalNotesTable = () => {
  const dump = useAppSelector((state) => state.clinicalNotes);
  const rows = useMemo(() => Object.values(dump), [dump]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(loadClinicalNotesThunk());
  }, [dispatch]);

  const sorted = useMemo(
    () => [...rows].sort((a, b) => b.note_at.localeCompare(a.note_at)),
    [rows],
  );

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>When</th>
            <th className={styles.th}>Title</th>
            <th className={styles.th}>Author</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id} className={styles.row}>
              <td className={styles.td}>{new Date(row.note_at).toLocaleString()}</td>
              <td className={styles.td}>{row.title}</td>
              <td className={styles.td}>{row.author_name ?? '—'}</td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={3} className={styles.empty}>
                No clinical notes yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  wrapper: `space-y-2`,
  table: `min-w-full overflow-x-auto rounded-lg border border-gray-200 bg-white text-sm`,
  thead: `bg-gray-50 text-left text-gray-600`,
  th: `px-4 py-2 font-medium`,
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
  empty: `px-4 py-8 text-center text-gray-500`,
  muted: `text-gray-500`,
} as const;
