'use client';

import { useState } from 'react';
import type { DailyEntry } from '@/model/daily-entry';
import { getTodayEntryDate } from './format-entry-date';
import { DailyEntryFormModal } from './form-modal';
import { DailyEntriesTable } from './table';

export const DailyEntriesPage = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [defaultEntryDate, setDefaultEntryDate] = useState<string | undefined>(undefined);
  const [editingEntry, setEditingEntry] = useState<DailyEntry | null>(null);

  const openCreate = (entryDate?: string) => {
    setDefaultEntryDate(entryDate);
    setIsCreateOpen(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Daily log</h1>
          <p className={styles.subtitle}>
            Record how each focus area went on a given day — one note per area per day.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            onClick={() => openCreate(getTodayEntryDate())}
            className={styles.secondaryButton}
          >
            Log today
          </button>
          <button type="button" onClick={() => openCreate()} className={styles.primaryButton}>
            Add entry
          </button>
        </div>
      </div>
      <DailyEntriesTable onEdit={setEditingEntry} />
      <DailyEntryFormModal
        isOpen={isCreateOpen || editingEntry !== null}
        dailyEntry={editingEntry}
        defaultEntryDate={defaultEntryDate}
        onClose={() => {
          setIsCreateOpen(false);
          setEditingEntry(null);
          setDefaultEntryDate(undefined);
        }}
      />
    </div>
  );
};

const styles = {
  page: `space-y-4`,
  header: `flex items-center justify-between gap-4`,
  headerActions: `flex shrink-0 gap-2`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
  primaryButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white`,
  secondaryButton: `rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-800`,
} as const;
