import {
  createMedicalHistoryEvent,
  updateMedicalHistoryEvent,
} from '@/api/medical-history-events';
import { MedicalHistoryEventsBuilderActions } from '@/store/builders';
import { CurrentMedicalHistoryEventActions } from '@/store/current';
import { MedicalHistoryEventsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates or updates the medical history event in currentMedicalHistoryEvent.
 */
export const saveMedicalHistoryEventThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const current = getState().currentMedicalHistoryEvent;
    const title = current.title.trim();

    dispatch(MedicalHistoryEventsBuilderActions.setSaveError(''));
    dispatch(MedicalHistoryEventsBuilderActions.setSaveStatus('saving'));

    if (!current.event_date.trim()) {
      dispatch(MedicalHistoryEventsBuilderActions.setSaveError('Date is required'));
      dispatch(MedicalHistoryEventsBuilderActions.setSaveStatus('error'));
      return 400;
    }
    if (!title) {
      dispatch(MedicalHistoryEventsBuilderActions.setSaveError('Title is required'));
      dispatch(MedicalHistoryEventsBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const payload = {
      event_date: current.event_date,
      title,
      category: current.category,
      description: current.description?.trim() || null,
      doctor_id: current.doctor_id || null,
      appointment_id: current.appointment_id || null,
      focus_area_id: current.focus_area_id || null,
    };
    const result =
      current.id === ''
        ? await createMedicalHistoryEvent(payload)
        : await updateMedicalHistoryEvent(current.id, payload);

    if (!result.ok) {
      dispatch(MedicalHistoryEventsBuilderActions.setSaveError(result.error.message));
      dispatch(MedicalHistoryEventsBuilderActions.setSaveStatus('error'));
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(MedicalHistoryEventsActions.upsertMedicalHistoryEvent(result.data));
    dispatch(CurrentMedicalHistoryEventActions.setCurrentMedicalHistoryEvent(result.data));
    dispatch(MedicalHistoryEventsBuilderActions.setSaveStatus('success'));
    return 200;
  };
