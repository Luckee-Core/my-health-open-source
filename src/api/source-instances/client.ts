import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressListBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { SourceInstance } from '@/model';

type ListBody = { success: boolean; data?: SourceInstance[]; error?: string };

/**
 * Loads source instances from Express `/api/data/source-instances`.
 */
export const getAllSourceInstances = async (): Promise<ApiResponse<SourceInstance[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/source-instances');
    return fromExpressListBody(data, 'Failed to load source instances');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load source instances');
  }
};
