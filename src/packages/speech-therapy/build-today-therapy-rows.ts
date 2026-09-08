import type { TherapyExercise, TherapyExerciseLog } from '@/model';
import { isTherapyExerciseComplete } from './format-therapy-exercise-progress';
import { isDailyHomeworkExercise } from './is-daily-homework-exercise';
import { normalizeLogDateKey } from './normalize-log-date-key';

export type TodayTherapyRow = {
  exercise: TherapyExercise;
  completedCount: number;
  isComplete: boolean;
  isSkipped: boolean;
};

/**
 * Builds today's active therapy exercise rows with progress from logs dump.
 */
export const buildTodayTherapyRows = (
  exercisesDump: Record<string, TherapyExercise>,
  logsDump: Record<string, TherapyExerciseLog>,
  todayKey: string,
): TodayTherapyRow[] => {
  const logsByExerciseId = new Map<string, { completedCount: number; skipped: boolean }>();
  for (const log of Object.values(logsDump)) {
    if (normalizeLogDateKey(log.log_date) === todayKey) {
      logsByExerciseId.set(log.exercise_id, {
        completedCount: log.completed_count,
        skipped: Boolean(log.skipped),
      });
    }
  }

  return Object.values(exercisesDump)
    .filter(isDailyHomeworkExercise)
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
      };
    });
};
