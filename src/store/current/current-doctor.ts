import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_DOCTOR, type Doctor } from '@/model';

const initialState: Doctor = EMPTY_DOCTOR;

export const currentDoctorSlice = createSlice({
  name: 'currentDoctor',
  initialState,
  reducers: {
    setCurrentDoctor: (_state, action: PayloadAction<Doctor>) => action.payload,
    resetCurrentDoctor: () => EMPTY_DOCTOR,
  },
});

export const CurrentDoctorActions = currentDoctorSlice.actions;
export const currentDoctorReducer = currentDoctorSlice.reducer;
