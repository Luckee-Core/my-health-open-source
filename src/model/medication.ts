export type MedicationStatus = 'active' | 'stopped';

export type Medication = {
  id: string;
  name: string;
  instructions: string | null;
  started_on: string | null;
  status: MedicationStatus;
  doctor_id: string | null;
  notes: string | null;
  source_system: string | null;
  source_document_id: string | null;
  source_entry_key: string | null;
  created_at: string;
  updated_at: string;
};

export const EMPTY_MEDICATION: Medication = {
  id: '',
  name: '',
  instructions: null,
  started_on: null,
  status: 'active',
  doctor_id: null,
  notes: null,
  source_system: null,
  source_document_id: null,
  source_entry_key: null,
  created_at: '',
  updated_at: '',
};
