/**
 * Estimates remaining bag time from feed left and prescribed rate.
 */
export const formatBagHoursRemaining = (
  feedLeftMl: number,
  rateMlPerHr: number,
): string => {
  if (!(rateMlPerHr > 0) || feedLeftMl < 0) return '—';
  const hours = feedLeftMl / rateMlPerHr;
  if (hours < 1) {
    return `${Math.round(hours * 60)} min`;
  }
  const rounded = hours >= 10 ? Math.round(hours) : Number(hours.toFixed(1));
  return `${rounded} hr`;
};
