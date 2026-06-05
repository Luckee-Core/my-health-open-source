import { LandingSectionLabel } from '../section-label';
import { LANDING_OVERVIEW_BULLETS } from '../content/landing-content';
import { LandingDashboardMockCard } from './dashboard-mock-card';

/**
 * Landing overview section with copy and dashboard mock.
 */
export const LandingOverview = () => {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.inner}>
        <LandingSectionLabel number="01" label="Overview" />
        <div className={styles.grid}>
          <div className={styles.copy}>
            <h2 className={styles.heading}>
              One place for visits and your <span className={styles.accent}>care team</span>.
            </h2>
            <p className={styles.lead}>
              Appointments pull location from the doctor&apos;s facility automatically. No scattered
              notes, no guessing which hospital that specialist uses.
            </p>
            <ul className={styles.list}>
              {LANDING_OVERVIEW_BULLETS.map((bullet) => (
                <li key={bullet} className={styles.listItem}>
                  <span className={styles.bullet}>→</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.mock}>
            <LandingDashboardMockCard />
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: `border-b border-border`,
  inner: `mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28`,
  grid: `mt-8 grid gap-12 md:grid-cols-12 md:gap-10 items-start`,
  copy: `md:col-span-5`,
  heading: `text-3xl md:text-4xl font-semibold tracking-tight leading-tight`,
  accent: `text-primary`,
  lead: `mt-5 text-muted-foreground leading-relaxed`,
  list: `mt-7 space-y-3 text-sm`,
  listItem: `flex gap-2`,
  bullet: `text-primary mt-0.5`,
  mock: `md:col-span-7`,
} as const;
