import { deleteDoctor } from '@/api/doctors';
import { DoctorsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Deletes a doctor and removes it from the dump.
 */
export const deleteDoctorThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await deleteDoctor(id);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(DoctorsActions.removeDoctor(id));
    return 200;
  };
