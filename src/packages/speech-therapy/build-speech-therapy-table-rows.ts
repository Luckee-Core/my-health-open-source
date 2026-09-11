import type { TherapyExercise, TherapyExerciseLog } from '@/model';
import { buildTodayTherapyRows, type TodayTherapyRow } from './build-today-therapy-rows';
import { isTherapyExerciseComplete } from './format-therapy-exercise-progress';
import { getTherapyExerciseSchedule } from './get-therapy-exercise-schedule';
import { normalizeLogDateKey } from './normalize-log-date-key';

export type SpeechTherapyTableRow = TodayTherapyRow & {
  isInactive: boolean;
  isSessionOnly: boolean;
};

/**
 * Builds the speech therapy management table: today's active rows first, then inactive/other.
 */
export const buildSpeechTherapyTableRows = (
  exercisesDump: Record<string, TherapyExercise>,
  logsDump: Record<string, TherapyExerciseLog>,
  todayKey: string,
): SpeechTherapyTableRow[] => {
  const todayRows = buildTodayTherapyRows(exercisesDump, logsDump, todayKey).map((row) => ({
    ...row,
    isInactive: false,
    isSessionOnly: false,
  }));
  const seenIds = new Set(todayRows.map((row) => row.exercise.id));

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

  const extraRows = Object.values(exercisesDump)
    .filter((exercise) => !seenIds.has(exercise.id))
    .sort((a, b) => {
      const byOrder = a.sort_order - b.sort_order;
      if (byOrder !== 0) return byOrder;
      return a.name.localeCompare(b.name);
    })
    .map((exercise) => {
      const log = logsByExerciseId.get(exercise.id);
      const completedCount = log?.completedCount ?? 0;
      const isSkipped = log?.skipped ?? false;
      const schedule = getTherapyExerciseSchedule(exercise);
      const isInactive = schedule === 'paused';
      const isSessionOnly = schedule === 'session';
      return {
        exercise,
        completedCount,
        isComplete:
          !isInactive && !isSkipped && isTherapyExerciseComplete(exercise, completedCount),
        isSkipped,
        isSessionDue: false,
        isInactive,
        isSessionOnly,
      };
    });

  return [...todayRows, ...extraRows];
};
