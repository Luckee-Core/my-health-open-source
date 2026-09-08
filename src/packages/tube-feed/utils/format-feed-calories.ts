/**
 * Formats calories for display.
 */
export const formatFeedCalories = (calories: number | null): string => {
  if (calories === null) return '—';
  return `${Math.round(calories).toLocaleString()} kcal`;
};
