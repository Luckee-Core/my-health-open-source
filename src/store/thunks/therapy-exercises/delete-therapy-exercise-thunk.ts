import { deleteTherapyExercise } from '@/api/therapy-exercises';
import { TherapyExercisesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Deletes a therapy exercise and removes it from the dump.
 */
export const deleteTherapyExerciseThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await deleteTherapyExercise(id);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(TherapyExercisesActions.removeTherapyExercise(id));
    return 200;
  };
