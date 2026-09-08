'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components';
import { SPEECH_THERAPY_PATH } from '@/config/routes';
import { TherapyExerciseFormModal } from '@/packages/speech-therapy/form-modal';
import { TherapyExercisesBuilderActions } from '@/store/builders';
import { deleteTherapyExerciseThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { ExerciseHistoryCalendar } from './history-calendar';
import { ExerciseReadDetails } from './read-details';
import { ExerciseTodayLog } from './today-log';

export const SpeechTherapyExerciseDetailPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const current = useAppSelector((state) => state.currentTherapyExercise);
  const exercisesDump = useAppSelector((state) => state.therapyExercises);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const exercise = useMemo(
    () => (current.id === '' ? current : (exercisesDump[current.id] ?? current)),
    [current, exercisesDump],
  );

  const breadcrumbItems = useMemo(
    () => [
      { label: 'Speech therapy', href: SPEECH_THERAPY_PATH },
      ...(exercise.id === '' ? [] : [{ label: exercise.name }]),
    ],
    [exercise.id, exercise.name],
  );

  if (exercise.id === '') {
    return (
      <div className={styles.page}>
        <Breadcrumbs items={breadcrumbItems} />
        <p className={styles.muted}>No exercise selected.</p>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${exercise.name}"?`)) return;

    setActionError(null);
    setIsDeleting(true);
    const status = await dispatch(deleteTherapyExerciseThunk(exercise.id));
    setIsDeleting(false);

    if (status !== 200) {
      setActionError('Failed to delete');
      return;
    }

    router.push(SPEECH_THERAPY_PATH);
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs items={breadcrumbItems} />

      {actionError && <p className={styles.error}>{actionError}</p>}

      <div className={styles.topRow}>
        <div className={styles.detailsPane}>
          <ExerciseReadDetails
            exercise={exercise}
            isDeleting={isDeleting}
            onEdit={() => dispatch(TherapyExercisesBuilderActions.setIsEditOpen(true))}
            onDelete={() => void handleDelete()}
          />
        </div>
        <div className={styles.todayPane}>
          <ExerciseTodayLog exercise={exercise} />
        </div>
      </div>
      <ExerciseHistoryCalendar exercise={exercise} />
      <TherapyExerciseFormModal />
    </div>
  );
};

const styles = {
  page: `space-y-6`,
  error: `text-sm text-red-600`,
  topRow: `
    grid grid-cols-1 gap-4
    lg:grid-cols-4
  `,
  detailsPane: `min-w-0
    lg:col-span-3
  `,
  todayPane: `min-w-0
    lg:col-span-1
  `,
  muted: `text-sm text-gray-500`,
} as const;
