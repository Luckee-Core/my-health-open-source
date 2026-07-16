import { getAllMedications } from '@/api/medications';
import { MedicationsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Loads all medications into the dump.
 */
export const loadMedicationsThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await getAllMedications();
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(
      MedicationsActions.setMedications(
        Object.fromEntries(result.data.map((row) => [row.id, row])),
      ),
    );
    return 200;
  };
