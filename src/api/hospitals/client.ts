import { getApiClient } from '@/api/client';
import {
  fromCaughtError,
  fromExpressBody,
  fromExpressListBody,
  fromExpressVoidBody,
} from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { Hospital } from '@/model/hospital';

type ListBody = { success: boolean; data?: Hospital[]; error?: string };
type EntityBody = { success: boolean; data?: Hospital; error?: string };
type VoidBody = { success: boolean; error?: string };

export type CreateHospitalPayload = {
  name: string;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
};

export type UpdateHospitalPayload = Partial<CreateHospitalPayload>;

/**
 * Loads all hospitals from Express `/api/data/hospitals`.
 */
export const getAllHospitals = async (): Promise<ApiResponse<Hospital[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/hospitals');
    return fromExpressListBody(data, 'Failed to load facilities');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load facilities');
  }
};

/**
 * Creates a hospital via POST `/api/data/hospitals`.
 */
export const createHospital = async (
  payload: CreateHospitalPayload,
): Promise<ApiResponse<Hospital>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>('/api/data/hospitals', payload);
    return fromExpressBody(data, 'Failed to create facility');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to create facility');
  }
};

/**
 * Updates a hospital via PATCH `/api/data/hospitals/:id`.
 */
export const updateHospital = async (
  id: string,
  payload: UpdateHospitalPayload,
): Promise<ApiResponse<Hospital>> => {
  try {
    const { data } = await getApiClient().patch<EntityBody>(`/api/data/hospitals/${id}`, payload);
    return fromExpressBody(data, 'Failed to update facility');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update facility');
  }
};

/**
 * Deletes a hospital via DELETE `/api/data/hospitals/:id`.
 */
export const deleteHospital = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(`/api/data/hospitals/${id}`);
    return fromExpressVoidBody(data, 'Failed to delete facility');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to delete facility');
  }
};
