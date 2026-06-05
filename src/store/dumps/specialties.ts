import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Specialty } from '@/model/specialty';

const initialState: Record<string, Specialty> = {};

export const specialtiesSlice = createSlice({
  name: 'specialties',
  initialState,
  reducers: {
    setSpecialties: (_state, action: PayloadAction<Record<string, Specialty>>) => action.payload,
    upsertSpecialty: (state, action: PayloadAction<Specialty>) => {
      state[action.payload.id] = action.payload;
    },
    removeSpecialty: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const SpecialtiesActions = specialtiesSlice.actions;
export const specialtiesReducer = specialtiesSlice.reducer;
