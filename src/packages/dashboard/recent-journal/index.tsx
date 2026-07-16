'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { DAILY_ENTRIES_PATH } from '@/config/routes';
import { useAppSelector } from '@/store';

const RECENT_LIMIT = 5;

export const RecentJournal = () => {
  const entriesDump = useAppSelector((state) => state.dailyEntries);
  const focusAreasDump = useAppSelector((state) => state.focusAreas);

  const recent = useMemo(() => {
    return Object.values(entriesDump)
      .sort((a, b) => {
        const byDate = b.entry_date.localeCompare(a.entry_date);
        if (byDate !== 0) return byDate;
        return b.created_at.localeCompare(a.created_at);
      })
      .slice(0, RECENT_LIMIT);
  }, [entriesDump]);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Recent journal</h2>
        <Link href={DAILY_ENTRIES_PATH} className={styles.link}>
          View all
        </Link>
      </div>
      {recent.length === 0 ? (
        <p className={styles.empty}>No journal entries yet.</p>
      ) : (
        <ul className={styles.list}>
          {recent.map((row) => {
            const focus = focusAreasDump[row.focus_area_id];
            const notePreview =
              row.notes && row.notes.trim().length > 0
                ? row.notes.trim().length > 120
                  ? `${row.notes.trim().slice(0, 120)}…`
                  : row.notes.trim()
                : null;
            return (
              <li key={row.id} className={styles.item}>
                <div className={styles.itemPrimary}>
                  {row.entry_date}
                  {focus?.name ? ` · ${focus.name}` : ''}
                </div>
                {notePreview ? <div className={styles.itemSecondary}>{notePreview}</div> : null}
              </li>
            );
          })}
        </ul>
      )}
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
  empty: `text-sm text-gray-500`,
  list: `space-y-3`,
  item: `space-y-0.5`,
  itemPrimary: `text-sm font-medium text-gray-900`,
  itemSecondary: `text-sm text-gray-600`,
} as const;
