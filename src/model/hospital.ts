export type Hospital = {
  id: string;
  name: string;
  address: string | null;
  email: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

/** Sentinel: `id === ""` means no hospital selected for editing. */
export const EMPTY_HOSPITAL: Hospital = {
  id: '',
  name: '',
  address: null,
  email: null,
  phone: null,
  notes: null,
  created_at: '',
  updated_at: '',
};
