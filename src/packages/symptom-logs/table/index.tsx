'use client';

import { useMemo, useState } from 'react';
import type { SymptomLog } from '@/model';
import { deleteSymptomLogThunk } from '@/store/thunks';
import { CurrentSymptomLogActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

const truncate = (value: string | null, max = 60): string => {
  if (!value) return '—';
  return value.length > max ? `${value.slice(0, max)}…` : value;
};

const formatRecordedAt = (iso: string): string => {
  return new Date(iso).toLocaleString();
};

export const SymptomLogsTable = () => {
  const dispatch = useAppDispatch();
  const logsDump = useAppSelector((state) => state.symptomLogs);
  const focusAreasDump = useAppSelector((state) => state.focusAreas);

  const logs = useMemo(() => Object.values(logsDump), [logsDump]);
  const focusAreas = useMemo(() => Object.values(focusAreasDump), [focusAreasDump]);
  const [nameFilter, setNameFilter] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const focusAreaNameById = useMemo(() => {
    const map: Record<string, string> = {};
    for (const area of focusAreas) {
      map[area.id] = area.name;
    }
    return map;
  }, [focusAreas]);

  const sorted = useMemo(() => {
    const filtered = nameFilter.trim()
      ? logs.filter((log) =>
          log.name.toLowerCase().includes(nameFilter.trim().toLowerCase()),
        )
      : logs;
    return [...filtered].sort((a, b) => b.recorded_at.localeCompare(a.recorded_at));
  }, [logs, nameFilter]);

  const handleDelete = async (log: SymptomLog) => {
    if (!window.confirm(`Delete symptom log "${log.name}"?`)) return;

    setActionError(null);
    setBusyId(log.id);
    const status = await dispatch(deleteSymptomLogThunk(log.id));
    setBusyId(null);
    if (status !== 200) {
      setActionError('Failed to delete');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterRow}>
        <input
          type="text"
          placeholder="Filter by symptom name…"
          className={styles.filterInput}
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>
      {actionError && <p className={styles.error}>{actionError}</p>}
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>When</th>
            <th className={styles.th}>Symptom</th>
            <th className={styles.thRight}>Severity</th>
            <th className={styles.th}>Triggers</th>
            <th className={styles.th}>Notes</th>
            <th className={styles.th}>Focus area</th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id} className={styles.row}>
              <td className={styles.tdMuted}>{formatRecordedAt(row.recorded_at)}</td>
              <td className={styles.td}>{row.name}</td>
              <td className={styles.tdRight}>{row.severity ?? '—'}</td>
              <td className={styles.tdMuted}>{truncate(row.triggers, 40)}</td>
              <td className={styles.tdMuted}>{truncate(row.notes)}</td>
              <td className={styles.tdMuted}>
                {row.focus_area_id ? focusAreaNameById[row.focus_area_id] ?? '—' : '—'}
              </td>
              <td className={styles.tdActions}>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => dispatch(CurrentSymptomLogActions.setCurrentSymptomLog(row))}
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
              <td colSpan={7} className={styles.empty}>
                No symptom logs yet. Record episodes with severity, triggers, and timing.
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
  filterRow: `flex justify-end`,
  filterInput: `w-full max-w-xs rounded-md border border-gray-300 px-3 py-1.5 text-sm`,
  error: `text-sm text-red-600`,
  table: `min-w-full overflow-x-auto rounded-lg border border-gray-200 bg-white text-sm`,
  thead: `bg-gray-50 text-left text-gray-600`,
  th: `px-4 py-2 font-medium`,
  thRight: `px-4 py-2 font-medium text-right`,
  thActions: `px-4 py-2 font-medium text-right`,
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
  tdMuted: `px-4 py-2 align-top text-gray-600`,
  tdRight: `px-4 py-2 text-right align-top`,
  tdActions: `px-4 py-2 text-right align-top`,
  actions: `flex justify-end gap-2`,
  linkButton: `text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50`,
  dangerButton: `text-sm text-red-600 hover:text-red-800 disabled:opacity-50`,
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
