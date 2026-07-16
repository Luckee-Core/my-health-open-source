import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressListBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { Referral } from '@/model';

type ListBody = { success: boolean; data?: Referral[]; error?: string };

/**
 * Loads all referrals from Express `/api/data/referrals`.
 */
export const getAllReferrals = async (): Promise<ApiResponse<Referral[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/referrals');
    return fromExpressListBody(data, 'Failed to load referrals');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load referrals');
  }
};
