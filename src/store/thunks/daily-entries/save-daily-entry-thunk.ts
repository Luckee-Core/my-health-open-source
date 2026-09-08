import { createDailyEntry, updateDailyEntry } from '@/api/daily-entries';
import { DailyEntriesBuilderActions } from '@/store/builders';
import { CurrentDailyEntryActions } from '@/store/current';
import { DailyEntriesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates or updates the daily entry in currentDailyEntry.
 */
export const saveDailyEntryThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const current = getState().currentDailyEntry;

    dispatch(DailyEntriesBuilderActions.setSaveError(''));
    dispatch(DailyEntriesBuilderActions.setSaveStatus('saving'));

    if (!current.entry_date.trim()) {
      dispatch(DailyEntriesBuilderActions.setSaveError('Date is required'));
      dispatch(DailyEntriesBuilderActions.setSaveStatus('error'));
      return 400;
    }
    if (!current.focus_area_id) {
      dispatch(DailyEntriesBuilderActions.setSaveError('Focus area is required'));
      dispatch(DailyEntriesBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const payload = {
      entry_date: current.entry_date,
      focus_area_id: current.focus_area_id,
      notes: current.notes?.trim() || null,
    };
    const result =
      current.id === ''
        ? await createDailyEntry(payload)
        : await updateDailyEntry(current.id, payload);

    if (!result.ok) {
      dispatch(DailyEntriesBuilderActions.setSaveError(result.error.message));
      dispatch(DailyEntriesBuilderActions.setSaveStatus('error'));
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(DailyEntriesActions.upsertDailyEntry(result.data));
    dispatch(CurrentDailyEntryActions.setCurrentDailyEntry(result.data));
    dispatch(DailyEntriesBuilderActions.setSaveStatus('success'));
    return 200;
  };
