import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TherapyExerciseImportAiExchange } from '@/model';

const initialState: Record<string, TherapyExerciseImportAiExchange> = {};

export const therapyExerciseImportAiExchangesSlice = createSlice({
  name: 'therapyExerciseImportAiExchanges',
  initialState,
  reducers: {
    setTherapyExerciseImportAiExchanges: (
      _state,
      action: PayloadAction<Record<string, TherapyExerciseImportAiExchange>>,
    ) => action.payload,
    upsertTherapyExerciseImportAiExchange: (
      state,
      action: PayloadAction<TherapyExerciseImportAiExchange>,
    ) => {
      state[action.payload.id] = action.payload;
    },
  },
});

export const TherapyExerciseImportAiExchangesActions =
  therapyExerciseImportAiExchangesSlice.actions;
export const therapyExerciseImportAiExchangesReducer =
  therapyExerciseImportAiExchangesSlice.reducer;
