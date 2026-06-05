import { LANDING_BRAND_NAME } from './content/landing-content';

/**
 * Landing page brand mark — logo + wordmark linking to page top.
 */
export const LandingBrandMark = () => {
  return (
    <a href="#top" className={styles.root}>
      <span className={styles.logo}>M</span>
      <span className={styles.name}>{LANDING_BRAND_NAME}</span>
    </a>
  );
};

const styles = {
  root: `flex items-center gap-2`,
  logo: `
    grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground
    text-sm font-semibold
  `,
  name: `text-[15px] font-semibold tracking-tight`,
} as const;
