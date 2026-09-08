'use client';

import type { ResearchNoteCategory } from '@/model';
import { RESEARCH_NOTE_CATEGORY_LABELS } from '@/model';
import { CurrentResearchNoteActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const CategoryInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentResearchNote);

  return (
    <label className={styles.label}>
      Category
      <select
        className={styles.input}
        value={current.category}
        onChange={(e) =>
          dispatch(
            CurrentResearchNoteActions.patchCurrentResearchNote({
              category: e.target.value as ResearchNoteCategory,
            }),
          )
        }
      >
        {(Object.keys(RESEARCH_NOTE_CATEGORY_LABELS) as ResearchNoteCategory[]).map((key) => (
          <option key={key} value={key}>
            {RESEARCH_NOTE_CATEGORY_LABELS[key]}
          </option>
        ))}
      </select>
    </label>
  );
};

const styles = {
  label: `block text-sm text-gray-700 space-y-1`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
