'use client';

import { ResearchNotesBuilderActions } from '@/store/builders';
import { CurrentResearchNoteActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import { ResearchNoteFormModal } from './form-modal';
import { ResearchNotesTable } from './table';

export const ResearchNotesPage = () => {
  const dispatch = useAppDispatch();
  const builder = useAppSelector((state) => state.researchNotesBuilder);
  const current = useAppSelector((state) => state.currentResearchNote);

  const isEditing = current.id !== '';
  const isOpen = builder.isCreateOpen || isEditing;
  const editingNote = isEditing ? current : null;

  const closeModal = () => {
    dispatch(ResearchNotesBuilderActions.closeModal());
    dispatch(CurrentResearchNoteActions.resetCurrentResearchNote());
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Research notes</h1>
          <p className={styles.subtitle}>
            Save imaging interpretation, articles, doctor prep questions, and pasted reference
            material.
          </p>
        </div>
        <button
          type="button"
          onClick={() => dispatch(ResearchNotesBuilderActions.setIsCreateOpen(true))}
          className={styles.primaryButton}
        >
          Add note
        </button>
      </div>
      <ResearchNotesTable />
      <ResearchNoteFormModal isOpen={isOpen} researchNote={editingNote} onClose={closeModal} />
    </div>
  );
};

const styles = {
  page: `space-y-4`,
  header: `flex items-center justify-between gap-4`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
  primaryButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white shrink-0`,
} as const;
