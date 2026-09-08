/**
 * Converts milliliters and formula density into calories.
 */
export const computeFeedCalories = (
  volumeMl: number | null,
  caloriesPer1000Ml: number,
): number | null => {
  if (volumeMl === null) return null;
  return volumeMl * (caloriesPer1000Ml / 1000);
};
