'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { DOCTORS_PATH } from '@/config/routes';
import { useAppSelector } from '@/store';

const CARE_TEAM_LIMIT = 8;

export const CareTeamOverview = () => {
  const doctorsDump = useAppSelector((state) => state.doctors);
  const hospitalsDump = useAppSelector((state) => state.hospitals);
  const specialtiesDump = useAppSelector((state) => state.specialties);

  const doctors = useMemo(() => {
    return Object.values(doctorsDump)
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, CARE_TEAM_LIMIT);
  }, [doctorsDump]);

  const total = useMemo(() => Object.keys(doctorsDump).length, [doctorsDump]);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Care team</h2>
        <Link href={DOCTORS_PATH} className={styles.link}>
          View all
        </Link>
      </div>
      {doctors.length === 0 ? (
        <p className={styles.empty}>No providers yet.</p>
      ) : (
        <>
          {total > CARE_TEAM_LIMIT ? (
            <p className={styles.summary}>Showing {CARE_TEAM_LIMIT} of {total}</p>
          ) : null}
          <ul className={styles.list}>
            {doctors.map((row) => {
              const hospital = hospitalsDump[row.hospital_id];
              const specialty = specialtiesDump[row.specialty_id];
              return (
                <li key={row.id} className={styles.item}>
                  <div className={styles.itemPrimary}>{row.name}</div>
                  <div className={styles.itemSecondary}>
                    {[specialty?.name, hospital?.name].filter(Boolean).join(' · ') || '—'}
                  </div>
                </li>
              );
            })}
          </ul>
        </>
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
  summary: `text-sm text-gray-600`,
  list: `space-y-3`,
  item: `space-y-0.5`,
  itemPrimary: `text-sm font-medium text-gray-900`,
  itemSecondary: `text-sm text-gray-600`,
} as const;
