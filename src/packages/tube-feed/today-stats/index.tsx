'use client';

import { useMemo } from 'react';
import { useAppSelector } from '@/store';
import { getLocalDateKey } from '@/utils/date';
import {
  buildFeedDayRows,
  findFeedLogForDate,
  findLatestFeedLog,
  formatBagHoursRemaining,
  formatFeedCalories,
  formatFeedVolume,
} from '../utils';

export const FeedTodayStats = () => {
  const logsDump = useAppSelector((state) => state.feedLogs);
  const formulasDump = useAppSelector((state) => state.feedFormulas);
  const todayKey = useMemo(() => getLocalDateKey(), []);

  const todayLog = useMemo(
    () => findFeedLogForDate(logsDump, todayKey),
    [logsDump, todayKey],
  );
  const latestLog = useMemo(() => findLatestFeedLog(logsDump), [logsDump]);
  const displayLog = todayLog ?? latestLog;

  const todayRow = useMemo(() => {
    const rows = buildFeedDayRows(logsDump, formulasDump);
    return rows.find((row) => row.log.id === todayLog?.id) ?? null;
  }, [logsDump, formulasDump, todayLog]);

  if (!displayLog) {
    return null;
  }

  return (
    <div className={styles.grid}>
      <div className={styles.stat}>
        <p className={styles.label}>Since prior snapshot</p>
        <p className={styles.value}>{todayRow ? formatFeedVolume(todayRow.volumeMl) : '—'}</p>
      </div>
      <div className={styles.stat}>
        <p className={styles.label}>Calories</p>
        <p className={styles.value}>{todayRow ? formatFeedCalories(todayRow.calories) : '—'}</p>
      </div>
      <div className={styles.stat}>
        <p className={styles.label}>Bag remaining</p>
        <p className={styles.value}>
          {formatBagHoursRemaining(
            displayLog.feed_left_ml,
            displayLog.intermittent_rate_ml_per_hr,
          )}
        </p>
      </div>
      {todayRow?.isImplicitReset && (
        <p className={styles.warning}>
          Total fed is lower than yesterday without a reset flag. Calories used today’s pump total.
        </p>
      )}
    </div>
  );
};

const styles = {
  grid: `grid gap-3 sm:grid-cols-3`,
  stat: `rounded-lg border border-gray-200 bg-gray-50 px-3 py-2`,
  label: `text-xs text-gray-500`,
  value: `text-sm font-medium text-gray-900`,
  warning: `sm:col-span-3 text-sm text-amber-800`,
} as const;
