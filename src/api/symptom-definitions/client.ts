import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressListBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { SymptomDefinition } from '@/model';

type ListBody = { success: boolean; data?: SymptomDefinition[]; error?: string };

/**
 * Loads active symptom definitions from Express `/api/data/symptom-definitions`.
 */
export const getAllSymptomDefinitions = async (): Promise<ApiResponse<SymptomDefinition[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/symptom-definitions');
    return fromExpressListBody(data, 'Failed to load symptom definitions');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load symptom definitions');
  }
};
