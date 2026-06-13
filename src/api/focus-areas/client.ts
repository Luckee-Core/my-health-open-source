import { getApiClient } from '@/api/client';
import {
  fromCaughtError,
  fromExpressBody,
  fromExpressListBody,
  fromExpressVoidBody,
} from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { FocusArea } from '@/model';

type ListBody = { success: boolean; data?: FocusArea[]; error?: string };
type EntityBody = { success: boolean; data?: FocusArea; error?: string };
type VoidBody = { success: boolean; error?: string };

export type CreateFocusAreaPayload = {
  name: string;
  description?: string | null;
};

export type UpdateFocusAreaPayload = Partial<CreateFocusAreaPayload>;

/**
 * Loads all focus areas from Express `/api/data/focus-areas`.
 */
export const getAllFocusAreas = async (): Promise<ApiResponse<FocusArea[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/focus-areas');
    return fromExpressListBody(data, 'Failed to load focus areas');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load focus areas');
  }
};

/**
 * Creates a focus area via POST `/api/data/focus-areas`.
 */
export const createFocusArea = async (
  payload: CreateFocusAreaPayload,
): Promise<ApiResponse<FocusArea>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>('/api/data/focus-areas', payload);
    return fromExpressBody(data, 'Failed to create focus area');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to create focus area');
  }
};

/**
 * Updates a focus area via PATCH `/api/data/focus-areas/:id`.
 */
export const updateFocusArea = async (
  id: string,
  payload: UpdateFocusAreaPayload,
): Promise<ApiResponse<FocusArea>> => {
  try {
    const { data } = await getApiClient().patch<EntityBody>(
      `/api/data/focus-areas/${id}`,
      payload,
    );
    return fromExpressBody(data, 'Failed to update focus area');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update focus area');
  }
};

/**
 * Deletes a focus area via DELETE `/api/data/focus-areas/:id`.
 */
export const deleteFocusArea = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(`/api/data/focus-areas/${id}`);
    return fromExpressVoidBody(data, 'Failed to delete focus area');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to delete focus area');
  }
};
