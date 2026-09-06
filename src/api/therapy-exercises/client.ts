import { getApiClient } from '@/api/client';
import {
  fromCaughtError,
  fromExpressBody,
  fromExpressListBody,
  fromExpressVoidBody,
} from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { TherapyExercise, TherapyExerciseTrackingKind } from '@/model';

type ListBody = { success: boolean; data?: TherapyExercise[]; error?: string };
type EntityBody = { success: boolean; data?: TherapyExercise; error?: string };
type VoidBody = { success: boolean; error?: string };

export type CreateTherapyExercisePayload = {
  name: string;
  instructions?: string | null;
  tracking_kind: TherapyExerciseTrackingKind;
  target_count: number;
  unit_size?: number;
  is_active?: boolean;
  sort_order?: number;
};

export type UpdateTherapyExercisePayload = Partial<CreateTherapyExercisePayload>;

/**
 * Loads all therapy exercises from Express.
 */
export const getAllTherapyExercises = async (): Promise<ApiResponse<TherapyExercise[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/therapy-exercises');
    return fromExpressListBody(data, 'Failed to load therapy exercises');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load therapy exercises');
  }
};

/**
 * Creates a therapy exercise.
 */
export const createTherapyExercise = async (
  payload: CreateTherapyExercisePayload,
): Promise<ApiResponse<TherapyExercise>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>('/api/data/therapy-exercises', payload);
    return fromExpressBody(data, 'Failed to create therapy exercise');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to create therapy exercise');
  }
};

/**
 * Updates a therapy exercise by id.
 */
export const updateTherapyExercise = async (
  id: string,
  payload: UpdateTherapyExercisePayload,
): Promise<ApiResponse<TherapyExercise>> => {
  try {
    const { data } = await getApiClient().patch<EntityBody>(
      `/api/data/therapy-exercises/${id}`,
      payload,
    );
    return fromExpressBody(data, 'Failed to update therapy exercise');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update therapy exercise');
  }
};

/**
 * Deletes a therapy exercise by id.
 */
export const deleteTherapyExercise = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(`/api/data/therapy-exercises/${id}`);
    return fromExpressVoidBody(data, 'Failed to delete therapy exercise');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to delete therapy exercise');
  }
};
