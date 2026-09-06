import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TherapyExerciseImportDraftExercise } from '@/model';

export type TherapyExerciseImportStep = 'upload' | 'preview' | 'committing' | 'done';
export type TherapyExerciseImportAsyncStatus = 'idle' | 'loading' | 'error' | 'success';

type TherapyExerciseImportBuilderState = {
  step: TherapyExerciseImportStep;
  previewId: string;
  localImageUrl: string;
  exercises: TherapyExerciseImportDraftExercise[];
  errorMessage: string;
  previewStatus: TherapyExerciseImportAsyncStatus;
  commitStatus: TherapyExerciseImportAsyncStatus;
};

const initialState: TherapyExerciseImportBuilderState = {
  step: 'upload',
  previewId: '',
  localImageUrl: '',
  exercises: [],
  errorMessage: '',
  previewStatus: 'idle',
  commitStatus: 'idle',
};

export const therapyExerciseImportBuilderSlice = createSlice({
  name: 'therapyExerciseImportBuilder',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<TherapyExerciseImportStep>) => {
      state.step = action.payload;
    },
    setPreviewId: (state, action: PayloadAction<string>) => {
      state.previewId = action.payload;
    },
    setLocalImageUrl: (state, action: PayloadAction<string>) => {
      state.localImageUrl = action.payload;
    },
    setExercises: (state, action: PayloadAction<TherapyExerciseImportDraftExercise[]>) => {
      state.exercises = action.payload;
    },
    updateExerciseAt: (
      state,
      action: PayloadAction<{ index: number; patch: Partial<TherapyExerciseImportDraftExercise> }>,
    ) => {
      const row = state.exercises[action.payload.index];
      if (!row) return;
      state.exercises[action.payload.index] = { ...row, ...action.payload.patch };
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setPreviewStatus: (state, action: PayloadAction<TherapyExerciseImportAsyncStatus>) => {
      state.previewStatus = action.payload;
    },
    setCommitStatus: (state, action: PayloadAction<TherapyExerciseImportAsyncStatus>) => {
      state.commitStatus = action.payload;
    },
    reset: () => initialState,
  },
});

export const TherapyExerciseImportBuilderActions = therapyExerciseImportBuilderSlice.actions;
export const therapyExerciseImportBuilderReducer = therapyExerciseImportBuilderSlice.reducer;
