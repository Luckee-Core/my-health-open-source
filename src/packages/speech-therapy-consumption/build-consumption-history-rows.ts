import type { SpeechTherapyConsumption } from '@/model';
import { normalizeConsumptionDateKey } from './normalize-consumption-date-key';

export type ConsumptionHistoryRow = {
  id: string;
  log_date: string;
  consumption_type: SpeechTherapyConsumption['consumption_type'];
  quantity: number;
};

/**
 * Builds newest-first history rows for all consumption types.
 */
export const buildConsumptionHistoryRows = (
  dump: Record<string, SpeechTherapyConsumption>,
): ConsumptionHistoryRow[] => {
  return Object.values(dump)
    .map((row) => ({
      id: row.id,
      log_date: normalizeConsumptionDateKey(row.log_date),
      consumption_type: row.consumption_type,
      quantity: row.quantity,
    }))
    .sort((a, b) => {
      if (a.log_date !== b.log_date) {
        return a.log_date < b.log_date ? 1 : -1;
      }
      return a.consumption_type.localeCompare(b.consumption_type);
    });
};
