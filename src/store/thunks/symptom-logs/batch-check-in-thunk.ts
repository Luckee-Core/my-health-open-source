import { batchCheckInSymptomLogs } from '@/api/symptom-logs';
import {
  MORNING_CHECK_IN_TIME_PERIODS,
} from '@/model';
import { makeMorningCheckInRowKey } from '@/packages/morning-check-in/make-morning-check-in-row-key';
import { MorningCheckInBuilderActions } from '@/store/builders';
import { SymptomLogsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import { loadSymptomLogsThunk } from './load-symptom-logs-thunk';

/**
 * Submits morning check-in rows from the builder and reloads symptom logs.
 */
export const batchCheckInThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const builder = getState().morningCheckInBuilder;
    const definitions = Object.values(getState().symptomDefinitions);

    dispatch(MorningCheckInBuilderActions.setSaveError(''));
    dispatch(MorningCheckInBuilderActions.setSaveStatus('saving'));

    const entries = definitions.flatMap((definition) =>
      MORNING_CHECK_IN_TIME_PERIODS.flatMap((timePeriod) => {
        const key = makeMorningCheckInRowKey(definition.id, timePeriod);
        const severity = builder.severityByKey[key];
        if (severity == null) return [];
        const notes = builder.notesByKey[key]?.trim() || null;
        return [
          {
            symptom_definition_id: definition.id,
            time_period: timePeriod,
            severity,
            notes,
          },
        ];
      }),
    );

    if (entries.length === 0) {
      dispatch(
        MorningCheckInBuilderActions.setSaveError(
          'Set severity for at least one symptom row before submitting.',
        ),
      );
      dispatch(MorningCheckInBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const result = await batchCheckInSymptomLogs({ entries });
    if (!result.ok) {
      dispatch(MorningCheckInBuilderActions.setSaveError(result.error.message));
      dispatch(MorningCheckInBuilderActions.setSaveStatus('error'));
      return result.status >= 500 ? 500 : 400;
    }

    for (const row of result.data) {
      dispatch(SymptomLogsActions.upsertSymptomLog(row));
    }
    await dispatch(loadSymptomLogsThunk());
    dispatch(MorningCheckInBuilderActions.resetRows());
    dispatch(MorningCheckInBuilderActions.setSaveStatus('success'));
    return 200;
  };
