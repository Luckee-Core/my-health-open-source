'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import {
  ALLERGIES_PATH,
  APPOINTMENTS_PATH,
  CLINICAL_NOTES_PATH,
  CLINICAL_RESULTS_PATH,
  CONDITIONS_PATH,
  DOCTORS_PATH,
  HEALTH_IMPORTS_PATH,
  INSURANCE_COVERAGES_PATH,
  MEDICATIONS_PATH,
  REFERRALS_PATH,
  VITAL_SIGNS_PATH,
} from '@/config/routes';
import { useAppDispatch, useAppSelector } from '@/store';
import { resetHealthImportThunk } from '@/store/thunks';

export const DoneStep = () => {
  const dispatch = useAppDispatch();
  const builder = useAppSelector((state) => state.healthImportBuilder);

  const links = useMemo(
    () =>
      [
        { href: ALLERGIES_PATH, label: 'Allergies', count: builder.allergiesCount },
        { href: MEDICATIONS_PATH, label: 'Medications', count: builder.medicationsCount },
        { href: CONDITIONS_PATH, label: 'Conditions', count: builder.conditionsCount },
        { href: VITAL_SIGNS_PATH, label: 'Vital signs', count: builder.vitalSignsCount },
        { href: CLINICAL_RESULTS_PATH, label: 'Results', count: builder.clinicalResultsCount },
        { href: CLINICAL_NOTES_PATH, label: 'Clinical notes', count: builder.clinicalNotesCount },
        { href: REFERRALS_PATH, label: 'Referrals', count: builder.referralsCount },
        { href: INSURANCE_COVERAGES_PATH, label: 'Insurance', count: builder.insuranceCoveragesCount },
        { href: DOCTORS_PATH, label: 'Doctors', count: builder.doctorsCount },
        { href: APPOINTMENTS_PATH, label: 'Appointments', count: builder.appointmentsCount },
        { href: HEALTH_IMPORTS_PATH, label: 'Import history', count: 1 },
      ].filter((item) => item.count > 0),
    [builder],
  );

  return (
    <div className={styles.panel}>
      <h2 className={styles.heading}>Import complete</h2>
      <p className={styles.body}>
        {builder.filename} was imported successfully.
      </p>
      <ul className={styles.linkList}>
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.link}>
              {item.label}
              {item.href !== HEALTH_IMPORTS_PATH ? ` (${item.count})` : ''}
            </Link>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={styles.primaryButton}
        onClick={() => void dispatch(resetHealthImportThunk())}
      >
        Import another file
      </button>
    </div>
  );
};

const styles = {
  panel: `rounded-lg border border-gray-200 bg-white p-6 space-y-4`,
  heading: `text-lg font-semibold text-gray-900`,
  body: `text-sm text-gray-600`,
  linkList: `space-y-1 text-sm`,
  link: `text-gray-800 underline hover:text-gray-950`,
  primaryButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white`,
} as const;
