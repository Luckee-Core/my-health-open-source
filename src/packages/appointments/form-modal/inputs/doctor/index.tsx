'use client';

import { useMemo } from 'react';
import { CurrentAppointmentActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const DoctorInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentAppointment);
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

  const selectedDoctor = doctors.find((d) => d.id === current.doctor_id);
  const facilityAddress = selectedDoctor
    ? hospitals[selectedDoctor.hospital_id]?.address
    : null;

  return (
    <div className={styles.wrap}>
      <label className={styles.label}>
        Doctor
        <select
          className={styles.input}
          value={current.doctor_id}
          onChange={(e) =>
            dispatch(CurrentAppointmentActions.patchCurrentAppointment({ doctor_id: e.target.value }))
          }
        >
          <option value="">Select doctor…</option>
          {doctorOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {facilityAddress && <p className={styles.helper}>Facility address: {facilityAddress}</p>}
    </div>
  );
};

const styles = {
  wrap: `space-y-1`,
  label: `block text-sm text-gray-700 space-y-1`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  helper: `text-sm text-gray-600`,
} as const;
