import { createSlice } from '@reduxjs/toolkit';

type DoctorsBuilderState = {
  isCreateOpen: boolean;
};

const initialState: DoctorsBuilderState = {
  isCreateOpen: false,
};

export const doctorsBuilderSlice = createSlice({
  name: 'doctorsBuilder',
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

export const DoctorsBuilderActions = doctorsBuilderSlice.actions;
export const doctorsBuilderReducer = doctorsBuilderSlice.reducer;
