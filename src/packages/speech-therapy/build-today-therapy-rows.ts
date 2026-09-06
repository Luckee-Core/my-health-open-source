import type { TherapyExercise, TherapyExerciseLog } from '@/model';

export type TodayTherapyRow = {
  exercise: TherapyExercise;
  completedCount: number;
  isComplete: boolean;
};

const normalizeLogDateKey = (value: string): string => value.slice(0, 10);

/**
 * Builds today's active therapy exercise rows with progress from logs dump.
 */
export const buildTodayTherapyRows = (
  exercisesDump: Record<string, TherapyExercise>,
  logsDump: Record<string, TherapyExerciseLog>,
  todayKey: string,
): TodayTherapyRow[] => {
  const logsByExerciseId = new Map<string, number>();
  for (const log of Object.values(logsDump)) {
    if (normalizeLogDateKey(log.log_date) === todayKey) {
      logsByExerciseId.set(log.exercise_id, log.completed_count);
    }
  }

  return Object.values(exercisesDump)
    .filter((exercise) => exercise.is_active && exercise.frequency === 'daily')
    .sort((a, b) => {
      const byOrder = a.sort_order - b.sort_order;
      if (byOrder !== 0) return byOrder;
      return a.name.localeCompare(b.name);
    })
    .map((exercise) => {
      const completedCount = logsByExerciseId.get(exercise.id) ?? 0;
      return {
        exercise,
        completedCount,
        isComplete: completedCount >= exercise.target_count,
      };
    });
};
