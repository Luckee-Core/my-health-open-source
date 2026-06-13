import { getApiClient } from '@/api/client';
import {
  fromCaughtError,
  fromExpressBody,
  fromExpressListBody,
  fromExpressVoidBody,
} from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { Appointment, AppointmentStatus } from '@/model';

type ListBody = { success: boolean; data?: Appointment[]; error?: string };
type EntityBody = { success: boolean; data?: Appointment; error?: string };
type VoidBody = { success: boolean; error?: string };

export type CreateAppointmentPayload = {
  doctor_id: string;
  scheduled_at: string;
  status?: AppointmentStatus;
  appointment_type?: string | null;
  reason?: string | null;
  notes?: string | null;
  completed_at?: string | null;
};

export type UpdateAppointmentPayload = Partial<CreateAppointmentPayload>;

/**
 * Loads all appointments from Express `/api/data/appointments`.
 */
export const getAllAppointments = async (): Promise<ApiResponse<Appointment[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/appointments');
    return fromExpressListBody(data, 'Failed to load appointments');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load appointments');
  }
};

/**
 * Creates an appointment via POST `/api/data/appointments`.
 */
export const createAppointment = async (
  payload: CreateAppointmentPayload,
): Promise<ApiResponse<Appointment>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>('/api/data/appointments', payload);
    return fromExpressBody(data, 'Failed to create appointment');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to create appointment');
  }
};

/**
 * Updates an appointment via PATCH `/api/data/appointments/:id`.
 */
export const updateAppointment = async (
  id: string,
  payload: UpdateAppointmentPayload,
): Promise<ApiResponse<Appointment>> => {
  try {
    const { data } = await getApiClient().patch<EntityBody>(
      `/api/data/appointments/${id}`,
      payload,
    );
    return fromExpressBody(data, 'Failed to update appointment');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update appointment');
  }
};

/**
 * Deletes an appointment via DELETE `/api/data/appointments/:id`.
 */
export const deleteAppointment = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(`/api/data/appointments/${id}`);
    return fromExpressVoidBody(data, 'Failed to delete appointment');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to delete appointment');
  }
};
