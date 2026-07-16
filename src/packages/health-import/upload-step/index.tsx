'use client';

import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { previewHealthImportThunk } from '@/store/thunks';

export const UploadStep = () => {
  const dispatch = useAppDispatch();
  const builder = useAppSelector((state) => state.healthImportBuilder);
  const inputRef = useRef<HTMLInputElement>(null);
  const [localName, setLocalName] = useState('');

  const isLoading = builder.previewStatus === 'loading';

  const handleFileChange = async (file: File | null) => {
    if (!file) return;
    setLocalName(file.name);
    await dispatch(previewHealthImportThunk(file));
  };

  return (
    <div className={styles.panel}>
      <h2 className={styles.heading}>Upload health summary</h2>
      <p className={styles.body}>
        Choose a C-CDA Health Summary ZIP (or XML package) exported from your provider portal.
      </p>
      <input
        ref={inputRef}
        type="file"
        accept=".zip,.xml,application/zip,text/xml,application/xml"
        className={styles.fileInput}
        disabled={isLoading}
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          void handleFileChange(file);
        }}
      />
      {localName && <p className={styles.filename}>Selected: {localName}</p>}
      {builder.errorMessage && <p className={styles.error}>{builder.errorMessage}</p>}
      {isLoading && <p className={styles.muted}>Parsing package…</p>}
      <button
        type="button"
        className={styles.secondaryButton}
        disabled={isLoading}
        onClick={() => inputRef.current?.click()}
      >
        {isLoading ? 'Uploading…' : 'Choose file'}
      </button>
    </div>
  );
};

const styles = {
  panel: `rounded-lg border border-gray-200 bg-white p-6 space-y-3`,
  heading: `text-lg font-semibold text-gray-900`,
  body: `text-sm text-gray-600 max-w-2xl`,
  fileInput: `block w-full text-sm text-gray-700`,
  filename: `text-sm text-gray-700`,
  error: `text-sm text-red-600`,
  muted: `text-sm text-gray-500`,
  secondaryButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
