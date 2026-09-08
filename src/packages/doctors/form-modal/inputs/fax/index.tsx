'use client';

import { CurrentDoctorActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const FaxInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentDoctor);

  return (
    <input
      type="text"
      placeholder="Fax"
      className={styles.input}
      value={current.fax ?? ''}
      onChange={(e) =>
        dispatch(CurrentDoctorActions.patchCurrentDoctor({ fax: e.target.value || null }))
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
