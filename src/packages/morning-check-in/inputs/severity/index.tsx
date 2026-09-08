'use client';

import type { SymptomLogTimePeriod } from '@/model';
import { MorningCheckInBuilderActions } from '@/store/builders';
import { useAppDispatch, useAppSelector } from '@/store';
import { makeMorningCheckInRowKey } from '../../make-morning-check-in-row-key';

type Props = {
  definitionId: string;
  timePeriod: SymptomLogTimePeriod;
};

export const SeverityInput = ({ definitionId, timePeriod }: Props) => {
  const dispatch = useAppDispatch();
  const builder = useAppSelector((state) => state.morningCheckInBuilder);
  const key = makeMorningCheckInRowKey(definitionId, timePeriod);
  const severity = builder.severityByKey[key] ?? null;

  return (
    <div className={styles.severityRow}>
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={severity ?? 5}
        onChange={(e) =>
          dispatch(
            MorningCheckInBuilderActions.setSeverity({
              key,
              value: Number(e.target.value),
            }),
          )
        }
        className={styles.slider}
      />
      <select
        value={severity ?? ''}
        onChange={(e) => {
          const value = e.target.value;
          dispatch(
            MorningCheckInBuilderActions.setSeverity({
              key,
              value: value ? Number(value) : null,
            }),
          );
        }}
        className={styles.select}
      >
        <option value="">—</option>
        {Array.from({ length: 10 }, (_, index) => index + 1).map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
};

const styles = {
  severityRow: `flex items-center gap-2`,
  slider: `w-full min-w-[80px]`,
  select: `rounded-md border border-gray-300 px-2 py-1 text-sm shrink-0`,
} as const;
