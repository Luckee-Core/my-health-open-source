export type DailyEntry = {
  id: string;
  entry_date: string;
  focus_area_id: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

/** Sentinel: `id === ""` means no daily entry selected for editing. */
export const EMPTY_DAILY_ENTRY: DailyEntry = {
  id: '',
  entry_date: '',
  focus_area_id: '',
  notes: null,
  created_at: '',
  updated_at: '',
};
