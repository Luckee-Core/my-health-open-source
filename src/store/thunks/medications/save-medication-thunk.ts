import { createMedication, updateMedication } from '@/api/medications';
import { MedicationsBuilderActions } from '@/store/builders';
import { CurrentMedicationActions } from '@/store/current';
import { MedicationsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates or updates the medication in currentMedication.
 */
export const saveMedicationThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const current = getState().currentMedication;
    const name = current.name.trim();

    dispatch(MedicationsBuilderActions.setSaveError(''));
    dispatch(MedicationsBuilderActions.setSaveStatus('saving'));

    if (!name) {
      dispatch(MedicationsBuilderActions.setSaveError('Name is required'));
      dispatch(MedicationsBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const payload = {
      name,
      instructions: current.instructions?.trim() || null,
      started_on: current.started_on?.trim() || null,
      status: current.status,
      doctor_id: current.doctor_id || null,
      notes: current.notes?.trim() || null,
    };
    const result =
      current.id === ''
        ? await createMedication(payload)
        : await updateMedication(current.id, payload);

    if (!result.ok) {
      dispatch(MedicationsBuilderActions.setSaveError(result.error.message));
      dispatch(MedicationsBuilderActions.setSaveStatus('error'));
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(MedicationsActions.upsertMedication(result.data));
    dispatch(CurrentMedicationActions.setCurrentMedication(result.data));
    dispatch(MedicationsBuilderActions.setSaveStatus('success'));
    return 200;
  };
