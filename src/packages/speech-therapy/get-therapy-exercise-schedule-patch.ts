import type { TherapyExerciseFrequency } from '@/model';
import type { TherapyExerciseSchedule } from './get-therapy-exercise-schedule';

export type TherapyExerciseSchedulePatch = {
  is_active: boolean;
  frequency?: TherapyExerciseFrequency;
};

/**
 * PATCH body for a schedule change. Pause keeps the current frequency.
 */
export const getTherapyExerciseSchedulePatch = (
  schedule: TherapyExerciseSchedule,
): TherapyExerciseSchedulePatch => {
  if (schedule === 'paused') {
    return { is_active: false };
  }
  if (schedule === 'session') {
    return { is_active: true, frequency: 'session' };
  }
  return { is_active: true, frequency: 'daily' };
};
