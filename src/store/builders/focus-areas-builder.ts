import { createSlice } from '@reduxjs/toolkit';

type FocusAreasBuilderState = {
  isCreateOpen: boolean;
};

const initialState: FocusAreasBuilderState = {
  isCreateOpen: false,
};

export const focusAreasBuilderSlice = createSlice({
  name: 'focusAreasBuilder',
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

export const FocusAreasBuilderActions = focusAreasBuilderSlice.actions;
export const focusAreasBuilderReducer = focusAreasBuilderSlice.reducer;
