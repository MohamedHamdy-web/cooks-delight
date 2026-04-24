import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChefHat, Users, Star, Share2 } from "lucide-react";
import { getRecipeById } from "../../services/recipesService";
import Navbar from "../../components/Navbar";
import {
  FaConciergeBell,
  FaStopwatch,
  FaWeightHanging,
  FaYoutube,
} from "react-icons/fa";
import FeaturedRecipesSection from "../../components/FeaturedRecipesSection";
import JoinTheFunSection from "../../components/JoinTheFunSection";
import Footer from "../../components/Footer";
import { CiStopwatch } from "react-icons/ci";
import { IoLogoFacebook } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError("Failed to load recipe.");
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5efe8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-[#7a6d62] font-medium">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-[#f5efe8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg font-medium">
            {error || "Recipe not found."}
          </p>
          <Link
            to="/recipes"
            className="mt-4 inline-block text-orange-400 underline"
          >
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  const rating = recipe.rating || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <>
      <div className="min-h-screen bg-[#f5efe8]">
        <Navbar />
        <main className="px-4 pb-6 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto px-6 py-12 border border-[#ddd2c6]  rounded-[1.65rem] mt-5">
            <div className="flex justify-center mb-4">
              <span className="bg-[#EE6352] text-[#FFFBF2] text-[18px] font-medium uppercase tracking-widest px-4 py-1.5 rounded-full">
                Recipe
              </span>
            </div>
            <h1 className="lg:text-[80px] md:text-6xl text-[38px] font-extrabold uppercase text-center text-[#262522] leading-tight mb-4">
              {recipe.name.split(" ").slice(0, 1).join(" ")}
              <br />
              {recipe.name.split(" ").slice(1).join(" ")}
            </h1>

            <p className="text-center text-[#7a6d62] text-[21px]  md:text-base leading-relaxed max-w-xl mx-auto mb-6">
              Welcome to Cooks Delight, where culinary dreams come alive! <br />{" "}
              Today, we embark on a journey of flavors with a dish that promises{" "}
              <br />
              to elevate your dining experience — our {recipe.name}.
            </p>

            <div className="flex items-center justify-center gap-3 text-[#2d2822] text-sm font-medium mb-8 flex-wrap">
              <div className="flex items-center gap-1.5">
                <FaStopwatch size={20} />
                <span>
                  {(recipe.prepTimeMinutes || 0) +
                    (recipe.cookTimeMinutes || 0)}{" "}
                  MINUTES
                </span>
              </div>
              <span className="text-[#2d2822]">•</span>
              <div className="flex items-center gap-1.5">
                <FaWeightHanging size={16} className="text-[#2d2822]" />
                <span>
                  {recipe.difficulty?.toUpperCase() || "EASY"} DIFFICULTY
                </span>
              </div>
              <span className="text-[#2d2822]">•</span>
              <div className="flex items-center gap-1.5">
                <FaConciergeBell size={16} className="text-[#2d2822]" />
                <span>{recipe.servings} SERVES</span>
              </div>
            </div>

            <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden mb-8">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-160 object-cover mx-auto rounded-2xl sm:h-120 md:h-150"
              />
            </div>

            <div className="flex items-center justify-center gap-4 mb-10 mt-3 flex-wrap">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => {
                  if (i < fullStars) {
                    return (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    );
                  } else if (i === fullStars && hasHalfStar) {
                    return (
                      <svg key={i} className="w-5 h-5" viewBox="0 0 24 24">
                        <defs>
                          <linearGradient id="half">
                            <stop offset="50%" stopColor="#facc15" />
                            <stop offset="50%" stopColor="#d1d5db" />
                          </linearGradient>
                        </defs>
                        <path
                          fill="url(#half)"
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        />
                      </svg>
                    );
                  } else {
                    return (
                      <svg
                        key={i}
                        className="w-5 h-5 text-gray-300 fill-gray-300"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    );
                  }
                })}
              </div>
              <span className="text-sm font-medium">
                • {recipe.reviewCount} REVIEWS •
              </span>
              {recipe.tags?.map((tag, index) => (
                <span
                  key={tag}
                  className="px-5 py-1 rounded-full text-xs font-bold uppercase"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#EE6352" : "#9FDC26",
                    color: "#262522",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 mb-10">
              <div className="order-2 md:order-1">
                <h2 className="text-[40px] md:text-4xl font-bold uppercase text-[#2d2822] mb-4">
                  Instructions
                </h2>

                <ol className="flex flex-col gap-2">
                  {recipe.instructions?.map((step, i) => (
                    <li
                      key={i}
                      className="text-sm text-[#7a6d62] leading-relaxed"
                    >
                      <span className="font-bold text-[#2d2822]">
                        Step {i + 1})
                      </span>{" "}
                      {step}
                    </li>
                  ))}
                </ol>

                <div className="mt-8 flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-widest border border-[#2d2822] px-4 py-2 rounded-full flex items-center gap-2">
                    <Share2 size={13} />
                    Share
                    <div className="flex items-center gap-2 pl-5">
                      <Link to="#">
                        <IoLogoFacebook size={20} />
                      </Link>
                      <Link to="#">
                        <RiInstagramFill size={20} />
                      </Link>
                      <Link to="#">
                        <FaYoutube size={20} />
                      </Link>
                    </div>
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-6 order-1 md:order-2">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#EE6352] mb-4">
                    Ingredients
                  </h3>

                  <ul className="flex flex-col gap-2">
                    {recipe.ingredients?.map((ing, i) => (
                      <li
                        key={i}
                        className="text-sm text-[#2d2822] flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2d2822] shrink-0" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#EE6352] mb-4">
                    Nutritional Value
                  </h3>

                  <p className="text-xs text-[#7a6d62] mb-3">Per serving:</p>

                  <div className="flex flex-col gap-1.5 text-sm text-[#2d2822]">
                    <p>Calories: ~{recipe.caloriesPerServing}</p>
                  </div>
                </div>

                <p className="text-[12px] text-[#33333399] font-medium mt-4 uppercase tracking-wide leading-relaxed">
                  Note: Nutritional values are approximate and may vary based on
                  specific ingredients and portion sizes.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-7">
            <FeaturedRecipesSection title="Similar Recipes" />
          </div>
          <div className="mt-7">
            <JoinTheFunSection />
          </div>
          <div className="mt-7">
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}
