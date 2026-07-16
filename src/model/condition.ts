export type ConditionStatus = 'active' | 'resolved';

export type Condition = {
  id: string;
  name: string;
  status: ConditionStatus;
  noted_on: string | null;
  diagnosed_on: string | null;
  focus_area_id: string | null;
  notes: string | null;
  source_system: string | null;
  source_document_id: string | null;
  source_entry_key: string | null;
  created_at: string;
  updated_at: string;
};

export const EMPTY_CONDITION: Condition = {
  id: '',
  name: '',
  status: 'active',
  noted_on: null,
  diagnosed_on: null,
  focus_area_id: null,
  notes: null,
  source_system: null,
  source_document_id: null,
  source_entry_key: null,
  created_at: '',
  updated_at: '',
};
