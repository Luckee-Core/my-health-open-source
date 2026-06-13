import { updateHospital, type UpdateHospitalPayload } from '@/api/hospitals';
import { HospitalsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Updates a hospital and upserts it into the dump.
 */
export const updateHospitalThunk =
  (id: string, payload: UpdateHospitalPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await updateHospital(id, payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(HospitalsActions.upsertHospital(result.data));
    return 200;
  };
