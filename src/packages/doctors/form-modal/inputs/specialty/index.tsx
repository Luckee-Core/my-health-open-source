'use client';

import { useMemo } from 'react';
import { CurrentDoctorActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const SpecialtyInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentDoctor);
  const builder = useAppSelector((state) => state.doctorsBuilder);
  const specialtiesDump = useAppSelector((state) => state.specialties);
  const sortedSpecialties = useMemo(
    () => [...Object.values(specialtiesDump)].sort((a, b) => a.name.localeCompare(b.name)),
    [specialtiesDump],
  );
  const creatingNew = Boolean(builder.newSpecialtyName.trim());

  return (
    <label className={styles.label}>
      Specialty
      <select
        className={styles.input}
        value={current.specialty_id}
        onChange={(e) =>
          dispatch(CurrentDoctorActions.patchCurrentDoctor({ specialty_id: e.target.value }))
        }
        disabled={creatingNew}
      >
        <option value="">Select specialty…</option>
        {sortedSpecialties.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
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
