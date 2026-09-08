import { createSpecialty, updateSpecialty } from '@/api/specialties';
import { SpecialtiesBuilderActions } from '@/store/builders';
import { CurrentSpecialtyActions } from '@/store/current';
import { SpecialtiesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates or updates the specialty in currentSpecialty.
 */
export const saveSpecialtyThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const current = getState().currentSpecialty;
    const name = current.name.trim();

    dispatch(SpecialtiesBuilderActions.setSaveError(''));
    dispatch(SpecialtiesBuilderActions.setSaveStatus('saving'));

    if (!name) {
      dispatch(SpecialtiesBuilderActions.setSaveError('Name is required'));
      dispatch(SpecialtiesBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const payload = { name };
    const result =
      current.id === ''
        ? await createSpecialty(payload)
        : await updateSpecialty(current.id, payload);

    if (!result.ok) {
      dispatch(SpecialtiesBuilderActions.setSaveError(result.error.message));
      dispatch(SpecialtiesBuilderActions.setSaveStatus('error'));
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(SpecialtiesActions.upsertSpecialty(result.data));
    dispatch(CurrentSpecialtyActions.setCurrentSpecialty(result.data));
    dispatch(SpecialtiesBuilderActions.setSaveStatus('success'));
    return 200;
  };
