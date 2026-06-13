import Link from "next/link";
import { DOCS_API_PATH, DOCS_GETTING_STARTED_PATH } from "@/config/routes";
import { docsArticleStyles as styles } from "./article-styles";

export const DocsOverviewPage = () => {
  return (
    <article className={styles.article}>
      <h1 className={styles.h1}>Documentation</h1>
      <p className={styles.lead}>
        My Health is a <strong>self-hosted care dashboard</strong> — appointments, doctors, hospitals,
        specialties, focus areas, and daily notes on <strong>your</strong> on-device Postgres database. These docs
        cover running the web + Express pair locally and browsing the HTTP API.
      </p>

      <section className={styles.section}>
        <h2 className={styles.h2}>Guides</h2>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href={DOCS_GETTING_STARTED_PATH} className={styles.link}>
              Getting started
            </Link>{" "}
            — clone both repos, configure env, smoke-test the stack
          </li>
          <li className={styles.li}>
            <Link href={DOCS_API_PATH} className={styles.link}>
              API reference
            </Link>{" "}
            — live catalog from Express (requires API running on port 3009)
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Wire contract (summary)</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Field</th>
              <th className={styles.th}>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.td}>Default web port</td>
              <td className={styles.td}>
                <code className={styles.code}>3000</code>
              </td>
            </tr>
            <tr>
              <td className={styles.td}>Default API port</td>
              <td className={styles.td}>
                <code className={styles.code}>3009</code>
              </td>
            </tr>
            <tr>
              <td className={styles.td}>API base env (web)</td>
              <td className={styles.td}>
                <code className={styles.code}>NEXT_PUBLIC_API_URL</code>
              </td>
            </tr>
            <tr>
              <td className={styles.td}>Health endpoint</td>
              <td className={styles.td}>
                <code className={styles.code}>GET /api/health</code>
              </td>
            </tr>
            <tr>
              <td className={styles.td}>Data CRUD</td>
              <td className={styles.td}>
                <code className={styles.code}>/api/data/*</code> REST collection paths
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
};
