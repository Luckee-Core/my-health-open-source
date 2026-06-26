import { createSlice } from '@reduxjs/toolkit';

type ResearchNotesBuilderState = {
  isCreateOpen: boolean;
};

const initialState: ResearchNotesBuilderState = {
  isCreateOpen: false,
};

export const researchNotesBuilderSlice = createSlice({
  name: 'researchNotesBuilder',
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

export const ResearchNotesBuilderActions = researchNotesBuilderSlice.actions;
export const researchNotesBuilderReducer = researchNotesBuilderSlice.reducer;
