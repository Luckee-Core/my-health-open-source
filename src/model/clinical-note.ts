export type ClinicalNote = {
  id: string;
  note_at: string;
  title: string;
  author_name: string | null;
  body: string;
  appointment_id: string | null;
  doctor_id: string | null;
  source_system: string | null;
  source_document_id: string | null;
  source_entry_key: string | null;
  created_at: string;
  updated_at: string;
};

export const EMPTY_CLINICAL_NOTE: ClinicalNote = {
  id: '',
  note_at: '',
  title: '',
  author_name: null,
  body: '',
  appointment_id: null,
  doctor_id: null,
  source_system: null,
  source_document_id: null,
  source_entry_key: null,
  created_at: '',
  updated_at: '',
};
