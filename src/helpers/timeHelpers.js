export function getTotalRecipeMinutes(recipe) {
  return (recipe?.prepTimeMinutes || 0) + (recipe?.cookTimeMinutes || 0);
}

export function formatMinutesLabel(minutes, fallbackMinutes = 30) {
  return `${minutes || fallbackMinutes} MIN`;
}
