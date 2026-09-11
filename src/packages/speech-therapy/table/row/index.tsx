'use client';

import type { TherapyExercise } from '@/model';
import type { SpeechTherapyTableRow } from '../../build-speech-therapy-table-rows';
import { formatTherapyExerciseProgress } from '../../format-therapy-exercise-progress';

type Props = {
  row: SpeechTherapyTableRow;
  busy: boolean;
  onOpenDetail: (exercise: TherapyExercise) => void;
  onDelta: (exerciseId: string, completedCount: number, delta: number) => void;
  onSetDue: (exerciseId: string, due: boolean) => void;
};

export const TherapyExerciseRow = ({
  row,
  busy,
  onOpenDetail,
  onDelta,
  onSetDue,
}: Props) => {
  const showSessionActivate = row.isSessionOnly && !row.isSessionDue;

  return (
    <tr
      className={
        row.isInactive
          ? styles.rowInactive
          : row.isSkipped
            ? styles.rowSkipped
            : row.isComplete
              ? styles.rowComplete
              : row.isSessionOnly
                ? styles.rowSession
                : styles.row
      }
      onClick={() => onOpenDetail(row.exercise)}
    >
      <td className={styles.tdName}>{row.exercise.name}</td>
      <td className={styles.tdProgress}>
        {row.isInactive
          ? 'Paused'
          : showSessionActivate
            ? 'Session only'
            : row.isSkipped
              ? 'Skipped today'
              : formatTherapyExerciseProgress(row.exercise, row.completedCount)}
      </td>
      <td className={styles.tdActions}>
        <div className={styles.actions}>
          {showSessionActivate ? (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={(event) => {
                event.stopPropagation();
                onSetDue(row.exercise.id, true);
              }}
              disabled={busy || row.isInactive}
            >
              Active today
            </button>
          ) : (
            <>
              {row.isSessionDue && (
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={(event) => {
                    event.stopPropagation();
                    onSetDue(row.exercise.id, false);
                  }}
                  disabled={busy || row.isInactive}
                >
                  Not today
                </button>
              )}
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={(event) => {
                  event.stopPropagation();
                  onDelta(row.exercise.id, row.completedCount, -1);
                }}
                disabled={busy || row.isInactive || row.completedCount <= 0 || row.isSkipped}
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
                disabled={busy || row.isInactive || row.isSkipped}
              >
                +1
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

const styles = {
  row: `cursor-pointer hover:bg-gray-50`,
  rowComplete: `cursor-pointer bg-green-50 hover:bg-green-100`,
  rowSkipped: `cursor-pointer bg-gray-50 text-gray-500 hover:bg-gray-100`,
  rowInactive: `cursor-pointer bg-gray-50 text-gray-500 hover:bg-gray-100`,
  rowSession: `cursor-pointer bg-white text-gray-700 hover:bg-gray-50`,
  tdName: `px-3 py-2 font-medium text-gray-900`,
  tdProgress: `px-3 py-2 text-gray-600`,
  tdActions: `px-3 py-2 text-right whitespace-nowrap`,
  actions: `inline-flex items-center justify-end gap-1`,
  primaryButton: `
    rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white
    hover:bg-gray-800 disabled:opacity-50
  `,
  secondaryButton: `
    rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-800
    hover:bg-gray-50 disabled:opacity-50
  `,
} as const;
