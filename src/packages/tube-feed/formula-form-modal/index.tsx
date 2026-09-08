'use client';

import { FeedFormulasBuilderActions } from '@/store/builders';
import { CurrentFeedFormulaActions } from '@/store/current';
import { saveFeedFormulaThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { ActiveInput } from './inputs/active';
import { BrandInput } from './inputs/brand';
import { CaloriesInput } from './inputs/calories';
import { ContainerVolumeInput } from './inputs/container-volume';
import { NameInput } from './inputs/name';
import { NotesInput } from './inputs/notes';
import { VolumeFlOzInput } from './inputs/volume-fl-oz';
import { VolumeLInput } from './inputs/volume-l';
import { VolumeQtInput } from './inputs/volume-qt';

export const FeedFormulaFormModal = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentFeedFormula);
  const builder = useAppSelector((state) => state.feedFormulasBuilder);
  const isEdit = current.id !== '';
  const isOpen = builder.isCreateOpen || isEdit;
  const isSaving = builder.saveStatus === 'saving';

  if (!isOpen) return null;

  const closeModal = () => {
    dispatch(FeedFormulasBuilderActions.closeModal());
    dispatch(CurrentFeedFormulaActions.resetCurrentFeedFormula());
  };

  const handleSubmit = async () => {
    const status = await dispatch(saveFeedFormulaThunk());
    if (status === 200) closeModal();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2 className={styles.heading}>{isEdit ? 'Edit formula' : 'New formula'}</h2>
        <div className={styles.fields}>
          <BrandInput />
          <NameInput />
          <CaloriesInput />
          <ContainerVolumeInput />
          <div className={styles.row}>
            <VolumeFlOzInput />
            <VolumeQtInput />
            <VolumeLInput />
          </div>
          <ActiveInput />
          <NotesInput />
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
  row: `grid grid-cols-3 gap-2`,
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
