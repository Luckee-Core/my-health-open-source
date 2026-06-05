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

export const LANDING_HERO_KICKER = 'OPEN SOURCE · SELF-HOSTED · YOUR SUPABASE';

export const LANDING_HERO_HEADLINE =
  "Stop re-typing which hospital your specialist uses.";

export const LANDING_HERO_HEADLINE_ACCENT = 'One dashboard for visits and your care team.';

export const LANDING_HERO_SUB =
  'I built this for myself — appointments, doctors, facilities, focus areas, and daily notes — on a stack I already run for client work: Next.js, Express, Supabase. Your records stay on your project, not a vendor portal.';

export const LANDING_HERO_STATS = [
  { h: 'Appointments', s: 'Scheduled, completed, cancelled — one table' },
  { h: 'Care team', s: 'Doctor → facility → specialty, linked once' },
  { h: 'Daily notes', s: 'Focus areas you are actually tracking' },
] as const;

export const LANDING_NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Care team', href: '#care-team' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Open source', href: '#open-source' },
  { label: 'Docs', href: '#open-source' },
] as const;

export const LANDING_OVERVIEW_HEADING = 'Visits and care team in';
export const LANDING_OVERVIEW_HEADING_ACCENT = 'one place — not three apps.';

export const LANDING_OVERVIEW_LEAD =
  'Pick a doctor once. Their facility and specialty ride along on every appointment. Location is not something you re-enter because you forgot which campus they use.';

export const LANDING_OVERVIEW_BULLETS = [
  'Upcoming and past appointments in one table',
  'Doctor linked to facility + specialty — no duplicate typing',
  'Focus areas and daily entries for what you are tracking between visits',
  'Notes, reason, and appointment type on each visit row',
] as const;

export const LANDING_DASHBOARD_ROWS = [
  { d: 'Mar 12', doc: 'Dr. Chen', fac: 'Penn Medicine', spec: 'Cardiology', st: 'Scheduled' },
  { d: 'Mar 04', doc: 'Dr. Alvarez', fac: 'Northwell Health', spec: 'Primary Care', st: 'Completed' },
  { d: 'Feb 27', doc: 'Dr. Patel', fac: 'Hospital for Special Surgery', spec: 'Orthopedics', st: 'Completed' },
  { d: 'Feb 18', doc: 'Dr. Brooks', fac: 'Mount Sinai', spec: 'Dermatology', st: 'Cancelled' },
] as const;

export const LANDING_APPOINTMENTS_HEADING = 'Every visit';
export const LANDING_APPOINTMENTS_HEADING_ACCENT = 'searchable — not buried in email.';

export const LANDING_APPOINTMENTS_LEAD =
  'Create an appointment against a doctor. Facility address comes from their hospital record. That is the whole point of linking the tables instead of free-texting everything.';

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

export const LANDING_CARE_TEAM_HEADING = 'Doctors, facilities, specialties —';
export const LANDING_CARE_TEAM_HEADING_ACCENT = 'linked, not copy-pasted.';

export const LANDING_CARE_TEAM_CARDS = [
  {
    key: 'doctors',
    title: 'Doctors',
    body: 'Name, notes, and foreign keys to where they practice and what they do — not a flat contact card.',
  },
  {
    key: 'facilities',
    title: 'Facilities',
    body: 'Hospitals and clinics with address, phone, email. One source of truth for visit location.',
  },
  {
    key: 'specialties',
    title: 'Specialties',
    body: 'Cardiology, primary care, ortho — reusable labels across doctors instead of typos in every row.',
  },
] as const;

export const LANDING_ARCHITECTURE_HEADING = 'Two repos, one wire contract —';
export const LANDING_ARCHITECTURE_HEADING_ACCENT = 'the split I use on OSS dashboards.';

export const LANDING_ARCHITECTURE_LEAD =
  'Browser app in Next.js. CRUD in a thin Express service. Supabase holds the rows. Redux manual thunks on the web side; handlers stay thin on the API. Clone both, point at your project, run locally.';

export const LANDING_ARCHITECTURE_CARD_TITLE = 'Clone both repos, wire your Supabase';

export const LANDING_OPEN_SOURCE_HEADING = 'Next.js front end,';
export const LANDING_OPEN_SOURCE_HEADING_ACCENT = 'Express data service.';

export const LANDING_OPEN_SOURCE_LEAD =
  'MIT license. SQL migrations in the API repo. No service-role key in the browser — only NEXT_PUBLIC_API_URL. Fork it, self-host it, or strip pieces for your own health stack.';

export const LANDING_REPOS = [
  {
    tag: 'web',
    name: 'my-health-open-source',
    body: 'Dashboard + landing. Redux, src/packages/, thin app routes — same layout discipline I use elsewhere.',
    href: GITHUB_WEB_URL,
  },
  {
    tag: 'api',
    name: 'my-health-open-source-express-server',
    body: 'Express /api/data CRUD backed by Supabase. Managed client at startup; one handler file per route.',
    href: GITHUB_API_URL,
  },
] as const;

export const LANDING_CLI_COMMANDS = [
  `git clone ${GITHUB_WEB_URL}.git`,
  `git clone ${GITHUB_API_URL}.git`,
] as const;

export const LANDING_FINAL_CTA_KICKER = 'GET STARTED';

export const LANDING_FINAL_CTA_HEADING = 'Run it on your machine.';
export const LANDING_FINAL_CTA_HEADING_ACCENT = 'Keep the records there too.';

export const LANDING_FOOTER_TAGLINE =
  'Open-source health tracker I built to stop juggling portal printouts and scattered notes.';
