'use client';

import {
  MORNING_CHECK_IN_TIME_PERIODS,
  type SymptomDefinition,
} from '@/model';
import { NotesInput } from '../../inputs/notes';
import { SeverityInput } from '../../inputs/severity';

type Props = {
  row: SymptomDefinition;
};

export const MorningCheckInSymptomRow = ({ row }: Props) => {
  return (
    <tr className={styles.row}>
      <td className={styles.tdSymptom}>{row.name}</td>
      {MORNING_CHECK_IN_TIME_PERIODS.map((timePeriod) => (
        <td key={timePeriod} className={styles.tdPeriod}>
          <div className={styles.periodCell}>
            <SeverityInput definitionId={row.id} timePeriod={timePeriod} />
            <NotesInput definitionId={row.id} timePeriod={timePeriod} />
          </div>
        </td>
      ))}
    </tr>
  );
};

const styles = {
  row: `border-t border-gray-100`,
  tdSymptom: `px-4 py-3 align-top font-medium text-gray-900`,
  tdPeriod: `px-4 py-3 align-top`,
  periodCell: `space-y-2`,
} as const;
