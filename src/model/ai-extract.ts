export type MedicationProposal = {
  id: string;
  session_id: string;
  sort_order: number;
  name: string;
  instructions: string | null;
  started_on: string | null;
  status: 'active' | 'stopped';
  notes: string | null;
  is_selected: boolean;
  created_at: string;
};

export type ConditionProposal = {
  id: string;
  session_id: string;
  sort_order: number;
  name: string;
  clinical_status: 'active' | 'resolved';
  noted_on: string | null;
  diagnosed_on: string | null;
  notes: string | null;
  is_selected: boolean;
  created_at: string;
};
