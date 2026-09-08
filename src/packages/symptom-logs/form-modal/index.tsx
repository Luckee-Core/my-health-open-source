'use client';

import { SymptomLogsBuilderActions } from '@/store/builders';
import { CurrentSymptomLogActions } from '@/store/current';
import { saveSymptomLogThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { DurationMinutesInput } from './inputs/duration-minutes';
import { FocusAreaInput } from './inputs/focus-area';
import { NameInput } from './inputs/name';
import { NotesInput } from './inputs/notes';
import { RecordedAtInput } from './inputs/recorded-at';
import { SeverityInput } from './inputs/severity';
import { TriggersInput } from './inputs/triggers';

export const SymptomLogFormModal = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentSymptomLog);
  const builder = useAppSelector((state) => state.symptomLogsBuilder);
  const isEdit = current.id !== '';
  const isOpen = builder.isCreateOpen || isEdit;
  const isSaving = builder.saveStatus === 'saving';

  if (!isOpen) return null;

  const closeModal = () => {
    dispatch(SymptomLogsBuilderActions.closeModal());
    dispatch(CurrentSymptomLogActions.resetCurrentSymptomLog());
  };

  const handleSubmit = async () => {
    const status = await dispatch(saveSymptomLogThunk());
    if (status === 200) closeModal();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2 className={styles.heading}>{isEdit ? 'Edit symptom log' : 'New symptom log'}</h2>
        <div className={styles.fields}>
          <RecordedAtInput />
          <NameInput />
          <SeverityInput />
          <TriggersInput />
          <DurationMinutesInput />
          <NotesInput />
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
  panel: `w-full max-w-md rounded-lg bg-white p-5 shadow-lg max-h-[90vh] overflow-y-auto`,
  heading: `text-lg font-semibold text-gray-900`,
  fields: `mt-4 space-y-3`,
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
