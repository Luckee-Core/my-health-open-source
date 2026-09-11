/**
 * Converts milliliters and formula density into calories.
 */
export const computeFeedCalories = (
  volumeMl: number,
  caloriesPer1000Ml: number,
): number | null => {
  const volume = Number(volumeMl);
  const density = Number(caloriesPer1000Ml);
  if (!Number.isFinite(volume) || !Number.isFinite(density) || density <= 0) {
    return null;
  }
  return volume * (density / 1000);
};
