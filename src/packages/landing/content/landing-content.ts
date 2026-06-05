const githubOrg = process.env.NEXT_PUBLIC_GITHUB_ORG ?? 'matthewruiz';

export const GITHUB_WEB_URL =
  process.env.NEXT_PUBLIC_GITHUB_WEB_URL ??
  `https://github.com/${githubOrg}/my-health-open-source`;

export const GITHUB_API_URL =
  process.env.NEXT_PUBLIC_GITHUB_API_URL ??
  `https://github.com/${githubOrg}/my-health-open-source-express-server`;

export const DOCS_URL =
  process.env.NEXT_PUBLIC_DOCS_URL ??
  `${GITHUB_API_URL}/blob/main/docs/README.md`;

export const THT_URL =
  process.env.NEXT_PUBLIC_THT_URL ?? 'https://www.trouthousetech.com';

export const LANDING_BRAND_NAME = 'My Health';

export const LANDING_HERO_KICKER = 'OPEN SOURCE · SELF-HOSTABLE · YOUR DATA';

export const LANDING_HERO_STATS = [
  { h: 'Appointments', s: 'Scheduled visits' },
  { h: 'Care team', s: 'Doctors · facilities · specialties' },
  { h: 'Daily tracking', s: 'Focus areas · daily entries' },
] as const;

export const LANDING_NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Care team', href: '#care-team' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Open source', href: '#open-source' },
  { label: 'Docs', href: '#open-source' },
] as const;

export const LANDING_OVERVIEW_BULLETS = [
  'Upcoming and past appointments in one table',
  'Doctor linked to facility + specialty',
  'Focus areas and daily entries for ongoing health goals',
  'Notes, reason, and appointment type per visit',
] as const;

export const LANDING_DASHBOARD_ROWS = [
  { d: 'Mar 12', doc: 'Dr. Chen', fac: 'Penn Medicine', spec: 'Cardiology', st: 'Scheduled' },
  { d: 'Mar 04', doc: 'Dr. Alvarez', fac: 'Northwell Health', spec: 'Primary Care', st: 'Completed' },
  { d: 'Feb 27', doc: 'Dr. Patel', fac: 'Hospital for Special Surgery', spec: 'Orthopedics', st: 'Completed' },
  { d: 'Feb 18', doc: 'Dr. Brooks', fac: 'Mount Sinai', spec: 'Dermatology', st: 'Cancelled' },
] as const;

export const LANDING_APPOINTMENT_MOCKS = [
  {
    d: 'Mar 12 · 10:30 AM',
    t: 'Cardiology consult',
    doc: 'Dr. Chen · Penn Medicine',
    st: 'Scheduled',
    badge: 'scheduled' as const,
  },
  {
    d: 'Mar 04 · 2:00 PM',
    t: 'Annual physical',
    doc: 'Dr. Alvarez · Northwell',
    st: 'Completed',
    badge: 'completed' as const,
  },
  {
    d: 'Feb 18 · 9:15 AM',
    t: 'Skin check',
    doc: 'Dr. Brooks · Mount Sinai',
    st: 'Cancelled',
    badge: 'cancelled' as const,
  },
] as const;

export const LANDING_CARE_TEAM_CARDS = [
  {
    key: 'doctors',
    title: 'Doctors',
    body: 'Your providers linked to where they practice and what they specialize in.',
  },
  {
    key: 'facilities',
    title: 'Facilities',
    body: 'Hospitals and clinics with address, phone, email, and notes.',
  },
  {
    key: 'specialties',
    title: 'Specialties',
    body: 'Cardiology, Primary Care, Orthopedics — reusable across doctors.',
  },
] as const;

export const LANDING_REPOS = [
  {
    tag: 'web',
    name: 'my-health-open-source',
    body: 'Next.js dashboard. Redux, appointments, care team, focus areas, daily entries.',
    href: GITHUB_WEB_URL,
  },
  {
    tag: 'api',
    name: 'my-health-open-source-express-server',
    body: 'Express CRUD service backed by Supabase.',
    href: GITHUB_API_URL,
  },
] as const;

export const LANDING_CLI_COMMANDS = [
  `git clone ${GITHUB_WEB_URL}.git`,
  `git clone ${GITHUB_API_URL}.git`,
] as const;
