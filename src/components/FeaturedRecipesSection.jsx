import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  getRecipeMeta,
  getRecipePage,
  getRecipePageCount,
  getRecipeSummary,
} from "../helpers/recipeHelpers";
import { getAllRecipes } from "../services/recipesService";

const ITEMS_PER_VIEW = 2;

function RecipeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.65rem] border border-[#ddd2c6] bg-[#f9f4ee]">
      <div className="h-56 animate-pulse bg-[#e7ddd1]" />
      <div className="space-y-4 px-4 py-4 sm:px-5">
        <div className="h-7 w-3/4 animate-pulse rounded-full bg-[#e7ddd1]" />
        <div className="h-16 animate-pulse rounded-2xl bg-[#eee4d9]" />
        <div className="flex items-center justify-between gap-4">
          <div className="h-4 w-1/2 animate-pulse rounded-full bg-[#e7ddd1]" />
          <div className="h-10 w-28 animate-pulse rounded-full bg-[#e7ddd1]" />
        </div>
      </div>
    </div>
  );
}

export default function FeaturedRecipesSection({ title }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);

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

  const totalPages = useMemo(() => {
    return getRecipePageCount(recipes.length, ITEMS_PER_VIEW);
  }, [recipes.length]);

  const visibleRecipes = useMemo(() => {
    return getRecipePage(recipes, page, ITEMS_PER_VIEW);
  }, [page, recipes]);

  useEffect(() => {
    if (page > totalPages - 1) {
      setPage(0);
    }
  }, [page, totalPages]);

  return (
    <section className="rounded-[1.65rem] border border-[#ddd2c6] bg-[#f8f2ea] px-4 py-5 shadow-[0_16px_34px_rgba(91,62,44,0.06)] sm:px-5 sm:py-6 lg:px-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold uppercase tracking-[0.02em] text-[#2d2822] sm:text-3xl">
          {title}
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Show previous recipes"
            onClick={() =>
              setPage((currentPage) => Math.max(0, currentPage - 1))
            }
            disabled={page === 0 || loading}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b9ad9f] text-[#7b6d60] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45 cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            aria-label="Show next recipes"
            onClick={() =>
              setPage((currentPage) =>
                Math.min(totalPages - 1, currentPage + 1),
              )
            }
            disabled={page >= totalPages - 1 || loading}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#7b6d60] text-[#2f261f] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45 cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <RecipeCardSkeleton />
          <RecipeCardSkeleton />
        </div>
      ) : null}

      {!loading && error ? (
        <div className="mt-5 rounded-3xl border border-[#ddd2c6] bg-white px-5 py-8 text-center">
          <p className="text-lg font-semibold text-[#342a22]">
            We could not load featured recipes.
          </p>
          <p className="mt-2 text-sm leading-6 text-[#7a6d62]">{error}</p>
        </div>
      ) : null}

      {!loading && !error ? (
        <div className="mt-5 grid pt-5 gap-4 lg:grid-cols-2">
          {visibleRecipes.map((recipe) => (
            <article
              key={recipe.id}
              className="overflow-hidden rounded-[1.65rem] border border-[#ddd2c6] bg-[#fffdfa] shadow-[0_10px_22px_rgba(91,62,44,0.05)]"
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="h-52 w-full object-cover sm:h-56 hover:scale-105 transition duration-300"
              />

              <div className="px-4 py-4 sm:px-5">
                <h3 className="text-xl font-extrabold tracking-[-0.02em] text-[#2e2822]">
                  {recipe.name}
                </h3>

                <p className="mt-2 min-h-14 text-sm leading-6 text-[#7b6d60]">
                  {getRecipeSummary(recipe, "featured")}
                </p>

                <div className="mt-5 flex flex-col gap-4 border-t border-[#ebe2d8] pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#5c5148] sm:text-[11px]">
                    {getRecipeMeta(recipe, {
                      fallbackDifficulty: "QUICK PREP",
                      preferPrepTime: true,
                    })}
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
  );
}
