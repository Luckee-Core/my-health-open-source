import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SpeechTherapyConsumption } from '@/model';

const initialState: Record<string, SpeechTherapyConsumption> = {};

export const speechTherapyConsumptionSlice = createSlice({
  name: 'speechTherapyConsumption',
  initialState,
  reducers: {
    setSpeechTherapyConsumption: (
      _state,
      action: PayloadAction<Record<string, SpeechTherapyConsumption>>,
    ) => action.payload,
    upsertSpeechTherapyConsumption: (state, action: PayloadAction<SpeechTherapyConsumption>) => {
      state[action.payload.id] = action.payload;
    },
  },
});

export const SpeechTherapyConsumptionActions = speechTherapyConsumptionSlice.actions;
export const speechTherapyConsumptionReducer = speechTherapyConsumptionSlice.reducer;
