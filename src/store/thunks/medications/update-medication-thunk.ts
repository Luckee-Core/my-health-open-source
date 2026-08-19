import { updateMedication, type UpdateMedicationPayload } from '@/api/medications';
import { MedicationsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Updates a medication and upserts it into the dump.
 */
export const updateMedicationThunk =
  (id: string, payload: UpdateMedicationPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await updateMedication(id, payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(MedicationsActions.upsertMedication(result.data));
    return 200;
  };
