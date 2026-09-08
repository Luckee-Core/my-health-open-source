import type { TherapyExercise, TherapyExerciseLog } from '@/model';
import { isTherapyExerciseComplete } from '@/packages/speech-therapy/format-therapy-exercise-progress';
import { normalizeLogDateKey } from '@/packages/speech-therapy/normalize-log-date-key';
import { getMonthCalendarCells } from '@/utils/date';

export type ExerciseCalendarDay = {
  dateKey: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  completedCount: number;
  skipped: boolean;
  isComplete: boolean;
  hasLog: boolean;
};

/**
 * Joins a month grid with logs for one therapy exercise.
 */
export const buildExerciseCalendarDays = (
  year: number,
  monthIndex: number,
  todayKey: string,
  exercise: TherapyExercise,
  logsDump: Record<string, TherapyExerciseLog>,
): ExerciseCalendarDay[] => {
  const logByDate = new Map<string, TherapyExerciseLog>();
  for (const log of Object.values(logsDump)) {
    if (log.exercise_id !== exercise.id) continue;
    logByDate.set(normalizeLogDateKey(log.log_date), log);
  }

  return getMonthCalendarCells(year, monthIndex).map((cell) => {
    const log = logByDate.get(cell.dateKey);
    const completedCount = log?.completed_count ?? 0;
    const skipped = Boolean(log?.skipped);
    return {
      dateKey: cell.dateKey,
      dayOfMonth: cell.dayOfMonth,
      isCurrentMonth: cell.isCurrentMonth,
      isToday: cell.dateKey === todayKey,
      completedCount,
      skipped,
      isComplete: !skipped && isTherapyExerciseComplete(exercise, completedCount),
      hasLog: log != null,
    };
  });
};
