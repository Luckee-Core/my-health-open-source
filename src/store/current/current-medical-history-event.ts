import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_MEDICAL_HISTORY_EVENT, type MedicalHistoryEvent } from '@/model';

const initialState: MedicalHistoryEvent = EMPTY_MEDICAL_HISTORY_EVENT;

export const currentMedicalHistoryEventSlice = createSlice({
  name: 'currentMedicalHistoryEvent',
  initialState,
  reducers: {
    setCurrentMedicalHistoryEvent: (_state, action: PayloadAction<MedicalHistoryEvent>) =>
      action.payload,
    resetCurrentMedicalHistoryEvent: () => EMPTY_MEDICAL_HISTORY_EVENT,
  },
});

export const CurrentMedicalHistoryEventActions = currentMedicalHistoryEventSlice.actions;
export const currentMedicalHistoryEventReducer = currentMedicalHistoryEventSlice.reducer;
