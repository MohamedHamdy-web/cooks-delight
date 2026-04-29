import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../../components/Footer";
import JoinTheFunSection from "../../components/JoinTheFunSection";
import Navbar from "../../components/Navbar";
import { getAllRecipes } from "../../services/recipesService";

function getRecipeSummary(recipe) {
  const cuisine = recipe.cuisine
    ? `${recipe.cuisine.toLowerCase()} flavor`
    : "";
  const mealType = recipe.mealType?.[0]?.toLowerCase();
  const tags = recipe.tags?.slice(0, 2).join(", ").toLowerCase();
  const detail = [mealType, cuisine, tags].filter(Boolean).join(" with ");

  return `A tasty ${detail || "kitchen"} favorite with simple steps and a table-ready finish.`;
}

function getRecipeMeta(recipe) {
  const totalMinutes =
    (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);
  const timeLabel = `${totalMinutes || 30} MIN`;
  const difficultyLabel = recipe.difficulty
    ? `${recipe.difficulty.toUpperCase()} PREP`
    : "EASY PREP";
  const servingsLabel = `${recipe.servings || 2} SERVES`;

  return `${timeLabel} - ${difficultyLabel} - ${servingsLabel}`;
}

function recipeMatchesQuery(recipe, query) {
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

  return searchableText.includes(query.toLowerCase());
}

function RecipeGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[1.25rem] border border-[#ddd2c6] bg-[#f9f4ee]"
        >
          <div className="h-52 animate-pulse bg-[#e7ddd1]" />
          <div className="space-y-4 px-4 py-4">
            <div className="h-6 w-3/4 animate-pulse rounded-full bg-[#e7ddd1]" />
            <div className="h-14 animate-pulse rounded-2xl bg-[#eee4d9]" />
            <div className="flex items-center justify-between gap-4">
              <div className="h-4 w-1/2 animate-pulse rounded-full bg-[#e7ddd1]" />
              <div className="h-9 w-26 animate-pulse rounded-full bg-[#e7ddd1]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadRecipes() {
      setLoading(true);
      setError("");

      try {
        const data = await getAllRecipes();

        if (isActive) {
          setRecipes(Array.isArray(data) ? data : []);
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError.message || "Unable to load recipes right now.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadRecipes();

    return () => {
      isActive = false;
    };
  }, []);

  const filteredRecipes = useMemo(() => {
    if (!query) {
      return [];
    }

    return recipes.filter((recipe) => recipeMatchesQuery(recipe, query));
  }, [query, recipes]);

  const resultCountLabel =
    filteredRecipes.length === 1
      ? "1 recipe found"
      : `${filteredRecipes.length} recipes found`;

  return (
    <div className="min-h-screen bg-[#f5efe8] pb-12 text-[#2c241d]">
      <Navbar />

      <main className="px-4 pb-6 pt-8 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="mb-5">
            <h1 className="text-3xl font-black uppercase leading-tight tracking-[-0.02em] text-[#171411] sm:text-4xl lg:text-5xl">
              Displaying results for:{" "}
              <span className="text-[#f3a437]">{query || "Search"}</span>
            </h1>

            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5d5148]">
              {loading ? "Searching recipes" : resultCountLabel}
            </p>
          </div>

          {loading ? <RecipeGridSkeleton /> : null}

          {!loading && error ? (
            <div className="rounded-[1.25rem] border border-[#ddd2c6] bg-white px-5 py-8 text-center">
              <p className="text-lg font-semibold text-[#342a22]">
                We could not load recipes.
              </p>
              <p className="mt-2 text-sm leading-6 text-[#7a6d62]">{error}</p>
            </div>
          ) : null}

          {!loading && !error && !query ? (
            <div className="rounded-[1.25rem] border border-[#ddd2c6] bg-white px-5 py-8 text-center">
              <p className="text-lg font-semibold text-[#342a22]">
                Type a recipe name, cuisine, ingredient, or meal type.
              </p>
            </div>
          ) : null}

          {!loading && !error && query && filteredRecipes.length === 0 ? (
            <div className="rounded-[1.25rem] border border-[#ddd2c6] bg-white px-5 py-8 text-center">
              <p className="text-lg font-semibold text-[#342a22]">
                No recipes found for "{query}".
              </p>
              <Link
                to="/recipes"
                className="mt-4 inline-flex rounded-full border border-[#8d7e70] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#2e2822] transition hover:bg-[#f4ece3]"
              >
                View All Recipes
              </Link>
            </div>
          ) : null}

          {!loading && !error && filteredRecipes.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredRecipes.map((recipe) => (
                <article
                  key={recipe.id}
                  className="overflow-hidden rounded-[1.25rem] border border-[#ddd2c6] bg-[#fffdfa] shadow-[0_10px_22px_rgba(91,62,44,0.05)]"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="h-52 w-full object-cover transition duration-300 hover:scale-105"
                  />

                  <div className="px-4 py-4">
                    <h2 className="text-xl font-extrabold tracking-[-0.02em] text-[#2e2822]">
                      {recipe.name}
                    </h2>

                    <p className="mt-2 min-h-14 text-sm leading-6 text-[#7b6d60]">
                      {getRecipeSummary(recipe)}
                    </p>

                    <div className="mt-5 flex flex-col gap-4 border-t border-[#ebe2d8] pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.11em] text-[#5c5148]">
                        {getRecipeMeta(recipe)}
                      </span>

                      <Link
                        to={`/recipes/${recipe.id}`}
                        className="inline-flex h-10 items-center justify-center rounded-full border border-[#8d7e70] px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#2e2822] transition hover:bg-[#f4ece3]"
                      >
                        View Recipe
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </section>
        <div className="mt-7">
          <JoinTheFunSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
