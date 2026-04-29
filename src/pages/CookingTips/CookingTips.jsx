import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChefHat,
  ChevronLeft,
  ChevronRight,
  PencilRuler,
  Utensils,
} from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import FeaturedRecipesSection from "../../components/FeaturedRecipesSection";
import { getAllRecipes } from "../../services/recipesService";
import knifeSkillsImage from "../../assets/images/cooking-1.jpg";
import sauteImage from "../../assets/images/cooking-2.jpg";
import roastingImage from "../../assets/images/cooking-3.jpg";
import prepImage from "../../assets/images/cooking-4.jpg";
import cleaningImage from "../../assets/images/cooking-5.jpg";
import recipeModImage from "../../assets/images/cooking-6.jpg";
import { RiKnifeLine } from "react-icons/ri";
import { GiKitchenScale } from "react-icons/gi";

const essentialTips = [
  {
    title: "Quality Tools",
    description: "Invest in high-quality knives, cutting boards, and cookware.",
    icon: RiKnifeLine,
  },
  {
    title: "Essential Utensils",
    description:
      "Have a variety of utensils, including spatulas, tongs, and ladles.",
    icon: Utensils,
  },
  {
    title: "Measuring Accuracy",
    description:
      "Use measuring cups and spoons for precise ingredient quantities.",
    icon: GiKitchenScale,
  },
];

const basicsTips = [
  {
    title: "Knife Skills",
    description:
      "Unlock the art of precision in your kitchen with proper chopping, dicing, and slicing techniques.Elevate your culinary creations to new heights.",
    meta: "15 MIN - 11 JUN 23",
    image: knifeSkillsImage,
  },
  {
    title: "Sauteing and Searing",
    description:
      "Achieve the perfect sear and elevate flavors in your dishes. Learn the secrets to sautéing like a pro and creating irresistible textures.",
    meta: "10 MIN - 11 JUN 23",
    image: sauteImage,
  },
  {
    title: "Roasting Tips",
    description:
      "Ensure even cooking and unlock flavorful results with our expert roasting tips. From golden vegetables to succulent meats, master the art of roasting.",
    meta: "25 MIN - 04 JAN 23",
    image: roastingImage,
  },
  {
    title: "Prep Workstations",
    description:
      "Efficiently organize your kitchen space for chopping, mixing, and cooking. Elevate your efficiency in the heart of your culinary domain.",
    meta: "15 MIN - 11 JUN 23",
    image: prepImage,
  },
  {
    title: "Cleaning as You Go",
    description:
      "Maintain a tidy kitchen for stress-free cooking. Learn the art of cleaning as you go, turning every culinary endeavor into a seamless experience.",
    meta: "10 MIN - 11 JUN 23",
    image: cleaningImage,
  },
  {
    title: "Recipe Modification",
    description:
      "Feel confident modifying recipes to suit your taste. Explore the art of culinary creativity in crafting dishes uniquely your own.",
    meta: "25 MIN - 04 JAN 23",
    image: recipeModImage,
  },
];

export default function CookingTips() {
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
          setRecipes(Array.isArray(data) ? data.slice(0, 2) : []);
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

  return (
    <div className="min-h-screen bg-[#f5efe8] pb-12 text-[#2c241d]">
      <Navbar />

      <main className="px-4 pb-6 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-7">
          <section className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.78fr)] lg:items-start">
            <h1 className=" text-[2.7rem] font-black uppercase leading-[0.86] tracking-[-0.02em] text-[#2b2823] sm:text-6xl lg:text-[4.4rem]">
              Our Essential Cooking Tips
            </h1>

            <p className="max-w-xl text-sm leading-6 text-[#7a6d62] lg:ml-auto lg:max-w-md lg:text-right">
              Welcome to Cooks Delight's treasure trove of cooking wisdom!
              Whether you are a seasoned chef or just starting your culinary
              journey, our cooking tips are designed to elevate your skills,
              enhance your kitchen experience, and bring joy to your cooking
              adventures.
            </p>
          </section>

          <section className="rounded-[1.25rem] border border-[#ddd2c6] bg-[#f8f2ea] px-4 py-4 sm:px-6">
            <div className="grid gap-4 md:grid-cols-3">
              {essentialTips.map((tip, index) => {
                const Icon = tip.icon;

                return (
                  <article
                    key={tip.title}
                    className="grid grid-cols-[42px_1fr] gap-4 py-2"
                  >
                    <div className="flex h-10 w-10 items-center justify-center text-[#2c241d]">
                      <Icon
                        size={28}
                        className={index === 0 ? "-scale-x-100" : ""}
                      />
                    </div>

                    <div>
                      <h2 className="text-[18px] font-semibold uppercase tracking-[0.14em] text-[#ee6352]">
                        {tip.title}
                      </h2>
                      <p className="mt-1 text-xs leading-5 text-[#7a6d62]">
                        {tip.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <FeaturedRecipesSection title="Newest Recipes" />

          <section>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black uppercase tracking-[0.01em] text-[#2d2822] sm:text-3xl">
                Mastering the Basics
              </h2>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous cooking tips"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c7b9aa] text-[#7b6d60] transition hover:bg-white"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  aria-label="Next cooking tips"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#7b6d60] text-[#2f261f] transition hover:bg-white"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {basicsTips.map((tip) => (
                <article
                  key={tip.title}
                  className="overflow-hidden rounded-[1.25rem] border border-[#ddd2c6] bg-[#fffdfa] shadow-[0_10px_22px_rgba(91,62,44,0.05)]"
                >
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="h-55 w-full object-cover transition duration-300 hover:scale-105"
                  />

                  <div className="px-4 py-4">
                    <h3 className="text-lg font-extrabold text-[#2e2822]">
                      {tip.title}
                    </h3>
                    <p className="mt-2 min-h-16 text-sm leading-6 text-[#7b6d60]">
                      {tip.description}
                    </p>

                    <div className="mt-5 flex flex-col gap-4 border-t border-[#ebe2d8] pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.11em] text-[#5c5148]">
                        {tip.meta}
                      </span>

                      <Link
                        to="/recipes"
                        className="inline-flex h-10 items-center justify-center rounded-full border border-[#8d7e70] px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#2e2822] transition hover:bg-[#f4ece3]"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
