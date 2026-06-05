import { deleteDoctor } from '@/api/doctors';
import { DoctorsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import type { ThunkResult } from '@/store/thunks/thunk-result';

/**
 * Deletes a doctor and removes it from the dump.
 */
export const deleteDoctorThunk =
  (id: string): AppThunk<Promise<ThunkResult>> =>
  async (dispatch) => {
    const result = await deleteDoctor(id);
    if (!result.ok) {
      return {
        status: result.status >= 500 ? 500 : 400,
        message: result.error.message,
      };
    }
    dispatch(DoctorsActions.removeDoctor(id));
    return { status: 200 };
  };
