import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_SPECIALTY, type Specialty } from '@/model';

const initialState: Specialty = EMPTY_SPECIALTY;

export const currentSpecialtySlice = createSlice({
  name: 'currentSpecialty',
  initialState,
  reducers: {
    setCurrentSpecialty: (_state, action: PayloadAction<Specialty>) => action.payload,
    resetCurrentSpecialty: () => EMPTY_SPECIALTY,
  },
});

export const CurrentSpecialtyActions = currentSpecialtySlice.actions;
export const currentSpecialtyReducer = currentSpecialtySlice.reducer;
