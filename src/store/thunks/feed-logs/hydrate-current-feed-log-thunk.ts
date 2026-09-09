import { CurrentFeedLogActions } from '@/store/current';
import type { AppThunk } from '@/store/types';
import { getLocalDateKey } from '@/utils/date';
import {
  buildEmptyMorningFeedLog,
  findFeedLogForDate,
  findFeedStartLog,
} from '@/packages/tube-feed/utils';

/**
 * Copies today's morning dump row (or empty morning defaults) into currentFeedLog.
 * Never loads the one-time start row into the morning form.
 */
export const hydrateCurrentFeedLogThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const { feedLogs, feedFormulas, currentFeedLog } = getState();
    const todayKey = getLocalDateKey();
    const todayLog = findFeedLogForDate(feedLogs, todayKey);
    const startLog = findFeedStartLog(feedLogs);
    const emptyMorning = () =>
      buildEmptyMorningFeedLog(feedLogs, feedFormulas, todayKey);

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

    if (startLog) {
      const isLeftoverStartForm =
        currentFeedLog.id === startLog.id ||
        currentFeedLog.log_date !== todayKey ||
        (currentFeedLog.id === '' &&
          currentFeedLog.total_fed_ml === startLog.total_fed_ml);

      if (isLeftoverStartForm || currentFeedLog.id !== '') {
        dispatch(CurrentFeedLogActions.setCurrentFeedLog(emptyMorning()));
        return 200;
      }

      if (!currentFeedLog.formula_id) {
        dispatch(
          CurrentFeedLogActions.patchCurrentFeedLog({
            formula_id: emptyMorning().formula_id,
          }),
        );
      }
      return 200;
    }

    if (currentFeedLog.log_date === todayKey && currentFeedLog.id === '') {
      if (!currentFeedLog.formula_id) {
        dispatch(
          CurrentFeedLogActions.patchCurrentFeedLog({
            formula_id: emptyMorning().formula_id,
          }),
        );
      }
      return 200;
    }

    dispatch(CurrentFeedLogActions.setCurrentFeedLog(emptyMorning()));
    return 200;
  };
