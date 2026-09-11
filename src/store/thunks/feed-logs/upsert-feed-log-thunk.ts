import { upsertFeedLog } from '@/api/feed-logs';
import { FeedLogsBuilderActions } from '@/store/builders';
import { CurrentFeedLogActions } from '@/store/current';
import { FeedLogsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Saves the editing feed log from currentFeedLog.
 */
export const upsertFeedLogThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const current = getState().currentFeedLog;

    dispatch(FeedLogsBuilderActions.setSaveError(''));
    dispatch(FeedLogsBuilderActions.setSaveStatus('saving'));

    if (!current.formula_id) {
      dispatch(FeedLogsBuilderActions.setSaveError('Add a formula before logging.'));
      dispatch(FeedLogsBuilderActions.setSaveStatus('error'));
      return 400;
    }
    if (!(current.intermittent_rate_ml_per_hr > 0)) {
      dispatch(FeedLogsBuilderActions.setSaveError('Rate must be greater than 0'));
      dispatch(FeedLogsBuilderActions.setSaveStatus('error'));
      return 400;
    }
    if (!(current.feed_left_ml >= 0)) {
      dispatch(FeedLogsBuilderActions.setSaveError('Feed left must be 0 or more'));
      dispatch(FeedLogsBuilderActions.setSaveStatus('error'));
      return 400;
    }
    if (!(current.total_fed_ml >= 0)) {
      dispatch(FeedLogsBuilderActions.setSaveError('Total fed must be 0 or more'));
      dispatch(FeedLogsBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const result = await upsertFeedLog({
      log_date: current.log_date,
      formula_id: current.formula_id,
      intermittent_rate_ml_per_hr: current.intermittent_rate_ml_per_hr,
      feed_left_ml: current.feed_left_ml,
      total_fed_ml: current.total_fed_ml,
      pump_reset: current.pump_reset,
      notes: current.notes?.trim() || null,
    });

    if (!result.ok) {
      dispatch(FeedLogsBuilderActions.setSaveError(result.error.message));
      dispatch(FeedLogsBuilderActions.setSaveStatus('error'));
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(FeedLogsActions.upsertFeedLog(result.data));
    dispatch(CurrentFeedLogActions.setCurrentFeedLog(result.data));
    dispatch(FeedLogsBuilderActions.setSaveStatus('success'));
    return 200;
  };
