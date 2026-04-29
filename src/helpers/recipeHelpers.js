import { compactJoin, pluralize, toLowerText } from "./stringHelpers";
import { formatMinutesLabel, getTotalRecipeMinutes } from "./timeHelpers";

export function getRecipeMeta(recipe, options = {}) {
  const {
    fallbackMinutes = 30,
    fallbackDifficulty = "EASY PREP",
    preferPrepTime = false,
  } = options;
  const totalMinutes = getTotalRecipeMinutes(recipe);
  const timeValue =
    totalMinutes || (preferPrepTime ? recipe?.prepTimeMinutes : 0);
  const timeLabel = formatMinutesLabel(timeValue, fallbackMinutes);
  const difficultyLabel = recipe?.difficulty
    ? `${recipe.difficulty.toUpperCase()} PREP`
    : fallbackDifficulty;
  const servingsLabel = `${recipe?.servings || 2} SERVES`;

  return `${timeLabel} - ${difficultyLabel} - ${servingsLabel}`;
}

export function getRecipeDescriptor(recipe, cuisineSuffix = "flavor") {
  const mealType = recipe?.mealType?.[0]?.toLowerCase();
  const cuisine = recipe?.cuisine
    ? `${recipe.cuisine.toLowerCase()} ${cuisineSuffix}`
    : "";

  return compactJoin([mealType, cuisine], " with ");
}

export function getRecipeSummary(recipe, variant = "collection") {
  const recipeName = recipe?.name || "this recipe";

  if (variant === "featured") {
    const descriptor = getRecipeDescriptor(recipe, "cuisine");
    const difficulty = recipe?.difficulty?.toLowerCase();

    return `Enjoy ${recipeName} with ${
      descriptor || "a rich homemade flavor"
    } crafted for ${difficulty || "everyday"} cooking.`;
  }

  if (variant === "journey") {
    const descriptor = getRecipeDescriptor(recipe, "flavor");

    return `Indulge in the rich and savory symphony of flavors with ${recipeName}${
      descriptor ? `, filled with ${descriptor}.` : "."
    }`;
  }

  if (variant === "search") {
    const cuisine = recipe?.cuisine
      ? `${recipe.cuisine.toLowerCase()} flavor`
      : "";
    const mealType = recipe?.mealType?.[0]?.toLowerCase();
    const tags = recipe?.tags?.slice(0, 2).join(", ").toLowerCase();
    const detail = compactJoin([mealType, cuisine, tags], " with ");

    return `A tasty ${detail || "kitchen"} favorite with simple steps and a table-ready finish.`;
  }

  const descriptor = getRecipeDescriptor(recipe, "flavor");

  return `Discover ${recipeName}${
    descriptor ? `, a ${descriptor} favorite` : ""
  } with simple steps and a table-ready finish.`;
}

export function getActiveCategory(categories, categoryId) {
  return categories.find((category) => category.id === categoryId) || categories[0];
}

export function filterRecipesByMealType(recipes, mealType) {
  if (mealType === "all") {
    return recipes;
  }

  return recipes.filter((recipe) =>
    recipe.mealType?.some(
      (meal) => toLowerText(meal) === toLowerText(mealType),
    ),
  );
}

export function getRecipePage(recipes, page, itemsPerPage) {
  const startIndex = page * itemsPerPage;

  return recipes.slice(startIndex, startIndex + itemsPerPage);
}

export function limitRecipes(recipes, limit) {
  return recipes.slice(0, limit);
}

export function getRecipePageCount(recipesLength, itemsPerPage) {
  return Math.max(1, Math.ceil(recipesLength / itemsPerPage));
}

export function recipeMatchesQuery(recipe, query) {
  const searchableText = [
    recipe.name,
    recipe.cuisine,
    recipe.difficulty,
    ...(recipe.mealType || []),
    ...(recipe.tags || []),
    ...(recipe.ingredients || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableText.includes(toLowerText(query));
}

export function getRecipeCountLabel(count) {
  return `${count} ${pluralize(count, "recipe")} found`;
}

export function getRecipeTitleParts(recipeName) {
  const words = String(recipeName || "").split(" ");

  return {
    firstLine: words.slice(0, 1).join(" "),
    secondLine: words.slice(1).join(" "),
  };
}

export function getRecipeRatingDisplay(rating = 0) {
  const fullStars = Math.floor(rating);

  return {
    fullStars,
    hasHalfStar: rating - fullStars >= 0.5,
  };
}
