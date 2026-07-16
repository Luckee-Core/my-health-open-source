'use client';

import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { commitHealthImportThunk, resetHealthImportThunk } from '@/store/thunks';

export const PreviewStep = () => {
  const dispatch = useAppDispatch();
  const builder = useAppSelector((state) => state.healthImportBuilder);
  const draft = useAppSelector((state) => state.currentHealthImportDraft);

  const countRows = useMemo(() => {
    const c = draft.counts;
    return [
      { label: 'Hospitals', value: c.hospitals },
      { label: 'Specialties', value: c.specialties },
      { label: 'Doctors', value: c.doctors },
      { label: 'Appointments', value: c.appointments },
      { label: 'Allergies', value: c.allergies },
      { label: 'Medications', value: c.medications },
      { label: 'Conditions', value: c.conditions },
      { label: 'Vital signs', value: c.vitalSigns },
      { label: 'Clinical results', value: c.clinicalResults },
      { label: 'Clinical notes', value: c.clinicalNotes },
      { label: 'Referrals', value: c.referrals },
      { label: 'Insurance', value: c.insuranceCoverages },
      { label: 'Medical history', value: c.medicalHistoryEvents },
      { label: 'Symptoms', value: c.symptomLogs },
    ].filter((row) => row.value > 0);
  }, [draft]);

  const sampleAllergies = useMemo(() => draft.samples.allergies.slice(0, 5), [draft]);
  const sampleMedications = useMemo(() => draft.samples.medications.slice(0, 5), [draft]);
  const sampleConditions = useMemo(() => draft.samples.conditions.slice(0, 5), [draft]);
  const noteTitles = useMemo(() => draft.samples.clinicalNoteTitles.slice(0, 5), [draft]);

  const isCommitting = builder.commitStatus === 'loading' || builder.step === 'committing';

  return (
    <div className={styles.panel}>
      <h2 className={styles.heading}>Preview import</h2>
      <p className={styles.body}>
        {builder.filename} · {builder.documentCount} document
        {builder.documentCount === 1 ? '' : 's'}
      </p>

      <div className={styles.counts}>
        {countRows.map((row) => (
          <div key={row.label} className={styles.countItem}>
            <span className={styles.countValue}>{row.value}</span>
            <span className={styles.countLabel}>{row.label}</span>
          </div>
        ))}
      </div>

      {sampleAllergies.length > 0 && (
        <div className={styles.sampleBlock}>
          <h3 className={styles.sampleTitle}>Sample allergies</h3>
          <ul className={styles.list}>
            {sampleAllergies.map((item, index) => (
              <li key={`${item.substance}-${index}`}>
                {item.substance}
                {item.reaction ? ` — ${item.reaction}` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}

      {sampleMedications.length > 0 && (
        <div className={styles.sampleBlock}>
          <h3 className={styles.sampleTitle}>Sample medications</h3>
          <ul className={styles.list}>
            {sampleMedications.map((item, index) => (
              <li key={`${item.name}-${index}`}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}

      {sampleConditions.length > 0 && (
        <div className={styles.sampleBlock}>
          <h3 className={styles.sampleTitle}>Sample conditions</h3>
          <ul className={styles.list}>
            {sampleConditions.map((item, index) => (
              <li key={`${item.name}-${index}`}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}

      {noteTitles.length > 0 && (
        <div className={styles.sampleBlock}>
          <h3 className={styles.sampleTitle}>Clinical note titles</h3>
          <ul className={styles.list}>
            {noteTitles.map((title) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        </div>
      )}

      {builder.errorMessage && <p className={styles.error}>{builder.errorMessage}</p>}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelButton}
          disabled={isCommitting}
          onClick={() => void dispatch(resetHealthImportThunk())}
        >
          Start over
        </button>
        <button
          type="button"
          className={styles.primaryButton}
          disabled={isCommitting || !builder.previewId}
          onClick={() => void dispatch(commitHealthImportThunk())}
        >
          {isCommitting ? 'Importing…' : 'Import into My Health'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  panel: `rounded-lg border border-gray-200 bg-white p-6 space-y-4`,
  heading: `text-lg font-semibold text-gray-900`,
  body: `text-sm text-gray-600`,
  counts: `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3`,
  countItem: `rounded-md border border-gray-100 bg-gray-50 px-3 py-2`,
  countValue: `block text-lg font-semibold text-gray-900`,
  countLabel: `text-xs text-gray-600`,
  sampleBlock: `space-y-1`,
  sampleTitle: `text-sm font-medium text-gray-800`,
  list: `list-disc pl-5 text-sm text-gray-700 space-y-0.5`,
  error: `text-sm text-red-600`,
  actions: `flex justify-end gap-2 pt-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700 disabled:opacity-50`,
  primaryButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
