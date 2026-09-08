'use client';

import type { SymptomLogTimePeriod } from '@/model';
import { MorningCheckInBuilderActions } from '@/store/builders';
import { useAppDispatch, useAppSelector } from '@/store';
import { makeMorningCheckInRowKey } from '../../make-morning-check-in-row-key';

type Props = {
  definitionId: string;
  timePeriod: SymptomLogTimePeriod;
};

export const NotesInput = ({ definitionId, timePeriod }: Props) => {
  const dispatch = useAppDispatch();
  const builder = useAppSelector((state) => state.morningCheckInBuilder);
  const key = makeMorningCheckInRowKey(definitionId, timePeriod);

  return (
    <input
      type="text"
      placeholder="Notes (optional)"
      value={builder.notesByKey[key] ?? ''}
      onChange={(e) =>
        dispatch(MorningCheckInBuilderActions.setNotes({ key, value: e.target.value }))
      }
      className={styles.notesInput}
    />
  );
};

const styles = {
  notesInput: `w-full rounded-md border border-gray-300 px-2 py-1 text-sm`,
} as const;
