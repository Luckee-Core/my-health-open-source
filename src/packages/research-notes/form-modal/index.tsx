'use client';

import { ResearchNotesBuilderActions } from '@/store/builders';
import { CurrentResearchNoteActions } from '@/store/current';
import { saveResearchNoteThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { CategoryInput } from './inputs/category';
import { ContentInput } from './inputs/content';
import { FocusAreaInput } from './inputs/focus-area';
import { SourceUrlInput } from './inputs/source-url';
import { SummaryInput } from './inputs/summary';
import { TitleInput } from './inputs/title';

export const ResearchNoteFormModal = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentResearchNote);
  const builder = useAppSelector((state) => state.researchNotesBuilder);
  const isEdit = current.id !== '';
  const isOpen = builder.isCreateOpen || isEdit;
  const isSaving = builder.saveStatus === 'saving';

  if (!isOpen) return null;

  const closeModal = () => {
    dispatch(ResearchNotesBuilderActions.closeModal());
    dispatch(CurrentResearchNoteActions.resetCurrentResearchNote());
  };

  const handleSubmit = async () => {
    const status = await dispatch(saveResearchNoteThunk());
    if (status === 200) closeModal();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2 className={styles.heading}>{isEdit ? 'Edit research note' : 'New research note'}</h2>
        <div className={styles.fields}>
          <TitleInput />
          <CategoryInput />
          <SourceUrlInput />
          <SummaryInput />
          <ContentInput />
          <FocusAreaInput />
          {builder.saveError && <p className={styles.error}>{builder.saveError}</p>}
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={closeModal} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => void handleSubmit()}
            className={styles.saveButton}
          >
            {isSaving ? 'Saving…' : isEdit ? 'Save' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: `fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4`,
  panel: `w-full max-w-2xl rounded-lg bg-white p-5 shadow-lg max-h-[90vh] overflow-y-auto`,
  heading: `text-lg font-semibold text-gray-900`,
  fields: `mt-4 space-y-3`,
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
