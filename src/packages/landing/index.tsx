import { LandingNav } from './nav';
import { LandingHero } from './hero';
import { LandingOverview } from './overview';
import { LandingAppointments } from './appointments';
import { LandingCareTeam } from './care-team';
import { LandingHealthRecord } from './health-record';
import { LandingArchitecture } from './architecture';
import { LandingOpenSource } from './open-source';
import { LandingFinalCta } from './final-cta';
import { LandingFooter } from './footer';

/**
 * Marketing landing page composer — hero, feature sections, CTA, footer.
 */
export const MarketingLanding = () => {
  return (
    <div className={styles.page}>
      <LandingNav />
      <main>
        <LandingHero />
        <LandingOverview />
        <LandingAppointments />
        <LandingCareTeam />
        <LandingHealthRecord />
        <LandingArchitecture />
        <LandingOpenSource />
        <LandingFinalCta />
      </main>
      <LandingFooter />
    </div>
  );
};

const styles = {
  page: `min-h-screen bg-background text-foreground antialiased`,
} as const;
