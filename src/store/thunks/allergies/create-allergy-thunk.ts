import { createAllergy, type CreateAllergyPayload } from '@/api/allergies';
import { AllergiesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates an allergy and upserts it into the dump.
 */
export const createAllergyThunk =
  (payload: CreateAllergyPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await createAllergy(payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(AllergiesActions.upsertAllergy(result.data));
    return 200;
  };
