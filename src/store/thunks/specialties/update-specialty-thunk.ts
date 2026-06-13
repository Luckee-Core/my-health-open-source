import { updateSpecialty, type UpdateSpecialtyPayload } from '@/api/specialties';
import { SpecialtiesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Updates a specialty and upserts it into the dump.
 */
export const updateSpecialtyThunk =
  (id: string, payload: UpdateSpecialtyPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await updateSpecialty(id, payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(SpecialtiesActions.upsertSpecialty(result.data));
    return 200;
  };
