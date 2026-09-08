import { createFeedFormula, updateFeedFormula } from '@/api/feed-formulas';
import { FeedFormulasBuilderActions } from '@/store/builders';
import { CurrentFeedFormulaActions } from '@/store/current';
import { FeedFormulasActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates or updates the formula in currentFeedFormula.
 */
export const saveFeedFormulaThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const current = getState().currentFeedFormula;
    const brand = current.brand.trim();
    const name = current.name.trim();

    dispatch(FeedFormulasBuilderActions.setSaveError(''));
    dispatch(FeedFormulasBuilderActions.setSaveStatus('saving'));

    if (!brand) {
      dispatch(FeedFormulasBuilderActions.setSaveError('Brand is required'));
      dispatch(FeedFormulasBuilderActions.setSaveStatus('error'));
      return 400;
    }
    if (!name) {
      dispatch(FeedFormulasBuilderActions.setSaveError('Name is required'));
      dispatch(FeedFormulasBuilderActions.setSaveStatus('error'));
      return 400;
    }
    if (!(current.calories_per_1000_ml > 0)) {
      dispatch(
        FeedFormulasBuilderActions.setSaveError('Calories per 1000 mL must be greater than 0'),
      );
      dispatch(FeedFormulasBuilderActions.setSaveStatus('error'));
      return 400;
    }
    if (!(current.container_volume_ml > 0)) {
      dispatch(
        FeedFormulasBuilderActions.setSaveError('Container volume must be greater than 0'),
      );
      dispatch(FeedFormulasBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const payload = {
      brand,
      name,
      calories_per_1000_ml: current.calories_per_1000_ml,
      container_volume_ml: current.container_volume_ml,
      volume_fl_oz: current.volume_fl_oz,
      volume_qt: current.volume_qt,
      volume_l: current.volume_l,
      is_active: current.is_active,
      notes: current.notes?.trim() || null,
    };

    const result =
      current.id === ''
        ? await createFeedFormula(payload)
        : await updateFeedFormula(current.id, payload);

    if (!result.ok) {
      dispatch(FeedFormulasBuilderActions.setSaveError(result.error.message));
      dispatch(FeedFormulasBuilderActions.setSaveStatus('error'));
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(FeedFormulasActions.upsertFeedFormula(result.data));
    dispatch(CurrentFeedFormulaActions.setCurrentFeedFormula(result.data));
    dispatch(FeedFormulasBuilderActions.setSaveStatus('success'));
    return 200;
  };
