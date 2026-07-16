import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressListBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { ClinicalNote } from '@/model';

type ListBody = { success: boolean; data?: ClinicalNote[]; error?: string };

/**
 * Loads all clinicalNotes from Express `/api/data/clinical-notes`.
 */
export const getAllClinicalNotes = async (): Promise<ApiResponse<ClinicalNote[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/clinical-notes');
    return fromExpressListBody(data, 'Failed to load clinicalNotes');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load clinicalNotes');
  }
};
