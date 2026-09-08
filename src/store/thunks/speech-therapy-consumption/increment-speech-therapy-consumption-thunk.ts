import { incrementSpeechTherapyConsumption } from '@/api/speech-therapy-consumption';
import type { SpeechTherapyConsumptionType } from '@/model';
import { SpeechTherapyConsumptionActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Atomically increments a consumption row for a type and date.
 */
export const incrementSpeechTherapyConsumptionThunk =
  (
    consumptionType: SpeechTherapyConsumptionType,
    logDate: string,
    delta: number,
  ): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await incrementSpeechTherapyConsumption({
      consumption_type: consumptionType,
      log_date: logDate,
      delta,
    });
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(SpeechTherapyConsumptionActions.upsertSpeechTherapyConsumption(result.data));
    return 200;
  };
