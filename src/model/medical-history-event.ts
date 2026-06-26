export type MedicalHistoryCategory =
  | 'diagnosis'
  | 'surgery'
  | 'radiation'
  | 'imaging'
  | 'milestone'
  | 'other';

export type MedicalHistoryEvent = {
  id: string;
  event_date: string;
  title: string;
  category: MedicalHistoryCategory;
  description: string | null;
  doctor_id: string | null;
  appointment_id: string | null;
  focus_area_id: string | null;
  created_at: string;
  updated_at: string;
};

/** Sentinel: `id === ""` means no medical history event selected for editing. */
export const EMPTY_MEDICAL_HISTORY_EVENT: MedicalHistoryEvent = {
  id: '',
  event_date: '',
  title: '',
  category: 'other',
  description: null,
  doctor_id: null,
  appointment_id: null,
  focus_area_id: null,
  created_at: '',
  updated_at: '',
};

export const MEDICAL_HISTORY_CATEGORY_LABELS: Record<MedicalHistoryCategory, string> = {
  diagnosis: 'Diagnosis',
  surgery: 'Surgery',
  radiation: 'Radiation',
  imaging: 'Imaging',
  milestone: 'Milestone',
  other: 'Other',
};
