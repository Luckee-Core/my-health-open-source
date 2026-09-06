export type TherapyExerciseImportDraftExercise = {
  name: string;
  instructions: string | null;
  tracking_kind: 'timed_attempts' | 'sets_reps';
  target_count: number;
  unit_size: number;
};
