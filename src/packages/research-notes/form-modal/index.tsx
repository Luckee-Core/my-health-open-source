'use client';

import { useMemo, useState } from 'react';
import type { ResearchNote, ResearchNoteCategory } from '@/model';
import { RESEARCH_NOTE_CATEGORY_LABELS } from '@/model';
import { createResearchNoteThunk, updateResearchNoteThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  researchNote?: ResearchNote | null;
};

export const ResearchNoteFormModal = ({ isOpen, onClose, researchNote }: Props) => {
  if (!isOpen) return null;

  return (
    <ResearchNoteFormModalBody
      key={researchNote?.id ?? 'new'}
      onClose={onClose}
      researchNote={researchNote}
    />
  );
};

type BodyProps = {
  onClose: () => void;
  researchNote?: ResearchNote | null;
};

const ResearchNoteFormModalBody = ({ onClose, researchNote }: BodyProps) => {
  const dispatch = useAppDispatch();
  const focusAreasDump = useAppSelector((state) => state.focusAreas);
  const focusAreas = useMemo(() => Object.values(focusAreasDump), [focusAreasDump]);

  const isEdit = researchNote != null;
  const [title, setTitle] = useState(researchNote?.title ?? '');
  const [category, setCategory] = useState<ResearchNoteCategory>(
    researchNote?.category ?? 'other',
  );
  const [sourceUrl, setSourceUrl] = useState(researchNote?.source_url ?? '');
  const [summary, setSummary] = useState(researchNote?.summary ?? '');
  const [content, setContent] = useState(researchNote?.content ?? '');
  const [focusAreaId, setFocusAreaId] = useState(researchNote?.focus_area_id ?? '');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const focusAreaOptions = useMemo(
    () => [...focusAreas].sort((a, b) => a.name.localeCompare(b.name)),
    [focusAreas],
  );

  const handleSubmit = async () => {
    setError('');
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setIsSaving(true);
    const payload = {
      title: title.trim(),
      category,
      source_url: sourceUrl.trim() || null,
      summary: summary.trim() || null,
      content: content.trim() || null,
      focus_area_id: focusAreaId || null,
    };
    const httpStatus = isEdit
      ? await dispatch(updateResearchNoteThunk(researchNote.id, payload))
      : await dispatch(createResearchNoteThunk(payload));
    setIsSaving(false);

    if (httpStatus !== 200) {
      setError('Failed to save');
      return;
    }
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2 className={styles.heading}>{isEdit ? 'Edit research note' : 'New research note'}</h2>
        <div className={styles.fields}>
          <input
            type="text"
            placeholder="Title"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className={styles.label}>
            Category
            <select
              className={styles.input}
              value={category}
              onChange={(e) => setCategory(e.target.value as ResearchNoteCategory)}
            >
              {(Object.keys(RESEARCH_NOTE_CATEGORY_LABELS) as ResearchNoteCategory[]).map((key) => (
                <option key={key} value={key}>
                  {RESEARCH_NOTE_CATEGORY_LABELS[key]}
                </option>
              ))}
            </select>
          </label>
          <input
            type="url"
            placeholder="Source URL (optional)"
            className={styles.input}
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
          />
          <textarea
            placeholder="Short summary for the list view"
            className={styles.textareaShort}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <textarea
            placeholder="Full content — paste reports, chat exports, or long notes"
            className={styles.textareaLong}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <label className={styles.label}>
            Focus area (optional)
            <select
              className={styles.input}
              value={focusAreaId}
              onChange={(e) => setFocusAreaId(e.target.value)}
            >
              <option value="">None</option>
              {focusAreaOptions.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </label>
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            type="button"
            disabled={isSaving || !title.trim()}
            onClick={() => void handleSubmit()}
            className={styles.saveButton}
          >
            {isSaving ? 'Saving…' : isEdit ? 'Save' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: `fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4`,
  panel: `w-full max-w-2xl rounded-lg bg-white p-5 shadow-lg max-h-[90vh] overflow-y-auto`,
  heading: `text-lg font-semibold text-gray-900`,
  fields: `mt-4 space-y-3`,
  label: `block text-sm text-gray-700 space-y-1`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  textareaShort: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[72px]`,
  textareaLong: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[200px] font-mono text-xs`,
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
