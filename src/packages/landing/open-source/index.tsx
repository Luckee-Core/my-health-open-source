import { ArrowRight } from 'lucide-react';
import { LandingGitHubIcon } from '../github-icon';
import { LandingSectionLabel } from '../section-label';
import {
  DOCS_URL,
  LANDING_OPEN_SOURCE_HEADING,
  LANDING_OPEN_SOURCE_HEADING_ACCENT,
  LANDING_OPEN_SOURCE_LEAD,
  LANDING_REPOS,
} from '../content/landing-content';

/**
 * Landing open source section with repo cards.
 */
export const LandingOpenSource = () => {
  return (
    <section id="open-source" className={styles.section}>
      <div className={styles.inner}>
        <LandingSectionLabel number="05" label="Open source" />
        <h2 className={styles.heading}>
          {LANDING_OPEN_SOURCE_HEADING}{' '}
          <span className={styles.accent}>{LANDING_OPEN_SOURCE_HEADING_ACCENT}</span>
        </h2>
        <p className={styles.lead}>{LANDING_OPEN_SOURCE_LEAD}</p>
        <div className={styles.repos}>
          {LANDING_REPOS.map((repo) => (
            <a
              key={repo.name}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.repoCard}
            >
              <div className={styles.repoHead}>
                <div className={styles.repoNameRow}>
                  <LandingGitHubIcon className={styles.repoIcon} />
                  <span className={styles.repoName}>{repo.name}</span>
                </div>
                <span className={styles.repoTag}>{repo.tag}</span>
              </div>
              <p className={styles.repoBody}>{repo.body}</p>
              <span className={styles.repoHover}>
                View repo <ArrowRight className={styles.repoHoverIcon} />
              </span>
            </a>
          ))}
        </div>
        <a
          href={DOCS_URL}
          id="docs"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.docsLink}
        >
          Read the docs <ArrowRight className={styles.docsIcon} />
        </a>
      </div>
    </section>
  );
};

const styles = {
  section: `border-b border-border bg-muted/30`,
  inner: `mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28`,
  heading: `mt-6 max-w-3xl text-3xl md:text-4xl font-semibold tracking-tight leading-tight`,
  accent: `text-primary`,
  lead: `mt-5 max-w-2xl text-muted-foreground leading-relaxed`,
  repos: `mt-10 grid gap-5 md:grid-cols-2`,
  repoCard: `
    group rounded-xl border border-border bg-card p-6 transition-all
    hover:border-primary hover:shadow-md
  `,
  repoHead: `flex items-center justify-between`,
  repoNameRow: `flex items-center gap-2`,
  repoIcon: `h-4 w-4`,
  repoName: `font-mono text-sm`,
  repoTag: `
    rounded-full border border-border px-2 py-0.5 text-[11px] uppercase
    tracking-[0.18em] text-muted-foreground
  `,
  repoBody: `mt-4 text-sm text-muted-foreground leading-relaxed`,
  repoHover: `
    mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground opacity-0
    transition-opacity group-hover:opacity-100 group-hover:text-primary
  `,
  repoHoverIcon: `h-4 w-4`,
  docsLink: `
    mt-8 inline-flex items-center gap-1 text-sm font-medium text-primary
    hover:text-primary-hover
  `,
  docsIcon: `h-4 w-4`,
} as const;
