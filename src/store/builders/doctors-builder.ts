import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSaveStatus } from './form-save-status';

type DoctorsBuilderState = {
  isCreateOpen: boolean;
  saveError: string;
  saveStatus: FormSaveStatus;
  newHospitalName: string;
  newSpecialtyName: string;
};

const initialState: DoctorsBuilderState = {
  isCreateOpen: false,
  saveError: '',
  saveStatus: 'idle',
  newHospitalName: '',
  newSpecialtyName: '',
};

export const doctorsBuilderSlice = createSlice({
  name: 'doctorsBuilder',
  initialState,
  reducers: {
    setIsCreateOpen: (state, action: { payload: boolean }) => {
      state.isCreateOpen = action.payload;
    },
    closeModal: () => initialState,
    setSaveError: (state, action: PayloadAction<string>) => {
      state.saveError = action.payload;
    },
    setSaveStatus: (state, action: PayloadAction<FormSaveStatus>) => {
      state.saveStatus = action.payload;
    },
    setNewHospitalName: (state, action: PayloadAction<string>) => {
      state.newHospitalName = action.payload;
    },
    setNewSpecialtyName: (state, action: PayloadAction<string>) => {
      state.newSpecialtyName = action.payload;
    },
  },
});

export const DoctorsBuilderActions = doctorsBuilderSlice.actions;
export const doctorsBuilderReducer = doctorsBuilderSlice.reducer;
