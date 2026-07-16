export type HealthImportStatus = 'previewed' | 'committed' | 'failed';

export type HealthImport = {
  id: string;
  filename: string;
  content_sha256: string;
  status: HealthImportStatus;
  document_count: number;
  summary_json: Record<string, unknown> | null;
  error: string | null;
  created_at: string;
  updated_at: string;
};

export type HealthImportSummaryCounts = {
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
};

export type HealthImportSummarySamples = {
  allergies: Array<{ substance: string; reaction?: string | null }>;
  medications: Array<{ name: string; started_on?: string | null }>;
  conditions: Array<{ name: string; noted_on?: string | null }>;
  doctors: Array<{ name: string; specialtyName: string }>;
  appointments: Array<{
    scheduledAt: string;
    appointmentType?: string | null;
    doctorName?: string | null;
  }>;
  vitalSigns: Array<{ metric: string; value_text: string; recorded_at: string }>;
  clinicalResults: Array<{ name: string; observed_at?: string | null; category?: string }>;
  clinicalNoteTitles: string[];
  referrals: Array<{ specialty?: string | null; status?: string | null }>;
  insuranceCoverages: Array<{ payer_name: string; plan_name?: string | null }>;
  medicalHistoryEvents: Array<{ title: string; category?: string; event_date: string }>;
  symptomLogs: Array<{ name: string; recorded_at?: string }>;
};

export type HealthImportSummary = {
  counts: HealthImportSummaryCounts;
  samples: HealthImportSummarySamples;
};

const EMPTY_COUNTS: HealthImportSummaryCounts = {
  hospitals: 0,
  specialties: 0,
  doctors: 0,
  appointments: 0,
  allergies: 0,
  medications: 0,
  conditions: 0,
  vitalSigns: 0,
  clinicalResults: 0,
  clinicalNotes: 0,
  referrals: 0,
  insuranceCoverages: 0,
  medicalHistoryEvents: 0,
  symptomLogs: 0,
};

const EMPTY_SAMPLES: HealthImportSummarySamples = {
  allergies: [],
  medications: [],
  conditions: [],
  doctors: [],
  appointments: [],
  vitalSigns: [],
  clinicalResults: [],
  clinicalNoteTitles: [],
  referrals: [],
  insuranceCoverages: [],
  medicalHistoryEvents: [],
  symptomLogs: [],
};

/** Sentinel: all counts are 0 and samples are empty. */
export const EMPTY_HEALTH_IMPORT_SUMMARY: HealthImportSummary = {
  counts: EMPTY_COUNTS,
  samples: EMPTY_SAMPLES,
};

export const EMPTY_HEALTH_IMPORT: HealthImport = {
  id: '',
  filename: '',
  content_sha256: '',
  status: 'previewed',
  document_count: 0,
  summary_json: null,
  error: null,
  created_at: '',
  updated_at: '',
};
