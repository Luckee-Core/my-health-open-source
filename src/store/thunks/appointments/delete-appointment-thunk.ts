import { deleteAppointment } from '@/api/appointments';
import { AppointmentsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import type { ThunkResult } from '@/store/thunks/thunk-result';

/**
 * Deletes an appointment and removes it from the dump.
 */
export const deleteAppointmentThunk =
  (id: string): AppThunk<Promise<ThunkResult>> =>
  async (dispatch) => {
    const result = await deleteAppointment(id);
    if (!result.ok) {
      return {
        status: result.status >= 500 ? 500 : 400,
        message: result.error.message,
      };
    }
    dispatch(AppointmentsActions.removeAppointment(id));
    return { status: 200 };
  };
