import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressListBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { Condition } from '@/model';

type ListBody = { success: boolean; data?: Condition[]; error?: string };

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
