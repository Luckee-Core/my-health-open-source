'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { RESEARCH_NOTE_DETAIL_PAGE_PATH } from '@/config/routes';
import type { ResearchNote } from '@/model';
import { RESEARCH_NOTE_CATEGORY_LABELS } from '@/model';
import { deleteResearchNoteThunk } from '@/store/thunks';
import { CurrentResearchNoteActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

const truncate = (value: string | null, max = 100): string => {
  if (!value) return '—';
  return value.length > max ? `${value.slice(0, max)}…` : value;
};

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
            <tr key={row.id} className={styles.row}>
              <td className={styles.td}>
                <button
                  type="button"
                  className={styles.titleButton}
                  onClick={() => openDetail(row)}
                >
                  {row.title}
                </button>
              </td>
              <td className={styles.td}>
                <span className={styles.badge}>{RESEARCH_NOTE_CATEGORY_LABELS[row.category]}</span>
              </td>
              <td className={styles.tdMuted}>{truncate(row.summary)}</td>
              <td className={styles.tdMuted}>
                {row.focus_area_id ? focusAreaNameById[row.focus_area_id] ?? '—' : '—'}
              </td>
              <td className={styles.tdActions}>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => openDetail(row)}
                    disabled={busyId === row.id}
                  >
                    Open
                  </button>
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => dispatch(CurrentResearchNoteActions.setCurrentResearchNote(row))}
                    disabled={busyId === row.id}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={styles.dangerButton}
                    onClick={() => void handleDelete(row)}
                    disabled={busyId === row.id}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
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
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
  tdMuted: `px-4 py-2 align-top text-gray-600`,
  tdActions: `px-4 py-2 text-right align-top`,
  titleButton: `text-left text-sm font-medium text-gray-900 hover:underline`,
  badge: `inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700`,
  actions: `flex justify-end gap-2`,
  linkButton: `text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50`,
  dangerButton: `text-sm text-red-600 hover:text-red-800 disabled:opacity-50`,
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
