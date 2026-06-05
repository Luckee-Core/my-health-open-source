import { deleteHospital } from '@/api/hospitals';
import { HospitalsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import type { ThunkResult } from '@/store/thunks/thunk-result';

/**
 * Deletes a hospital and removes it from the dump.
 */
export const deleteHospitalThunk =
  (id: string): AppThunk<Promise<ThunkResult>> =>
  async (dispatch) => {
    const result = await deleteHospital(id);
    if (!result.ok) {
      return {
        status: result.status >= 500 ? 500 : 400,
        message: result.error.message,
      };
    }
    dispatch(HospitalsActions.removeHospital(id));
    return { status: 200 };
  };
