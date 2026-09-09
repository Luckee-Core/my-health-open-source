'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { TUBE_FEED_PATH } from '@/config/routes';
import { useAppSelector } from '@/store';
import { getLocalDateKey } from '@/utils/date';
import {
  buildFeedDayRows,
  findFeedLogForDate,
  findFeedStartLog,
  findLatestFeedLog,
  formatBagHoursRemaining,
  formatFeedCalories,
  formatFeedVolume,
} from '@/packages/tube-feed/utils';

export const TubeFeedOverview = () => {
  const logsDump = useAppSelector((state) => state.feedLogs);
  const formulasDump = useAppSelector((state) => state.feedFormulas);
  const todayKey = useMemo(() => getLocalDateKey(), []);
  const todayLog = useMemo(
    () => findFeedLogForDate(logsDump, todayKey),
    [logsDump, todayKey],
  );
  const startLog = useMemo(() => findFeedStartLog(logsDump), [logsDump]);
  const latestLog = useMemo(() => findLatestFeedLog(logsDump), [logsDump]);
  const todayRow = useMemo(() => {
    const rows = buildFeedDayRows(logsDump, formulasDump);
    return rows.find((row) => row.log.id === todayLog?.id) ?? null;
  }, [logsDump, formulasDump, todayLog]);
  const displayLog = todayLog ?? latestLog;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Tube feed</h2>
        <Link href={TUBE_FEED_PATH} className={styles.link}>
          Open
        </Link>
      </div>
      {!startLog || !displayLog ? (
        <p className={styles.body}>Start tracking with the current pump total — a one-time starting point.</p>
      ) : (
        <div className={styles.stats}>
          {todayRow && !todayRow.isBaseline && (
            <p className={styles.body}>
              {`${formatFeedCalories(todayRow.calories)} since the prior snapshot (${formatFeedVolume(todayRow.volumeMl)}).`}
            </p>
          )}
          <p className={styles.body}>
            Feed left {formatFeedVolume(displayLog.feed_left_ml)} ·{' '}
            {formatBagHoursRemaining(
              displayLog.feed_left_ml,
              displayLog.intermittent_rate_ml_per_hr,
            )}{' '}
            remaining at {displayLog.intermittent_rate_ml_per_hr} mL/hr
          </p>
        </div>
      )}
    </section>
  );
};

const styles = {
  section: `
    rounded-lg border border-gray-200 bg-white p-4
    space-y-2
  `,
  sectionHeader: `flex items-center justify-between gap-3`,
  sectionTitle: `text-base font-semibold text-gray-900`,
  link: `text-sm text-gray-700 underline-offset-2 hover:underline`,
  body: `text-sm text-gray-600`,
  stats: `space-y-1`,
} as const;
