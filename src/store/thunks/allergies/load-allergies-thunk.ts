import { getAllAllergies } from '@/api/allergies';
import { AllergiesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Loads all allergies into the dump.
 */
export const loadAllergiesThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await getAllAllergies();
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(
      AllergiesActions.setAllergies(
        Object.fromEntries(result.data.map((row) => [row.id, row])),
      ),
    );
    return 200;
  };
