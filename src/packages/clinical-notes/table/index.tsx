'use client';

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { loadClinicalNotesThunk } from '@/store/thunks';
import { ClinicalNoteRow } from './row';

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
            <ClinicalNoteRow key={row.id} row={row} />
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
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
