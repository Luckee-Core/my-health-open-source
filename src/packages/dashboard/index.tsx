'use client';

import { CareTeamOverview } from './care-team-overview';
import { ConditionsOverview } from './conditions-overview';
import { MorningCheckInOverview } from './morning-check-in-overview';
import { RecentJournal } from './recent-journal';
import { UpcomingVisits } from './upcoming-visits';

export const DashboardPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            Upcoming visits, recent journal notes, conditions, and your care team at a glance.
          </p>
        </div>
      </div>
      <div className={styles.grid}>
        <UpcomingVisits />
        <MorningCheckInOverview />
        <RecentJournal />
        <ConditionsOverview />
        <CareTeamOverview />
      </div>
    </div>
  );
};

const styles = {
  page: `space-y-6`,
  header: `flex items-center justify-between gap-4`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
  grid: `
    grid gap-4
    lg:grid-cols-2
  `,
} as const;
