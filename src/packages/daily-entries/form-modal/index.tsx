'use client';

import { useMemo } from 'react';
import { DailyEntriesBuilderActions } from '@/store/builders';
import { CurrentDailyEntryActions } from '@/store/current';
import { saveDailyEntryThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { EntryDateInput } from './inputs/entry-date';
import { FocusAreaInput } from './inputs/focus-area';
import { NotesInput } from './inputs/notes';

export const DailyEntryFormModal = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentDailyEntry);
  const builder = useAppSelector((state) => state.dailyEntriesBuilder);
  const focusAreasDump = useAppSelector((state) => state.focusAreas);
  const focusAreas = useMemo(() => Object.values(focusAreasDump), [focusAreasDump]);
  const isEdit = current.id !== '';
  const isOpen = builder.isCreateOpen || isEdit;
  const isSaving = builder.saveStatus === 'saving';

  if (!isOpen) return null;

  const closeModal = () => {
    dispatch(DailyEntriesBuilderActions.closeModal());
    dispatch(CurrentDailyEntryActions.resetCurrentDailyEntry());
  };

  const handleSubmit = async () => {
    const status = await dispatch(saveDailyEntryThunk());
    if (status === 200) closeModal();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2 className={styles.heading}>{isEdit ? 'Edit daily log' : 'New daily log'}</h2>
        {focusAreas.length === 0 ? (
          <p className={styles.hint}>
            Define at least one focus area before logging. Go to Focus areas in the sidebar.
          </p>
        ) : (
          <div className={styles.fields}>
            <EntryDateInput />
            <FocusAreaInput />
            <NotesInput />
            {builder.saveError && <p className={styles.error}>{builder.saveError}</p>}
          </div>
        )}
        <div className={styles.actions}>
          <button type="button" onClick={closeModal} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            type="button"
            disabled={isSaving || focusAreas.length === 0}
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
  hint: `mt-4 text-sm text-gray-600`,
  fields: `mt-4 space-y-3`,
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
