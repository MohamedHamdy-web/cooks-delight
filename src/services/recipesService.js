const RECIPES_API_BASE_URL = "https://dummyjson.com/recipes";
function createUrl(path = "", searchParams = {}) {
  const url = new URL(`${RECIPES_API_BASE_URL}${path}`);

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

async function requestRecipes(path = "", searchParams = {}) {
  const response = await fetch(createUrl(path, searchParams));

  if (!response.ok) {
    throw new Error("Failed to fetch recipes.");
  }

  return response.json();
}

export async function getRecipes({ limit = 10, skip = 0 } = {}) {
  return requestRecipes("", { limit, skip });
}

export async function getRecipeById(id) {
  return requestRecipes(`/${id}`);
}

export async function getAllRecipes() {
  const data = await requestRecipes("", { limit: 0 });

  return Array.isArray(data.recipes) ? data.recipes : [];
}
