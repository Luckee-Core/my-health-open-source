import Link from "next/link";
import { DOCS_API_PATH } from "@/config/routes";
import {
  GITHUB_API_URL,
  GITHUB_WEB_URL,
} from "@/packages/landing/content/landing-content";
import { docsArticleStyles as styles } from "./article-styles";

const EXPRESS_WIRE_CONTRACT_URL =
  "https://github.com/matthewruiz/my-health-open-source-express-server/blob/main/docs/oss/wire-contract.md";

export const GettingStartedPage = () => {
  return (
    <article className={styles.article}>
      <h1 className={styles.h1}>Getting started</h1>
      <p className={styles.lead}>
        My Health is a <strong>self-hosted care dashboard</strong> for tracking appointments, your care team,
        focus areas, and daily notes on <strong>your</strong> on-device Postgres database. This page walks through running
        the <strong>web + Express pair</strong> locally.
      </p>

      <section className={styles.section}>
        <h2 className={styles.h2}>What you are running</h2>
        <p className={styles.p}>
          Self-hosted My Health is <strong>two repositories</strong>: a <strong>Next.js</strong> dashboard
          (TypeScript, Redux) and an <strong>Express</strong> API for{" "}
          <code className={styles.code}>/api/data</code> REST CRUD. Clone both, configure environment
          variables, apply Postgres SQL migrations with <code className={styles.code}>psql</code>, and keep both processes running while you develop.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Wire contract</h2>
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
              <td className={styles.td}>Success JSON</td>
              <td className={styles.td}>
                <code className={styles.code}>{'{ success: true, data?, count?, message? }'}</code>
              </td>
            </tr>
            <tr>
              <td className={styles.td}>Auth (OSS default)</td>
              <td className={styles.td}>None — local/trusted operator</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>1. Express API</h2>
        <p className={styles.p}>
          Start the API first. Apply database SQL per the Express{" "}
          <a
            href={EXPRESS_WIRE_CONTRACT_URL}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            wire contract
          </a>
          .
        </p>
        <pre className={styles.codeBlock}>
          {`cd my-health-open-source-express-server
cp .env.example .env
# Set DATABASE_URL (see Express docs/how-to/local-postgres-mac.md)
# Apply migrations/*.sql with psql

npm install
npm run dev`}
        </pre>
        <p className={styles.p}>
          Default listen: <code className={styles.code}>http://localhost:3009</code>. Verify with{" "}
          <code className={styles.code}>curl http://localhost:3009/api/health</code> and{" "}
          <code className={styles.code}>curl -s http://localhost:3009/api-docs.json | head -c 200</code>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>2. Web app</h2>
        <pre className={styles.codeBlock}>
          {`cd my-health-open-source
cp .env.example .env.local

npm install
npm run dev`}
        </pre>
        <p className={styles.p}>
          Set in <code className={styles.code}>.env.local</code>:
        </p>
        <pre className={styles.codeBlock}>
          {`NEXT_PUBLIC_API_URL=http://localhost:3009`}
        </pre>
        <p className={styles.p}>
          Open <code className={styles.code}>http://localhost:3000</code> for the landing page; dashboard
          routes live under <code className={styles.code}>/appointments</code>,{" "}
          <code className={styles.code}>/doctors</code>, and related paths.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>3. Smoke test</h2>
        <ol className={styles.ol}>
          <li className={styles.li}>Express health returns success.</li>
          <li className={styles.li}>
            <code className={styles.code}>GET /api-docs.json</code> returns 8 catalog groups.
          </li>
          <li className={styles.li}>Web dashboard loads hospitals and appointments.</li>
          <li className={styles.li}>
            Open <Link href={DOCS_API_PATH} className={styles.link}>API reference</Link> — sidebar shows
            Overview, Health, and six entity groups.
          </li>
        </ol>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Where to go next</h2>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href={DOCS_API_PATH} className={styles.link}>
              API reference
            </Link>{" "}
            — HTTP catalog from Express (requires API running)
          </li>
          <li className={styles.li}>
            <a href={GITHUB_WEB_URL} className={styles.link} target="_blank" rel="noopener noreferrer">
              my-health-open-source on GitHub
            </a>{" "}
            — web README for env details
          </li>
          <li className={styles.li}>
            <a href={GITHUB_API_URL} className={styles.link} target="_blank" rel="noopener noreferrer">
              my-health-open-source-express-server on GitHub
            </a>{" "}
            — API README and SQL migrations
          </li>
        </ul>
      </section>
    </article>
  );
};
