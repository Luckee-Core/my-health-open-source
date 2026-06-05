import { deleteSpecialty } from '@/api/specialties';
import { SpecialtiesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import type { ThunkResult } from '@/store/thunks/thunk-result';

/**
 * Deletes a specialty and removes it from the dump.
 */
export const deleteSpecialtyThunk =
  (id: string): AppThunk<Promise<ThunkResult>> =>
  async (dispatch) => {
    const result = await deleteSpecialty(id);
    if (!result.ok) {
      return {
        status: result.status >= 500 ? 500 : 400,
        message: result.error.message,
      };
    }
    dispatch(SpecialtiesActions.removeSpecialty(id));
    return { status: 200 };
  };
