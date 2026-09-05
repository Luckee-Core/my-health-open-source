import { deleteAllergy } from '@/api/allergies';
import { AllergiesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Deletes an allergy and removes it from the dump.
 */
export const deleteAllergyThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await deleteAllergy(id);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(AllergiesActions.removeAllergy(id));
    return 200;
  };
