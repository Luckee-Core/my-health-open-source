import { updateAppointment, type UpdateAppointmentPayload } from '@/api/appointments';
import { AppointmentsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Updates an appointment and upserts it into the dump.
 */
export const updateAppointmentThunk =
  (id: string, payload: UpdateAppointmentPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await updateAppointment(id, payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(AppointmentsActions.upsertAppointment(result.data));
    return 200;
  };
