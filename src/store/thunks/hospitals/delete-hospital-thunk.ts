import { deleteHospital } from '@/api/hospitals';
import { HospitalsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Deletes a hospital and removes it from the dump.
 */
export const deleteHospitalThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await deleteHospital(id);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(HospitalsActions.removeHospital(id));
    return 200;
  };
