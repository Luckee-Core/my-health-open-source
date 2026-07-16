import { getAllReferrals } from '@/api/referrals';
import { ReferralsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Loads all referrals into the dump.
 */
export const loadReferralsThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await getAllReferrals();
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(
      ReferralsActions.setReferrals(
        Object.fromEntries(result.data.map((row) => [row.id, row])),
      ),
    );
    return 200;
  };
