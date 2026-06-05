import { updateDoctor, type UpdateDoctorPayload } from '@/api/doctors';
import { DoctorsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import type { ThunkResult } from '@/store/thunks/thunk-result';

/**
 * Updates a doctor and upserts it into the dump.
 */
export const updateDoctorThunk =
  (id: string, payload: UpdateDoctorPayload): AppThunk<Promise<ThunkResult>> =>
  async (dispatch) => {
    const result = await updateDoctor(id, payload);
    if (!result.ok) {
      return {
        status: result.status >= 500 ? 500 : 400,
        message: result.error.message,
      };
    }
    dispatch(DoctorsActions.upsertDoctor(result.data));
    return { status: 200 };
  };
