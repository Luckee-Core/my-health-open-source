'use client';

import { DoctorsBuilderActions } from '@/store/builders';
import { useAppDispatch, useAppSelector } from '@/store';

export const NewHospitalNameInput = () => {
  const dispatch = useAppDispatch();
  const builder = useAppSelector((state) => state.doctorsBuilder);

  return (
    <input
      type="text"
      placeholder="Or new facility name"
      className={styles.input}
      value={builder.newHospitalName}
      onChange={(e) => dispatch(DoctorsBuilderActions.setNewHospitalName(e.target.value))}
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
