import type { TherapyExercise, TherapyExerciseLog } from '@/model';
import { getTherapyExerciseSchedule } from './get-therapy-exercise-schedule';

/**
 * True when the exercise belongs on today's remaining homework list.
 */
export const isTodayListExercise = (
  exercise: TherapyExercise,
  todayLog: Pick<TherapyExerciseLog, 'due'> | undefined,
): boolean => {
  const schedule = getTherapyExerciseSchedule(exercise);
  if (schedule === 'daily') return true;
  if (schedule === 'session') return Boolean(todayLog?.due);
  return false;
};
