import { createSlice } from '@reduxjs/toolkit';

type TherapyExercisesBuilderState = {
  isCreateOpen: boolean;
};

const initialState: TherapyExercisesBuilderState = {
  isCreateOpen: false,
};

export const therapyExercisesBuilderSlice = createSlice({
  name: 'therapyExercisesBuilder',
  initialState,
  reducers: {
    setIsCreateOpen: (state, action: { payload: boolean }) => {
      state.isCreateOpen = action.payload;
    },
    closeModal: (state) => {
      state.isCreateOpen = false;
    },
  },
});

export const TherapyExercisesBuilderActions = therapyExercisesBuilderSlice.actions;
export const therapyExercisesBuilderReducer = therapyExercisesBuilderSlice.reducer;
