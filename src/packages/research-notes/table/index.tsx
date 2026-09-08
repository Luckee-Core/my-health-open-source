'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { RESEARCH_NOTE_DETAIL_PAGE_PATH } from '@/config/routes';
import type { ResearchNote } from '@/model';
import { deleteResearchNoteThunk } from '@/store/thunks';
import { CurrentResearchNoteActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import { ResearchNoteRow } from './row';

export const ResearchNotesTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const notesDump = useAppSelector((state) => state.researchNotes);
  const focusAreasDump = useAppSelector((state) => state.focusAreas);

  const notes = useMemo(() => Object.values(notesDump), [notesDump]);
  const focusAreas = useMemo(() => Object.values(focusAreasDump), [focusAreasDump]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const focusAreaNameById = useMemo(() => {
    const map: Record<string, string> = {};
    for (const area of focusAreas) {
      map[area.id] = area.name;
    }
    return map;
  }, [focusAreas]);

  const sorted = useMemo(
    () => [...notes].sort((a, b) => b.created_at.localeCompare(a.created_at)),
    [notes],
  );

  const openDetail = (note: ResearchNote) => {
    dispatch(CurrentResearchNoteActions.setCurrentResearchNote(note));
    router.push(RESEARCH_NOTE_DETAIL_PAGE_PATH);
  };

  const handleDelete = async (note: ResearchNote) => {
    if (!window.confirm(`Delete "${note.title}"?`)) return;

    setActionError(null);
    setBusyId(note.id);
    const status = await dispatch(deleteResearchNoteThunk(note.id));
    setBusyId(null);
    if (status !== 200) {
      setActionError('Failed to delete');
    }
  };

  return (
    <div className={styles.wrapper}>
      {actionError && <p className={styles.error}>{actionError}</p>}
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Title</th>
            <th className={styles.th}>Category</th>
            <th className={styles.th}>Summary</th>
            <th className={styles.th}>Focus area</th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <ResearchNoteRow
              key={row.id}
              row={row}
              busy={busyId === row.id}
              focusAreaName={row.focus_area_id ? focusAreaNameById[row.focus_area_id] ?? '—' : '—'}
              onOpen={openDetail}
              onDelete={(note) => void handleDelete(note)}
            />
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={5} className={styles.empty}>
                No research notes yet. Save imaging interpretation, articles, and doctor prep
                questions.
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
  error: `text-sm text-red-600`,
  table: `min-w-full overflow-x-auto rounded-lg border border-gray-200 bg-white text-sm`,
  thead: `bg-gray-50 text-left text-gray-600`,
  th: `px-4 py-2 font-medium`,
  thActions: `px-4 py-2 font-medium text-right`,
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
