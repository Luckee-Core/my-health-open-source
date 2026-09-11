'use client';

import type { TodayTherapyRow } from '@/packages/speech-therapy/build-today-therapy-rows';
import { formatTherapyExerciseProgress } from '@/packages/speech-therapy/format-therapy-exercise-progress';

type Props = {
  row: TodayTherapyRow;
  busy: boolean;
  onOpen: (exercise: TodayTherapyRow['exercise']) => void;
  onDelta: (exerciseId: string, completedCount: number, delta: number) => void;
};

export const SpeechTherapyTodayRow = ({ row, busy, onOpen, onDelta }: Props) => {
  const isBusy = busy;

  return (
    <tr
      className={
        row.isSkipped
          ? styles.rowSkipped
          : row.isComplete
            ? styles.rowComplete
            : styles.row
      }
      onClick={() => onOpen(row.exercise)}
    >
      <td className={styles.tdName}>{row.exercise.name}</td>
      <td className={styles.tdProgress}>
          {row.isSkipped
            ? 'Skipped today'
            : row.isSessionDue
              ? `Session · ${formatTherapyExerciseProgress(row.exercise, row.completedCount)}`
              : formatTherapyExerciseProgress(row.exercise, row.completedCount)}
      </td>
      <td className={styles.tdActions}>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={(event) => {
              event.stopPropagation();
              onDelta(row.exercise.id, row.completedCount, -1);
            }}
            disabled={isBusy || row.completedCount <= 0 || row.isSkipped}
          >
            −1
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={(event) => {
              event.stopPropagation();
              onDelta(row.exercise.id, row.completedCount, 1);
            }}
            disabled={isBusy || row.isSkipped}
          >
            +1
          </button>
        </div>
      </td>
    </tr>
  );
};

const styles = {
  row: `cursor-pointer hover:bg-gray-50`,
  rowComplete: `cursor-pointer bg-green-50 hover:bg-green-100`,
  rowSkipped: `cursor-pointer bg-gray-50 text-gray-500 hover:bg-gray-100`,
  tdName: `px-2 py-0.5 font-medium text-gray-900`,
  tdProgress: `px-2 py-0.5 text-gray-600`,
  tdActions: `px-2 py-0.5 text-right whitespace-nowrap`,
  actions: `inline-flex items-center justify-end gap-1`,
  primaryButton: `
    rounded bg-gray-900 px-1.5 py-0.5 text-xs font-medium text-white
    hover:bg-gray-800 disabled:opacity-50
  `,
  secondaryButton: `
    rounded border border-gray-300 bg-white px-1.5 py-0.5 text-xs text-gray-800
    hover:bg-gray-50 disabled:opacity-50
  `,
} as const;
