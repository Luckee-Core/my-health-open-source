import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressListBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { ClinicalResult } from '@/model';

type ListBody = { success: boolean; data?: ClinicalResult[]; error?: string };

/**
 * Loads all clinicalResults from Express `/api/data/clinical-results`.
 */
export const getAllClinicalResults = async (): Promise<ApiResponse<ClinicalResult[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/clinical-results');
    return fromExpressListBody(data, 'Failed to load clinicalResults');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load clinicalResults');
  }
};
