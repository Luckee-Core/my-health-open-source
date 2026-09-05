export type MedicationDoseReminderStatus = 'due' | 'waiting';

export type MedicationDoseReminder = {
  medication_id: string;
  medication_name: string;
  interval_minutes: number;
  last_taken_at: string | null;
  next_dose_at: string | null;
  status: MedicationDoseReminderStatus;
  minutes_until_due: number;
};

export type MedicationDoseSchedule = {
  medication_id: string;
  interval_minutes: number;
  reminder_enabled: boolean;
  created_at: string;
  updated_at: string;
};

export type MedicationDoseLog = {
  id: string;
  medication_id: string;
  taken_at: string;
  notes: string | null;
  created_at: string;
};
