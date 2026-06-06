import type { ApiDocsEndpoint, ApiDocsHttpMethod } from "@/api/api-docs";

type Props = {
  endpoint: ApiDocsEndpoint;
  anchorId: string;
};

const methodStyleKey = (method: ApiDocsHttpMethod): keyof typeof styles => {
  if (method === "GET") return "methodGet";
  if (method === "POST") return "methodPost";
  if (method === "PATCH") return "methodPatch";
  return "methodDelete";
};

const formatJson = (value: unknown): string => JSON.stringify(value, null, 2);

/**
 * Renders one API endpoint section (method, path, request, responses).
 */
export const EndpointCard = (props: Props) => {
  const { endpoint, anchorId } = props;

  return (
    <article id={anchorId} className={styles.card}>
      <div className={styles.header}>
        <span className={`${styles.method} ${styles[methodStyleKey(endpoint.method)]}`}>
          {endpoint.method}
        </span>
        <code className={styles.path}>{endpoint.path}</code>
      </div>
      <h3 className={styles.summary}>{endpoint.summary}</h3>
      {endpoint.description ? <p className={styles.description}>{endpoint.description}</p> : null}

      {endpoint.queryParams && endpoint.queryParams.length > 0 ? (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Query parameters</h4>
          <ul className={styles.queryList}>
            {endpoint.queryParams.map((param) => (
              <li key={param.name} className={styles.queryItem}>
                <code className={styles.queryName}>{param.name}</code>
                {param.required ? <span className={styles.required}>required</span> : null}
                <span className={styles.queryDesc}>{param.description}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {endpoint.requestBody ? (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Request body ({endpoint.requestBody.contentType})</h4>
          <pre className={styles.pre}>{formatJson(endpoint.requestBody.example)}</pre>
        </div>
      ) : null}

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Responses</h4>
        {endpoint.responses.map((response) => (
          <div key={`${response.status}-${response.description}`} className={styles.responseBlock}>
            <div className={styles.responseHeader}>
              <span className={styles.statusCode}>{response.status}</span>
              <span className={styles.responseDesc}>{response.description}</span>
            </div>
            <pre className={styles.pre}>{formatJson(response.example)}</pre>
          </div>
        ))}
      </div>
    </article>
  );
};

const styles = {
  card: `
    scroll-mt-24 rounded-xl border border-border bg-card p-6 shadow-sm
  `,
  header: `
    flex flex-wrap items-center gap-3
  `,
  method: `
    rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide
  `,
  methodGet: `
    bg-emerald-100 text-emerald-800
  `,
  methodPost: `
    bg-blue-100 text-blue-800
  `,
  methodPatch: `
    bg-amber-100 text-amber-800
  `,
  methodDelete: `
    bg-red-100 text-red-800
  `,
  path: `
    font-mono text-sm text-foreground
  `,
  summary: `
    mt-3 text-lg font-semibold text-foreground
  `,
  description: `
    mt-2 text-sm text-muted-foreground
  `,
  section: `
    mt-5
  `,
  sectionTitle: `
    text-sm font-semibold text-foreground
  `,
  queryList: `
    mt-2 space-y-2
  `,
  queryItem: `
    flex flex-wrap items-baseline gap-2 text-sm
  `,
  queryName: `
    rounded bg-muted px-1.5 py-0.5 font-mono text-xs
  `,
  required: `
    text-xs font-medium text-amber-700
  `,
  queryDesc: `
    text-muted-foreground
  `,
  responseBlock: `
    mt-3
  `,
  responseHeader: `
    mb-2 flex items-center gap-2
  `,
  statusCode: `
    rounded bg-muted px-2 py-0.5 font-mono text-xs font-semibold
  `,
  responseDesc: `
    text-sm text-muted-foreground
  `,
  pre: `
    overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 font-mono text-xs leading-relaxed text-foreground
  `,
};
