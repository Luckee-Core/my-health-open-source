import { getApiClient } from '@/api/client';
import {
  fromCaughtError,
  fromExpressBody,
  fromExpressListBody,
  fromExpressVoidBody,
} from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { Allergy, AllergyStatus } from '@/model';

type ListBody = { success: boolean; data?: Allergy[]; error?: string };
type EntityBody = { success: boolean; data?: Allergy; error?: string };
type VoidBody = { success: boolean; error?: string };

export type CreateAllergyPayload = {
  substance: string;
  reaction?: string | null;
  criticality?: string | null;
  status?: AllergyStatus;
  notes?: string | null;
};

export type UpdateAllergyPayload = Partial<CreateAllergyPayload>;

/**
 * Loads all allergies from Express `/api/data/allergies`.
 */
export const getAllAllergies = async (): Promise<ApiResponse<Allergy[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/allergies');
    return fromExpressListBody(data, 'Failed to load allergies');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load allergies');
  }
};

/**
 * Creates an allergy via POST `/api/data/allergies`.
 */
export const createAllergy = async (
  payload: CreateAllergyPayload,
): Promise<ApiResponse<Allergy>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>('/api/data/allergies', payload);
    return fromExpressBody(data, 'Failed to create allergy');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to create allergy');
  }
};

/**
 * Updates an allergy via PATCH `/api/data/allergies/:id`.
 */
export const updateAllergy = async (
  id: string,
  payload: UpdateAllergyPayload,
): Promise<ApiResponse<Allergy>> => {
  try {
    const { data } = await getApiClient().patch<EntityBody>(`/api/data/allergies/${id}`, payload);
    return fromExpressBody(data, 'Failed to update allergy');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update allergy');
  }
};

/**
 * Deletes an allergy via DELETE `/api/data/allergies/:id`.
 */
export const deleteAllergy = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(`/api/data/allergies/${id}`);
    return fromExpressVoidBody(data, 'Failed to delete allergy');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to delete allergy');
  }
};
