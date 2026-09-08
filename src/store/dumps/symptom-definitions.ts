import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SymptomDefinition } from '@/model';

const initialState: Record<string, SymptomDefinition> = {};

export const symptomDefinitionsSlice = createSlice({
  name: 'symptomDefinitions',
  initialState,
  reducers: {
    setSymptomDefinitions: (
      _state,
      action: PayloadAction<Record<string, SymptomDefinition>>,
    ) => action.payload,
  },
});

export const SymptomDefinitionsActions = symptomDefinitionsSlice.actions;
export const symptomDefinitionsReducer = symptomDefinitionsSlice.reducer;
