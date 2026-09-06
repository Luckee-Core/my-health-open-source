import { incrementTherapyExerciseLog } from '@/api/therapy-exercise-logs';
import { TherapyExerciseLogsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Atomically increments a therapy exercise log for a given date.
 */
export const incrementTherapyExerciseLogThunk =
  (
    exerciseId: string,
    logDate: string,
    delta: number,
  ): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await incrementTherapyExerciseLog({
      exercise_id: exerciseId,
      log_date: logDate,
      delta,
    });
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(TherapyExerciseLogsActions.upsertTherapyExerciseLog(result.data));
    return 200;
  };
