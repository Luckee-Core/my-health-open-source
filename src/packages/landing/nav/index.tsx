'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ExternalLink, Menu, X } from 'lucide-react';
import { HOME_PATH } from '@/config/routes';
import { LandingBrandMark } from '../brand-mark';
import { GITHUB_WEB_URL, LANDING_NAV_LINKS } from '../content/landing-content';

/**
 * Sticky landing navigation with desktop links and mobile menu.
 */
export const LandingNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <LandingBrandMark />
        <nav className={styles.desktopNav} aria-label="Main">
          {LANDING_NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
          <a
            href={GITHUB_WEB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLinkExternal}
          >
            GitHub <ExternalLink className={styles.externalIcon} />
          </a>
        </nav>
        <div className={styles.desktopCtas}>
          <Link href={HOME_PATH} className={styles.ctaSecondary}>
            Open dashboard
          </Link>
          <a href="#open-source" className={styles.ctaPrimary}>
            Clone &amp; self-host
          </a>
        </div>
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className={styles.menuIcon} /> : <Menu className={styles.menuIcon} />}
        </button>
      </div>
      {open && (
        <div className={styles.mobilePanel}>
          <div className={styles.mobileLinks}>
            {LANDING_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={styles.mobileLink}
              >
                {link.label}
              </a>
            ))}
            <a
              href={GITHUB_WEB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileLink}
            >
              GitHub
            </a>
            <div className={styles.mobileCtas}>
              <Link href={HOME_PATH} className={styles.mobileDashboard} onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <a href="#open-source" className={styles.mobileSelfHost} onClick={() => setOpen(false)}>
                Self-host
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const styles = {
  header: `
    sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur
  `,
  inner: `
    mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8
  `,
  desktopNav: `
    hidden items-center gap-7 text-sm text-muted-foreground md:flex
  `,
  navLink: `hover:text-foreground transition-colors`,
  navLinkExternal: `inline-flex items-center gap-1 hover:text-foreground transition-colors`,
  externalIcon: `h-3 w-3`,
  desktopCtas: `hidden items-center gap-2 md:flex`,
  ctaSecondary: `
    rounded-md border border-border px-3 py-1.5 text-sm font-medium
    hover:bg-muted transition-colors
  `,
  ctaPrimary: `
    rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground
    hover:bg-primary-hover transition-colors
  `,
  menuButton: `md:hidden text-foreground`,
  menuIcon: `h-5 w-5`,
  mobilePanel: `border-t border-border bg-background md:hidden`,
  mobileLinks: `flex flex-col px-5 py-4 gap-3 text-sm`,
  mobileLink: `text-muted-foreground`,
  mobileCtas: `flex gap-2 pt-2`,
  mobileDashboard: `
    flex-1 rounded-md border border-border px-3 py-2 text-center font-medium
  `,
  mobileSelfHost: `
    flex-1 rounded-md bg-primary px-3 py-2 text-center font-medium text-primary-foreground
  `,
} as const;
