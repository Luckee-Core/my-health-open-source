'use client';

import { useRef, useState } from 'react';
import { TherapyExerciseImportBuilderActions, TherapyExercisesBuilderActions } from '@/store/builders';
import { CurrentTherapyExerciseActions } from '@/store/current';
import { previewTherapyExerciseImportThunk, resetTherapyExerciseImportThunk } from '@/store/thunks';
import { useAppDispatch } from '@/store';
import { TherapyExerciseFormModal } from './form-modal';
import { PhotoImportModal } from './photo-import-modal';
import { TherapyExercisesTable } from './table';

export const SpeechTherapyPage = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');

  const closeImport = () => {
    setIsImportOpen(false);
    setSelectedFileName('');
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    setSelectedFileName(file.name);
    if (file.type !== 'image/png') {
      setIsImportOpen(true);
      void dispatch(resetTherapyExerciseImportThunk());
      dispatch(TherapyExerciseImportBuilderActions.setPreviewStatus('error'));
      dispatch(
        TherapyExerciseImportBuilderActions.setErrorMessage('Choose a PNG image of your homework.'),
      );
      return;
    }
    const localImageUrl = URL.createObjectURL(file);
    setIsImportOpen(true);
    void dispatch(previewTherapyExerciseImportThunk(file, localImageUrl));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Speech therapy</h1>
          <p className={styles.subtitle}>
            Track daily homework. Session-only exercises stay off that list until you mark them active for today.
          </p>
        </div>
        <div className={styles.headerActions}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png"
            className={styles.fileInput}
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              e.target.value = '';
              handleFileChange(file);
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={styles.secondaryButton}
          >
            Import from photo
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch(CurrentTherapyExerciseActions.resetCurrentTherapyExercise());
              dispatch(TherapyExercisesBuilderActions.setIsCreateOpen(true));
            }}
            className={styles.primaryButton}
          >
            Add exercise
          </button>
        </div>
      </div>

      <TherapyExercisesTable />

      <TherapyExerciseFormModal />
      <PhotoImportModal
        isOpen={isImportOpen}
        selectedFileName={selectedFileName}
        onClose={closeImport}
      />
    </div>
  );
};

const styles = {
  page: `space-y-6`,
  header: `flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
  headerActions: `flex flex-wrap gap-2`,
  fileInput: `hidden`,
  primaryButton: `
    rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800
  `,
  secondaryButton: `
    inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2
    text-sm font-medium text-gray-800 hover:bg-gray-50
  `,
} as const;
