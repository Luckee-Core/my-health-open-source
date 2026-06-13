import { createDailyEntry, type CreateDailyEntryPayload } from '@/api/daily-entries';
import { DailyEntriesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates a daily entry and upserts it into the dump.
 */
export const createDailyEntryThunk =
  (payload: CreateDailyEntryPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await createDailyEntry(payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(DailyEntriesActions.upsertDailyEntry(result.data));
    return 200;
  };
