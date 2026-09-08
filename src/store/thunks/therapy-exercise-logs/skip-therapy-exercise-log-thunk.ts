import { skipTherapyExerciseLog } from '@/api/therapy-exercise-logs';
import { TherapyExerciseLogsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Marks or unmarks a therapy exercise as skipped for a given date.
 */
export const skipTherapyExerciseLogThunk =
  (
    exerciseId: string,
    logDate: string,
    skipped: boolean,
  ): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await skipTherapyExerciseLog({
      exercise_id: exerciseId,
      log_date: logDate,
      skipped,
    });
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(TherapyExerciseLogsActions.upsertTherapyExerciseLog(result.data));
    return 200;
  };
