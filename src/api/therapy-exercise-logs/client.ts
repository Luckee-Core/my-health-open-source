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

export type SkipTherapyExerciseLogPayload = {
  exercise_id: string;
  log_date: string;
  skipped: boolean;
};

export type SetTherapyExerciseLogDuePayload = {
  exercise_id: string;
  log_date: string;
  due: boolean;
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

/**
 * Marks or unmarks a therapy exercise as skipped for a given date.
 */
export const skipTherapyExerciseLog = async (
  payload: SkipTherapyExerciseLogPayload,
): Promise<ApiResponse<TherapyExerciseLog>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>(
      '/api/data/therapy-exercise-logs/skip',
      payload,
    );
    return fromExpressBody(data, 'Failed to skip therapy exercise');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to skip therapy exercise');
  }
};

/**
 * Marks or unmarks a session exercise as due for a given date.
 */
export const setTherapyExerciseLogDue = async (
  payload: SetTherapyExerciseLogDuePayload,
): Promise<ApiResponse<TherapyExerciseLog>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>(
      '/api/data/therapy-exercise-logs/due',
      payload,
    );
    return fromExpressBody(data, 'Failed to update therapy exercise due status');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update therapy exercise due status');
  }
};
