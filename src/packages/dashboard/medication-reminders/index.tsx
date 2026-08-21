'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getMedicationDoseReminders } from '@/api/medication-dose-reminders';
import { MEDICATIONS_PATH } from '@/config/routes';
import type { MedicationDoseReminder } from '@/model';
import { logMedicationDoseThunk } from '@/store/thunks';
import { useAppDispatch } from '@/store';

const REFRESH_MS = 30_000;

const formatNextDose = (reminder: MedicationDoseReminder): string => {
  if (reminder.status === 'due') {
    if (!reminder.last_taken_at) {
      return 'Available now — no dose logged yet';
    }
    return 'Time to take your dose';
  }
  if (reminder.minutes_until_due < 60) {
    return `Available in ${reminder.minutes_until_due} min`;
  }
  if (reminder.next_dose_at) {
    return `Next dose at ${new Date(reminder.next_dose_at).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    })}`;
  }
  return 'Waiting for next dose window';
};

const formatInterval = (minutes: number): string => {
  if (minutes % 60 === 0) {
    const hours = minutes / 60;
    return `Every ${hours} hour${hours === 1 ? '' : 's'}`;
  }
  return `Every ${minutes} minutes`;
};

export const MedicationRemindersOverview = () => {
  const dispatch = useAppDispatch();
  const [reminders, setReminders] = useState<MedicationDoseReminder[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState('');

  const loadReminders = useCallback(async () => {
    const result = await getMedicationDoseReminders();
    if (!result.ok) {
      setLoadError('Could not load medication reminders');
      return;
    }
    setLoadError('');
    setReminders(result.data);
  }, []);

  useEffect(() => {
    void loadReminders();
    const timer = window.setInterval(() => {
      void loadReminders();
    }, REFRESH_MS);
    return () => window.clearInterval(timer);
  }, [loadReminders]);

  const sorted = useMemo(() => {
    return [...reminders].sort((a, b) => {
      if (a.status === 'due' && b.status !== 'due') return -1;
      if (b.status === 'due' && a.status !== 'due') return 1;
      return a.minutes_until_due - b.minutes_until_due;
    });
  }, [reminders]);

  const dueCount = useMemo(
    () => sorted.filter((reminder) => reminder.status === 'due').length,
    [sorted],
  );

  const handleTookIt = async (medicationId: string) => {
    setLoadingId(medicationId);
    const status = await dispatch(logMedicationDoseThunk(medicationId));
    setLoadingId(null);
    if (status === 200) {
      await loadReminders();
    }
  };

  return (
    <section className={dueCount > 0 ? styles.sectionAlert : styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Medication reminders
          {dueCount > 0 && <span className={styles.badge}>{dueCount} due</span>}
        </h2>
        <Link href={MEDICATIONS_PATH} className={styles.link}>
          Medications
        </Link>
      </div>

      {loadError && <p className={styles.error}>{loadError}</p>}

      {sorted.length === 0 && !loadError && (
        <p className={styles.body}>
          No interval medications yet. Add instructions like &quot;Take 1 pill every 3 hours&quot; on
          an active medication — the dashboard will alert when the next dose is due.
        </p>
      )}

      <ul className={styles.list}>
        {sorted.map((reminder) => (
          <li
            key={reminder.medication_id}
            className={reminder.status === 'due' ? styles.itemDue : styles.itemWaiting}
          >
            <div className={styles.itemMain}>
              <p className={styles.medName}>{reminder.medication_name}</p>
              <p className={styles.meta}>{formatInterval(reminder.interval_minutes)}</p>
              <p className={reminder.status === 'due' ? styles.dueText : styles.waitText}>
                {formatNextDose(reminder)}
              </p>
              {reminder.last_taken_at && (
                <p className={styles.lastTaken}>
                  Last taken{' '}
                  {new Date(reminder.last_taken_at).toLocaleString([], {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              )}
            </div>
            {reminder.status === 'due' && (
              <button
                type="button"
                className={styles.tookButton}
                disabled={loadingId === reminder.medication_id}
                onClick={() => void handleTookIt(reminder.medication_id)}
              >
                {loadingId === reminder.medication_id ? 'Saving…' : 'Took it'}
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

const styles = {
  section: `rounded-lg border border-gray-200 bg-white p-4 space-y-3`,
  sectionAlert: `rounded-lg border border-amber-300 bg-amber-50 p-4 space-y-3`,
  sectionHeader: `flex items-center justify-between gap-3`,
  sectionTitle: `text-base font-semibold text-gray-900 flex items-center gap-2`,
  badge: `rounded-full bg-amber-600 px-2 py-0.5 text-xs font-medium text-white`,
  link: `text-sm text-gray-700 underline-offset-2 hover:underline shrink-0`,
  body: `text-sm text-gray-600`,
  error: `text-sm text-red-600`,
  list: `space-y-2`,
  itemDue: `
    flex items-start justify-between gap-3 rounded-md border border-amber-400
    bg-white px-3 py-2
  `,
  itemWaiting: `
    flex items-start justify-between gap-3 rounded-md border border-gray-200
    bg-gray-50 px-3 py-2
  `,
  itemMain: `min-w-0 flex-1 space-y-0.5`,
  medName: `text-sm font-semibold text-gray-900`,
  meta: `text-xs text-gray-500`,
  dueText: `text-sm font-medium text-amber-800`,
  waitText: `text-sm text-gray-600`,
  lastTaken: `text-xs text-gray-500`,
  tookButton: `
    shrink-0 rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white
    disabled:opacity-50
  `,
} as const;
