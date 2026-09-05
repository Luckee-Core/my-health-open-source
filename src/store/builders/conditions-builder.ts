import { createSlice } from '@reduxjs/toolkit';

type ConditionsBuilderState = {
  isCreateOpen: boolean;
};

const initialState: ConditionsBuilderState = {
  isCreateOpen: false,
};

export const conditionsBuilderSlice = createSlice({
  name: 'conditionsBuilder',
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

export const ConditionsBuilderActions = conditionsBuilderSlice.actions;
export const conditionsBuilderReducer = conditionsBuilderSlice.reducer;
