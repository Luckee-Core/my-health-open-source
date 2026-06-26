import { createSlice } from '@reduxjs/toolkit';

type MedicalHistoryEventsBuilderState = {
  isCreateOpen: boolean;
};

const initialState: MedicalHistoryEventsBuilderState = {
  isCreateOpen: false,
};

export const medicalHistoryEventsBuilderSlice = createSlice({
  name: 'medicalHistoryEventsBuilder',
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

export const MedicalHistoryEventsBuilderActions = medicalHistoryEventsBuilderSlice.actions;
export const medicalHistoryEventsBuilderReducer = medicalHistoryEventsBuilderSlice.reducer;
