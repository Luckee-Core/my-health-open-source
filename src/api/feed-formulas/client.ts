import { getApiClient } from '@/api/client';
import {
  fromCaughtError,
  fromExpressBody,
  fromExpressListBody,
  fromExpressVoidBody,
} from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { FeedFormula } from '@/model';

type ListBody = { success: boolean; data?: FeedFormula[]; error?: string };
type EntityBody = { success: boolean; data?: FeedFormula; error?: string };
type VoidBody = { success: boolean; error?: string };

export type CreateFeedFormulaPayload = {
  brand: string;
  name: string;
  calories_per_1000_ml: number;
  container_volume_ml?: number;
  volume_fl_oz?: number | null;
  volume_qt?: number | null;
  volume_l?: number | null;
  is_active?: boolean;
  notes?: string | null;
};

export type UpdateFeedFormulaPayload = Partial<CreateFeedFormulaPayload>;

/**
 * Loads all feed formulas from Express.
 */
export const getAllFeedFormulas = async (): Promise<ApiResponse<FeedFormula[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/feed-formulas');
    return fromExpressListBody(data, 'Failed to load feed formulas');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load feed formulas');
  }
};

/**
 * Creates a feed formula.
 */
export const createFeedFormula = async (
  payload: CreateFeedFormulaPayload,
): Promise<ApiResponse<FeedFormula>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>('/api/data/feed-formulas', payload);
    return fromExpressBody(data, 'Failed to create feed formula');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to create feed formula');
  }
};

/**
 * Updates a feed formula by id.
 */
export const updateFeedFormula = async (
  id: string,
  payload: UpdateFeedFormulaPayload,
): Promise<ApiResponse<FeedFormula>> => {
  try {
    const { data } = await getApiClient().patch<EntityBody>(
      `/api/data/feed-formulas/${id}`,
      payload,
    );
    return fromExpressBody(data, 'Failed to update feed formula');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update feed formula');
  }
};

/**
 * Deletes a feed formula by id.
 */
export const deleteFeedFormula = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(`/api/data/feed-formulas/${id}`);
    return fromExpressVoidBody(data, 'Failed to delete feed formula');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to delete feed formula');
  }
};
