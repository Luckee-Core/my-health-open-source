'use client';

import { useEffect, useMemo, useState } from 'react';
import { getAllSymptomDefinitions } from '@/api/symptom-definitions';
import {
  MORNING_CHECK_IN_TIME_PERIODS,
  SYMPTOM_LOG_TIME_PERIOD_LABELS,
  type SymptomDefinition,
  type SymptomLogTimePeriod,
} from '@/model';
import { batchCheckInThunk } from '@/store/thunks';
import { useAppDispatch } from '@/store';
import { TodayTracker } from '@/packages/speech-therapy/today-tracker';

type RowState = {
  severity: number | null;
  notes: string;
};

const makeRowKey = (definitionId: string, timePeriod: SymptomLogTimePeriod): string =>
  `${definitionId}:${timePeriod}`;

export const MorningCheckInPage = () => {
  const dispatch = useAppDispatch();
  const [definitions, setDefinitions] = useState<SymptomDefinition[]>([]);
  const [loadError, setLoadError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<Record<string, RowState>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      setLoadError('');
      const result = await getAllSymptomDefinitions();
      if (cancelled) return;
      setIsLoading(false);
      if (!result.ok) {
        setLoadError('Failed to load symptom definitions');
        return;
      }
      setDefinitions(result.data);
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const sortedDefinitions = useMemo(
    () =>
      [...definitions].sort((a, b) => {
        const byOrder = a.sort_order - b.sort_order;
        if (byOrder !== 0) return byOrder;
        return a.name.localeCompare(b.name);
      }),
    [definitions],
  );

  const updateRow = (
    definitionId: string,
    timePeriod: SymptomLogTimePeriod,
    patch: Partial<RowState>,
  ) => {
    const key = makeRowKey(definitionId, timePeriod);
    setRows((prev) => ({
      ...prev,
      [key]: {
        severity: patch.severity ?? prev[key]?.severity ?? null,
        notes: patch.notes ?? prev[key]?.notes ?? '',
      },
    }));
    setSubmitSuccess(false);
  };

  const handleSubmit = async () => {
    setSubmitError('');
    setSubmitSuccess(false);

    const entries = sortedDefinitions.flatMap((definition) =>
      MORNING_CHECK_IN_TIME_PERIODS.flatMap((timePeriod) => {
        const key = makeRowKey(definition.id, timePeriod);
        const row = rows[key];
        if (row?.severity == null) return [];
        return [
          {
            symptom_definition_id: definition.id,
            time_period: timePeriod,
            severity: row.severity,
            notes: row.notes.trim() || null,
          },
        ];
      }),
    );

    if (entries.length === 0) {
      setSubmitError('Set severity for at least one symptom row before submitting.');
      return;
    }

    setIsSubmitting(true);
    const status = await dispatch(batchCheckInThunk({ entries }));
    setIsSubmitting(false);

    if (status !== 200) {
      setSubmitError('Failed to submit check-in');
      return;
    }

    setRows({});
    setSubmitSuccess(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Morning check-in</h1>
          <p className={styles.subtitle}>
            Log symptom severity for last night, this morning, and now. Only rows with a severity
            are saved.
          </p>
        </div>
        <button
          type="button"
          disabled={isSubmitting || isLoading}
          onClick={() => void handleSubmit()}
          className={styles.primaryButton}
        >
          {isSubmitting ? 'Saving…' : 'Submit check-in'}
        </button>
      </div>

      {loadError && <p className={styles.error}>{loadError}</p>}
      {submitError && <p className={styles.error}>{submitError}</p>}
      {submitSuccess && <p className={styles.success}>Check-in saved.</p>}

      <section className={styles.therapySection}>
        <h2 className={styles.sectionTitle}>Speech therapy</h2>
        <p className={styles.sectionSubtitle}>
          Log homework progress now — updates save immediately.
        </p>
        <TodayTracker variant="compact" showTimer incompleteFirst />
      </section>

      {isLoading ? (
        <p className={styles.muted}>Loading symptoms…</p>
      ) : sortedDefinitions.length === 0 ? (
        <p className={styles.muted}>No active symptom definitions configured.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Symptom</th>
                {MORNING_CHECK_IN_TIME_PERIODS.map((period) => (
                  <th key={period} className={styles.thPeriod}>
                    {SYMPTOM_LOG_TIME_PERIOD_LABELS[period]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedDefinitions.map((definition) => (
                <tr key={definition.id} className={styles.row}>
                  <td className={styles.tdSymptom}>{definition.name}</td>
                  {MORNING_CHECK_IN_TIME_PERIODS.map((timePeriod) => {
                    const key = makeRowKey(definition.id, timePeriod);
                    const row = rows[key] ?? { severity: null, notes: '' };
                    return (
                      <td key={timePeriod} className={styles.tdPeriod}>
                        <div className={styles.periodCell}>
                          <div className={styles.severityRow}>
                            <input
                              type="range"
                              min={1}
                              max={10}
                              step={1}
                              value={row.severity ?? 5}
                              onChange={(e) =>
                                updateRow(definition.id, timePeriod, {
                                  severity: Number(e.target.value),
                                })
                              }
                              className={styles.slider}
                            />
                            <select
                              value={row.severity ?? ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                updateRow(definition.id, timePeriod, {
                                  severity: value ? Number(value) : null,
                                });
                              }}
                              className={styles.select}
                            >
                              <option value="">—</option>
                              {Array.from({ length: 10 }, (_, index) => index + 1).map((n) => (
                                <option key={n} value={n}>{n}</option>
                              ))}
                            </select>
                          </div>
                          <input
                            type="text"
                            placeholder="Notes (optional)"
                            value={row.notes}
                            onChange={(e) =>
                              updateRow(definition.id, timePeriod, { notes: e.target.value })
                            }
                            className={styles.notesInput}
                          />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: `space-y-4`,
  header: `flex items-center justify-between gap-4`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
  primaryButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white shrink-0 disabled:opacity-50`,
  error: `text-sm text-red-600`,
  success: `text-sm text-green-700`,
  therapySection: `
    rounded-lg border border-gray-200 bg-white p-4 space-y-3
  `,
  sectionTitle: `text-base font-semibold text-gray-900`,
  sectionSubtitle: `text-sm text-gray-600`,
  muted: `text-sm text-gray-500`,
  tableWrapper: `overflow-x-auto rounded-lg border border-gray-200 bg-white`,
  table: `min-w-full text-sm`,
  thead: `bg-gray-50 text-left text-gray-600`,
  th: `px-4 py-2 font-medium`,
  thPeriod: `px-4 py-2 font-medium min-w-[200px]`,
  row: `border-t border-gray-100`,
  tdSymptom: `px-4 py-3 align-top font-medium text-gray-900`,
  tdPeriod: `px-4 py-3 align-top`,
  periodCell: `space-y-2`,
  severityRow: `flex items-center gap-2`,
  slider: `w-full min-w-[80px]`,
  select: `rounded-md border border-gray-300 px-2 py-1 text-sm shrink-0`,
  notesInput: `w-full rounded-md border border-gray-300 px-2 py-1 text-sm`,
} as const;
