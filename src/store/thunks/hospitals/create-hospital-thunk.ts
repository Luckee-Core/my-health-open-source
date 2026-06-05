import { createHospital, type CreateHospitalPayload } from '@/api/hospitals';
import { HospitalsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import type { ThunkResult } from '@/store/thunks/thunk-result';

/**
 * Creates a hospital and upserts it into the dump.
 */
export const createHospitalThunk =
  (payload: CreateHospitalPayload): AppThunk<Promise<ThunkResult>> =>
  async (dispatch) => {
    const result = await createHospital(payload);
    if (!result.ok) {
      return {
        status: result.status >= 500 ? 500 : 400,
        message: result.error.message,
      };
    }
    dispatch(HospitalsActions.upsertHospital(result.data));
    return { status: 200 };
  };
