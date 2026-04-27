import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import {
  getAllRecipes,
  searchRecipes,
  getRecipesByMealType,
} from "../../services/recipesService";

const categories = [
  { id: "all", label: "All" },
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "dessert", label: "Dessert" },
  { id: "snack", label: "Snack" },
];

function RecipeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.65rem] border border-[#ddd2c6] bg-[#f9f4ee]">
      <div className="h-48 animate-pulse bg-[#e7ddd1]" />
      <div className="space-y-3 px-4 py-4">
        <div className="h-6 w-3/4 animate-pulse rounded-full bg-[#e7ddd1]" />
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-[#eee4d9]" />
        <div className="flex justify-end pt-2">
          <div className="h-9 w-28 animate-pulse rounded-full bg-[#e7ddd1]" />
        </div>
      </div>
    </div>
  );
}

function RecipeCard({ recipe }) {
  const totalMinutes =
    (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);

  return (
    <article className="overflow-hidden rounded-[1.65rem] border border-[#ddd2c6] bg-white shadow-[0_10px_22px_rgba(91,62,44,0.05)]">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="h-48 w-full object-cover"
      />
      <div className="px-4 py-4">
        <h3 className="text-lg font-extrabold tracking-[-0.02em] text-[#2e2822] line-clamp-1">
          {recipe.name}
        </h3>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#9d8f81]">
          {totalMinutes} MIN &bull; {recipe.difficulty?.toUpperCase() || "EASY"}{" "}
          &bull; {recipe.servings} SERVES
        </p>
        <div className="mt-4 flex justify-end">
          <Link
            to={`/recipes/${recipe.id}`}
            className="inline-flex h-9 items-center justify-center rounded-full border border-[#8d7e70] px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#2e2822] transition hover:bg-[#f4ece3]"
          >
            View Recipe
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    setError("");

    async function load() {
      try {
        let data;
        if (q) {
          data = await searchRecipes(q);
        } else if (category !== "all") {
          data = await getRecipesByMealType(category);
        } else {
          data = await getAllRecipes();
        }
        if (isActive) setRecipes(data);
      } catch (e) {
        if (isActive) setError(e.message || "Unable to load recipes.");
      } finally {
        if (isActive) setLoading(false);
      }
    }

    load();
    return () => {
      isActive = false;
    };
  }, [q, category]);

  const handleCategoryClick = (catId) => {
    const next = new URLSearchParams();
    if (catId !== "all") next.set("category", catId);
    setSearchParams(next);
  };

  const pageTitle = q
    ? `Results for "${q}"`
    : category !== "all"
      ? `${category.charAt(0).toUpperCase() + category.slice(1)} Recipes`
      : "Explore Recipes";

  return (
    <div className="min-h-screen bg-[#f5efe8] pb-12 text-[#2c241d]">
      <Navbar />

      <main className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:gap-7">
          <section className="rounded-4xl bg-[#c5e3fb] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <span className="inline-flex rounded-full bg-[#ff7f6a] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
              Recipes
            </span>

          <h1 className="mt-5 text-4xl font-black uppercase leading-none sm:text-5xl">
            {pageTitle}
          </h1>

          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  !q && category === cat.id
                    ? "bg-[#2c241d] text-white"
                    : "border border-[#d9ccc0] bg-[#f8f3ed] text-[#2c241d] hover:bg-[#efe4d8]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <RecipeCardSkeleton key={i} />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="mt-8 rounded-3xl border border-[#ddd2c6] bg-white px-5 py-10 text-center">
              <p className="text-lg font-semibold text-[#342a22]">
                Could not load recipes.
              </p>
              <p className="mt-2 text-sm text-[#7a6d62]">{error}</p>
            </div>
          )}

          {!loading && !error && recipes.length === 0 && (
            <div className="mt-8 rounded-[1.75rem] border border-dashed border-[#d9ccc0] bg-[#fcf8f3] px-6 py-16 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f3e8dc]">
                <span className="text-4xl">🍽️</span>
              </div>
              <h2 className="mt-5 text-2xl font-extrabold uppercase tracking-tight text-[#2c241d]">
                No recipes found
              </h2>
              {q && (
                <p className="mt-2 text-base text-[#7a6d62]">
                  We couldn&apos;t find anything for{" "}
                  <span className="font-semibold text-[#2c241d]">
                    &ldquo;{q}&rdquo;
                  </span>
                  . Try a different word.
                </p>
              )}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleCategoryClick("all")}
                  className="inline-flex h-10 items-center rounded-full bg-[#2c241d] px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#3d3128]"
                >
                  Browse All Recipes
                </button>
              </div>
            </div>
          )}

          {!loading && !error && recipes.length > 0 && (
            <>
              <p className="mt-6 text-sm text-[#9d8f81]">
                {recipes.length} recipe{recipes.length !== 1 ? "s" : ""} found
              </p>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </>
          )}
        </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
