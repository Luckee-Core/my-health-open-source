import { TherapyExerciseImportBuilderActions } from '@/store/builders';
import type { AppThunk } from '@/store/types';

/**
 * Resets the therapy exercise import wizard.
 */
export const resetTherapyExerciseImportThunk =
  (): AppThunk<Promise<200>> =>
  async (dispatch) => {
    dispatch(TherapyExerciseImportBuilderActions.reset());
    return 200;
  };
