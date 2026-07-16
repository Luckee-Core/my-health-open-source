export type AllergyStatus = 'active' | 'inactive';

export type Allergy = {
  id: string;
  substance: string;
  reaction: string | null;
  criticality: string | null;
  status: AllergyStatus;
  notes: string | null;
  source_system: string | null;
  source_document_id: string | null;
  source_entry_key: string | null;
  created_at: string;
  updated_at: string;
};

export const EMPTY_ALLERGY: Allergy = {
  id: '',
  substance: '',
  reaction: null,
  criticality: null,
  status: 'active',
  notes: null,
  source_system: null,
  source_document_id: null,
  source_entry_key: null,
  created_at: '',
  updated_at: '',
};
