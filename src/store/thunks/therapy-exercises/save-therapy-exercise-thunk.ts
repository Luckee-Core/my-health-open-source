import { createTherapyExercise, updateTherapyExercise } from '@/api/therapy-exercises';
import { getTherapyExerciseSchedule } from '@/packages/speech-therapy/get-therapy-exercise-schedule';
import { getTherapyExerciseSchedulePatch } from '@/packages/speech-therapy/get-therapy-exercise-schedule-patch';
import { TherapyExercisesBuilderActions } from '@/store/builders';
import { CurrentTherapyExerciseActions } from '@/store/current';
import { TherapyExercisesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates or updates the therapy exercise in currentTherapyExercise.
 */
export const saveTherapyExerciseThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const current = getState().currentTherapyExercise;
    const name = current.name.trim();
    const schedulePatch = getTherapyExerciseSchedulePatch(getTherapyExerciseSchedule(current));

    dispatch(TherapyExercisesBuilderActions.setSaveError(''));
    dispatch(TherapyExercisesBuilderActions.setSaveStatus('saving'));

    if (!name) {
      dispatch(TherapyExercisesBuilderActions.setSaveError('Name is required'));
      dispatch(TherapyExercisesBuilderActions.setSaveStatus('error'));
      return 400;
    }
    if (!Number.isFinite(current.target_count) || current.target_count < 1) {
      dispatch(TherapyExercisesBuilderActions.setSaveError('Target count must be at least 1'));
      dispatch(TherapyExercisesBuilderActions.setSaveStatus('error'));
      return 400;
    }
    if (!Number.isFinite(current.unit_size) || current.unit_size < 1) {
      dispatch(TherapyExercisesBuilderActions.setSaveError('Unit size must be at least 1'));
      dispatch(TherapyExercisesBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const payload = {
      name,
      instructions: current.instructions?.trim() || null,
      tracking_kind: current.tracking_kind,
      target_count: current.target_count,
      unit_size: current.unit_size,
      ...schedulePatch,
    };
    const result =
      current.id === ''
        ? await createTherapyExercise(payload)
        : await updateTherapyExercise(current.id, payload);

    if (!result.ok) {
      dispatch(TherapyExercisesBuilderActions.setSaveError(result.error.message));
      dispatch(TherapyExercisesBuilderActions.setSaveStatus('error'));
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(TherapyExercisesActions.upsertTherapyExercise(result.data));
    dispatch(CurrentTherapyExerciseActions.setCurrentTherapyExercise(result.data));
    dispatch(TherapyExercisesBuilderActions.setSaveStatus('success'));
    return 200;
  };
