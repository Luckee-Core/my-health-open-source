'use client';

import { DoctorsBuilderActions } from '@/store/builders';
import { useAppDispatch, useAppSelector } from '@/store';

export const NewSpecialtyNameInput = () => {
  const dispatch = useAppDispatch();
  const builder = useAppSelector((state) => state.doctorsBuilder);

  return (
    <input
      type="text"
      placeholder="Or new specialty name"
      className={styles.input}
      value={builder.newSpecialtyName}
      onChange={(e) => dispatch(DoctorsBuilderActions.setNewSpecialtyName(e.target.value))}
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
