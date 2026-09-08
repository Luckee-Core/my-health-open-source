/**
 * Formats milliliters for display.
 */
export const formatFeedVolume = (volumeMl: number | null): string => {
  if (volumeMl === null) return '—';
  return `${Math.round(volumeMl).toLocaleString()} mL`;
};
