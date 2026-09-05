import { getAllSymptomLogs } from '@/api/symptom-logs';
import { SymptomLogsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Loads all symptom logs into the dump.
 */
export const loadSymptomLogsThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await getAllSymptomLogs();
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(
      SymptomLogsActions.setSymptomLogs(
        Object.fromEntries(result.data.map((row) => [row.id, row])),
      ),
    );
    return 200;
  };
