import type { TherapyExercise } from '@/model';
import { getTherapyExerciseTargetUnits } from './get-therapy-exercise-target-units';

/**
 * Formats therapy exercise progress as completed sets (or attempts) vs the daily target.
 */
export const formatTherapyExerciseProgress = (
  exercise: TherapyExercise,
  completedCount: number,
): string => {
  if (exercise.tracking_kind === 'timed_attempts') {
    const targetAttempts = getTherapyExerciseTargetUnits(exercise);
    const remaining = Math.max(targetAttempts - completedCount, 0);
    const remainingLabel = remaining === 0 ? 'done' : `${remaining} left`;
    return `${completedCount} of ${targetAttempts} attempts · ${exercise.unit_size}s each · ${remainingLabel}`;
  }

  const repsPerSet = Math.max(exercise.unit_size, 1);
  const completedSets = Math.min(
    exercise.target_count,
    Math.floor(completedCount / repsPerSet),
  );
  const remainder = completedCount % repsPerSet;
  const setLabel = exercise.target_count === 1 ? 'set' : 'sets';
  const setProgress = `${completedSets} of ${exercise.target_count} ${setLabel}`;

  if (completedCount >= getTherapyExerciseTargetUnits(exercise)) {
    return setProgress;
  }

  if (repsPerSet > 1 && remainder > 0) {
    return `${setProgress} · ${remainder} of ${repsPerSet} this set`;
  }

  return setProgress;
};

/**
 * Returns whether today's target is met for an exercise.
 */
export const isTherapyExerciseComplete = (
  exercise: TherapyExercise,
  completedCount: number,
): boolean => completedCount >= getTherapyExerciseTargetUnits(exercise);
