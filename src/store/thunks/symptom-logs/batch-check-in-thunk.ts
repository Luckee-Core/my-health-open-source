import { batchCheckInSymptomLogs, type BatchCheckInPayload } from '@/api/symptom-logs';
import { SymptomLogsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import { loadSymptomLogsThunk } from './load-symptom-logs-thunk';

/**
 * Submits a morning check-in batch and reloads symptom logs.
 */
export const batchCheckInThunk =
  (payload: BatchCheckInPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await batchCheckInSymptomLogs(payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    for (const row of result.data) {
      dispatch(SymptomLogsActions.upsertSymptomLog(row));
    }
    await dispatch(loadSymptomLogsThunk());
    return 200;
  };
