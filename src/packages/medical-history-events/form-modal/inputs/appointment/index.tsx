'use client';

import { useMemo } from 'react';
import { CurrentMedicalHistoryEventActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const AppointmentInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentMedicalHistoryEvent);
  const doctorsDump = useAppSelector((state) => state.doctors);
  const appointmentsDump = useAppSelector((state) => state.appointments);
  const doctors = useMemo(() => Object.values(doctorsDump), [doctorsDump]);
  const appointments = useMemo(() => Object.values(appointmentsDump), [appointmentsDump]);

  const appointmentOptions = useMemo(() => {
    return [...appointments]
      .map((appointment) => {
        const doctor = doctors.find((d) => d.id === appointment.doctor_id);
        const when = new Date(appointment.scheduled_at).toLocaleString();
        return {
          id: appointment.id,
          label: `${when} — ${doctor?.name ?? 'Unknown doctor'}`,
        };
      })
      .sort((a, b) => b.label.localeCompare(a.label));
  }, [appointments, doctors]);

  return (
    <label className={styles.label}>
      Appointment (optional)
      <select
        className={styles.input}
        value={current.appointment_id ?? ''}
        onChange={(e) =>
          dispatch(
            CurrentMedicalHistoryEventActions.patchCurrentMedicalHistoryEvent({
              appointment_id: e.target.value || null,
            }),
          )
        }
      >
        <option value="">None</option>
        {appointmentOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

const styles = {
  label: `block text-sm text-gray-700 space-y-1`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
