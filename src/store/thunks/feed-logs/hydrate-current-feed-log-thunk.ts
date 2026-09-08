import { EMPTY_FEED_LOG } from '@/model';
import { CurrentFeedLogActions } from '@/store/current';
import type { AppThunk } from '@/store/types';
import { getLocalDateKey } from '@/utils/date';
import { findFeedLogForDate } from '@/packages/tube-feed/utils';

/**
 * Copies today's dump row (or empty defaults) into currentFeedLog.
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
        const formulas = Object.values(feedFormulas);
        const active = formulas.filter((row) => row.is_active);
        const pool = active.length > 0 ? active : formulas;
        const sorted = [...pool].sort((a, b) => {
          const brand = a.brand.localeCompare(b.brand);
          if (brand !== 0) return brand;
          return a.name.localeCompare(b.name);
        });
        if (sorted[0]) {
          dispatch(CurrentFeedLogActions.patchCurrentFeedLog({ formula_id: sorted[0].id }));
        }
      }
      return 200;
    }

    const formulas = Object.values(feedFormulas);
    const active = formulas.filter((row) => row.is_active);
    const pool = active.length > 0 ? active : formulas;
    const sorted = [...pool].sort((a, b) => {
      const brand = a.brand.localeCompare(b.brand);
      if (brand !== 0) return brand;
      return a.name.localeCompare(b.name);
    });

    dispatch(
      CurrentFeedLogActions.setCurrentFeedLog({
        ...EMPTY_FEED_LOG,
        log_date: todayKey,
        formula_id: sorted[0]?.id ?? '',
      }),
    );
    return 200;
  };
