type Props = {
  status: number;
};

/**
 * Shown when the Express catalog cannot be loaded (server down or misconfigured).
 */
export const ApiDocsUnavailable = (props: Props) => {
  const { status } = props;

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>API documentation unavailable</h1>
      <p className={styles.lead}>
        Could not load the catalog from Express (status {status}). Start{" "}
        <strong className={styles.strong}>my-health-open-source-express-server</strong> on port{" "}
        <strong className={styles.strong}>3009</strong>. Set{" "}
        <code className={styles.code}>NEXT_PUBLIC_API_URL</code> in{" "}
        <code className={styles.code}>.env.local</code> to your Express base URL.
      </p>
      <p className={styles.hint}>
        See <strong className={styles.strong}>Getting started</strong> in the sidebar for the full local setup
        checklist.
      </p>
    </div>
  );
};

const styles = {
  wrap: `
    max-w-2xl mx-auto w-full
  `,
  title: `
    text-2xl font-semibold text-foreground
  `,
  lead: `
    mt-4 text-sm text-muted-foreground leading-relaxed
  `,
  strong: `
    font-semibold text-foreground
  `,
  code: `
    rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground
  `,
  hint: `
    mt-6 text-sm text-muted-foreground
  `,
};
