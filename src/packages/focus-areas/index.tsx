'use client';

import { useState } from 'react';
import type { FocusArea } from '@/model/focus-area';
import { FocusAreaFormModal } from './form-modal';
import { FocusAreasTable } from './table';

export const FocusAreasPage = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingFocusArea, setEditingFocusArea] = useState<FocusArea | null>(null);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Focus areas</h1>
          <p className={styles.subtitle}>
            Define what you want to track — headaches, energy, breathing, follow-up concerns, and
            more.
          </p>
        </div>
        <button type="button" onClick={() => setIsCreateOpen(true)} className={styles.primaryButton}>
          Add focus area
        </button>
      </div>
      <FocusAreasTable onEdit={setEditingFocusArea} />
      <FocusAreaFormModal
        isOpen={isCreateOpen || editingFocusArea !== null}
        focusArea={editingFocusArea}
        onClose={() => {
          setIsCreateOpen(false);
          setEditingFocusArea(null);
        }}
      />
    </div>
  );
};

const styles = {
  page: `space-y-4`,
  header: `flex items-center justify-between gap-4`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
  primaryButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white shrink-0`,
} as const;
