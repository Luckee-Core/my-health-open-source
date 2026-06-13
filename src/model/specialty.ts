export type Specialty = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

/** Sentinel: `id === ""` means no specialty selected for editing. */
export const EMPTY_SPECIALTY: Specialty = {
  id: '',
  name: '',
  created_at: '',
  updated_at: '',
};
