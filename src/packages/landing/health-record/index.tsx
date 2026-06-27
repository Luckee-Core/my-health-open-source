import { Activity, FileText, Stethoscope } from 'lucide-react';
import { LandingSectionLabel } from '../section-label';
import {
  LANDING_HEALTH_RECORD_HEADING,
  LANDING_HEALTH_RECORD_HEADING_ACCENT,
  LANDING_HEALTH_RECORD_LEAD,
  LANDING_HEALTH_RECORD_TIMELINE,
} from '../content/landing-content';

/**
 * Landing health record section — timeline, symptoms, research notes.
 */
export const LandingHealthRecord = () => {
  return (
    <section id="health-record" className={styles.section}>
      <div className={styles.inner}>
        <LandingSectionLabel number="04" label="Health record" />
        <div className={styles.grid}>
          <div className={styles.copy}>
            <h2 className={styles.heading}>
              {LANDING_HEALTH_RECORD_HEADING}{' '}
              <span className={styles.accent}>{LANDING_HEALTH_RECORD_HEADING_ACCENT}</span>
            </h2>
            <p className={styles.lead}>{LANDING_HEALTH_RECORD_LEAD}</p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Stethoscope className={styles.listIcon} />
                Medical history events — procedures, diagnoses, milestones
              </li>
              <li className={styles.listItem}>
                <Activity className={styles.listIcon} />
                Symptom logs — severity and notes when something changes
              </li>
              <li className={styles.listItem}>
                <FileText className={styles.listIcon} />
                Research notes — open `/research-note-detail-page` for long-form write-ups
              </li>
            </ul>
          </div>
          <div className={styles.mock}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>Timeline</p>
              <ul className={styles.timeline}>
                {LANDING_HEALTH_RECORD_TIMELINE.map((row) => (
                  <li key={row.title} className={styles.row}>
                    <div>
                      <p className={styles.rowTitle}>{row.title}</p>
                      <p className={styles.rowDate}>{row.date}</p>
                    </div>
                    <span className={styles.tag}>{row.tag}</span>
                  </li>
                ))}
              </ul>
            </div>
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
  mock: `md:col-span-7`,
  heading: `text-3xl md:text-4xl font-semibold tracking-tight leading-tight`,
  accent: `text-primary`,
  lead: `mt-5 text-muted-foreground leading-relaxed`,
  list: `mt-8 space-y-4`,
  listItem: `flex items-start gap-3 text-sm text-muted-foreground`,
  listIcon: `mt-0.5 h-4 w-4 shrink-0 text-primary`,
  card: `rounded-xl border border-border bg-card p-6 shadow-sm`,
  cardTitle: `text-sm font-semibold`,
  timeline: `mt-6 space-y-3`,
  row: `flex items-start justify-between gap-4 rounded-lg border border-border p-3`,
  rowTitle: `text-sm font-medium`,
  rowDate: `mt-1 text-xs text-muted-foreground`,
  tag: `shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary`,
} as const;
