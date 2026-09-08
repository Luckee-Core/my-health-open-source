import { deleteFeedLog } from '@/api/feed-logs';
import { FeedLogsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Deletes a feed log and removes it from the dump.
 */
export const deleteFeedLogThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await deleteFeedLog(id);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(FeedLogsActions.removeFeedLog(id));
    return 200;
  };
