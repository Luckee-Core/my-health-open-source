import { createSlice } from '@reduxjs/toolkit';

type HospitalsBuilderState = {
  isCreateOpen: boolean;
};

const initialState: HospitalsBuilderState = {
  isCreateOpen: false,
};

export const hospitalsBuilderSlice = createSlice({
  name: 'hospitalsBuilder',
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

export const HospitalsBuilderActions = hospitalsBuilderSlice.actions;
export const hospitalsBuilderReducer = hospitalsBuilderSlice.reducer;
