export type Doctor = {
  id: string;
  name: string;
  hospital_id: string;
  specialty_id: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

/** Sentinel: `id === ""` means no doctor selected for editing. */
export const EMPTY_DOCTOR: Doctor = {
  id: '',
  name: '',
  hospital_id: '',
  specialty_id: '',
  notes: null,
  created_at: '',
  updated_at: '',
};
