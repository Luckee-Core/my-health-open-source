'use client';

import {
  MORNING_CHECK_IN_TIME_PERIODS,
  SYMPTOM_LOG_TIME_PERIOD_LABELS,
  type SymptomDefinition,
} from '@/model';
import { MorningCheckInSymptomRow } from './row';

type Props = {
  rows: SymptomDefinition[];
};

export const MorningCheckInSymptoms = ({ rows }: Props) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Symptom</th>
            {MORNING_CHECK_IN_TIME_PERIODS.map((period) => (
              <th key={period} className={styles.thPeriod}>
                {SYMPTOM_LOG_TIME_PERIOD_LABELS[period]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <MorningCheckInSymptomRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableWrapper: `overflow-x-auto rounded-lg border border-gray-200 bg-white`,
  table: `min-w-full text-sm`,
  thead: `bg-gray-50 text-left text-gray-600`,
  th: `px-4 py-2 font-medium`,
  thPeriod: `px-4 py-2 font-medium min-w-[200px]`,
} as const;
