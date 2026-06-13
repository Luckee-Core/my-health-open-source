import { deleteAppointment } from '@/api/appointments';
import { AppointmentsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Deletes an appointment and removes it from the dump.
 */
export const deleteAppointmentThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await deleteAppointment(id);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(AppointmentsActions.removeAppointment(id));
    return 200;
  };
