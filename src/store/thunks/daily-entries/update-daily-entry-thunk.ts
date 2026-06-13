import { updateDailyEntry, type UpdateDailyEntryPayload } from '@/api/daily-entries';
import { DailyEntriesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Updates a daily entry and upserts it into the dump.
 */
export const updateDailyEntryThunk =
  (id: string, payload: UpdateDailyEntryPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await updateDailyEntry(id, payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(DailyEntriesActions.upsertDailyEntry(result.data));
    return 200;
  };
