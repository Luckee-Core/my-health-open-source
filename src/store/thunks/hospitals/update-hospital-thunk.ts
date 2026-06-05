import { updateHospital, type UpdateHospitalPayload } from '@/api/hospitals';
import { HospitalsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import type { ThunkResult } from '@/store/thunks/thunk-result';

/**
 * Updates a hospital and upserts it into the dump.
 */
export const updateHospitalThunk =
  (id: string, payload: UpdateHospitalPayload): AppThunk<Promise<ThunkResult>> =>
  async (dispatch) => {
    const result = await updateHospital(id, payload);
    if (!result.ok) {
      return {
        status: result.status >= 500 ? 500 : 400,
        message: result.error.message,
      };
    }
    dispatch(HospitalsActions.upsertHospital(result.data));
    return { status: 200 };
  };
