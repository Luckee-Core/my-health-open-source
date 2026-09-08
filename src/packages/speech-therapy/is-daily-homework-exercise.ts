import type { TherapyExercise } from '@/model';
import { getTherapyExerciseSchedule } from './get-therapy-exercise-schedule';

/**
 * True when the exercise belongs on today's remaining homework list.
 */
export const isDailyHomeworkExercise = (exercise: TherapyExercise): boolean =>
  getTherapyExerciseSchedule(exercise) === 'daily';
