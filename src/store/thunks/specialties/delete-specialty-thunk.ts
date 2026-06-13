import { deleteSpecialty } from '@/api/specialties';
import { SpecialtiesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Deletes a specialty and removes it from the dump.
 */
export const deleteSpecialtyThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await deleteSpecialty(id);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(SpecialtiesActions.removeSpecialty(id));
    return 200;
  };
