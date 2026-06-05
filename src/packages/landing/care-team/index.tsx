import { Building2, Layers, Stethoscope } from 'lucide-react';
import { LandingSectionLabel } from '../section-label';
import {
  LANDING_CARE_TEAM_CARDS,
  LANDING_CARE_TEAM_HEADING,
  LANDING_CARE_TEAM_HEADING_ACCENT,
} from '../content/landing-content';

const CARD_ICONS = {
  doctors: Stethoscope,
  facilities: Building2,
  specialties: Layers,
} as const;

/**
 * Landing care team section with three feature cards.
 */
export const LandingCareTeam = () => {
  return (
    <section id="care-team" className={styles.section}>
      <div className={styles.inner}>
        <LandingSectionLabel number="03" label="Care team" />
        <h2 className={styles.heading}>
          {LANDING_CARE_TEAM_HEADING}{' '}
          <span className={styles.accent}>{LANDING_CARE_TEAM_HEADING_ACCENT}</span>
        </h2>
        <div className={styles.grid}>
          {LANDING_CARE_TEAM_CARDS.map((card) => {
            const Icon = CARD_ICONS[card.key as keyof typeof CARD_ICONS];
            return (
              <div key={card.key} className={styles.card}>
                <span className={styles.iconWrap}>
                  <Icon className={styles.icon} />
                </span>
                <p className={styles.cardTitle}>{card.title}</p>
                <p className={styles.cardBody}>{card.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: `border-b border-border`,
  inner: `mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28`,
  heading: `mt-6 max-w-3xl text-3xl md:text-4xl font-semibold tracking-tight leading-tight`,
  accent: `text-primary`,
  grid: `mt-10 grid gap-5 md:grid-cols-3`,
  card: `
    rounded-xl border border-border bg-card p-6 transition-all
    hover:shadow-md hover:-translate-y-0.5
  `,
  iconWrap: `grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary`,
  icon: `h-5 w-5`,
  cardTitle: `mt-4 text-base font-semibold`,
  cardBody: `mt-2 text-sm text-muted-foreground leading-relaxed`,
} as const;
