import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import JoinTheFunSection from "../../components/JoinTheFunSection";
import Navbar from "../../components/Navbar";
import { getAllRecipes } from "../../services/recipesService";

const recipeCategories = [
  { id: "all", label: "All" },
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "dessert", label: "Dessert" },
  { id: "snack", label: "Snack" },
];

function getRecipeSummary(recipe) {
  const mealType = recipe.mealType?.[0]?.toLowerCase();
  const cuisine = recipe.cuisine
    ? `${recipe.cuisine.toLowerCase()} flavor`
    : "";
  const descriptor = [mealType, cuisine].filter(Boolean).join(" with ");

  return `Discover ${recipe.name}${
    descriptor ? `, a ${descriptor} favorite` : ""
  } with simple steps and a table-ready finish.`;
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

function RecipeGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[1.65rem] border border-[#ddd2c6] bg-[#f9f4ee]"
        >
          <div className="h-54 animate-pulse bg-[#e7ddd1]" />
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

export default function Recipes() {
  const { categoryId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const activeCategory =
    recipeCategories.find((category) => category.id === categoryId) ||
    recipeCategories[0];

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
    if (activeCategory.id === "all") {
      return recipes;
    }

    return recipes.filter((recipe) =>
      recipe.mealType?.some(
        (meal) => meal.toLowerCase() === activeCategory.id.toLowerCase(),
      ),
    );
  }, [activeCategory.id, recipes]);

  return (
    <div className="min-h-screen bg-[#f5efe8] pb-12 text-[#2c241d]">
      <Navbar />

      <main className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:gap-7">
          <section className="rounded-4xl bg-[#c5e3fb] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <span className="inline-flex rounded-full bg-[#ff7f6a] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
              Recipes
            </span>

            <div className="mt-5 grid gap-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(320px,1fr)] lg:items-end">
              <div>
                <h1 className="max-w-[12ch] text-4xl font-black uppercase leading-[0.9] text-[#24313a] sm:text-6xl lg:text-[4.5rem]">
                  {activeCategory.id === "all"
                    ? "Explore Recipes"
                    : `${activeCategory.label} Recipes`}
                </h1>

                <p className="mt-4 max-w-md text-sm leading-6 text-[#5e6a75] sm:text-base sm:leading-7">
                  Browse comforting classics, quick weekday favorites, and
                  table-ready dishes collected for every appetite.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 lg:justify-end">
                {recipeCategories.map((category) => {
                  const to =
                    category.id === "all"
                      ? "/recipes"
                      : `/recipes/category/${category.id}`;

                  return (
                    <Link
                      key={category.id}
                      to={to}
                      className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition sm:px-5 sm:text-xs ${
                        activeCategory.id === category.id
                          ? "border-[#262522] bg-[#9FDC26] text-[#262522]"
                          : "border-[#8eb9dc] bg-white/35 text-[#2f3b44] hover:bg-white/65"
                      }`}
                    >
                      {category.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="rounded-[2.25rem] bg-[#f8f2ea] px-4 py-5 shadow-[0_16px_34px_rgba(91,62,44,0.06)] sm:px-5 sm:py-6 lg:px-6">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-[0.02em] text-[#2d2822] sm:text-3xl">
                  {activeCategory.label} Collection
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#7a6d62]">
                  {loading
                    ? "Gathering fresh recipes for your kitchen."
                    : `${filteredRecipes.length} recipes ready to explore.`}
                </p>
              </div>
            </div>

            {loading ? <RecipeGridSkeleton /> : null}

            {!loading && error ? (
              <div className="rounded-[1.75rem] border border-[#ddd2c6] bg-white px-5 py-8 text-center">
                <p className="text-lg font-semibold text-[#342a22]">
                  We could not load recipes.
                </p>
                <p className="mt-2 text-sm leading-6 text-[#7a6d62]">{error}</p>
              </div>
            ) : null}

            {!loading && !error && filteredRecipes.length === 0 ? (
              <div className="rounded-[1.75rem] border border-[#ddd2c6] bg-white px-5 py-8 text-center">
                <p className="text-lg font-semibold text-[#342a22]">
                  No recipes found in this category.
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
                    className="flex h-full flex-col overflow-hidden rounded-[1.65rem] border border-[#ddd2c6] bg-[#fffdfa] shadow-[0_10px_22px_rgba(91,62,44,0.05)]"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="h-54 w-full object-cover transition duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col px-4 py-4 sm:px-5">
                      <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-[#2e2822]">
                        {recipe.name}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#7b6d60]">
                        {getRecipeSummary(recipe)}
                      </p>

                      <div className="mt-auto flex flex-col gap-4 border-t border-[#ebe2d8] pt-5 sm:flex-row sm:items-center sm:justify-between">
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

          <JoinTheFunSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
