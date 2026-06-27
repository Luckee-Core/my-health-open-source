import type { Metadata } from 'next';
import { MarketingLanding } from '@/packages/landing';

export const metadata: Metadata = {
  title: 'My Health — Open-source personal health tracker',
  description:
    'Track appointments, care team, focus areas, and health record timeline in one self-hostable dashboard. Next.js + Express + Postgres.',
  openGraph: {
    title: 'My Health — Open-source personal health tracker',
    description:
      'Self-hostable personal health app — appointments, care team, symptom logs, and research notes. Your stack, your records.',
    type: 'website',
  },
};

export default function Page() {
  return <MarketingLanding />;
}
