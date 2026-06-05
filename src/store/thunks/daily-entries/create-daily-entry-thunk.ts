import { createDailyEntry, type CreateDailyEntryPayload } from '@/api/daily-entries';
import { DailyEntriesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import type { ThunkResult } from '@/store/thunks/thunk-result';

/**
 * Creates a daily entry and upserts it into the dump.
 */
export const createDailyEntryThunk =
  (payload: CreateDailyEntryPayload): AppThunk<Promise<ThunkResult>> =>
  async (dispatch) => {
    const result = await createDailyEntry(payload);
    if (!result.ok) {
      return {
        status: result.status >= 500 ? 500 : 400,
        message: result.error.message,
      };
    }
    dispatch(DailyEntriesActions.upsertDailyEntry(result.data));
    return { status: 200 };
  };
