import { updateAllergy, type UpdateAllergyPayload } from '@/api/allergies';
import { AllergiesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Updates an allergy and upserts it into the dump.
 */
export const updateAllergyThunk =
  (id: string, payload: UpdateAllergyPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await updateAllergy(id, payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(AllergiesActions.upsertAllergy(result.data));
    return 200;
  };
