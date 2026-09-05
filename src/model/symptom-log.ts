import type { SymptomLogTimePeriod } from './symptom-log-time-period';

export type SymptomLog = {
  id: string;
  recorded_at: string;
  name: string;
  severity: number | null;
  triggers: string | null;
  duration_minutes: number | null;
  notes: string | null;
  focus_area_id: string | null;
  symptom_definition_id: string | null;
  time_period: SymptomLogTimePeriod | null;
  created_at: string;
  updated_at: string;
};

/** Sentinel: `id === ""` means no symptom log selected for editing. */
export const EMPTY_SYMPTOM_LOG: SymptomLog = {
  id: '',
  recorded_at: '',
  name: '',
  severity: null,
  triggers: null,
  duration_minutes: null,
  notes: null,
  focus_area_id: null,
  symptom_definition_id: null,
  time_period: null,
  created_at: '',
  updated_at: '',
};
