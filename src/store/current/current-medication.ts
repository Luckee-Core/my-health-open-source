import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_MEDICATION, type Medication } from '@/model';

const initialState: Medication = EMPTY_MEDICATION;

export const currentMedicationSlice = createSlice({
  name: 'currentMedication',
  initialState,
  reducers: {
    setCurrentMedication: (_state, action: PayloadAction<Medication>) => action.payload,
    patchCurrentMedication: (state, action: PayloadAction<Partial<Medication>>) => ({
      ...state,
      ...action.payload,
    }),
    resetCurrentMedication: () => EMPTY_MEDICATION,
  },
});

export const CurrentMedicationActions = currentMedicationSlice.actions;
export const currentMedicationReducer = currentMedicationSlice.reducer;
