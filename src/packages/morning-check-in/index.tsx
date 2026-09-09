'use client';

import { useEffect, useMemo } from 'react';
import { batchCheckInThunk, hydrateMorningCheckInThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { TodayTracker } from '@/packages/speech-therapy/today-tracker';
import { FeedSnapshotForm } from '@/packages/tube-feed/snapshot-form';
import { findFeedStartLog } from '@/packages/tube-feed/utils';
import { MorningCheckInSymptoms } from './symptoms';

export const MorningCheckInPage = () => {
  const dispatch = useAppDispatch();
  const definitionsDump = useAppSelector((state) => state.symptomDefinitions);
  const logsDump = useAppSelector((state) => state.feedLogs);
  const builder = useAppSelector((state) => state.morningCheckInBuilder);
  const isSaving = builder.saveStatus === 'saving';
  const hasStarted = useMemo(() => findFeedStartLog(logsDump) != null, [logsDump]);

  useEffect(() => {
    void dispatch(hydrateMorningCheckInThunk());
  }, [dispatch]);

  const sortedDefinitions = useMemo(
    () =>
      [...Object.values(definitionsDump)].sort((a, b) => {
        const byOrder = a.sort_order - b.sort_order;
        if (byOrder !== 0) return byOrder;
        return a.name.localeCompare(b.name);
      }),
    [definitionsDump],
  );

  const handleSubmit = async () => {
    await dispatch(batchCheckInThunk());
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Morning check-in</h1>
          <p className={styles.subtitle}>
            Log symptom severity for last night, this morning, and now. Only rows with a severity
            are saved.
          </p>
        </div>
        <button
          type="button"
          disabled={isSaving || builder.isLoading}
          onClick={() => void handleSubmit()}
          className={styles.primaryButton}
        >
          {isSaving ? 'Saving…' : 'Submit check-in'}
        </button>
      </div>

      {builder.loadError && <p className={styles.error}>{builder.loadError}</p>}
      {builder.saveError && <p className={styles.error}>{builder.saveError}</p>}
      {builder.saveStatus === 'success' && <p className={styles.success}>Check-in saved.</p>}

      <section className={styles.therapySection}>
        <h2 className={styles.sectionTitle}>Tube feed</h2>
        <p className={styles.sectionSubtitle}>
          {hasStarted
            ? 'Log this morning’s pump numbers.'
            : 'Record the current pump total once, then log this morning’s numbers.'}
        </p>
        <FeedSnapshotForm variant="compact" />
      </section>

      <section className={styles.therapySection}>
        <h2 className={styles.sectionTitle}>Speech therapy</h2>
        <p className={styles.sectionSubtitle}>
          Log homework progress now — updates save immediately.
        </p>
        <TodayTracker variant="compact" showTimer incompleteFirst />
      </section>

      {builder.isLoading ? (
        <p className={styles.muted}>Loading symptoms…</p>
      ) : sortedDefinitions.length === 0 ? (
        <p className={styles.muted}>No active symptom definitions configured.</p>
      ) : (
        <MorningCheckInSymptoms rows={sortedDefinitions} />
      )}
    </div>
  );
};

const styles = {
  page: `space-y-4`,
  header: `flex items-center justify-between gap-4`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
  primaryButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white shrink-0 disabled:opacity-50`,
  error: `text-sm text-red-600`,
  success: `text-sm text-green-700`,
  therapySection: `
    rounded-lg border border-gray-200 bg-white p-4 space-y-3
  `,
  sectionTitle: `text-base font-semibold text-gray-900`,
  sectionSubtitle: `text-sm text-gray-600`,
  muted: `text-sm text-gray-500`,
} as const;
