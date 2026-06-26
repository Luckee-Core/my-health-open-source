import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MedicalHistoryEvent } from '@/model';

const initialState: Record<string, MedicalHistoryEvent> = {};

export const medicalHistoryEventsSlice = createSlice({
  name: 'medicalHistoryEvents',
  initialState,
  reducers: {
    setMedicalHistoryEvents: (
      _state,
      action: PayloadAction<Record<string, MedicalHistoryEvent>>,
    ) => action.payload,
    upsertMedicalHistoryEvent: (state, action: PayloadAction<MedicalHistoryEvent>) => {
      state[action.payload.id] = action.payload;
    },
    removeMedicalHistoryEvent: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const MedicalHistoryEventsActions = medicalHistoryEventsSlice.actions;
export const medicalHistoryEventsReducer = medicalHistoryEventsSlice.reducer;
