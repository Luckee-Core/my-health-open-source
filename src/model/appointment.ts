export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled';

export type Appointment = {
  id: string;
  doctor_id: string;
  scheduled_at: string;
  status: AppointmentStatus;
  appointment_type: string | null;
  reason: string | null;
  notes: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

/** Sentinel: `id === ""` means no appointment selected for editing. */
export const EMPTY_APPOINTMENT: Appointment = {
  id: '',
  doctor_id: '',
  scheduled_at: '',
  status: 'scheduled',
  appointment_type: null,
  reason: null,
  notes: null,
  completed_at: null,
  created_at: '',
  updated_at: '',
};
