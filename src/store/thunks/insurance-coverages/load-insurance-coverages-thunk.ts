import { getAllInsuranceCoverages } from '@/api/insurance-coverages';
import { InsuranceCoveragesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Loads all insuranceCoverages into the dump.
 */
export const loadInsuranceCoveragesThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await getAllInsuranceCoverages();
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(
      InsuranceCoveragesActions.setInsuranceCoverages(
        Object.fromEntries(result.data.map((row) => [row.id, row])),
      ),
    );
    return 200;
  };
