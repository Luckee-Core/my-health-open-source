import {
  ALLERGIES_PATH,
  APPOINTMENTS_PATH,
  CLINICAL_NOTES_PATH,
  CLINICAL_RESULTS_PATH,
  CONDITIONS_PATH,
  DAILY_ENTRIES_PATH,
  DOCTORS_PATH,
  FOCUS_AREAS_PATH,
  HEALTH_IMPORT_PATH,
  HEALTH_IMPORTS_PATH,
  HOSPITALS_PATH,
  INSURANCE_COVERAGES_PATH,
  MEDICAL_HISTORY_EVENTS_PATH,
  MEDICATIONS_PATH,
  REFERRALS_PATH,
  RESEARCH_NOTES_PATH,
  SPECIALTIES_PATH,
  SYMPTOM_LOGS_PATH,
  VITAL_SIGNS_PATH,
} from '@/config/routes';

export type SidebarLink = {
  name: string;
  href: string;
};

export type SidebarSection = {
  title: string;
  links: SidebarLink[];
};

export const getSidebarSections = (): SidebarSection[] => [
  {
    title: 'Data',
    links: [
      { name: 'Import health summary', href: HEALTH_IMPORT_PATH },
      { name: 'Import history', href: HEALTH_IMPORTS_PATH },
    ],
  },
  {
    title: 'Health record',
    links: [
      { name: 'Allergies', href: ALLERGIES_PATH },
      { name: 'Medications', href: MEDICATIONS_PATH },
      { name: 'Conditions', href: CONDITIONS_PATH },
      { name: 'Vitals', href: VITAL_SIGNS_PATH },
      { name: 'Results', href: CLINICAL_RESULTS_PATH },
      { name: 'Clinical notes', href: CLINICAL_NOTES_PATH },
      { name: 'Referrals', href: REFERRALS_PATH },
      { name: 'Insurance', href: INSURANCE_COVERAGES_PATH },
      { name: 'Medical history', href: MEDICAL_HISTORY_EVENTS_PATH },
      { name: 'Symptoms', href: SYMPTOM_LOGS_PATH },
      { name: 'Research notes', href: RESEARCH_NOTES_PATH },
    ],
  },
  {
    title: 'Journal',
    links: [
      { name: 'Daily log', href: DAILY_ENTRIES_PATH },
      { name: 'Focus areas', href: FOCUS_AREAS_PATH },
    ],
  },
  {
    title: 'Visits',
    links: [{ name: 'Appointments', href: APPOINTMENTS_PATH }],
  },
  {
    title: 'Care team',
    links: [
      { name: 'Doctors', href: DOCTORS_PATH },
      { name: 'Facilities', href: HOSPITALS_PATH },
      { name: 'Specialties', href: SPECIALTIES_PATH },
    ],
  },
];
