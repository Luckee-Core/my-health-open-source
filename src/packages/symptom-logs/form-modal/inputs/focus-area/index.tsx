'use client';

import { useMemo } from 'react';
import { CurrentSymptomLogActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const FocusAreaInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentSymptomLog);
  const focusAreasDump = useAppSelector((state) => state.focusAreas);
  const focusAreas = useMemo(() => Object.values(focusAreasDump), [focusAreasDump]);
  const focusAreaOptions = useMemo(
    () => [...focusAreas].sort((a, b) => a.name.localeCompare(b.name)),
    [focusAreas],
  );

  return (
    <label className={styles.label}>
      Focus area (optional)
      <select
        className={styles.input}
        value={current.focus_area_id ?? ''}
        onChange={(e) =>
          dispatch(
            CurrentSymptomLogActions.patchCurrentSymptomLog({
              focus_area_id: e.target.value || null,
            }),
          )
        }
      >
        <option value="">None</option>
        {focusAreaOptions.map((area) => (
          <option key={area.id} value={area.id}>
            {area.name}
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
