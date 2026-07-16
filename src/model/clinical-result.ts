export type ClinicalResultCategory = 'lab' | 'imaging' | 'other';

export type ClinicalResult = {
  id: string;
  observed_at: string | null;
  name: string;
  value_text: string | null;
  unit: string | null;
  interpretation: string | null;
  category: ClinicalResultCategory;
  appointment_id: string | null;
  source_system: string | null;
  source_document_id: string | null;
  source_entry_key: string | null;
  created_at: string;
  updated_at: string;
};

export const EMPTY_CLINICAL_RESULT: ClinicalResult = {
  id: '',
  observed_at: null,
  name: '',
  value_text: null,
  unit: null,
  interpretation: null,
  category: 'other',
  appointment_id: null,
  source_system: null,
  source_document_id: null,
  source_entry_key: null,
  created_at: '',
  updated_at: '',
};
