import { getApiClient } from '@/api/client';
import {
  fromCaughtError,
  fromExpressBody,
  fromExpressListBody,
  fromExpressVoidBody,
} from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { Condition, ConditionStatus } from '@/model';

type ListBody = { success: boolean; data?: Condition[]; error?: string };
type EntityBody = { success: boolean; data?: Condition; error?: string };
type VoidBody = { success: boolean; error?: string };

export type CreateConditionPayload = {
  name: string;
  status?: ConditionStatus;
  noted_on?: string | null;
  diagnosed_on?: string | null;
  focus_area_id?: string | null;
  notes?: string | null;
};

export type UpdateConditionPayload = Partial<CreateConditionPayload>;

/**
 * Loads all conditions from Express `/api/data/conditions`.
 */
export const getAllConditions = async (): Promise<ApiResponse<Condition[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/conditions');
    return fromExpressListBody(data, 'Failed to load conditions');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load conditions');
  }
};

/**
 * Creates a condition via POST `/api/data/conditions`.
 */
export const createCondition = async (
  payload: CreateConditionPayload,
): Promise<ApiResponse<Condition>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>('/api/data/conditions', payload);
    return fromExpressBody(data, 'Failed to create condition');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to create condition');
  }
};

/**
 * Updates a condition via PATCH `/api/data/conditions/:id`.
 */
export const updateCondition = async (
  id: string,
  payload: UpdateConditionPayload,
): Promise<ApiResponse<Condition>> => {
  try {
    const { data } = await getApiClient().patch<EntityBody>(`/api/data/conditions/${id}`, payload);
    return fromExpressBody(data, 'Failed to update condition');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update condition');
  }
};

/**
 * Deletes a condition via DELETE `/api/data/conditions/:id`.
 */
export const deleteCondition = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(`/api/data/conditions/${id}`);
    return fromExpressVoidBody(data, 'Failed to delete condition');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to delete condition');
  }
};
