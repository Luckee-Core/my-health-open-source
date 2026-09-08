import { createCondition, updateCondition } from '@/api/conditions';
import { ConditionsBuilderActions } from '@/store/builders';
import { CurrentConditionActions } from '@/store/current';
import { ConditionsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates or updates the condition in currentCondition.
 */
export const saveConditionThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const current = getState().currentCondition;
    const name = current.name.trim();

    dispatch(ConditionsBuilderActions.setSaveError(''));
    dispatch(ConditionsBuilderActions.setSaveStatus('saving'));

    if (!name) {
      dispatch(ConditionsBuilderActions.setSaveError('Name is required'));
      dispatch(ConditionsBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const payload = {
      name,
      status: current.status,
      noted_on: current.noted_on?.trim() || null,
      diagnosed_on: current.diagnosed_on?.trim() || null,
      focus_area_id: current.focus_area_id || null,
      notes: current.notes?.trim() || null,
    };
    const result =
      current.id === ''
        ? await createCondition(payload)
        : await updateCondition(current.id, payload);

    if (!result.ok) {
      dispatch(ConditionsBuilderActions.setSaveError(result.error.message));
      dispatch(ConditionsBuilderActions.setSaveStatus('error'));
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(ConditionsActions.upsertCondition(result.data));
    dispatch(CurrentConditionActions.setCurrentCondition(result.data));
    dispatch(ConditionsBuilderActions.setSaveStatus('success'));
    return 200;
  };
