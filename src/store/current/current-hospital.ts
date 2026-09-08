import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_HOSPITAL, type Hospital } from '@/model';

const initialState: Hospital = EMPTY_HOSPITAL;

export const currentHospitalSlice = createSlice({
  name: 'currentHospital',
  initialState,
  reducers: {
    setCurrentHospital: (_state, action: PayloadAction<Hospital>) => action.payload,
    patchCurrentHospital: (state, action: PayloadAction<Partial<Hospital>>) => ({
      ...state,
      ...action.payload,
    }),
    resetCurrentHospital: () => EMPTY_HOSPITAL,
  },
});

export const CurrentHospitalActions = currentHospitalSlice.actions;
export const currentHospitalReducer = currentHospitalSlice.reducer;
