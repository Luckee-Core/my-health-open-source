import type { SymptomLogTimePeriod } from '@/model';

/**
 * Builds a check-in cell key from definition id and time period.
 */
export const makeMorningCheckInRowKey = (
  definitionId: string,
  timePeriod: SymptomLogTimePeriod,
): string => `${definitionId}:${timePeriod}`;
