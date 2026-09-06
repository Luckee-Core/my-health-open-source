export type TherapyExerciseLog = {
  id: string;
  exercise_id: string;
  log_date: string;
  completed_count: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export const EMPTY_THERAPY_EXERCISE_LOG: TherapyExerciseLog = {
  id: '',
  exercise_id: '',
  log_date: '',
  completed_count: 0,
  notes: null,
  created_at: '',
  updated_at: '',
};
