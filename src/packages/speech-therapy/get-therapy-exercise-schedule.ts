import type { TherapyExercise } from '@/model';

export type TherapyExerciseSchedule = 'daily' | 'session' | 'paused';

export const THERAPY_EXERCISE_SCHEDULE_LABELS: Record<TherapyExerciseSchedule, string> = {
  daily: 'Daily homework',
  session: 'Therapy session only',
  paused: 'Paused',
};

/**
 * Maps stored frequency + is_active onto the detail-page schedule control.
 */
export const getTherapyExerciseSchedule = (exercise: TherapyExercise): TherapyExerciseSchedule => {
  if (!exercise.is_active) return 'paused';
  if (exercise.frequency === 'session') return 'session';
  return 'daily';
};
