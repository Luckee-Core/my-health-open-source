import { createFocusArea, updateFocusArea } from '@/api/focus-areas';
import { FocusAreasBuilderActions } from '@/store/builders';
import { CurrentFocusAreaActions } from '@/store/current';
import { FocusAreasActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates or updates the focus area in currentFocusArea.
 */
export const saveFocusAreaThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const current = getState().currentFocusArea;
    const name = current.name.trim();

    dispatch(FocusAreasBuilderActions.setSaveError(''));
    dispatch(FocusAreasBuilderActions.setSaveStatus('saving'));

    if (!name) {
      dispatch(FocusAreasBuilderActions.setSaveError('Name is required'));
      dispatch(FocusAreasBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const payload = {
      name,
      description: current.description?.trim() || null,
    };
    const result =
      current.id === ''
        ? await createFocusArea(payload)
        : await updateFocusArea(current.id, payload);

    if (!result.ok) {
      dispatch(FocusAreasBuilderActions.setSaveError(result.error.message));
      dispatch(FocusAreasBuilderActions.setSaveStatus('error'));
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(FocusAreasActions.upsertFocusArea(result.data));
    dispatch(CurrentFocusAreaActions.setCurrentFocusArea(result.data));
    dispatch(FocusAreasBuilderActions.setSaveStatus('success'));
    return 200;
  };
