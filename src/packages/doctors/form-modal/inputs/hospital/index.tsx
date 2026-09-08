'use client';

import { useMemo } from 'react';
import { CurrentDoctorActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const HospitalInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentDoctor);
  const builder = useAppSelector((state) => state.doctorsBuilder);
  const hospitalsDump = useAppSelector((state) => state.hospitals);
  const sortedHospitals = useMemo(
    () => [...Object.values(hospitalsDump)].sort((a, b) => a.name.localeCompare(b.name)),
    [hospitalsDump],
  );
  const creatingNew = Boolean(builder.newHospitalName.trim());

  return (
    <label className={styles.label}>
      Facility
      <select
        className={styles.input}
        value={current.hospital_id}
        onChange={(e) =>
          dispatch(CurrentDoctorActions.patchCurrentDoctor({ hospital_id: e.target.value }))
        }
        disabled={creatingNew}
      >
        <option value="">Select facility…</option>
        {sortedHospitals.map((h) => (
          <option key={h.id} value={h.id}>
            {h.name}
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
