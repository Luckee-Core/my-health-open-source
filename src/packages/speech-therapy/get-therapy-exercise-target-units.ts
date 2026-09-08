import type { TherapyExercise } from '@/model';

/**
 * Returns today's goal in log units: reps for sets/reps, attempts for timed holds.
 */
export const getTherapyExerciseTargetUnits = (exercise: TherapyExercise): number => {
  if (exercise.tracking_kind === 'sets_reps') {
    return exercise.target_count * exercise.unit_size;
  }
  return exercise.target_count;
};
