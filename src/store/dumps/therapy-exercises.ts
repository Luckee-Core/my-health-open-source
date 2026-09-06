import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TherapyExercise } from '@/model';

const initialState: Record<string, TherapyExercise> = {};

export const therapyExercisesSlice = createSlice({
  name: 'therapyExercises',
  initialState,
  reducers: {
    setTherapyExercises: (_state, action: PayloadAction<Record<string, TherapyExercise>>) =>
      action.payload,
    upsertTherapyExercise: (state, action: PayloadAction<TherapyExercise>) => {
      state[action.payload.id] = action.payload;
    },
    upsertTherapyExercises: (state, action: PayloadAction<TherapyExercise[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    removeTherapyExercise: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const TherapyExercisesActions = therapyExercisesSlice.actions;
export const therapyExercisesReducer = therapyExercisesSlice.reducer;
