'use client';

import Link from 'next/link';
import { SPEECH_THERAPY_IMPORT_PATH } from '@/config/routes';
import { TherapyExercisesBuilderActions } from '@/store/builders';
import { CurrentTherapyExerciseActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import { TherapyExerciseFormModal } from './form-modal';
import { TherapyExercisesTable } from './table';
import { TodayTracker } from './today-tracker';

export const SpeechTherapyPage = () => {
  const dispatch = useAppDispatch();
  const builder = useAppSelector((state) => state.therapyExercisesBuilder);
  const currentExercise = useAppSelector((state) => state.currentTherapyExercise);

  const isEditing = currentExercise.id !== '';
  const isOpen = builder.isCreateOpen || isEditing;
  const editingExercise = isEditing ? currentExercise : null;

  const closeModal = () => {
    dispatch(TherapyExercisesBuilderActions.closeModal());
    dispatch(CurrentTherapyExerciseActions.resetCurrentTherapyExercise());
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Speech therapy</h1>
          <p className={styles.subtitle}>
            Track daily homework — timed attempts and sets/reps. Log progress as you go.
          </p>
        </div>
        <div className={styles.headerActions}>
          <Link href={SPEECH_THERAPY_IMPORT_PATH} className={styles.secondaryButton}>
            Import from photo
          </Link>
          <button
            type="button"
            onClick={() => dispatch(TherapyExercisesBuilderActions.setIsCreateOpen(true))}
            className={styles.primaryButton}
          >
            Add exercise
          </button>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Today</h2>
        <TodayTracker variant="full" showTimer />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Program</h2>
        <TherapyExercisesTable />
      </section>

      <TherapyExerciseFormModal
        isOpen={isOpen}
        onClose={closeModal}
        exercise={editingExercise}
      />
    </div>
  );
};

const styles = {
  page: `space-y-8`,
  header: `flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
  headerActions: `flex flex-wrap gap-2`,
  primaryButton: `
    rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800
  `,
  secondaryButton: `
    inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2
    text-sm font-medium text-gray-800 hover:bg-gray-50
  `,
  section: `space-y-3`,
  sectionTitle: `text-lg font-semibold text-gray-900`,
} as const;
