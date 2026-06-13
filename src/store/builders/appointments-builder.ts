import { createSlice } from '@reduxjs/toolkit';

type AppointmentsBuilderState = {
  isCreateOpen: boolean;
};

const initialState: AppointmentsBuilderState = {
  isCreateOpen: false,
};

export const appointmentsBuilderSlice = createSlice({
  name: 'appointmentsBuilder',
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

export const AppointmentsBuilderActions = appointmentsBuilderSlice.actions;
export const appointmentsBuilderReducer = appointmentsBuilderSlice.reducer;
