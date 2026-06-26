import { getApiClient } from '@/api/client';
import {
  fromCaughtError,
  fromExpressBody,
  fromExpressListBody,
  fromExpressVoidBody,
} from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { MedicalHistoryCategory, MedicalHistoryEvent } from '@/model';

type ListBody = { success: boolean; data?: MedicalHistoryEvent[]; error?: string };
type EntityBody = { success: boolean; data?: MedicalHistoryEvent; error?: string };
type VoidBody = { success: boolean; error?: string };

export type CreateMedicalHistoryEventPayload = {
  event_date: string;
  title: string;
  category?: MedicalHistoryCategory;
  description?: string | null;
  doctor_id?: string | null;
  appointment_id?: string | null;
  focus_area_id?: string | null;
};

export type UpdateMedicalHistoryEventPayload = Partial<CreateMedicalHistoryEventPayload>;

/**
 * Loads all medical history events from Express `/api/data/medical-history-events`.
 */
export const getAllMedicalHistoryEvents = async (): Promise<ApiResponse<MedicalHistoryEvent[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/medical-history-events');
    return fromExpressListBody(data, 'Failed to load medical history events');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load medical history events');
  }
};

/**
 * Creates a medical history event via POST `/api/data/medical-history-events`.
 */
export const createMedicalHistoryEvent = async (
  payload: CreateMedicalHistoryEventPayload,
): Promise<ApiResponse<MedicalHistoryEvent>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>(
      '/api/data/medical-history-events',
      payload,
    );
    return fromExpressBody(data, 'Failed to create medical history event');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to create medical history event');
  }
};

/**
 * Updates a medical history event via PATCH `/api/data/medical-history-events/:id`.
 */
export const updateMedicalHistoryEvent = async (
  id: string,
  payload: UpdateMedicalHistoryEventPayload,
): Promise<ApiResponse<MedicalHistoryEvent>> => {
  try {
    const { data } = await getApiClient().patch<EntityBody>(
      `/api/data/medical-history-events/${id}`,
      payload,
    );
    return fromExpressBody(data, 'Failed to update medical history event');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update medical history event');
  }
};

/**
 * Deletes a medical history event via DELETE `/api/data/medical-history-events/:id`.
 */
export const deleteMedicalHistoryEvent = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(
      `/api/data/medical-history-events/${id}`,
    );
    return fromExpressVoidBody(data, 'Failed to delete medical history event');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to delete medical history event');
  }
};
