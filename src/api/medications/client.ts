import { getApiClient } from '@/api/client';
import {
  fromCaughtError,
  fromExpressBody,
  fromExpressListBody,
  fromExpressVoidBody,
} from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { Medication, MedicationStatus } from '@/model';

type ListBody = { success: boolean; data?: Medication[]; error?: string };
type EntityBody = { success: boolean; data?: Medication; error?: string };
type VoidBody = { success: boolean; error?: string };

export type CreateMedicationPayload = {
  name: string;
  instructions?: string | null;
  started_on?: string | null;
  status?: MedicationStatus;
  doctor_id?: string | null;
  notes?: string | null;
};

export type UpdateMedicationPayload = Partial<CreateMedicationPayload>;

/**
 * Loads all medications from Express `/api/data/medications`.
 */
export const getAllMedications = async (): Promise<ApiResponse<Medication[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/medications');
    return fromExpressListBody(data, 'Failed to load medications');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load medications');
  }
};

/**
 * Creates a medication via POST `/api/data/medications`.
 */
export const createMedication = async (
  payload: CreateMedicationPayload,
): Promise<ApiResponse<Medication>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>('/api/data/medications', payload);
    return fromExpressBody(data, 'Failed to create medication');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to create medication');
  }
};

/**
 * Updates a medication via PATCH `/api/data/medications/:id`.
 */
export const updateMedication = async (
  id: string,
  payload: UpdateMedicationPayload,
): Promise<ApiResponse<Medication>> => {
  try {
    const { data } = await getApiClient().patch<EntityBody>(`/api/data/medications/${id}`, payload);
    return fromExpressBody(data, 'Failed to update medication');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update medication');
  }
};

/**
 * Deletes a medication via DELETE `/api/data/medications/:id`.
 */
export const deleteMedication = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(`/api/data/medications/${id}`);
    return fromExpressVoidBody(data, 'Failed to delete medication');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to delete medication');
  }
};
