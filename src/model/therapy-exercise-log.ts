export type TherapyExerciseLog = {
  id: string;
  exercise_id: string;
  log_date: string;
  completed_count: number;
  skipped: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export const EMPTY_THERAPY_EXERCISE_LOG: TherapyExerciseLog = {
  id: '',
  exercise_id: '',
  log_date: '',
  completed_count: 0,
  skipped: false,
  notes: null,
  created_at: '',
  updated_at: '',
};
