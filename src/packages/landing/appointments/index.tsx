import { Calendar } from 'lucide-react';
import { LandingSectionLabel } from '../section-label';
import {
  LANDING_APPOINTMENT_MOCKS,
  LANDING_APPOINTMENTS_HEADING,
  LANDING_APPOINTMENTS_HEADING_ACCENT,
  LANDING_APPOINTMENTS_LEAD,
} from '../content/landing-content';

const badgeClass = (badge: 'scheduled' | 'completed' | 'cancelled'): string => {
  if (badge === 'scheduled') return styles.badgeScheduled;
  if (badge === 'completed') return styles.badgeCompleted;
  return styles.badgeCancelled;
};

/**
 * Landing appointments section with visit detail mock cards.
 */
export const LandingAppointments = () => {
  return (
    <section id="appointments" className={styles.section}>
      <div className={styles.inner}>
        <LandingSectionLabel number="02" label="Appointments" />
        <div className={styles.grid}>
          <div className={styles.mock}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.iconWrap}>
                  <Calendar className={styles.icon} />
                </span>
                <div>
                  <p className={styles.cardTitle}>Visit details</p>
                  <p className={styles.cardSub}>scheduled_at · type · status · notes</p>
                </div>
              </div>
              <div className={styles.items}>
                {LANDING_APPOINTMENT_MOCKS.map((item) => (
                  <div key={item.d} className={styles.item}>
                    <div>
                      <p className={styles.itemTitle}>{item.t}</p>
                      <p className={styles.itemDoc}>{item.doc}</p>
                    </div>
                    <div className={styles.itemRight}>
                      <p className={styles.itemDate}>{item.d}</p>
                      <span className={`${styles.badge} ${badgeClass(item.badge)}`}>{item.st}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.copy}>
            <h2 className={styles.heading}>
              {LANDING_APPOINTMENTS_HEADING}{' '}
              <span className={styles.accent}>{LANDING_APPOINTMENTS_HEADING_ACCENT}</span>
            </h2>
            <p className={styles.lead}>{LANDING_APPOINTMENTS_LEAD}</p>
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
  mock: `md:col-span-7 order-2 md:order-1`,
  copy: `md:col-span-5 order-1 md:order-2`,
  card: `rounded-xl border border-border bg-card p-6 shadow-sm`,
  cardHeader: `flex items-center gap-3`,
  iconWrap: `grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary`,
  icon: `h-5 w-5`,
  cardTitle: `text-sm font-semibold`,
  cardSub: `text-xs text-muted-foreground`,
  items: `mt-6 space-y-3`,
  item: `flex items-center justify-between rounded-lg border border-border p-3`,
  itemTitle: `text-sm font-medium`,
  itemDoc: `text-xs text-muted-foreground`,
  itemRight: `text-right`,
  itemDate: `text-xs text-muted-foreground`,
  badge: `mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium`,
  badgeScheduled: `bg-primary/10 text-primary`,
  badgeCompleted: `bg-emerald-50 text-emerald-700`,
  badgeCancelled: `bg-muted text-muted-foreground`,
  heading: `text-3xl md:text-4xl font-semibold tracking-tight leading-tight`,
  accent: `text-primary`,
  lead: `mt-5 text-muted-foreground leading-relaxed`,
} as const;
