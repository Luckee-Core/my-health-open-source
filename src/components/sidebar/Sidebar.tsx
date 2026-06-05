'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LANDING_PATH } from '@/config/routes';
import { getSidebarSections } from './get-sidebar-sections';

export const Sidebar = () => {
  const pathname = usePathname();
  const sections = getSidebarSections();

  return (
    <aside className={styles.aside}>
      <div className={styles.brand}>
        <Link href={LANDING_PATH} className={styles.brandTitle}>
          My Health
        </Link>
      </div>
      <nav className={styles.nav}>
        {sections.map((section) => (
          <div key={section.title}>
            <p className={styles.sectionTitle}>{section.title}</p>
            <ul className={styles.linkList}>
              {section.links.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link href={link.href} className={active ? styles.linkActive : styles.link}>
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

const styles = {
  aside: `
    w-56 shrink-0 border-r border-gray-200 bg-white h-full overflow-y-auto
  `,
  brand: `
    px-4 py-5 border-b border-gray-100
  `,
  brandTitle: `
    text-sm font-semibold text-gray-900 hover:text-gray-700
  `,
  nav: `
    px-3 py-4 space-y-6
  `,
  sectionTitle: `
    px-2 text-xs font-semibold uppercase tracking-wide text-gray-500
  `,
  linkList: `
    mt-2 space-y-1
  `,
  link: `
    block rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100
  `,
  linkActive: `
    block rounded-md px-2 py-1.5 text-sm font-medium bg-gray-100 text-gray-900
  `,
} as const;
