'use client';

import { useMemo, useState } from 'react';
import { formatCents } from '@/utils/number';
import { AiCostsTable } from './costs';
import { useAiCostsTableRows } from './use-ai-costs-table-rows';

const DAY_OPTIONS = [
  { label: '30 days', value: 30 },
  { label: '90 days', value: 90 },
  { label: '365 days', value: 365 },
] as const;

export const AiCostsPage = () => {
  const [days, setDays] = useState<number>(30);
  const rows = useAiCostsTableRows(days);

  const totalCostCents = useMemo(
    () => rows.reduce((sum, row) => sum + row.costCents, 0),
    [rows],
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>AI Costs</h1>
          <p className={styles.subtitle}>
            Token usage and estimated cost from completed AI exchanges (loaded at bootstrap).
          </p>
        </div>
        <label className={styles.filterLabel}>
          Period
          <select
            className={styles.select}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            {DAY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </header>

      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <p className={styles.metricLabel}>Total cost</p>
          <p className={styles.metricValue}>{formatCents(Math.round(totalCostCents))}</p>
        </div>
        <div className={styles.metricCard}>
          <p className={styles.metricLabel}>Exchanges</p>
          <p className={styles.metricValue}>{rows.length}</p>
        </div>
      </div>

      <AiCostsTable rows={rows} />
    </div>
  );
};

const styles = {
  page: `space-y-6`,
  header: `flex flex-wrap items-start justify-between gap-4`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `mt-1 text-sm text-gray-600`,
  filterLabel: `flex flex-col gap-1 text-xs font-medium text-gray-600`,
  select: `rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900`,
  metrics: `grid grid-cols-2 gap-4 max-w-md`,
  metricCard: `rounded-lg border border-gray-200 bg-white px-4 py-3`,
  metricLabel: `text-xs font-medium uppercase tracking-wide text-gray-500`,
  metricValue: `mt-1 text-lg font-semibold text-gray-900`,
} as const;
