import { createSpecialty, type CreateSpecialtyPayload } from '@/api/specialties';
import { SpecialtiesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates a specialty and upserts it into the dump.
 */
export const createSpecialtyThunk =
  (payload: CreateSpecialtyPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await createSpecialty(payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(SpecialtiesActions.upsertSpecialty(result.data));
    return 200;
  };
