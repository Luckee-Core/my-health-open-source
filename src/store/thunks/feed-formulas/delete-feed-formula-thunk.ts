import { deleteFeedFormula } from '@/api/feed-formulas';
import { CurrentFeedFormulaActions } from '@/store/current';
import { FeedFormulasActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Deletes a feed formula and removes it from the dump.
 */
export const deleteFeedFormulaThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const result = await deleteFeedFormula(id);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(FeedFormulasActions.removeFeedFormula(id));
    if (getState().currentFeedFormula.id === id) {
      dispatch(CurrentFeedFormulaActions.resetCurrentFeedFormula());
    }
    return 200;
  };
