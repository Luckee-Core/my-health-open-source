import { createAllergy, updateAllergy } from '@/api/allergies';
import { AllergiesBuilderActions } from '@/store/builders';
import { CurrentAllergyActions } from '@/store/current';
import { AllergiesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates or updates the allergy in currentAllergy.
 */
export const saveAllergyThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const current = getState().currentAllergy;
    const substance = current.substance.trim();

    dispatch(AllergiesBuilderActions.setSaveError(''));
    dispatch(AllergiesBuilderActions.setSaveStatus('saving'));

    if (!substance) {
      dispatch(AllergiesBuilderActions.setSaveError('Substance is required'));
      dispatch(AllergiesBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const payload = {
      substance,
      reaction: current.reaction?.trim() || null,
      criticality: current.criticality?.trim() || null,
      status: current.status,
      notes: current.notes?.trim() || null,
    };
    const result =
      current.id === ''
        ? await createAllergy(payload)
        : await updateAllergy(current.id, payload);

    if (!result.ok) {
      dispatch(AllergiesBuilderActions.setSaveError(result.error.message));
      dispatch(AllergiesBuilderActions.setSaveStatus('error'));
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(AllergiesActions.upsertAllergy(result.data));
    dispatch(CurrentAllergyActions.setCurrentAllergy(result.data));
    dispatch(AllergiesBuilderActions.setSaveStatus('success'));
    return 200;
  };
