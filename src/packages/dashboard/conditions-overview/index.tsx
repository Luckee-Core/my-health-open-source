'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { CONDITIONS_PATH } from '@/config/routes';
import { useAppSelector } from '@/store';

const ACTIVE_LIMIT = 8;

export const ConditionsOverview = () => {
  const conditionsDump = useAppSelector((state) => state.conditions);

  const { active, resolvedCount, total } = useMemo(() => {
    const all = Object.values(conditionsDump);
    const activeRows = all
      .filter((row) => row.status === 'active')
      .sort((a, b) => a.name.localeCompare(b.name));
    return {
      active: activeRows.slice(0, ACTIVE_LIMIT),
      resolvedCount: all.filter((row) => row.status === 'resolved').length,
      total: all.length,
    };
  }, [conditionsDump]);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Conditions</h2>
        <Link href={CONDITIONS_PATH} className={styles.link}>
          View all
        </Link>
      </div>
      <p className={styles.summary}>
        {total === 0
          ? 'No conditions on file.'
          : `${active.length}${total > ACTIVE_LIMIT ? '+' : ''} active · ${resolvedCount} resolved · ${total} total`}
      </p>
      {active.length > 0 ? (
        <ul className={styles.list}>
          {active.map((row) => (
            <li key={row.id} className={styles.item}>
              <div className={styles.itemPrimary}>{row.name}</div>
              <div className={styles.itemSecondary}>
                {[
                  row.noted_on ? `Noted ${row.noted_on}` : null,
                  row.diagnosed_on ? `Diagnosed ${row.diagnosed_on}` : null,
                ]
                  .filter(Boolean)
                  .join(' · ') || 'Active'}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
};

const styles = {
  section: `
    rounded-lg border border-gray-200 bg-white p-4
    space-y-3
  `,
  sectionHeader: `flex items-center justify-between gap-3`,
  sectionTitle: `text-base font-semibold text-gray-900`,
  link: `text-sm text-gray-700 underline-offset-2 hover:underline`,
  summary: `text-sm text-gray-600`,
  list: `space-y-3`,
  item: `space-y-0.5`,
  itemPrimary: `text-sm font-medium text-gray-900`,
  itemSecondary: `text-sm text-gray-600`,
} as const;
