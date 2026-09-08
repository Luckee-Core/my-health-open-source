'use client';

import { useMemo, useState } from 'react';
import type { SymptomLog } from '@/model';
import { deleteSymptomLogThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { SymptomLogRow } from './row';

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
            <SymptomLogRow
              key={row.id}
              row={row}
              busy={busyId === row.id}
              focusAreaName={row.focus_area_id ? focusAreaNameById[row.focus_area_id] ?? '—' : '—'}
              onDelete={(log) => void handleDelete(log)}
            />
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
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
