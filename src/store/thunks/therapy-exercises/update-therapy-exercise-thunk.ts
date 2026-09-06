import {
  updateTherapyExercise,
  type UpdateTherapyExercisePayload,
} from '@/api/therapy-exercises';
import { TherapyExercisesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Updates a therapy exercise and upserts it into the dump.
 */
export const updateTherapyExerciseThunk =
  (
    id: string,
    payload: UpdateTherapyExercisePayload,
  ): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await updateTherapyExercise(id, payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(TherapyExercisesActions.upsertTherapyExercise(result.data));
    return 200;
  };
