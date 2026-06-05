/**
 * Returns today's date as YYYY-MM-DD in local time.
 */
export const getTodayEntryDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formats an entry_date (YYYY-MM-DD) for display.
 */
export const formatEntryDate = (entryDate: string): string => {
  const [year, month, day] = entryDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, { dateStyle: 'medium' });
};
