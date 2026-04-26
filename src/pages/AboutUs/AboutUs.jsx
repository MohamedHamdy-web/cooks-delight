import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import chefImage from "../../assets/images/aboutus-hero.jpg";
import gallery1 from "../../assets/images/aboutus-section.jpg";
import gallery2 from "../../assets/images/aboutus-2.jpg";
import gallery3 from "../../assets/images/aboutus-3.jpg";
import gallery4 from "../../assets/images/aboutus-4.jpg";
import gallery5 from "../../assets/images/aboutus-5.jpg";
import gallery6 from "../../assets/images/aboutus-6.jpg";
import gallery7 from "../../assets/images/aboutus-7.jpg";
import gallery8 from "../../assets/images/aboutus-8.jpg";
import FeaturedRecipesSection from "../../components/FeaturedRecipesSection";
import JoinTheFunSection from "../../components/JoinTheFunSection";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5efe8]">
      <Navbar />
      <section className="max-w-6xl mx-auto py-13">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold uppercase text-[#1e1b18] tracking-tight">
              Welcome to <br /> My Culinary <br /> Haven!
            </h1>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-[#7a6d62] text-[21px] leading-tight">
              Bonjour and welcome to the heart of my kitchen! I'm Isabella
              Russo, the culinary enthusiast behind this haven of flavors, Cooks
              Delight. Join me on a gastronomic journey where each dish carries
              a story, and every recipe is a crafted symphony of taste.
            </p>
            <div>
              <Link
                to="/recipes"
                className="inline-flex items-center justify-center bg-[#F29C33] hover:bg-[#d68b2f] text-black text-sm font-medium uppercase tracking-widest px-6 py-3 rounded-full transition"
              >
                Explore Recipes
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto px-6 ">
        <div className="border border-[#ddd2c6] rounded-[1.65rem] overflow-hidden p-4">
          <section className="max-w-6xl mx-auto py-8">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={chefImage}
                    alt="Isabella Russo"
                    className="w-full h-130 object-cover object-[center_30%] brightness-150"
                  />
                </div>
                <div className="mt-5 flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-widest border border-[#2d2822] px-4 py-2 rounded-full flex items-center gap-2">
                    Follow Me
                    <div className="flex items-center gap-3">
                      <a
                        href="#"
                        className="w-8 h-8 bg-[#1877f2] rounded-full flex items-center justify-center text-white"
                      >
                        <FaFacebookF size={14} />
                      </a>
                      <a
                        href="#"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                        style={{
                          background:
                            "linear-gradient(to top right, #facc15, #ec4899, #9333ea)",
                        }}
                      >
                        <FaInstagram size={14} />
                      </a>
                      <a
                        href="#"
                        className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white"
                      >
                        <FaYoutube size={14} />
                      </a>
                    </div>
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <h2 className="text-3xl md:text-4xl font-black uppercase text-[#1e1b18] leading-tight">
                  From Italian Roots to <br /> Global Palates
                </h2>
                <p className="text-[#7a6d62] text-sm leading-relaxed">
                  Born and raised in the vibrant culinary landscape of Italy, my
                  journey with food began in the heart of my family's kitchen.
                  Surrounded by the aroma of fresh herbs, the sizzle of pans,
                  and the laughter of loved ones, I developed a deep
                  appreciation for the art of cooking. My culinary education
                  took me from the historic streets of Rome to the bustling
                  markets of Florence, where I honed my skills and cultivated a
                  love for the simplicity and authenticity of Italian cuisine.
                </p>
                <p className="text-[#7a6d62] text-sm leading-relaxed">
                  Driven by a relentless curiosity, I embarked on a global
                  culinary exploration, seeking inspiration from the rich
                  tapestry of flavors found in kitchens around the world. From
                  the spicy markets of Marrakech to the sushi stalls of Tokyo,
                  each experience added a unique brushstroke to my culinary
                  canvas.
                </p>
                <p className="text-[#7a6d62] text-sm leading-relaxed">
                  Whether you're a seasoned home cook or just starting your
                  culinary adventures, I'm delighted to have you here. Let's
                  stir, simmer, and savor the beauty of creating something
                  wonderful together.
                </p>
                <p className="text-[#7a6d62] text-sm">Warmest regards,</p>
                <p
                  className="text-[#2d2822] text-4xl italic"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  Isabella Russo
                </p>
              </div>
            </div>
          </section>
          <section className="px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                gallery1,
                gallery2,
                gallery3,
                gallery4,
                gallery5,
                gallery6,
                gallery7,
                gallery8,
              ].map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <img
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-52 object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="mt-7">
        <FeaturedRecipesSection title="Featured Recipes" />
      </div>
      <div className="mt-7">
        <JoinTheFunSection />
      </div>
      <div className="mt-7">
        <Footer />
      </div>
    </div>
  );
}
