'use client';

import { formatCents } from '@/utils/number';
import type { AiCostDisplayRow } from '../../use-ai-costs-table-rows';

const LOGICAL_LABELS: Record<string, string> = {
  therapy_exercise_import: 'Speech therapy import',
};

const formatSource = (logicalKey: string): string =>
  LOGICAL_LABELS[logicalKey] ?? logicalKey.replace(/_/g, ' ');

const formatDateTime = (iso: string): string =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso));

type Props = {
  row: AiCostDisplayRow;
};

export const AiCostsRow = ({ row }: Props) => {
  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{formatDateTime(row.createdAt)}</td>
      <td className={styles.td}>{formatSource(row.logicalKey)}</td>
      <td className={styles.td}>{row.label}</td>
      <td className={styles.tdMono}>{row.modelUsed || '—'}</td>
      <td className={styles.tdRight}>{row.inputTokens.toLocaleString()}</td>
      <td className={styles.tdRight}>{row.outputTokens.toLocaleString()}</td>
      <td className={styles.tdRight}>{formatCents(Math.round(row.costCents))}</td>
    </tr>
  );
};

const styles = {
  tr: `border-t border-gray-100`,
  td: `px-4 py-2 text-gray-800`,
  tdMono: `px-4 py-2 text-gray-600 font-mono text-xs`,
  tdRight: `px-4 py-2 text-right text-gray-800 tabular-nums`,
} as const;
