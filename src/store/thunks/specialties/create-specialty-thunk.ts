import { createSpecialty, type CreateSpecialtyPayload } from '@/api/specialties';
import { SpecialtiesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import type { ThunkResult } from '@/store/thunks/thunk-result';

/**
 * Creates a specialty and upserts it into the dump.
 */
export const createSpecialtyThunk =
  (payload: CreateSpecialtyPayload): AppThunk<Promise<ThunkResult>> =>
  async (dispatch) => {
    const result = await createSpecialty(payload);
    if (!result.ok) {
      return {
        status: result.status >= 500 ? 500 : 400,
        message: result.error.message,
      };
    }
    dispatch(SpecialtiesActions.upsertSpecialty(result.data));
    return { status: 200 };
  };
