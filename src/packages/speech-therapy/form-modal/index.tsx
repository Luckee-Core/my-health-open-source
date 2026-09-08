'use client';

import { TherapyExercisesBuilderActions } from '@/store/builders';
import { CurrentTherapyExerciseActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import { TherapyExerciseForm } from '../exercise-form';

/**
 * Modal wrapper for creating or editing a therapy exercise.
 */
export const TherapyExerciseFormModal = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentTherapyExercise);
  const builder = useAppSelector((state) => state.therapyExercisesBuilder);
  const isOpen = builder.isCreateOpen || builder.isEditOpen;

  if (!isOpen) return null;

  const closeModal = () => {
    dispatch(TherapyExercisesBuilderActions.closeModal());
    if (builder.isCreateOpen) {
      dispatch(CurrentTherapyExerciseActions.resetCurrentTherapyExercise());
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2 className={styles.heading}>{current.id === '' ? 'New exercise' : 'Edit exercise'}</h2>
        <TherapyExerciseForm onSaved={closeModal} onCancel={closeModal} />
      </div>
    </div>
  );
};

const styles = {
  overlay: `
    fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4
  `,
  panel: `
    w-full max-w-lg rounded-lg bg-white p-6 shadow-lg space-y-4
  `,
  heading: `text-lg font-semibold text-gray-900`,
} as const;
