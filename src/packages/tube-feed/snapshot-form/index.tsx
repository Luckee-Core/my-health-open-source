'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { TUBE_FEED_PATH } from '@/config/routes';
import { FeedFormulasBuilderActions } from '@/store/builders';
import { hydrateCurrentFeedLogThunk, upsertFeedLogThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { findFeedLogForDate, findFeedStartLog } from '../utils';
import { FeedLeftInput } from './inputs/feed-left';
import { FormulaInput } from './inputs/formula';
import { IntermittentRateInput } from './inputs/intermittent-rate';
import { NotesInput } from './inputs/notes';
import { PumpResetInput } from './inputs/pump-reset';
import { TotalFedInput } from './inputs/total-fed';

type Props = {
  variant?: 'full' | 'compact';
};

export const FeedSnapshotForm = ({ variant = 'full' }: Props) => {
  const dispatch = useAppDispatch();
  const formulasDump = useAppSelector((state) => state.feedFormulas);
  const logsDump = useAppSelector((state) => state.feedLogs);
  const current = useAppSelector((state) => state.currentFeedLog);
  const builder = useAppSelector((state) => state.feedLogsBuilder);

  useEffect(() => {
    void dispatch(hydrateCurrentFeedLogThunk());
  }, [dispatch, logsDump]);

  const startLog = useMemo(() => findFeedStartLog(logsDump), [logsDump]);
  const todayLog = useMemo(
    () => findFeedLogForDate(logsDump, current.log_date),
    [logsDump, current.log_date],
  );
  const isStarting = startLog == null;
  const isSaving = builder.saveStatus === 'saving';
  const formulas = Object.values(formulasDump);

  const handleSubmit = async () => {
    await dispatch(upsertFeedLogThunk());
  };

  if (formulas.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.muted}>Add a formula from the can label first.</p>
        {variant === 'full' ? (
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => dispatch(FeedFormulasBuilderActions.setIsCreateOpen(true))}
          >
            Add formula
          </button>
        ) : (
          <Link href={TUBE_FEED_PATH} className={styles.link}>
            Open tube feed
          </Link>
        )}
      </div>
    );
  }

  const saveLabel = isSaving
    ? 'Saving…'
    : isStarting
      ? 'Start tracking'
      : todayLog
        ? 'Update this morning'
        : 'Save this morning';

  return (
    <div className={styles.form}>
      <p className={styles.muted}>
        {isStarting
          ? 'Record the pump total as it stands right now. This is a one-time starting point — calories begin with the next morning log.'
          : 'Enter this morning’s pump total (not the starting point). Calories use the selected formula’s kcal per 1000 mL on milliliters since the last snapshot.'}
      </p>
      <div className={styles.grid}>
        <FormulaInput />
        <IntermittentRateInput />
        <FeedLeftInput />
        <TotalFedInput />
      </div>
      {!isStarting && <PumpResetInput />}
      {variant === 'full' && <NotesInput />}
      {builder.saveError && <p className={styles.error}>{builder.saveError}</p>}
      {builder.saveStatus === 'success' && (
        <p className={styles.success}>
          {todayLog
            ? `Snapshot saved for ${current.log_date}.`
            : 'Starting point saved. Enter this morning’s pump numbers next.'}
        </p>
      )}
      <button
        type="button"
        disabled={isSaving}
        onClick={() => void handleSubmit()}
        className={styles.primaryButton}
      >
        {saveLabel}
      </button>
    </div>
  );
};

const styles = {
  form: `space-y-3`,
  grid: `grid gap-3 sm:grid-cols-2`,
  error: `text-sm text-red-600`,
  success: `text-sm text-green-700`,
  primaryButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
  secondaryButton: `rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-800`,
  empty: `space-y-2`,
  muted: `text-sm text-gray-600`,
  link: `text-sm text-gray-700 underline-offset-2 hover:underline`,
} as const;
