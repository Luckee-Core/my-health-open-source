import { createSymptomLog, updateSymptomLog } from '@/api/symptom-logs';
import { SymptomLogsBuilderActions } from '@/store/builders';
import { CurrentSymptomLogActions } from '@/store/current';
import { SymptomLogsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates or updates the symptom log in currentSymptomLog.
 */
export const saveSymptomLogThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const current = getState().currentSymptomLog;
    const builder = getState().symptomLogsBuilder;
    const name = current.name.trim();

    dispatch(SymptomLogsBuilderActions.setSaveError(''));
    dispatch(SymptomLogsBuilderActions.setSaveStatus('saving'));

    if (!name) {
      dispatch(SymptomLogsBuilderActions.setSaveError('Symptom name is required'));
      dispatch(SymptomLogsBuilderActions.setSaveStatus('error'));
      return 400;
    }
    if (!current.recorded_at.trim()) {
      dispatch(SymptomLogsBuilderActions.setSaveError('Date/time is required'));
      dispatch(SymptomLogsBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const durationMinutes = current.duration_minutes;
    if (
      durationMinutes != null &&
      (!Number.isInteger(durationMinutes) || durationMinutes < 0)
    ) {
      dispatch(
        SymptomLogsBuilderActions.setSaveError(
          'Duration must be a non-negative whole number of minutes',
        ),
      );
      dispatch(SymptomLogsBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const payload = {
      recorded_at: current.recorded_at,
      name,
      severity: builder.hasSeverity ? (current.severity ?? 5) : null,
      triggers: current.triggers?.trim() || null,
      duration_minutes: durationMinutes,
      notes: current.notes?.trim() || null,
      focus_area_id: current.focus_area_id || null,
    };
    const result =
      current.id === ''
        ? await createSymptomLog(payload)
        : await updateSymptomLog(current.id, payload);

    if (!result.ok) {
      dispatch(SymptomLogsBuilderActions.setSaveError(result.error.message));
      dispatch(SymptomLogsBuilderActions.setSaveStatus('error'));
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(SymptomLogsActions.upsertSymptomLog(result.data));
    dispatch(CurrentSymptomLogActions.setCurrentSymptomLog(result.data));
    dispatch(SymptomLogsBuilderActions.setSaveStatus('success'));
    return 200;
  };
