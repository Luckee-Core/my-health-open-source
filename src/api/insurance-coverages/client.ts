import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressListBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { InsuranceCoverage } from '@/model';

type ListBody = { success: boolean; data?: InsuranceCoverage[]; error?: string };

/**
 * Loads all insuranceCoverages from Express `/api/data/insurance-coverages`.
 */
export const getAllInsuranceCoverages = async (): Promise<ApiResponse<InsuranceCoverage[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/insurance-coverages');
    return fromExpressListBody(data, 'Failed to load insuranceCoverages');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load insuranceCoverages');
  }
};
