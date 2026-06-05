import { getApiClient } from '@/api/client';
import {
  fromCaughtError,
  fromExpressBody,
  fromExpressListBody,
  fromExpressVoidBody,
} from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { DailyEntry } from '@/model/daily-entry';

type ListBody = { success: boolean; data?: DailyEntry[]; error?: string };
type EntityBody = { success: boolean; data?: DailyEntry; error?: string };
type VoidBody = { success: boolean; error?: string };

export type CreateDailyEntryPayload = {
  entry_date: string;
  focus_area_id: string;
  notes?: string | null;
};

export type UpdateDailyEntryPayload = Partial<CreateDailyEntryPayload>;

/**
 * Loads all daily entries from Express `/api/data/daily-entries`.
 */
export const getAllDailyEntries = async (): Promise<ApiResponse<DailyEntry[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/daily-entries');
    return fromExpressListBody(data, 'Failed to load daily entries');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load daily entries');
  }
};

/**
 * Creates a daily entry via POST `/api/data/daily-entries`.
 */
export const createDailyEntry = async (
  payload: CreateDailyEntryPayload,
): Promise<ApiResponse<DailyEntry>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>('/api/data/daily-entries', payload);
    return fromExpressBody(data, 'Failed to create daily entry');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to create daily entry');
  }
};

/**
 * Updates a daily entry via PATCH `/api/data/daily-entries/:id`.
 */
export const updateDailyEntry = async (
  id: string,
  payload: UpdateDailyEntryPayload,
): Promise<ApiResponse<DailyEntry>> => {
  try {
    const { data } = await getApiClient().patch<EntityBody>(
      `/api/data/daily-entries/${id}`,
      payload,
    );
    return fromExpressBody(data, 'Failed to update daily entry');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update daily entry');
  }
};

/**
 * Deletes a daily entry via DELETE `/api/data/daily-entries/:id`.
 */
export const deleteDailyEntry = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(`/api/data/daily-entries/${id}`);
    return fromExpressVoidBody(data, 'Failed to delete daily entry');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to delete daily entry');
  }
};
