'use client';

import { useMemo, useState } from 'react';
import { ICE_CUBE_CONSUMPTION_TYPE } from '@/model';
import { incrementSpeechTherapyConsumptionThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { getLocalDateKey } from '@/utils/date';
import { findConsumptionForDate } from '../find-consumption-for-date';

/**
 * Today's ice cube increment controls.
 */
export const IceCubeTodayLog = () => {
  const dispatch = useAppDispatch();
  const dump = useAppSelector((state) => state.speechTherapyConsumption);
  const [isBusy, setIsBusy] = useState(false);
  const todayKey = useMemo(() => getLocalDateKey(), []);

  const todayRow = useMemo(
    () => findConsumptionForDate(dump, ICE_CUBE_CONSUMPTION_TYPE, todayKey),
    [dump, todayKey],
  );
  const quantity = todayRow?.quantity ?? 0;

  const handleDelta = async (delta: number) => {
    if (delta < 0 && quantity <= 0) return;
    setIsBusy(true);
    try {
      await dispatch(
        incrementSpeechTherapyConsumptionThunk(ICE_CUBE_CONSUMPTION_TYPE, todayKey, delta),
      );
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <section className={styles.section}>
      <div>
        <h2 className={styles.heading}>Today</h2>
        <p className={styles.progress}>
          {quantity === 1 ? '1 ice cube' : `${quantity} ice cubes`}
        </p>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => void handleDelta(-1)}
          disabled={isBusy || quantity <= 0}
        >
          −1
        </button>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => void handleDelta(1)}
          disabled={isBusy}
        >
          +1 ice cube
        </button>
      </div>
    </section>
  );
};

const styles = {
  section: `
    flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4
    sm:flex-row sm:items-center sm:justify-between
  `,
  heading: `text-lg font-semibold text-gray-900`,
  progress: `mt-1 text-sm text-gray-700`,
  actions: `flex flex-wrap gap-2`,
  primaryButton: `
    rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white
    hover:bg-gray-800 disabled:opacity-50
  `,
  secondaryButton: `
    rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800
    hover:bg-gray-50 disabled:opacity-50
  `,
} as const;
