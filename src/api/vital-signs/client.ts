import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressListBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { VitalSign } from '@/model';

type ListBody = { success: boolean; data?: VitalSign[]; error?: string };

/**
 * Loads all vitalSigns from Express `/api/data/vital-signs`.
 */
export const getAllVitalSigns = async (): Promise<ApiResponse<VitalSign[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/vital-signs');
    return fromExpressListBody(data, 'Failed to load vitalSigns');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load vitalSigns');
  }
};
