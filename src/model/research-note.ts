export type ResearchNoteCategory =
  | 'imaging'
  | 'article'
  | 'doctor_prep'
  | 'personal'
  | 'other';

export type ResearchNote = {
  id: string;
  title: string;
  category: ResearchNoteCategory;
  source_url: string | null;
  summary: string | null;
  content: string | null;
  focus_area_id: string | null;
  created_at: string;
  updated_at: string;
};

/** Sentinel: `id === ""` means no research note selected for editing. */
export const EMPTY_RESEARCH_NOTE: ResearchNote = {
  id: '',
  title: '',
  category: 'other',
  source_url: null,
  summary: null,
  content: null,
  focus_area_id: null,
  created_at: '',
  updated_at: '',
};

export const RESEARCH_NOTE_CATEGORY_LABELS: Record<ResearchNoteCategory, string> = {
  imaging: 'Imaging',
  article: 'Article',
  doctor_prep: 'Doctor prep',
  personal: 'Personal',
  other: 'Other',
};
