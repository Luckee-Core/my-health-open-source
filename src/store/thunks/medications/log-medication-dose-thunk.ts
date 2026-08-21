import { logMedicationDose } from '@/api/medications';
import type { AppThunk } from '@/store/types';

/**
 * Records a medication dose as taken (resets interval timer).
 */
export const logMedicationDoseThunk =
  (medicationId: string): AppThunk<Promise<200 | 400 | 500>> =>
  async () => {
    const result = await logMedicationDose(medicationId);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    return 200;
  };
