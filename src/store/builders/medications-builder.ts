import { createSlice } from '@reduxjs/toolkit';

type MedicationsBuilderState = {
  isCreateOpen: boolean;
};

const initialState: MedicationsBuilderState = {
  isCreateOpen: false,
};

export const medicationsBuilderSlice = createSlice({
  name: 'medicationsBuilder',
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

export const MedicationsBuilderActions = medicationsBuilderSlice.actions;
export const medicationsBuilderReducer = medicationsBuilderSlice.reducer;
