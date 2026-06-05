import { createAppointment, type CreateAppointmentPayload } from '@/api/appointments';
import { AppointmentsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import type { ThunkResult } from '@/store/thunks/thunk-result';

/**
 * Creates an appointment and upserts it into the dump.
 */
export const createAppointmentThunk =
  (payload: CreateAppointmentPayload): AppThunk<Promise<ThunkResult>> =>
  async (dispatch) => {
    const result = await createAppointment(payload);
    if (!result.ok) {
      return {
        status: result.status >= 500 ? 500 : 400,
        message: result.error.message,
      };
    }
    dispatch(AppointmentsActions.upsertAppointment(result.data));
    return { status: 200 };
  };
