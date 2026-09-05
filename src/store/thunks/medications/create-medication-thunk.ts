import { createMedication, type CreateMedicationPayload } from '@/api/medications';
import { MedicationsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates a medication and upserts it into the dump.
 */
export const createMedicationThunk =
  (payload: CreateMedicationPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await createMedication(payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(MedicationsActions.upsertMedication(result.data));
    return 200;
  };
