import { getApiClient } from '@/api/client';
import {
  fromCaughtError,
  fromExpressBody,
  fromExpressListBody,
  fromExpressVoidBody,
} from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { Doctor } from '@/model';

type ListBody = { success: boolean; data?: Doctor[]; error?: string };
type EntityBody = { success: boolean; data?: Doctor; error?: string };
type VoidBody = { success: boolean; error?: string };

export type CreateDoctorPayload = {
  name: string;
  hospital_id: string;
  specialty_id: string;
  notes?: string | null;
};

export type UpdateDoctorPayload = Partial<CreateDoctorPayload>;

/**
 * Loads all doctors from Express `/api/data/doctors`.
 */
export const getAllDoctors = async (): Promise<ApiResponse<Doctor[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/doctors');
    return fromExpressListBody(data, 'Failed to load doctors');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load doctors');
  }
};

/**
 * Creates a doctor via POST `/api/data/doctors`.
 */
export const createDoctor = async (payload: CreateDoctorPayload): Promise<ApiResponse<Doctor>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>('/api/data/doctors', payload);
    return fromExpressBody(data, 'Failed to create doctor');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to create doctor');
  }
};

/**
 * Updates a doctor via PATCH `/api/data/doctors/:id`.
 */
export const updateDoctor = async (
  id: string,
  payload: UpdateDoctorPayload,
): Promise<ApiResponse<Doctor>> => {
  try {
    const { data } = await getApiClient().patch<EntityBody>(`/api/data/doctors/${id}`, payload);
    return fromExpressBody(data, 'Failed to update doctor');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update doctor');
  }
};

/**
 * Deletes a doctor via DELETE `/api/data/doctors/:id`.
 */
export const deleteDoctor = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(`/api/data/doctors/${id}`);
    return fromExpressVoidBody(data, 'Failed to delete doctor');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to delete doctor');
  }
};
