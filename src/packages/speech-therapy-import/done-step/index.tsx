'use client';

import Link from 'next/link';
import { SPEECH_THERAPY_PATH } from '@/config/routes';
import { useAppSelector } from '@/store';

export const DoneStep = () => {
  const builder = useAppSelector((state) => state.therapyExerciseImportBuilder);

  return (
    <div className={styles.panel}>
      <h2 className={styles.heading}>Exercises saved</h2>
      <p className={styles.body}>
        {builder.exercises.length} exercise{builder.exercises.length === 1 ? '' : 's'} added to
        your speech therapy program.
      </p>
      <Link href={SPEECH_THERAPY_PATH} className={styles.primaryButton}>
        Back to speech therapy
      </Link>
    </div>
  );
};

const styles = {
  panel: `rounded-lg border border-gray-200 bg-white p-6 space-y-3`,
  heading: `text-lg font-semibold text-gray-900`,
  body: `text-sm text-gray-600`,
  primaryButton: `
    inline-flex rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white
    hover:bg-gray-800
  `,
} as const;
