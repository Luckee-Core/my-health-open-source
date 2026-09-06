import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_THERAPY_EXERCISE, type TherapyExercise } from '@/model';

const initialState: TherapyExercise = EMPTY_THERAPY_EXERCISE;

export const currentTherapyExerciseSlice = createSlice({
  name: 'currentTherapyExercise',
  initialState,
  reducers: {
    setCurrentTherapyExercise: (_state, action: PayloadAction<TherapyExercise>) => action.payload,
    resetCurrentTherapyExercise: () => EMPTY_THERAPY_EXERCISE,
  },
});

export const CurrentTherapyExerciseActions = currentTherapyExerciseSlice.actions;
export const currentTherapyExerciseReducer = currentTherapyExerciseSlice.reducer;
