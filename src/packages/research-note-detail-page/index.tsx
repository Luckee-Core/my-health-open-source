'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { RESEARCH_NOTES_PATH } from '@/config/routes';
import { RESEARCH_NOTE_CATEGORY_LABELS } from '@/model';
import { ResearchNotesBuilderActions } from '@/store/builders';
import { CurrentResearchNoteActions } from '@/store/current';
import { deleteResearchNoteThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';

export const ResearchNoteDetailPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const current = useAppSelector((state) => state.currentResearchNote);
  const focusAreasDump = useAppSelector((state) => state.focusAreas);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const focusAreaName = useMemo(() => {
    if (!current.focus_area_id) return null;
    return focusAreasDump[current.focus_area_id]?.name ?? null;
  }, [current.focus_area_id, focusAreasDump]);

  if (current.id === '') {
    return (
      <div className={styles.page}>
        <p className={styles.muted}>No research note selected.</p>
        <Link href={RESEARCH_NOTES_PATH} className={styles.backLink}>
          Back to research notes
        </Link>
      </div>
    );
  }

  const handleEdit = () => {
    dispatch(ResearchNotesBuilderActions.setIsCreateOpen(false));
    router.push(RESEARCH_NOTES_PATH);
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${current.title}"?`)) return;

    setActionError(null);
    setIsDeleting(true);
    const status = await dispatch(deleteResearchNoteThunk(current.id));
    setIsDeleting(false);

    if (status !== 200) {
      setActionError('Failed to delete');
      return;
    }

    dispatch(CurrentResearchNoteActions.resetCurrentResearchNote());
    router.push(RESEARCH_NOTES_PATH);
  };

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link href={RESEARCH_NOTES_PATH} className={styles.backLink}>
          ← Research notes
        </Link>
        <div className={styles.topActions}>
          <button type="button" onClick={handleEdit} className={styles.secondaryButton}>
            Edit
          </button>
          <button
            type="button"
            onClick={() => void handleDelete()}
            disabled={isDeleting}
            className={styles.dangerButton}
          >
            {isDeleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>

      {actionError && <p className={styles.error}>{actionError}</p>}

      <header className={styles.header}>
        <h1 className={styles.title}>{current.title}</h1>
        <div className={styles.meta}>
          <span className={styles.badge}>{RESEARCH_NOTE_CATEGORY_LABELS[current.category]}</span>
          {focusAreaName && <span className={styles.metaItem}>Focus: {focusAreaName}</span>}
          {current.source_url && (
            <a
              href={current.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceLink}
            >
              Source
            </a>
          )}
        </div>
        {current.summary && <p className={styles.summary}>{current.summary}</p>}
      </header>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Content</h2>
        {current.content ? (
          <pre className={styles.content}>{current.content}</pre>
        ) : (
          <p className={styles.muted}>No content yet.</p>
        )}
      </section>
    </div>
  );
};

const styles = {
  page: `space-y-6`,
  topBar: `flex items-center justify-between gap-4`,
  topActions: `flex gap-2`,
  backLink: `text-sm text-gray-600 hover:text-gray-900`,
  secondaryButton: `rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-800`,
  dangerButton: `rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-700 disabled:opacity-50`,
  error: `text-sm text-red-600`,
  header: `space-y-2`,
  title: `text-2xl font-semibold text-gray-900`,
  meta: `flex flex-wrap items-center gap-3 text-sm text-gray-600`,
  badge: `inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700`,
  metaItem: `text-gray-600`,
  sourceLink: `text-sm text-blue-700 hover:underline`,
  summary: `text-sm text-gray-700 max-w-3xl`,
  contentSection: `space-y-2`,
  sectionTitle: `text-sm font-medium text-gray-700`,
  content: `whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-900 font-mono max-h-[70vh] overflow-y-auto`,
  muted: `text-sm text-gray-500`,
} as const;
