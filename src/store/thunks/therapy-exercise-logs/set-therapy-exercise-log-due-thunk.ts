import { setTherapyExerciseLogDue } from '@/api/therapy-exercise-logs';
import { TherapyExerciseLogsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Marks or unmarks a session exercise as due for a given date.
 */
export const setTherapyExerciseLogDueThunk =
  (
    exerciseId: string,
    logDate: string,
    due: boolean,
  ): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await setTherapyExerciseLogDue({
      exercise_id: exerciseId,
      log_date: logDate,
      due,
    });
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(TherapyExerciseLogsActions.upsertTherapyExerciseLog(result.data));
    return 200;
  };
