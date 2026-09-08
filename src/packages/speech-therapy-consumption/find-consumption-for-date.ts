import type { SpeechTherapyConsumption, SpeechTherapyConsumptionType } from '@/model';
import { normalizeConsumptionDateKey } from './normalize-consumption-date-key';

/**
 * Finds the consumption row for a type and calendar date, if any.
 */
export const findConsumptionForDate = (
  dump: Record<string, SpeechTherapyConsumption>,
  consumptionType: SpeechTherapyConsumptionType,
  dateKey: string,
): SpeechTherapyConsumption | null => {
  return (
    Object.values(dump).find(
      (row) =>
        row.consumption_type === consumptionType &&
        normalizeConsumptionDateKey(row.log_date) === dateKey,
    ) ?? null
  );
};
