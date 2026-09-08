'use client';

import { useMemo } from 'react';
import { CurrentMedicalHistoryEventActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const DoctorInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentMedicalHistoryEvent);
  const doctorsDump = useAppSelector((state) => state.doctors);
  const hospitals = useAppSelector((state) => state.hospitals);
  const specialties = useAppSelector((state) => state.specialties);
  const doctors = useMemo(() => Object.values(doctorsDump), [doctorsDump]);

  const doctorOptions = useMemo(() => {
    return [...doctors]
      .map((doctor) => {
        const facility = hospitals[doctor.hospital_id]?.name ?? 'Unknown facility';
        const specialty = specialties[doctor.specialty_id]?.name ?? 'Unknown specialty';
        return {
          id: doctor.id,
          label: `${doctor.name} — ${specialty} @ ${facility}`,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [doctors, hospitals, specialties]);

  return (
    <label className={styles.label}>
      Doctor (optional)
      <select
        className={styles.input}
        value={current.doctor_id ?? ''}
        onChange={(e) =>
          dispatch(
            CurrentMedicalHistoryEventActions.patchCurrentMedicalHistoryEvent({
              doctor_id: e.target.value || null,
            }),
          )
        }
      >
        <option value="">None</option>
        {doctorOptions.map((option) => (
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
