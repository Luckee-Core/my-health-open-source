export type SymptomDefinition = {
  id: string;
  name: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export const EMPTY_SYMPTOM_DEFINITION: SymptomDefinition = {
  id: '',
  name: '',
  sort_order: 0,
  is_active: true,
  created_at: '',
  updated_at: '',
};
