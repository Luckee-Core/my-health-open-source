'use client';

import { FeedFormulasBuilderActions } from '@/store/builders';
import { CurrentFeedFormulaActions } from '@/store/current';
import { useAppDispatch } from '@/store';
import { FeedFormulaFormModal } from './formula-form-modal';
import { FeedFormulasTable } from './formulas';
import { FeedHistoryTable } from './history';
import { FeedSnapshotForm } from './snapshot-form';
import { FeedTodayStats } from './today-stats';

export const TubeFeedPage = () => {
  const dispatch = useAppDispatch();

  const openCreate = () => {
    dispatch(CurrentFeedFormulaActions.resetCurrentFeedFormula());
    dispatch(FeedFormulasBuilderActions.setIsCreateOpen(true));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Tube feed</h1>
          <p className={styles.subtitle}>
            Log pump totals each morning. Calories come from milliliters fed times the formula’s
            calories per 1000 mL.
          </p>
        </div>
        <button type="button" onClick={openCreate} className={styles.primaryButton}>
          Add formula
        </button>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>This morning</h2>
        <FeedSnapshotForm />
        <FeedTodayStats />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>History</h2>
        <FeedHistoryTable />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Formulas</h2>
        <FeedFormulasTable />
      </section>

      <FeedFormulaFormModal />
    </div>
  );
};

const styles = {
  page: `space-y-6`,
  header: `flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
  primaryButton: `rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 shrink-0`,
  section: `rounded-lg border border-gray-200 bg-white p-4 space-y-3`,
  sectionTitle: `text-base font-semibold text-gray-900`,
} as const;
