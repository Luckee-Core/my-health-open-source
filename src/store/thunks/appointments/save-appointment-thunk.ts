import { createAppointment, updateAppointment } from '@/api/appointments';
import { AppointmentsBuilderActions } from '@/store/builders';
import { CurrentAppointmentActions } from '@/store/current';
import { AppointmentsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates or updates the appointment in currentAppointment.
 */
export const saveAppointmentThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const current = getState().currentAppointment;

    dispatch(AppointmentsBuilderActions.setSaveError(''));
    dispatch(AppointmentsBuilderActions.setSaveStatus('saving'));

    if (!current.doctor_id) {
      dispatch(AppointmentsBuilderActions.setSaveError('Doctor is required'));
      dispatch(AppointmentsBuilderActions.setSaveStatus('error'));
      return 400;
    }
    if (!current.scheduled_at.trim()) {
      dispatch(AppointmentsBuilderActions.setSaveError('Scheduled date/time is required'));
      dispatch(AppointmentsBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const payload = {
      doctor_id: current.doctor_id,
      scheduled_at: current.scheduled_at,
      status: current.status,
      appointment_type: current.appointment_type?.trim() || null,
      reason: current.reason?.trim() || null,
      notes: current.notes?.trim() || null,
    };
    const result =
      current.id === ''
        ? await createAppointment(payload)
        : await updateAppointment(current.id, payload);

    if (!result.ok) {
      dispatch(AppointmentsBuilderActions.setSaveError(result.error.message));
      dispatch(AppointmentsBuilderActions.setSaveStatus('error'));
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(AppointmentsActions.upsertAppointment(result.data));
    dispatch(CurrentAppointmentActions.setCurrentAppointment(result.data));
    dispatch(AppointmentsBuilderActions.setSaveStatus('success'));
    return 200;
  };
