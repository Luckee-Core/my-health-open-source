import { updateSymptomLog, type UpdateSymptomLogPayload } from '@/api/symptom-logs';
import { SymptomLogsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Updates a symptom log and upserts it into the dump.
 */
export const updateSymptomLogThunk =
  (id: string, payload: UpdateSymptomLogPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await updateSymptomLog(id, payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(SymptomLogsActions.upsertSymptomLog(result.data));
    return 200;
  };
