"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DOCS_PATH, LANDING_PATH } from "@/config/routes";
import { LANDING_BRAND_NAME } from "@/packages/landing/content/landing-content";
import { DOCS_NAV_ENTRIES, type DocsNavEntry, type DocsSidebarLeaf } from "@/packages/docs/navigation";

const getHrefHash = (href: string): string => {
  const hashIndex = href.indexOf("#");
  return hashIndex === -1 ? "" : href.slice(hashIndex);
};

const isLinkActive = (href: string, pathname: string): boolean => {
  if (href === DOCS_PATH) {
    return pathname === DOCS_PATH;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
};

const renderGuideEntry = (entry: DocsNavEntry, pathname: string) => {
  if (entry.kind === "label") {
    return (
      <li key={entry.text} className={styles.labelRow}>
        <p className={styles.sectionLabel}>{entry.text}</p>
      </li>
    );
  }
  const active = isLinkActive(entry.href, pathname);
  return (
    <li key={entry.href}>
      <Link href={entry.href} prefetch={false} className={active ? styles.linkActive : styles.link}>
        {entry.name}
      </Link>
    </li>
  );
};

const renderApiEntity = (entity: DocsSidebarLeaf, pathname: string, hash: string) => {
  const entityHash = getHrefHash(entity.href);
  const entityPath = entity.href.split("#")[0];
  const active = pathname === entityPath && hash === entityHash;

  return (
    <li key={entity.href}>
      <a href={entity.href} className={active ? styles.linkActive : styles.link}>
        {entity.name}
      </a>
    </li>
  );
};

type DocsSidebarProps = {
  apiGroupNav: DocsSidebarLeaf[];
};

/**
 * Left rail for `/docs`: guides from {@link DOCS_NAV_ENTRIES} + API catalog groups.
 */
export const DocsSidebar = (props: DocsSidebarProps) => {
  const { apiGroupNav } = props;
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  const guideItems = useMemo(
    () => DOCS_NAV_ENTRIES.map((entry) => renderGuideEntry(entry, pathname)),
    [pathname],
  );

  const apiItems = useMemo(
    () => apiGroupNav.map((entity) => renderApiEntity(entity, pathname, hash)),
    [apiGroupNav, pathname, hash],
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.inner}>
        <Link href="/" prefetch={false} className={styles.brand}>
          <span className={styles.logoMark}>M</span>
          <span className={styles.brandTextBlock}>
            <span className={styles.brandTitle}>{LANDING_BRAND_NAME}</span>
            <span className={styles.brandSub}>Documentation</span>
          </span>
        </Link>
        <nav className={styles.nav} aria-label="Guides">
          <p className={styles.sectionLabel}>Guides</p>
          <ul className={styles.list}>{guideItems}</ul>
        </nav>
        <nav className={styles.nav} aria-label="API">
          <p className={styles.sectionLabel}>API</p>
          <ul className={styles.list}>{apiItems}</ul>
          {apiGroupNav.length === 0 ? (
            <p className={styles.apiHint}>Start Express to load API entities.</p>
          ) : null}
        </nav>
        <Link href="/" prefetch={false} className={styles.back}>
          ← Back to site
        </Link>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: `
    w-full shrink-0 border-b border-border bg-muted/40
    lg:w-56 lg:border-b-0 lg:border-r
  `,
  inner: `flex flex-col gap-6 p-4 lg:sticky lg:top-0 lg:h-screen lg:max-h-screen lg:overflow-y-auto`,
  brand: `flex items-center gap-2`,
  logoMark: `
    flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground
  `,
  brandTextBlock: `flex min-w-0 flex-col leading-tight`,
  brandTitle: `text-sm font-semibold text-foreground tracking-tight truncate`,
  brandSub: `text-xs text-muted-foreground truncate`,
  nav: `flex flex-col gap-2`,
  sectionLabel: `text-[11px] font-mono uppercase tracking-[0.12em] text-muted-foreground`,
  list: `flex flex-col gap-0.5`,
  labelRow: `mt-1 list-none first:mt-0`,
  link: `
    rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors
    hover:bg-muted hover:text-foreground
  `,
  linkActive: `
    rounded-md bg-muted px-2 py-1.5 text-sm font-medium text-foreground
  `,
  apiHint: `text-xs text-muted-foreground leading-relaxed`,
  back: `text-xs text-muted-foreground hover:text-foreground transition-colors mt-auto`,
};
