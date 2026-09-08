import { getAllSymptomDefinitions } from '@/api/symptom-definitions';
import { MorningCheckInBuilderActions } from '@/store/builders';
import { SymptomDefinitionsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Loads symptom definitions for morning check-in when the dump is empty.
 */
export const hydrateMorningCheckInThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    if (Object.keys(getState().symptomDefinitions).length > 0) {
      dispatch(MorningCheckInBuilderActions.setIsLoading(false));
      dispatch(MorningCheckInBuilderActions.setLoadError(''));
      return 200;
    }

    dispatch(MorningCheckInBuilderActions.setIsLoading(true));
    dispatch(MorningCheckInBuilderActions.setLoadError(''));
    const result = await getAllSymptomDefinitions();
    dispatch(MorningCheckInBuilderActions.setIsLoading(false));
    if (!result.ok) {
      dispatch(MorningCheckInBuilderActions.setLoadError('Failed to load symptom definitions'));
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(
      SymptomDefinitionsActions.setSymptomDefinitions(
        Object.fromEntries(result.data.map((row) => [row.id, row])),
      ),
    );
    return 200;
  };
