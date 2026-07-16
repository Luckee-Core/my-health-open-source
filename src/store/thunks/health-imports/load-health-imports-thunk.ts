import { getAllHealthImports } from '@/api/health-import';
import { HealthImportsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Loads all healthImports into the dump.
 */
export const loadHealthImportsThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await getAllHealthImports();
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(
      HealthImportsActions.setHealthImports(
        Object.fromEntries(result.data.map((row) => [row.id, row])),
      ),
    );
    return 200;
  };
