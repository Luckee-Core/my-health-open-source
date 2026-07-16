import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type HealthImportStep = 'upload' | 'preview' | 'committing' | 'done';
export type HealthImportAsyncStatus = 'idle' | 'loading' | 'error' | 'success';

type HealthImportBuilderState = {
  step: HealthImportStep;
  previewId: string;
  contentSha256: string;
  filename: string;
  errorMessage: string;
  previewStatus: HealthImportAsyncStatus;
  commitStatus: HealthImportAsyncStatus;
  documentCount: number;
  hospitalsCount: number;
  specialtiesCount: number;
  doctorsCount: number;
  appointmentsCount: number;
  allergiesCount: number;
  medicationsCount: number;
  conditionsCount: number;
  vitalSignsCount: number;
  clinicalResultsCount: number;
  clinicalNotesCount: number;
  referralsCount: number;
  insuranceCoveragesCount: number;
  medicalHistoryEventsCount: number;
  symptomLogsCount: number;
};

const initialState: HealthImportBuilderState = {
  step: 'upload',
  previewId: '',
  contentSha256: '',
  filename: '',
  errorMessage: '',
  previewStatus: 'idle',
  commitStatus: 'idle',
  documentCount: 0,
  hospitalsCount: 0,
  specialtiesCount: 0,
  doctorsCount: 0,
  appointmentsCount: 0,
  allergiesCount: 0,
  medicationsCount: 0,
  conditionsCount: 0,
  vitalSignsCount: 0,
  clinicalResultsCount: 0,
  clinicalNotesCount: 0,
  referralsCount: 0,
  insuranceCoveragesCount: 0,
  medicalHistoryEventsCount: 0,
  symptomLogsCount: 0,
};

export const healthImportBuilderSlice = createSlice({
  name: 'healthImportBuilder',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<HealthImportStep>) => {
      state.step = action.payload;
    },
    setPreviewId: (state, action: PayloadAction<string>) => {
      state.previewId = action.payload;
    },
    setContentSha256: (state, action: PayloadAction<string>) => {
      state.contentSha256 = action.payload;
    },
    setFilename: (state, action: PayloadAction<string>) => {
      state.filename = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setPreviewStatus: (state, action: PayloadAction<HealthImportAsyncStatus>) => {
      state.previewStatus = action.payload;
    },
    setCommitStatus: (state, action: PayloadAction<HealthImportAsyncStatus>) => {
      state.commitStatus = action.payload;
    },
    setDocumentCount: (state, action: PayloadAction<number>) => {
      state.documentCount = action.payload;
    },
    setCommitCounts: (
      state,
      action: PayloadAction<{
        hospitals: number;
        specialties: number;
        doctors: number;
        appointments: number;
        allergies: number;
        medications: number;
        conditions: number;
        vitalSigns: number;
        clinicalResults: number;
        clinicalNotes: number;
        referrals: number;
        insuranceCoverages: number;
        medicalHistoryEvents: number;
        symptomLogs: number;
      }>,
    ) => {
      state.hospitalsCount = action.payload.hospitals;
      state.specialtiesCount = action.payload.specialties;
      state.doctorsCount = action.payload.doctors;
      state.appointmentsCount = action.payload.appointments;
      state.allergiesCount = action.payload.allergies;
      state.medicationsCount = action.payload.medications;
      state.conditionsCount = action.payload.conditions;
      state.vitalSignsCount = action.payload.vitalSigns;
      state.clinicalResultsCount = action.payload.clinicalResults;
      state.clinicalNotesCount = action.payload.clinicalNotes;
      state.referralsCount = action.payload.referrals;
      state.insuranceCoveragesCount = action.payload.insuranceCoverages;
      state.medicalHistoryEventsCount = action.payload.medicalHistoryEvents;
      state.symptomLogsCount = action.payload.symptomLogs;
    },
    reset: () => initialState,
  },
});

export const HealthImportBuilderActions = healthImportBuilderSlice.actions;
export const healthImportBuilderReducer = healthImportBuilderSlice.reducer;
