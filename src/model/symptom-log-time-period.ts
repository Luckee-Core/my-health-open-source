export type SymptomLogTimePeriod = 'last_night' | 'this_morning' | 'now' | 'other';

export const SYMPTOM_LOG_TIME_PERIOD_LABELS: Record<SymptomLogTimePeriod, string> = {
  last_night: 'Last night',
  this_morning: 'This morning',
  now: 'Now',
  other: 'Other',
};

export const MORNING_CHECK_IN_TIME_PERIODS: SymptomLogTimePeriod[] = [
  'last_night',
  'this_morning',
  'now',
];
