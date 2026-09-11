import { CurrentFeedLogActions } from '@/store/current';
import type { AppThunk } from '@/store/types';
import { getLocalDateKey } from '@/utils/date';
import { buildEmptyMorningFeedLog, findFeedLogForDate } from '@/packages/tube-feed/utils';

/**
 * Copies today's dump row (or empty morning defaults) into currentFeedLog.
 */
export const hydrateCurrentFeedLogThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const { feedLogs, feedFormulas, currentFeedLog } = getState();
    const todayKey = getLocalDateKey();
    const todayLog = findFeedLogForDate(feedLogs, todayKey);
    if (todayLog) {
      if (
        currentFeedLog.id === '' ||
        currentFeedLog.id === todayLog.id ||
        currentFeedLog.log_date !== todayKey
      ) {
        dispatch(CurrentFeedLogActions.setCurrentFeedLog(todayLog));
      }
      return 200;
    }

    if (currentFeedLog.log_date === todayKey && currentFeedLog.id === '') {
      if (!currentFeedLog.formula_id) {
        const empty = buildEmptyMorningFeedLog(feedLogs, feedFormulas, todayKey);
        dispatch(CurrentFeedLogActions.patchCurrentFeedLog({ formula_id: empty.formula_id }));
      }
      return 200;
    }

    dispatch(
      CurrentFeedLogActions.setCurrentFeedLog(
        buildEmptyMorningFeedLog(feedLogs, feedFormulas, todayKey),
      ),
    );
    return 200;
  };
