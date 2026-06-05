import { updateAppointment, type UpdateAppointmentPayload } from '@/api/appointments';
import { AppointmentsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import type { ThunkResult } from '@/store/thunks/thunk-result';

/**
 * Updates an appointment and upserts it into the dump.
 */
export const updateAppointmentThunk =
  (id: string, payload: UpdateAppointmentPayload): AppThunk<Promise<ThunkResult>> =>
  async (dispatch) => {
    const result = await updateAppointment(id, payload);
    if (!result.ok) {
      return {
        status: result.status >= 500 ? 500 : 400,
        message: result.error.message,
      };
    }
    dispatch(AppointmentsActions.upsertAppointment(result.data));
    return { status: 200 };
  };
