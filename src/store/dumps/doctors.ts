import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Doctor } from '@/model/doctor';

const initialState: Record<string, Doctor> = {};

export const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setDoctors: (_state, action: PayloadAction<Record<string, Doctor>>) => action.payload,
    upsertDoctor: (state, action: PayloadAction<Doctor>) => {
      state[action.payload.id] = action.payload;
    },
    removeDoctor: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const DoctorsActions = doctorsSlice.actions;
export const doctorsReducer = doctorsSlice.reducer;
