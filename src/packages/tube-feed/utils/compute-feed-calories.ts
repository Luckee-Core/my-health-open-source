/**
 * Converts milliliters fed and formula kcal-per-1000-mL into calories.
 * 500 mL at 2000 kcal / 1000 mL is 1000 kcal.
 */
export const computeFeedCalories = (
  volumeMl: number | null,
  caloriesPer1000Ml: number,
): number | null => {
  if (volumeMl === null) return null;
  if (!(caloriesPer1000Ml > 0)) return null;
  return volumeMl * (caloriesPer1000Ml / 1000);
};
