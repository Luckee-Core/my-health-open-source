export type FocusArea = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

/** Sentinel: `id === ""` means no focus area selected for editing. */
export const EMPTY_FOCUS_AREA: FocusArea = {
  id: '',
  name: '',
  description: null,
  created_at: '',
  updated_at: '',
};
