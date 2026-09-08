'use client';

import type { TherapyExercise } from '@/model';
import { THERAPY_TRACKING_KIND_LABELS } from '@/model';
import { ExerciseScheduleField } from '../schedule-field';
import { ExerciseDetailsMenu } from '../details-menu';

type Props = {
  exercise: TherapyExercise;
  isDeleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

/**
 * Details for the open therapy exercise, including the schedule control.
 */
export const ExerciseReadDetails = ({ exercise, isDeleting, onEdit, onDelete }: Props) => {
  const isSetsReps = exercise.tracking_kind === 'sets_reps';

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>{exercise.name}</h1>
        <ExerciseDetailsMenu isDeleting={isDeleting} onEdit={onEdit} onDelete={onDelete} />
      </div>
      <dl className={styles.list}>
        <div className={styles.row}>
          <dt className={styles.label}>Name</dt>
          <dd className={styles.value}>{exercise.name}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Type</dt>
          <dd className={styles.value}>{THERAPY_TRACKING_KIND_LABELS[exercise.tracking_kind]}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>{isSetsReps ? 'Sets' : 'Target attempts'}</dt>
          <dd className={styles.value}>{exercise.target_count}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>{isSetsReps ? 'Reps per set' : 'Seconds each'}</dt>
          <dd className={styles.value}>{exercise.unit_size}</dd>
        </div>
        <div className={styles.wideRow}>
          <dt className={styles.label}>Instructions</dt>
          <dd className={styles.value}>{exercise.instructions || '—'}</dd>
        </div>
        <div className={styles.wide}>
          <ExerciseScheduleField />
        </div>
      </dl>
    </section>
  );
};

const styles = {
  section: `
    h-full min-w-0 rounded-lg border border-gray-200 bg-white p-4
    space-y-4
  `,
  header: `flex items-start justify-between gap-3`,
  title: `text-xl font-semibold text-gray-900 min-w-0`,
  list: `
    grid grid-cols-1 gap-x-8 gap-y-3
    sm:grid-cols-2
  `,
  row: `grid grid-cols-[7rem_minmax(0,1fr)] gap-3 items-start`,
  wideRow: `
    grid min-w-0 grid-cols-[7rem_minmax(0,1fr)] gap-3 items-start
    sm:col-span-2
  `,
  wide: `min-w-0
    sm:col-span-2
  `,
  label: `text-xs font-medium uppercase tracking-wide text-gray-500`,
  value: `text-sm text-gray-900 whitespace-pre-wrap`,
} as const;
