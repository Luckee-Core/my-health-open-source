import type { TherapyExercise } from '@/model';

/**
 * Formats therapy exercise progress label (e.g. "3/10 attempts · 5s each").
 */
export const formatTherapyExerciseProgress = (
  exercise: TherapyExercise,
  completedCount: number,
): string => {
  if (exercise.tracking_kind === 'timed_attempts') {
    return `${completedCount}/${exercise.target_count} attempts · ${exercise.unit_size}s each`;
  }
  return `${completedCount}/${exercise.target_count} sets · ${exercise.unit_size} reps`;
};

/**
 * Returns whether today's target is met for an exercise.
 */
export const isTherapyExerciseComplete = (
  exercise: TherapyExercise,
  completedCount: number,
): boolean => completedCount >= exercise.target_count;
