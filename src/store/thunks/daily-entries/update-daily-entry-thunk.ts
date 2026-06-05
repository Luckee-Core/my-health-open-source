import { updateDailyEntry, type UpdateDailyEntryPayload } from '@/api/daily-entries';
import { DailyEntriesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import type { ThunkResult } from '@/store/thunks/thunk-result';

/**
 * Updates a daily entry and upserts it into the dump.
 */
export const updateDailyEntryThunk =
  (id: string, payload: UpdateDailyEntryPayload): AppThunk<Promise<ThunkResult>> =>
  async (dispatch) => {
    const result = await updateDailyEntry(id, payload);
    if (!result.ok) {
      return {
        status: result.status >= 500 ? 500 : 400,
        message: result.error.message,
      };
    }
    dispatch(DailyEntriesActions.upsertDailyEntry(result.data));
    return { status: 200 };
  };
