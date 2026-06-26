import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SymptomLog } from '@/model';

const initialState: Record<string, SymptomLog> = {};

export const symptomLogsSlice = createSlice({
  name: 'symptomLogs',
  initialState,
  reducers: {
    setSymptomLogs: (_state, action: PayloadAction<Record<string, SymptomLog>>) => action.payload,
    upsertSymptomLog: (state, action: PayloadAction<SymptomLog>) => {
      state[action.payload.id] = action.payload;
    },
    removeSymptomLog: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const SymptomLogsActions = symptomLogsSlice.actions;
export const symptomLogsReducer = symptomLogsSlice.reducer;
