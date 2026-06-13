import { deleteDailyEntry } from '@/api/daily-entries';
import { DailyEntriesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Deletes a daily entry and removes it from the dump.
 */
export const deleteDailyEntryThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await deleteDailyEntry(id);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(DailyEntriesActions.removeDailyEntry(id));
    return 200;
  };
