import { createSlice } from '@reduxjs/toolkit';

type SymptomLogsBuilderState = {
  isCreateOpen: boolean;
};

const initialState: SymptomLogsBuilderState = {
  isCreateOpen: false,
};

export const symptomLogsBuilderSlice = createSlice({
  name: 'symptomLogsBuilder',
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

export const SymptomLogsBuilderActions = symptomLogsBuilderSlice.actions;
export const symptomLogsBuilderReducer = symptomLogsBuilderSlice.reducer;
