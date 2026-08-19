import { deleteMedication } from '@/api/medications';
import { MedicationsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Deletes a medication and removes it from the dump.
 */
export const deleteMedicationThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await deleteMedication(id);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(MedicationsActions.removeMedication(id));
    return 200;
  };
