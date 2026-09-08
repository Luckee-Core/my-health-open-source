'use client';

import { FocusAreasBuilderActions } from '@/store/builders';
import { CurrentFocusAreaActions } from '@/store/current';
import { saveFocusAreaThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { DescriptionInput } from './inputs/description';
import { NameInput } from './inputs/name';

export const FocusAreaFormModal = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentFocusArea);
  const builder = useAppSelector((state) => state.focusAreasBuilder);
  const isEdit = current.id !== '';
  const isOpen = builder.isCreateOpen || isEdit;
  const isSaving = builder.saveStatus === 'saving';

  if (!isOpen) return null;

  const closeModal = () => {
    dispatch(FocusAreasBuilderActions.closeModal());
    dispatch(CurrentFocusAreaActions.resetCurrentFocusArea());
  };

  const handleSubmit = async () => {
    const status = await dispatch(saveFocusAreaThunk());
    if (status === 200) closeModal();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2 className={styles.heading}>{isEdit ? 'Edit focus area' : 'New focus area'}</h2>
        <div className={styles.fields}>
          <NameInput />
          <DescriptionInput />
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
  panel: `w-full max-w-md rounded-lg bg-white p-5 shadow-lg`,
  heading: `text-lg font-semibold text-gray-900`,
  fields: `mt-4 space-y-3`,
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
