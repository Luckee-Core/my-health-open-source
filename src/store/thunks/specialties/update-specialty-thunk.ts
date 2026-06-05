import { updateSpecialty, type UpdateSpecialtyPayload } from '@/api/specialties';
import { SpecialtiesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import type { ThunkResult } from '@/store/thunks/thunk-result';

/**
 * Updates a specialty and upserts it into the dump.
 */
export const updateSpecialtyThunk =
  (id: string, payload: UpdateSpecialtyPayload): AppThunk<Promise<ThunkResult>> =>
  async (dispatch) => {
    const result = await updateSpecialty(id, payload);
    if (!result.ok) {
      return {
        status: result.status >= 500 ? 500 : 400,
        message: result.error.message,
      };
    }
    dispatch(SpecialtiesActions.upsertSpecialty(result.data));
    return { status: 200 };
  };
