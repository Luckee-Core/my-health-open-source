'use client';

import { Sidebar } from './sidebar';

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.contentInner}>{children}</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  shell: `
    flex h-screen overflow-hidden bg-gray-50
  `,
  main: `
    flex flex-1 flex-col min-h-0 overflow-y-auto
  `,
  content: `
    flex-1 p-6
  `,
  contentInner: `
    mx-auto max-w-6xl
  `,
} as const;
