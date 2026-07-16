export type Referral = {
  id: string;
  referred_on: string | null;
  specialty: string | null;
  reason: string | null;
  status: string | null;
  referred_by_doctor_id: string | null;
  notes: string | null;
  source_system: string | null;
  source_document_id: string | null;
  source_entry_key: string | null;
  created_at: string;
  updated_at: string;
};

export const EMPTY_REFERRAL: Referral = {
  id: '',
  referred_on: null,
  specialty: null,
  reason: null,
  status: null,
  referred_by_doctor_id: null,
  notes: null,
  source_system: null,
  source_document_id: null,
  source_entry_key: null,
  created_at: '',
  updated_at: '',
};
