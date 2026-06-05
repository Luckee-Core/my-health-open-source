type LandingSectionLabelProps = {
  number: string;
  label: string;
};

/**
 * Numbered section label for landing page sections (e.g. 01 Overview).
 */
export const LandingSectionLabel = ({ number, label }: LandingSectionLabelProps) => {
  return (
    <p className={styles.label}>
      <span className={styles.number}>{number}</span>
      &nbsp;{label}
    </p>
  );
};

const styles = {
  label: `section-label`,
  number: `text-primary`,
} as const;
