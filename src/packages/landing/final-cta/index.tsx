import { LandingGitHubIcon } from '../github-icon';
import { DOCS_URL, GITHUB_API_URL, GITHUB_WEB_URL } from '../content/landing-content';

/**
 * Landing final CTA band with GitHub links.
 */
export const LandingFinalCta = () => {
  return (
    <section className={styles.section}>
      <div className={styles.gridOverlay} aria-hidden />
      <div className={styles.inner}>
        <p className={styles.kicker}>MISSION</p>
        <h2 className={styles.heading}>
          Self-host your health records. <span className={styles.accent}>Keep the clarity.</span>
        </h2>
        <div className={styles.ctaRow}>
          <a
            href={GITHUB_WEB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaPrimary}
          >
            <LandingGitHubIcon className={styles.ctaIcon} /> GitHub
          </a>
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaGhost}
          >
            Readme
          </a>
          <a
            href={GITHUB_API_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaGhost}
          >
            Express server
          </a>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: `relative overflow-hidden bg-foreground text-background`,
  gridOverlay: `absolute inset-0 grid-overlay-dark pointer-events-none`,
  inner: `relative mx-auto max-w-7xl px-5 sm:px-8 py-24 md:py-32 text-center`,
  kicker: `kicker`,
  heading: `mt-5 mx-auto max-w-3xl text-4xl md:text-5xl font-semibold tracking-tight leading-tight`,
  accent: `text-primary`,
  ctaRow: `mt-9 flex flex-wrap justify-center gap-3`,
  ctaPrimary: `
    inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium
    text-primary-foreground hover:bg-primary-hover transition-colors
  `,
  ctaIcon: `h-4 w-4`,
  ctaGhost: `
    inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-sm
    font-medium text-background hover:bg-white/10 transition-colors
  `,
} as const;
