import {
  APPOINTMENTS_PATH,
  DAILY_ENTRIES_PATH,
  DOCTORS_PATH,
  FOCUS_AREAS_PATH,
  HOSPITALS_PATH,
  SPECIALTIES_PATH,
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
