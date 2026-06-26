import { getApiClient } from '@/api/client';
import {
  fromCaughtError,
  fromExpressBody,
  fromExpressListBody,
  fromExpressVoidBody,
} from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { SymptomLog } from '@/model';

type ListBody = { success: boolean; data?: SymptomLog[]; error?: string };
type EntityBody = { success: boolean; data?: SymptomLog; error?: string };
type VoidBody = { success: boolean; error?: string };

export type CreateSymptomLogPayload = {
  recorded_at?: string;
  name: string;
  severity?: number | null;
  triggers?: string | null;
  duration_minutes?: number | null;
  notes?: string | null;
  focus_area_id?: string | null;
};

export type UpdateSymptomLogPayload = Partial<CreateSymptomLogPayload>;

/**
 * Loads all symptom logs from Express `/api/data/symptom-logs`.
 */
export const getAllSymptomLogs = async (): Promise<ApiResponse<SymptomLog[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/symptom-logs');
    return fromExpressListBody(data, 'Failed to load symptom logs');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load symptom logs');
  }
};

/**
 * Creates a symptom log via POST `/api/data/symptom-logs`.
 */
export const createSymptomLog = async (
  payload: CreateSymptomLogPayload,
): Promise<ApiResponse<SymptomLog>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>('/api/data/symptom-logs', payload);
    return fromExpressBody(data, 'Failed to create symptom log');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to create symptom log');
  }
};

/**
 * Updates a symptom log via PATCH `/api/data/symptom-logs/:id`.
 */
export const updateSymptomLog = async (
  id: string,
  payload: UpdateSymptomLogPayload,
): Promise<ApiResponse<SymptomLog>> => {
  try {
    const { data } = await getApiClient().patch<EntityBody>(`/api/data/symptom-logs/${id}`, payload);
    return fromExpressBody(data, 'Failed to update symptom log');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update symptom log');
  }
};

/**
 * Deletes a symptom log via DELETE `/api/data/symptom-logs/:id`.
 */
export const deleteSymptomLog = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(`/api/data/symptom-logs/${id}`);
    return fromExpressVoidBody(data, 'Failed to delete symptom log');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to delete symptom log');
  }
};
