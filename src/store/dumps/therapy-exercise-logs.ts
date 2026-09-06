import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TherapyExerciseLog } from '@/model';

const initialState: Record<string, TherapyExerciseLog> = {};

export const therapyExerciseLogsSlice = createSlice({
  name: 'therapyExerciseLogs',
  initialState,
  reducers: {
    setTherapyExerciseLogs: (_state, action: PayloadAction<Record<string, TherapyExerciseLog>>) =>
      action.payload,
    upsertTherapyExerciseLog: (state, action: PayloadAction<TherapyExerciseLog>) => {
      state[action.payload.id] = action.payload;
    },
    removeTherapyExerciseLog: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const TherapyExerciseLogsActions = therapyExerciseLogsSlice.actions;
export const therapyExerciseLogsReducer = therapyExerciseLogsSlice.reducer;
