import { getAllVitalSigns } from '@/api/vital-signs';
import { VitalSignsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Loads all vitalSigns into the dump.
 */
export const loadVitalSignsThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await getAllVitalSigns();
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(
      VitalSignsActions.setVitalSigns(
        Object.fromEntries(result.data.map((row) => [row.id, row])),
      ),
    );
    return 200;
  };
