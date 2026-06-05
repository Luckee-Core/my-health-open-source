import { getApiClient } from '@/api/client';
import {
  fromCaughtError,
  fromExpressBody,
  fromExpressListBody,
  fromExpressVoidBody,
} from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { Specialty } from '@/model/specialty';

type ListBody = { success: boolean; data?: Specialty[]; error?: string };
type EntityBody = { success: boolean; data?: Specialty; error?: string };
type VoidBody = { success: boolean; error?: string };

export type CreateSpecialtyPayload = { name: string };
export type UpdateSpecialtyPayload = Partial<CreateSpecialtyPayload>;

/**
 * Loads all specialties from Express `/api/data/specialties`.
 */
export const getAllSpecialties = async (): Promise<ApiResponse<Specialty[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/specialties');
    return fromExpressListBody(data, 'Failed to load specialties');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load specialties');
  }
};

/**
 * Creates a specialty via POST `/api/data/specialties`.
 */
export const createSpecialty = async (
  payload: CreateSpecialtyPayload,
): Promise<ApiResponse<Specialty>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>('/api/data/specialties', payload);
    return fromExpressBody(data, 'Failed to create specialty');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to create specialty');
  }
};

/**
 * Updates a specialty via PATCH `/api/data/specialties/:id`.
 */
export const updateSpecialty = async (
  id: string,
  payload: UpdateSpecialtyPayload,
): Promise<ApiResponse<Specialty>> => {
  try {
    const { data } = await getApiClient().patch<EntityBody>(
      `/api/data/specialties/${id}`,
      payload,
    );
    return fromExpressBody(data, 'Failed to update specialty');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update specialty');
  }
};

/**
 * Deletes a specialty via DELETE `/api/data/specialties/:id`.
 */
export const deleteSpecialty = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(`/api/data/specialties/${id}`);
    return fromExpressVoidBody(data, 'Failed to delete specialty');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to delete specialty');
  }
};
