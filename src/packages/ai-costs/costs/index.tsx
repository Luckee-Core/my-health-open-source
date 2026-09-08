'use client';

import type { AiCostDisplayRow } from '../use-ai-costs-table-rows';
import { AiCostsRow } from './row';

type Props = {
  rows: AiCostDisplayRow[];
};

export const AiCostsTable = ({ rows }: Props) => {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Source</th>
            <th className={styles.th}>Label</th>
            <th className={styles.th}>Model</th>
            <th className={styles.thRight}>In</th>
            <th className={styles.thRight}>Out</th>
            <th className={styles.thRight}>Cost</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={7} className={styles.empty}>
                No completed AI exchanges in this period. Import speech homework from a PNG to
                create one.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <AiCostsRow key={`${row.logicalKey}-${row.id}`} row={row} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableWrap: `overflow-x-auto rounded-lg border border-gray-200 bg-white`,
  table: `min-w-full text-sm`,
  th: `px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-gray-500 bg-gray-50`,
  thRight: `px-4 py-2 text-right text-xs font-medium uppercase tracking-wide text-gray-500 bg-gray-50`,
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
