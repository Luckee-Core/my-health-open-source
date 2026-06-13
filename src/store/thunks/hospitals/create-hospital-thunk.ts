import { createHospital, type CreateHospitalPayload } from '@/api/hospitals';
import { HospitalsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates a hospital and upserts it into the dump.
 */
export const createHospitalThunk =
  (payload: CreateHospitalPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await createHospital(payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(HospitalsActions.upsertHospital(result.data));
    return 200;
  };
