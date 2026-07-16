import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressListBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { Allergy } from '@/model';

type ListBody = { success: boolean; data?: Allergy[]; error?: string };

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
