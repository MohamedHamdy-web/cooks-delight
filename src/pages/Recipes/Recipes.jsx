import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

const recipeCategories = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "dessert", label: "Dessert" },
  { id: "snack", label: "Snack" },
];

export default function Recipes() {
  const { categoryId } = useParams();

  const activeCategory = recipeCategories.find(
    (category) => category.id === categoryId,
  );

  return (
    <div className="min-h-screen bg-[#f5efe8] pb-12 text-[#2c241d]">
      <Navbar />

      <main className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl rounded-4xl bg-white px-6 py-10 shadow-[0_18px_40px_rgba(91,62,44,0.08)] sm:px-8 lg:px-10">
          <span className="inline-flex rounded-full bg-[#f3a437] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2c241d]">
            Recipes
          </span>

          <h1 className="mt-5 text-4xl font-black uppercase leading-none sm:text-5xl">
            {activeCategory
              ? `${activeCategory.label} Recipes`
              : "Explore Recipes"}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6e6258] sm:text-base">
            {activeCategory
              ? `You are viewing the ${activeCategory.label.toLowerCase()} category. We can plug the real recipe cards for this section in the next step.`
              : "Browse all recipe categories from here. Each category on the home page now opens this page with its own id-based route."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {recipeCategories.map((category) => (
              <Link
                key={category.id}
                to={`/recipes/${category.id}`}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  activeCategory?.id === category.id
                    ? "bg-[#2c241d] text-white"
                    : "border border-[#d9ccc0] bg-[#f8f3ed] text-[#2c241d] hover:bg-[#efe4d8]"
                }`}
              >
                {category.label}
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-dashed border-[#d9ccc0] bg-[#fcf8f3] px-6 py-10 text-center">
            <p className="text-lg font-semibold text-[#3d3128]">
              Recipe content goes here
            </p>
            <p className="mt-3 text-sm leading-6 text-[#7a6d62]">
              This route is ready for the real recipes section. The selected
              category id is{" "}
              <span className="font-semibold text-[#2c241d]">
                {activeCategory?.id || "all"}
              </span>
              .
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
