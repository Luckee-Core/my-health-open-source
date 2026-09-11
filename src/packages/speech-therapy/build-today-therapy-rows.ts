import type { TherapyExercise, TherapyExerciseLog } from '@/model';
import { isTherapyExerciseComplete } from './format-therapy-exercise-progress';
import { getTherapyExerciseSchedule } from './get-therapy-exercise-schedule';
import { isTodayListExercise } from './is-today-list-exercise';
import { normalizeLogDateKey } from './normalize-log-date-key';

export type TodayTherapyRow = {
  exercise: TherapyExercise;
  completedCount: number;
  isComplete: boolean;
  isSkipped: boolean;
  isSessionDue: boolean;
};

/**
 * Builds today's therapy exercise rows: daily homework plus session items marked due today.
 */
export const buildTodayTherapyRows = (
  exercisesDump: Record<string, TherapyExercise>,
  logsDump: Record<string, TherapyExerciseLog>,
  todayKey: string,
): TodayTherapyRow[] => {
  const logsByExerciseId = new Map<string, { completedCount: number; skipped: boolean; due: boolean }>();
  for (const log of Object.values(logsDump)) {
    if (normalizeLogDateKey(log.log_date) === todayKey) {
      logsByExerciseId.set(log.exercise_id, {
        completedCount: log.completed_count,
        skipped: Boolean(log.skipped),
        due: Boolean(log.due),
      });
    }
  }

  return Object.values(exercisesDump)
    .filter((exercise) => isTodayListExercise(exercise, logsByExerciseId.get(exercise.id)))
    .sort((a, b) => {
      const byOrder = a.sort_order - b.sort_order;
      if (byOrder !== 0) return byOrder;
      return a.name.localeCompare(b.name);
    })
    .map((exercise) => {
      const log = logsByExerciseId.get(exercise.id);
      const completedCount = log?.completedCount ?? 0;
      const isSkipped = log?.skipped ?? false;
      return {
        exercise,
        completedCount,
        isComplete: !isSkipped && isTherapyExerciseComplete(exercise, completedCount),
        isSkipped,
        isSessionDue: getTherapyExerciseSchedule(exercise) === 'session',
      };
    });
};
