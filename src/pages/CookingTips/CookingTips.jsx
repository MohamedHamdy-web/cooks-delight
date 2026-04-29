import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Utensils } from "lucide-react";
import Footer from "../../components/Footer";
import JoinTheFunSection from "../../components/joinTheFunSection";
import Navbar from "../../components/Navbar";
import FeaturedRecipesSection from "../../components/FeaturedRecipesSection";
import CookingTipsSection from "../../components/CookingTipsSection";
import knifeSkillsImage from "../../assets/images/cooking-1.jpg";
import sauteImage from "../../assets/images/cooking-2.jpg";
import roastingImage from "../../assets/images/cooking-3.jpg";
import prepImage from "../../assets/images/cooking-4.jpg";
import cleaningImage from "../../assets/images/cooking-5.jpg";
import recipeModImage from "../../assets/images/cooking-6.jpg";
import breakfastImage from "../../assets/images/palate-1.jpg";
import lunchImage from "../../assets/images/palate-2.jpg";
import dinnerImage from "../../assets/images/palate-3.jpg";
import Tip1 from "../../assets/images/tip-1.jpg";
import Tip2 from "../../assets/images/tip-2.jpg";
import Tip3 from "../../assets/images/tip-3.jpg";
import Tip4 from "../../assets/images/tip-4.jpg";
import Tip5 from "../../assets/images/tip-5.jpg";
import Tip6 from "../../assets/images/tip-6.jpg";
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
    name: "Knife Skills",
    description:
      "Unlock the art of precision in your kitchen with proper chopping, dicing, and slicing techniques.Elevate your culinary creations to new heights.",
    meta: "15 MIN - 11 JUN 23",
    image: knifeSkillsImage,
  },
  {
    name: "Sauteing and Searing",
    description:
      "Achieve the perfect sear and elevate flavors in your dishes. Learn the secrets to sautéing like a pro and creating irresistible textures.",
    meta: "10 MIN - 11 JUN 23",
    image: sauteImage,
  },
  {
    name: "Roasting Tips",
    description:
      "Ensure even cooking and unlock flavorful results with our expert roasting tips. From golden vegetables to succulent meats, master the art of roasting.",
    meta: "25 MIN - 04 JAN 23",
    image: roastingImage,
  },
  {
    name: "Prep Workstations",
    description:
      "Efficiently organize your kitchen space for chopping, mixing, and cooking. Elevate your efficiency in the heart of your culinary domain.",
    meta: "15 MIN - 11 JUN 23",
    image: prepImage,
  },
  {
    name: "Cleaning as You Go",
    description:
      "Maintain a tidy kitchen for stress-free cooking. Learn the art of cleaning as you go, turning every culinary endeavor into a seamless experience.",
    meta: "10 MIN - 11 JUN 23",
    image: cleaningImage,
  },
  {
    name: "Recipe Modification",
    description:
      "Feel confident modifying recipes to suit your taste. Explore the art of culinary creativity in crafting dishes uniquely your own.",
    meta: "25 MIN - 04 JAN 23",
    image: recipeModImage,
  },
];

const flavorTips = [
  {
    name: "Fresh vs. Dried Herbs",
    description:
      "Discover the nuanced world of herbs. Learn when to opt for the freshness of herbs and when dried variants can amplify your culinary creations.",
    meta: "15 MIN - 01 JUN 23",
    image: Tip1,
  },
  {
    name: "Choosing Produce",
    description:
      "Selecting ripe fruits and vegetables is an art. Explore our insights to ensure optimal taste in every dish.",
    meta: "20 MIN - 01 JUN 23",
    image: Tip2,
  },
  {
    name: "Understanding Spices",
    description:
      "Enhance flavors by navigating the vast array of spices and seasonings. Uncover the secrets of creating dynamic taste profiles.",
    meta: "25 MIN - 01 JUN 23",
    image: Tip3,
  },
  {
    name: "Balancing Sweet and Savory",
    description:
      "Achieve the perfect symphony of flavors by mastering the art of balancing sweet and savory elements in your dishes.",
    meta: "15 MIN - 01 JUN 23",
    image: Tip4,
  },
  {
    name: "Too Salty? Too Sweet? Fixing Seasoning Issues",
    description:
      "Discover quick fixes for seasoning mishaps and ensure your dishes are perfectly balanced.",
    meta: "20 MIN - 01 JUN 23",
    image: Tip5,
  },
  {
    name: "Storage Solutions",
    description:
      "Keep ingredients fresh and accessible with our storage solutions. Transform your kitchen into an organized oasis.",
    meta: "25 MIN - 01 JUN 23",
    image: Tip6,
  },
];

const palateGuides = [
  {
    title: "Gluten-Free Alternatives",
    description:
      "Explore the world of gluten-free flours and grains, ensuring your dishes cater to a diverse range of dietary preferences.",
    meta: "15 MIN - 01 JUN 23",
    image: breakfastImage,
  },
  {
    title: "Plant-Based Cooking",
    description:
      "Delight in the realm of plant-based cooking with tips for crafting delicious vegetarian and vegan dishes.",
    meta: "15 MIN - 01 JUN 23",
    image: lunchImage,
  },
  {
    title: "Allergy-Friendly Substitutions",
    description:
      "Discover options for common allergens, ensuring everyone can savor the flavors of your culinary creations.",
    meta: "15 MIN - 01 JUN 23",
    image: dinnerImage,
  },
];

export default function CookingTips() {
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

          <CookingTipsSection
            sectionName="Mastering the Basics"
            tips={basicsTips}
          />

          <section className="rounded-[1.65rem] bg-[#c5e3fb] px-5 py-6 sm:px-8 sm:py-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-[40px] font-bold uppercase tracking-[0.02em] text-[#2d2822] sm:text-3xl">
                Nourishing Every Palate
              </h2>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous palate tips"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#7aa5c5] text-[#577b96] transition hover:bg-white/45"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  aria-label="Next palate tips"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#3d6681] text-[#24313a] transition hover:bg-white/55"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {palateGuides.map((guide) => (
                <article
                  key={guide.title}
                  className="group relative min-h-120 overflow-hidden rounded-[1.25rem]"
                >
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,29,26,0.1),rgba(31,29,26,0.78))]" />

                  <div className="relative flex min-h-120 flex-col justify-end px-5 py-5 text-white">
                    <h3 className="text-2xl font-extrabold leading-none tracking-[-0.02em]">
                      {guide.title}
                    </h3>
                    <p className="mt-3 min-h-18 text-sm leading-6 text-white/82">
                      {guide.description}
                    </p>

                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.11em] text-white/88">
                        {guide.meta}
                      </span>

                      <Link
                        to="/recipes"
                        className="inline-flex h-10 items-center justify-center rounded-full border border-white/75 px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-[#2e2822]"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <CookingTipsSection sectionName="Tips & Tricks" tips={flavorTips} />
          <JoinTheFunSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
