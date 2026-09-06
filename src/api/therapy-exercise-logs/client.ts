import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressBody, fromExpressListBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { TherapyExerciseLog } from '@/model';

type ListBody = { success: boolean; data?: TherapyExerciseLog[]; error?: string };
type EntityBody = { success: boolean; data?: TherapyExerciseLog; error?: string };

export type IncrementTherapyExerciseLogPayload = {
  exercise_id: string;
  log_date: string;
  delta: number;
};

/**
 * Loads therapy exercise logs, optionally filtered by log_date.
 */
export const getAllTherapyExerciseLogs = async (
  logDate?: string,
): Promise<ApiResponse<TherapyExerciseLog[]>> => {
  try {
    const query = logDate ? `?log_date=${encodeURIComponent(logDate)}` : '';
    const { data } = await getApiClient().get<ListBody>(
      `/api/data/therapy-exercise-logs${query}`,
    );
    return fromExpressListBody(data, 'Failed to load therapy exercise logs');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load therapy exercise logs');
  }
};

/**
 * Atomically increments today's therapy exercise log.
 */
export const incrementTherapyExerciseLog = async (
  payload: IncrementTherapyExerciseLogPayload,
): Promise<ApiResponse<TherapyExerciseLog>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>(
      '/api/data/therapy-exercise-logs/increment',
      payload,
    );
    return fromExpressBody(data, 'Failed to update therapy exercise log');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update therapy exercise log');
  }
};
