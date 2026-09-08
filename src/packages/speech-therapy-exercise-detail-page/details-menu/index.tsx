'use client';

import { useEffect, useRef, useState } from 'react';
import { EllipsisVertical } from 'lucide-react';

type Props = {
  isDeleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

/**
 * Ellipsis menu for editing or deleting the open therapy exercise.
 */
export const ExerciseDetailsMenu = ({ isDeleting, onEdit, onDelete }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  return (
    <div className={styles.wrap} ref={menuRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-label="Exercise actions"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <EllipsisVertical className={styles.icon} />
      </button>
      {isOpen && (
        <div className={styles.menu} role="menu">
          <button
            type="button"
            className={styles.item}
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
              onEdit();
            }}
          >
            Edit
          </button>
          <button
            type="button"
            className={styles.dangerItem}
            role="menuitem"
            disabled={isDeleting}
            onClick={() => {
              setIsOpen(false);
              onDelete();
            }}
          >
            {isDeleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrap: `relative shrink-0`,
  trigger: `
    rounded-md p-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900
  `,
  icon: `h-5 w-5`,
  menu: `
    absolute right-0 z-20 mt-1 w-36 rounded-md border border-gray-200 bg-white py-1
    shadow-lg
  `,
  item: `
    block w-full px-3 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-50
  `,
  dangerItem: `
    block w-full px-3 py-1.5 text-left text-sm text-red-700 hover:bg-red-50
    disabled:opacity-50
  `,
} as const;
