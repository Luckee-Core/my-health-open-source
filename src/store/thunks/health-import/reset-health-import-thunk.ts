import { HealthImportBuilderActions } from '@/store/builders';
import { CurrentHealthImportDraftActions } from '@/store/current';
import type { AppThunk } from '@/store/types';

/**
 * Clears health import wizard builder + draft summary.
 */
export const resetHealthImportThunk =
  (): AppThunk<Promise<200>> =>
  async (dispatch) => {
    dispatch(HealthImportBuilderActions.reset());
    dispatch(CurrentHealthImportDraftActions.resetCurrentHealthImportDraft());
    return 200;
  };
