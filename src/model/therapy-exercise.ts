export type TherapyExerciseTrackingKind = 'timed_attempts' | 'sets_reps';
export type TherapyExerciseDiscipline = 'speech';
export type TherapyExerciseSource = 'manual' | 'photo_import';

export type TherapyExercise = {
  id: string;
  discipline: TherapyExerciseDiscipline;
  name: string;
  instructions: string | null;
  tracking_kind: TherapyExerciseTrackingKind;
  target_count: number;
  unit_size: number;
  frequency: string;
  is_active: boolean;
  sort_order: number;
  source: TherapyExerciseSource;
  import_id: string | null;
  created_at: string;
  updated_at: string;
};

export const EMPTY_THERAPY_EXERCISE: TherapyExercise = {
  id: '',
  discipline: 'speech',
  name: '',
  instructions: null,
  tracking_kind: 'timed_attempts',
  target_count: 10,
  unit_size: 5,
  frequency: 'daily',
  is_active: true,
  sort_order: 0,
  source: 'manual',
  import_id: null,
  created_at: '',
  updated_at: '',
};

export const THERAPY_TRACKING_KIND_LABELS: Record<TherapyExerciseTrackingKind, string> = {
  timed_attempts: 'Timed attempts',
  sets_reps: 'Sets & reps',
};
