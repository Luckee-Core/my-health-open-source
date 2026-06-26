import { deleteSymptomLog } from '@/api/symptom-logs';
import { SymptomLogsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Deletes a symptom log and removes it from the dump.
 */
export const deleteSymptomLogThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await deleteSymptomLog(id);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(SymptomLogsActions.removeSymptomLog(id));
    return 200;
  };
