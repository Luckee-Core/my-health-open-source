import { getAllClinicalResults } from '@/api/clinical-results';
import { ClinicalResultsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Loads all clinicalResults into the dump.
 */
export const loadClinicalResultsThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await getAllClinicalResults();
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(
      ClinicalResultsActions.setClinicalResults(
        Object.fromEntries(result.data.map((row) => [row.id, row])),
      ),
    );
    return 200;
  };
