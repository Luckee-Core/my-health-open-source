import { createAppointment, type CreateAppointmentPayload } from '@/api/appointments';
import { AppointmentsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates an appointment and upserts it into the dump.
 */
export const createAppointmentThunk =
  (payload: CreateAppointmentPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await createAppointment(payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(AppointmentsActions.upsertAppointment(result.data));
    return 200;
  };
