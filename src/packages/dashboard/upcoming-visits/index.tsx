'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { APPOINTMENTS_PATH } from '@/config/routes';
import { useAppSelector } from '@/store';

const UPCOMING_LIMIT = 5;

export const UpcomingVisits = () => {
  const appointmentsDump = useAppSelector((state) => state.appointments);
  const doctorsDump = useAppSelector((state) => state.doctors);
  const hospitalsDump = useAppSelector((state) => state.hospitals);

  const upcoming = useMemo(() => {
    const now = Date.now();
    return Object.values(appointmentsDump)
      .filter((row) => {
        if (row.status === 'cancelled') return false;
        if (row.status === 'completed') return false;
        const at = new Date(row.scheduled_at).getTime();
        return Number.isFinite(at) && at >= now;
      })
      .sort(
        (a, b) =>
          new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime(),
      )
      .slice(0, UPCOMING_LIMIT);
  }, [appointmentsDump]);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Upcoming visits</h2>
        <Link href={APPOINTMENTS_PATH} className={styles.link}>
          View all
        </Link>
      </div>
      {upcoming.length === 0 ? (
        <p className={styles.empty}>No upcoming appointments.</p>
      ) : (
        <ul className={styles.list}>
          {upcoming.map((row) => {
            const doctor = doctorsDump[row.doctor_id];
            const hospital = doctor ? hospitalsDump[doctor.hospital_id] : undefined;
            const when = new Date(row.scheduled_at);
            return (
              <li key={row.id} className={styles.item}>
                <div className={styles.itemPrimary}>
                  {doctor?.name ?? 'Unknown provider'}
                  {row.appointment_type ? ` · ${row.appointment_type}` : ''}
                </div>
                <div className={styles.itemSecondary}>
                  {when.toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                  {hospital?.name ? ` · ${hospital.name}` : ''}
                </div>
                {row.reason ? <div className={styles.itemMeta}>{row.reason}</div> : null}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

const styles = {
  section: `
    rounded-lg border border-gray-200 bg-white p-4
    space-y-3
  `,
  sectionHeader: `flex items-center justify-between gap-3`,
  sectionTitle: `text-base font-semibold text-gray-900`,
  link: `text-sm text-gray-700 underline-offset-2 hover:underline`,
  empty: `text-sm text-gray-500`,
  list: `space-y-3`,
  item: `space-y-0.5`,
  itemPrimary: `text-sm font-medium text-gray-900`,
  itemSecondary: `text-sm text-gray-600`,
  itemMeta: `text-xs text-gray-500`,
} as const;
