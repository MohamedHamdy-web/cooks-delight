import { Link } from "react-router-dom";
import AboutChronicleSection from "../../components/AboutChronicleSection";
import FeaturedRecipesSection from "../../components/FeaturedRecipesSection";
import Navbar from "../../components/Navbar";
import RecipesJourneySection from "../../components/RecipesJourneySection";
import breakfastImage from "../../assets/images/breakfast.png";
import dessertImage from "../../assets/images/dessert.png";
import dinnerImage from "../../assets/images/dinner.png";
import heroImage from "../../assets/images/hero.png";
import lunchImage from "../../assets/images/lunch.png";
import snackImage from "../../assets/images/snack.png";

const paletteItems = [
  { id: "breakfast", label: "BREAKFAST", image: breakfastImage },
  { id: "lunch", label: "LUNCH", image: lunchImage },
  { id: "dinner", label: "DINNER", image: dinnerImage },
  { id: "dessert", label: "DESSERT", image: dessertImage },
  { id: "snack", label: "SNACK", image: snackImage },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5efe8] pb-12 text-[#2c241d]">
      <Navbar />

      <main className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:gap-6">
          <section className="relative overflow-hidden rounded-4xl sm:rounded-[2.5rem]">
            <img
              src={heroImage}
              alt="Chef plating a dish in a warm kitchen"
              className="h-90 w-full object-cover sm:h-107.5 lg:h-125"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(32,22,15,0.28),rgba(32,22,15,0.62))]" />

            <div className="absolute inset-0 flex items-center justify-center px-5 text-center sm:px-8 lg:px-10">
              <div className="mx-auto flex w-full max-w-76 flex-col items-center sm:max-w-100 md:max-w-176">
                <h1 className="text-[2.1rem] font-extrabold uppercase leading-[0.92] text-white sm:text-[3.15rem] md:text-[4.35rem] lg:text-[4.5rem]">
                  <span className="block md:hidden">Unleash</span>
                  <span className="block md:hidden">Culinary</span>
                  <span className="block md:hidden">Excellence</span>
                  <span className="hidden md:block md:whitespace-nowrap">
                    Unleash Culinary
                  </span>
                  <span className="hidden md:block">Excellence</span>
                </h1>

                <p className="mx-auto mt-3 max-w-[28ch] text-[11px] leading-5 text-[#f8f1e8] sm:mt-4 sm:max-w-[32ch] sm:text-sm sm:leading-6 md:mt-5 md:max-w-[43ch] md:text-[1.04rem] md:leading-8">
                  Explore a world of flavors, discover handcrafted recipes, and
                  let the aroma of our passion for cooking fill your kitchen.
                </p>

                <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:mt-6 sm:flex-row md:mt-7">
                  <Link
                    to="/signup"
                    className="inline-flex min-w-38 items-center justify-center rounded-full bg-[#f3a437] px-6 py-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#2c241d] transition hover:bg-[#e59a32]"
                  >
                    Sign Up Now!
                  </Link>

                  <Link
                    to="/recipes"
                    className="inline-flex min-w-38 items-center justify-center rounded-full border border-white/45 bg-[#2f2924]/65 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#3b332d]/85"
                  >
                    Explore Recipes
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section
            id="palette"
            className="rounded-4xl bg-[#c5e3fb] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(320px,1fr)] lg:items-end">
              <div className="flex max-w-md flex-col justify-end">
                <span className="inline-flex w-fit rounded-full bg-[#ff7f6a] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                  Explore
                </span>

                <h2 className="mt-4 text-4xl font-bold uppercase leading-[0.9] sm:text-[3.2rem]">
                  Our Diverse
                  <br />
                  Palette
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-6 text-[#5e6a75]">
                  If you are a breakfast enthusiast, a connoisseur of savory
                  delights, or on the lookout for irresistible desserts, our
                  curated selection has something to satisfy every palate.
                </p>

                <Link
                  to="/recipes"
                  className="mt-6 inline-flex w-fit items-center justify-center rounded-full border border-[#30414f] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#2f3b44] transition hover:bg-white/45"
                >
                  See More
                </Link>
              </div>

              <div className="grid gap-0.5 self-center">
                {paletteItems.map((item) => {
                  return (
                    <Link
                      key={item.id}
                      to={`/recipes/${item.id}`}
                      className="flex items-center justify-between gap-4 border-b border-[#a9cbe7] py-4 pl-2 text-[#24313a] transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f3b44]/35 sm:gap-6 sm:py-5 sm:pl-3"
                    >
                      <div className="flex min-w-0 items-center">
                        <img
                          src={item.image}
                          alt={item.label}
                          className="h-8 w-8 object-contain sm:h-9 sm:w-9"
                        />
                      </div>

                      <span className="min-w-24 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-[#24313a] sm:min-w-29.5 sm:text-[14px]">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          <FeaturedRecipesSection />
          <RecipesJourneySection />
          <AboutChronicleSection />
        </div>
      </main>
    </div>
  );
}
