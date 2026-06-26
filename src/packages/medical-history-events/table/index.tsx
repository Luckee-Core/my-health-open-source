'use client';

import { useMemo, useState } from 'react';
import type { MedicalHistoryEvent } from '@/model';
import { MEDICAL_HISTORY_CATEGORY_LABELS } from '@/model';
import { deleteMedicalHistoryEventThunk } from '@/store/thunks';
import { CurrentMedicalHistoryEventActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

const truncate = (value: string | null, max = 80): string => {
  if (!value) return '—';
  return value.length > max ? `${value.slice(0, max)}…` : value;
};

export const MedicalHistoryEventsTable = () => {
  const dispatch = useAppDispatch();
  const eventsDump = useAppSelector((state) => state.medicalHistoryEvents);
  const doctorsDump = useAppSelector((state) => state.doctors);

  const events = useMemo(() => Object.values(eventsDump), [eventsDump]);
  const doctors = useMemo(() => Object.values(doctorsDump), [doctorsDump]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const sorted = useMemo(
    () =>
      [...events].sort((a, b) => {
        const dateCmp = b.event_date.localeCompare(a.event_date);
        if (dateCmp !== 0) return dateCmp;
        return b.created_at.localeCompare(a.created_at);
      }),
    [events],
  );

  const doctorNameById = useMemo(() => {
    const map: Record<string, string> = {};
    for (const doctor of doctors) {
      map[doctor.id] = doctor.name;
    }
    return map;
  }, [doctors]);

  const handleDelete = async (event: MedicalHistoryEvent) => {
    if (!window.confirm(`Delete "${event.title}"?`)) return;

    setActionError(null);
    setBusyId(event.id);
    const status = await dispatch(deleteMedicalHistoryEventThunk(event.id));
    setBusyId(null);
    if (status !== 200) {
      setActionError('Failed to delete');
    }
  };

  return (
    <div className={styles.wrapper}>
      {actionError && <p className={styles.error}>{actionError}</p>}
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Title</th>
            <th className={styles.th}>Category</th>
            <th className={styles.th}>Description</th>
            <th className={styles.th}>Doctor</th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id} className={styles.row}>
              <td className={styles.td}>{row.event_date}</td>
              <td className={styles.td}>{row.title}</td>
              <td className={styles.td}>
                <span className={styles.badge}>
                  {MEDICAL_HISTORY_CATEGORY_LABELS[row.category]}
                </span>
              </td>
              <td className={styles.tdMuted}>{truncate(row.description)}</td>
              <td className={styles.tdMuted}>
                {row.doctor_id ? doctorNameById[row.doctor_id] ?? '—' : '—'}
              </td>
              <td className={styles.tdActions}>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() =>
                      dispatch(CurrentMedicalHistoryEventActions.setCurrentMedicalHistoryEvent(row))
                    }
                    disabled={busyId === row.id}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={styles.dangerButton}
                    onClick={() => void handleDelete(row)}
                    disabled={busyId === row.id}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={6} className={styles.empty}>
                No medical history events yet. Add diagnoses, surgeries, imaging, and milestones.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  wrapper: `space-y-2`,
  error: `text-sm text-red-600`,
  table: `min-w-full overflow-x-auto rounded-lg border border-gray-200 bg-white text-sm`,
  thead: `bg-gray-50 text-left text-gray-600`,
  th: `px-4 py-2 font-medium`,
  thActions: `px-4 py-2 font-medium text-right`,
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
  tdMuted: `px-4 py-2 align-top text-gray-600`,
  tdActions: `px-4 py-2 text-right align-top`,
  badge: `inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700`,
  actions: `flex justify-end gap-2`,
  linkButton: `text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50`,
  dangerButton: `text-sm text-red-600 hover:text-red-800 disabled:opacity-50`,
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
