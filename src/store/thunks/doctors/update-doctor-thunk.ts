import { updateDoctor, type UpdateDoctorPayload } from '@/api/doctors';
import { DoctorsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Updates a doctor and upserts it into the dump.
 */
export const updateDoctorThunk =
  (id: string, payload: UpdateDoctorPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await updateDoctor(id, payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(DoctorsActions.upsertDoctor(result.data));
    return 200;
  };
