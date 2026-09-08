import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressBody, fromExpressListBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { SpeechTherapyConsumption, SpeechTherapyConsumptionType } from '@/model';

type ListBody = { success: boolean; data?: SpeechTherapyConsumption[]; error?: string };
type EntityBody = { success: boolean; data?: SpeechTherapyConsumption; error?: string };

export type IncrementSpeechTherapyConsumptionPayload = {
  consumption_type: SpeechTherapyConsumptionType;
  log_date: string;
  delta: number;
};

/**
 * Loads speech therapy consumption rows.
 */
export const getAllSpeechTherapyConsumption = async (): Promise<
  ApiResponse<SpeechTherapyConsumption[]>
> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/speech-therapy-consumption');
    return fromExpressListBody(data, 'Failed to load speech therapy consumption');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load speech therapy consumption');
  }
};

/**
 * Atomically increments a consumption row for a type and date.
 */
export const incrementSpeechTherapyConsumption = async (
  payload: IncrementSpeechTherapyConsumptionPayload,
): Promise<ApiResponse<SpeechTherapyConsumption>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>(
      '/api/data/speech-therapy-consumption/increment',
      payload,
    );
    return fromExpressBody(data, 'Failed to update speech therapy consumption');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update speech therapy consumption');
  }
};
