import {
  updateTherapyExercise,
  type UpdateTherapyExercisePayload,
} from '@/api/therapy-exercises';
import { CurrentTherapyExerciseActions } from '@/store/current';
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
  async (dispatch, getState) => {
    const result = await updateTherapyExercise(id, payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(TherapyExercisesActions.upsertTherapyExercise(result.data));
    if (getState().currentTherapyExercise.id === result.data.id) {
      dispatch(CurrentTherapyExerciseActions.setCurrentTherapyExercise(result.data));
    }
    return 200;
  };
