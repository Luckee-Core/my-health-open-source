import { createSlice } from '@reduxjs/toolkit';

type SpecialtiesBuilderState = {
  isCreateOpen: boolean;
};

const initialState: SpecialtiesBuilderState = {
  isCreateOpen: false,
};

export const specialtiesBuilderSlice = createSlice({
  name: 'specialtiesBuilder',
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

export const SpecialtiesBuilderActions = specialtiesBuilderSlice.actions;
export const specialtiesBuilderReducer = specialtiesBuilderSlice.reducer;
