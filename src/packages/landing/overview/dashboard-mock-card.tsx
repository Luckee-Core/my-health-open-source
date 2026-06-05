import { Plus } from 'lucide-react';
import { LANDING_DASHBOARD_ROWS } from '../content/landing-content';

const statusClass = (status: string): string => {
  if (status === 'Scheduled') return styles.badgeScheduled;
  if (status === 'Completed') return styles.badgeCompleted;
  return styles.badgeCancelled;
};

/**
 * Presentational mock of the appointments dashboard for the landing overview section.
 */
export const LandingDashboardMockCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <p className={styles.sidebarLabel}>Visits</p>
          <p className={styles.sidebarActive}>Appointments</p>
          <p className={styles.sidebarSection}>Care team</p>
          <ul className={styles.sidebarList}>
            <li className={styles.sidebarItem}>Doctors</li>
            <li className={styles.sidebarItem}>Facilities</li>
            <li className={styles.sidebarItem}>Specialties</li>
          </ul>
        </aside>
        <div className={styles.main}>
          <div className={styles.header}>
            <div>
              <p className={styles.headerTitle}>Appointments</p>
              <p className={styles.headerSub}>4 visits</p>
            </div>
            <button type="button" className={styles.addButton}>
              <Plus className={styles.addIcon} /> Add appointment
            </button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  <th className={styles.th}>Date</th>
                  <th className={styles.th}>Doctor</th>
                  <th className={styles.th}>Facility</th>
                  <th className={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {LANDING_DASHBOARD_ROWS.map((row) => (
                  <tr key={`${row.d}-${row.doc}`} className={styles.tr}>
                    <td className={styles.tdMuted}>{row.d}</td>
                    <td className={styles.tdStrong}>{row.doc}</td>
                    <td className={styles.tdMuted}>
                      {row.fac}
                      <span className={styles.spec}>{row.spec}</span>
                    </td>
                    <td className={styles.td}>
                      <span className={`${styles.badge} ${statusClass(row.st)}`}>{row.st}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: `rounded-xl border border-border bg-card shadow-sm overflow-hidden`,
  layout: `flex`,
  sidebar: `hidden sm:block w-44 border-r border-border bg-muted/40 p-4 text-xs`,
  sidebarLabel: `section-label mb-2`,
  sidebarActive: `rounded-md bg-primary/10 px-2 py-1 text-primary font-medium`,
  sidebarSection: `section-label mt-5 mb-2`,
  sidebarList: `space-y-1 text-muted-foreground`,
  sidebarItem: `px-2 py-1`,
  main: `flex-1 min-w-0`,
  header: `flex items-center justify-between border-b border-border px-4 py-3`,
  headerTitle: `text-sm font-semibold`,
  headerSub: `text-xs text-muted-foreground`,
  addButton: `
    inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium
    text-primary-foreground
  `,
  addIcon: `h-3 w-3`,
  tableWrap: `overflow-x-auto`,
  table: `w-full text-sm`,
  theadRow: `text-left text-xs text-muted-foreground`,
  th: `px-4 py-2 font-medium`,
  tr: `border-t border-border`,
  td: `px-4 py-3`,
  tdMuted: `px-4 py-3 text-muted-foreground`,
  tdStrong: `px-4 py-3 font-medium`,
  spec: `block text-xs`,
  badge: `inline-flex rounded-full px-2 py-0.5 text-xs font-medium`,
  badgeScheduled: `bg-primary/10 text-primary`,
  badgeCompleted: `bg-emerald-50 text-emerald-700`,
  badgeCancelled: `bg-muted text-muted-foreground`,
} as const;
