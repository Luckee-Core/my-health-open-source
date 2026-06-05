import { createDoctor, type CreateDoctorPayload } from '@/api/doctors';
import { DoctorsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import type { ThunkResult } from '@/store/thunks/thunk-result';

/**
 * Creates a doctor and upserts it into the dump.
 */
export const createDoctorThunk =
  (payload: CreateDoctorPayload): AppThunk<Promise<ThunkResult>> =>
  async (dispatch) => {
    const result = await createDoctor(payload);
    if (!result.ok) {
      return {
        status: result.status >= 500 ? 500 : 400,
        message: result.error.message,
      };
    }
    dispatch(DoctorsActions.upsertDoctor(result.data));
    return { status: 200 };
  };
