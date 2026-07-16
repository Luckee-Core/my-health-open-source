export type InsuranceCoverage = {
  id: string;
  payer_name: string;
  member_id: string | null;
  group_number: string | null;
  plan_name: string | null;
  status: string | null;
  source_system: string | null;
  source_document_id: string | null;
  source_entry_key: string | null;
  created_at: string;
  updated_at: string;
};

export const EMPTY_INSURANCE_COVERAGE: InsuranceCoverage = {
  id: '',
  payer_name: '',
  member_id: null,
  group_number: null,
  plan_name: null,
  status: null,
  source_system: null,
  source_document_id: null,
  source_entry_key: null,
  created_at: '',
  updated_at: '',
};
