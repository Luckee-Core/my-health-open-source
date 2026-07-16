export type VitalSign = {
  id: string;
  recorded_at: string;
  metric: string;
  value_text: string;
  numeric_value: number | null;
  unit: string | null;
  source_system: string | null;
  source_document_id: string | null;
  source_entry_key: string | null;
  created_at: string;
  updated_at: string;
};

export const EMPTY_VITAL_SIGN: VitalSign = {
  id: '',
  recorded_at: '',
  metric: '',
  value_text: '',
  numeric_value: null,
  unit: null,
  source_system: null,
  source_document_id: null,
  source_entry_key: null,
  created_at: '',
  updated_at: '',
};
