import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressListBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { Medication } from '@/model';

type ListBody = { success: boolean; data?: Medication[]; error?: string };

/**
 * Loads all medications from Express `/api/data/medications`.
 */
export const getAllMedications = async (): Promise<ApiResponse<Medication[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/medications');
    return fromExpressListBody(data, 'Failed to load medications');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load medications');
  }
};
