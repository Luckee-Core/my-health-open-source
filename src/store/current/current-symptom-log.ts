import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_SYMPTOM_LOG, type SymptomLog } from '@/model';

const initialState: SymptomLog = EMPTY_SYMPTOM_LOG;

export const currentSymptomLogSlice = createSlice({
  name: 'currentSymptomLog',
  initialState,
  reducers: {
    setCurrentSymptomLog: (_state, action: PayloadAction<SymptomLog>) => action.payload,
    patchCurrentSymptomLog: (state, action: PayloadAction<Partial<SymptomLog>>) => ({
      ...state,
      ...action.payload,
    }),
    resetCurrentSymptomLog: () => EMPTY_SYMPTOM_LOG,
  },
});

export const CurrentSymptomLogActions = currentSymptomLogSlice.actions;
export const currentSymptomLogReducer = currentSymptomLogSlice.reducer;
