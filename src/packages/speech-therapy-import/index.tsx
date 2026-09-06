'use client';

import { useAppSelector } from '@/store';
import { DoneStep } from './done-step';
import { PreviewStep } from './preview-step';
import { UploadStep } from './upload-step';

export const SpeechTherapyImportPage = () => {
  const builder = useAppSelector((state) => state.therapyExerciseImportBuilder);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Import from photo</h1>
          <p className={styles.subtitle}>
            Upload homework instructions and review AI-extracted exercises before saving.
          </p>
        </div>
      </div>
      {builder.step === 'upload' && <UploadStep />}
      {(builder.step === 'preview' || builder.step === 'committing') && <PreviewStep />}
      {builder.step === 'done' && <DoneStep />}
    </div>
  );
};

const styles = {
  page: `space-y-4`,
  header: `flex items-center justify-between gap-4`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
} as const;
