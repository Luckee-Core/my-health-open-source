import { createSlice } from '@reduxjs/toolkit';

type AllergiesBuilderState = {
  isCreateOpen: boolean;
};

const initialState: AllergiesBuilderState = {
  isCreateOpen: false,
};

export const allergiesBuilderSlice = createSlice({
  name: 'allergiesBuilder',
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

export const AllergiesBuilderActions = allergiesBuilderSlice.actions;
export const allergiesBuilderReducer = allergiesBuilderSlice.reducer;
