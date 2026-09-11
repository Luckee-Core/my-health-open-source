import { getApiClient } from '@/api/client';
import {
  fromCaughtError,
  fromExpressBody,
  fromExpressListBody,
  fromExpressVoidBody,
} from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { FeedLog } from '@/model';

type ListBody = { success: boolean; data?: FeedLog[]; error?: string };
type EntityBody = { success: boolean; data?: FeedLog; error?: string };
type VoidBody = { success: boolean; error?: string };

export type UpsertFeedLogPayload = {
  log_date: string;
  formula_id: string;
  intermittent_rate_ml_per_hr?: number;
  feed_left_ml: number;
  total_fed_ml: number;
  pump_reset?: boolean;
  notes?: string | null;
};

/**
 * Loads all feed logs from Express.
 */
export const getAllFeedLogs = async (): Promise<ApiResponse<FeedLog[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/feed-logs');
    return fromExpressListBody(data, 'Failed to load feed logs');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load feed logs');
  }
};

/**
 * Upserts a pump snapshot by log_date.
 */
export const upsertFeedLog = async (
  payload: UpsertFeedLogPayload,
): Promise<ApiResponse<FeedLog>> => {
  try {
    const { data } = await getApiClient().put<EntityBody>('/api/data/feed-logs', payload);
    return fromExpressBody(data, 'Failed to save feed log');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to save feed log');
  }
};

/**
 * Deletes a feed log by id.
 */
export const deleteFeedLog = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(`/api/data/feed-logs/${id}`);
    return fromExpressVoidBody(data, 'Failed to delete feed log');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to delete feed log');
  }
};
