'use client';

import Link from 'next/link';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

/**
 * Trail of linked ancestors plus the current page label.
 */
export const Breadcrumbs = ({ items }: Props) => {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {index > 0 && (
                <span className={styles.separator} aria-hidden="true">
                  /
                </span>
              )}
              {item.href && !isLast ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? styles.current : styles.link}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

const styles = {
  list: `flex flex-wrap items-center gap-1 text-sm text-gray-600`,
  item: `inline-flex items-center gap-1 min-w-0`,
  separator: `text-gray-400`,
  link: `hover:text-gray-900`,
  current: `truncate font-medium text-gray-900`,
} as const;
