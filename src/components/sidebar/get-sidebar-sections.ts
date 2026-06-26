import {
  APPOINTMENTS_PATH,
  DAILY_ENTRIES_PATH,
  DOCTORS_PATH,
  FOCUS_AREAS_PATH,
  HOSPITALS_PATH,
  MEDICAL_HISTORY_EVENTS_PATH,
  RESEARCH_NOTES_PATH,
  SPECIALTIES_PATH,
  SYMPTOM_LOGS_PATH,
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
    title: 'Health record',
    links: [
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
