import type { TherapyExercise } from '@/model';
import { CurrentTherapyExerciseActions } from '@/store/current';
import type { AppThunk } from '@/store/types';

/**
 * Sets the open therapy exercise for the static detail page.
 */
export const openTherapyExerciseDetailThunk =
  (exercise: TherapyExercise): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    if (exercise.id === '') {
      return 400;
    }
    dispatch(CurrentTherapyExerciseActions.setCurrentTherapyExercise(exercise));
    return 200;
  };
