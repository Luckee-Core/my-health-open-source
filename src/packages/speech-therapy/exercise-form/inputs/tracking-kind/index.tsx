'use client';

import { useMemo } from 'react';
import type { TherapyExerciseTrackingKind } from '@/model';
import { THERAPY_TRACKING_KIND_LABELS } from '@/model';
import { CurrentTherapyExerciseActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const TrackingKindInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentTherapyExercise);
  const trackingOptions = useMemo(
    () =>
      Object.entries(THERAPY_TRACKING_KIND_LABELS) as [TherapyExerciseTrackingKind, string][],
    [],
  );

  return (
    <select
      className={styles.input}
      value={current.tracking_kind}
      onChange={(e) =>
        dispatch(
          CurrentTherapyExerciseActions.patchCurrentTherapyExercise({
            tracking_kind: e.target.value as TherapyExerciseTrackingKind,
          }),
        )
      }
    >
      {trackingOptions.map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

const styles = {
  input: `
    w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900
  `,
} as const;
