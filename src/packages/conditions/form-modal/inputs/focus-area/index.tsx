'use client';

import { useMemo } from 'react';
import { CurrentConditionActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const FocusAreaInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentCondition);
  const focusAreasDump = useAppSelector((state) => state.focusAreas);
  const focusAreas = useMemo(() => Object.values(focusAreasDump), [focusAreasDump]);
  const focusAreaOptions = useMemo(
    () => [...focusAreas].sort((a, b) => a.name.localeCompare(b.name)),
    [focusAreas],
  );

  return (
    <select
      className={styles.input}
      value={current.focus_area_id ?? ''}
      onChange={(e) =>
        dispatch(
          CurrentConditionActions.patchCurrentCondition({ focus_area_id: e.target.value || null }),
        )
      }
    >
      <option value="">No focus area</option>
      {focusAreaOptions.map((area) => (
        <option key={area.id} value={area.id}>
          {area.name}
        </option>
      ))}
    </select>
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
