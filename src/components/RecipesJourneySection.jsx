import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  filterRecipesByMealType,
  getRecipeMeta,
  getRecipeSummary,
  limitRecipes,
} from "../helpers/recipeHelpers";
import { getAllRecipes } from "../services/recipesService";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "dessert", label: "Dessert" },
  { id: "snack", label: "Snack" },
  { id: "side dish", label: "Side Dish" },
];

function RecipeGridSkeleton() {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[1.65rem] border border-[#ddd2c6] bg-[#f9f4ee]"
        >
          <div className="h-52 animate-pulse bg-[#e7ddd1]" />
          <div className="space-y-4 px-4 py-4 sm:px-5">
            <div className="h-7 w-3/4 animate-pulse rounded-full bg-[#e7ddd1]" />
            <div className="h-16 animate-pulse rounded-2xl bg-[#eee4d9]" />
            <div className="flex items-center justify-between gap-4">
              <div className="h-4 w-1/2 animate-pulse rounded-full bg-[#e7ddd1]" />
              <div className="h-10 w-28 animate-pulse rounded-full bg-[#e7ddd1]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RecipesJourneySection() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    let isActive = true;

    async function loadRecipes() {
      setLoading(true);
      setError("");

      try {
        const data = await getAllRecipes();

        if (!isActive) {
          return;
        }

        setRecipes(Array.isArray(data) ? data : []);
      } catch (loadError) {
        if (!isActive) {
          return;
        }

        setError(loadError.message || "Unable to load recipes right now.");
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
    return limitRecipes(filterRecipesByMealType(recipes, activeFilter), 6);
  }, [activeFilter, recipes]);

  return (
    <section className="rounded-[2.25rem] bg-[#f5efe8] px-2 py-8 sm:px-5 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-[#ff7f6a] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-white sm:px-3 sm:text-[10px]">
            Recipes
          </span>

          <h2 className="mx-auto mt-3 max-w-[13ch] text-[1.7rem] font-black uppercase leading-[0.9] tracking-[-0.03em] text-[#2d2822] sm:mt-4 sm:max-w-[12ch] sm:text-5xl">
            Embark On A Journey
          </h2>

          <p className="mx-auto mt-3 max-w-[24ch] text-[11px] leading-4 text-[#8a7c6f] sm:mt-4 sm:max-w-md sm:text-sm sm:leading-6">
            With our diverse collection of recipes we have something to satisfy
            every palate.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2 pb-1 sm:mt-8">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`min-w-16.5 rounded-full border px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest transition sm:min-w-0 sm:px-5 sm:py-2 sm:text-[10px] sm:tracking-[0.12em] ${
                activeFilter === filter.id
                  ? "border-[black] bg-[#9FDC26] text-[#2d2822]"
                  : "border-[#d3c7ba] bg-[#f7f1e9] text-[#8a7c6f] hover:bg-white cursor-pointer hover:text-black hover:border-black"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {loading ? <RecipeGridSkeleton /> : null}

        {!loading && error ? (
          <div className="mt-8 rounded-[1.75rem] border border-[#ddd2c6] bg-white px-5 py-8 text-center">
            <p className="text-lg font-semibold text-[#342a22]">
              We could not load recipes for this section.
            </p>
            <p className="mt-2 text-sm leading-6 text-[#7a6d62]">{error}</p>
          </div>
        ) : null}

        {!loading && !error ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <article
                key={recipe.id}
                className="flex h-full flex-col overflow-hidden rounded-[1.65rem] border border-[#ddd2c6] bg-[#fffdfa] shadow-[0_10px_22px_rgba(91,62,44,0.05)]"
              >
                <div className="overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="h-52 w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col px-4 py-4 sm:px-5">
                  <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-[#2e2822]">
                    {recipe.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#7b6d60]">
                    {getRecipeSummary(recipe, "journey")}
                  </p>

                  <div className="mt-auto flex flex-col gap-4 border-t border-[#ebe2d8] pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.11em] text-[#5c5148]">
                      {getRecipeMeta(recipe, { fallbackMinutes: 20 })}
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
      </div>
    </section>
  );
}
