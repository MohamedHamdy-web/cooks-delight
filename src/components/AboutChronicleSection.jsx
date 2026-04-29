import aboutPanImage from "../assets/images/aboutus-section1.jpg";
import aboutKitchenImage from "../assets/images/aboutus-section.jpg";
import aboutCookingImage from "../assets/images/aboutus-section2.png";
import { Link } from "react-router-dom";

export default function AboutChronicleSection() {
  return (
    <section className="rounded-4xl border border-[#d8cdc0] bg-[#f5efe8] p-4 shadow-[0_12px_28px_rgba(91,62,44,0.05)] sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr_1.2fr] lg:grid-rows-[340px_220px]">
        <div className="rounded-[1.65rem] bg-[#f5efe8] px-4 py-5 sm:px-5 lg:px-5 lg:py-6 flex flex-col justify-end">
          <span className="inline-flex w-fit rounded-full bg-[#ff7f6a] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
            About Us
          </span>
          <h2 className="mt-4 text-[2rem] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-[#2d2822] sm:text-[2.35rem] lg:text-[2.6rem]">
            <span className="block">Our Culinary</span>
            <span className="block">Chronicle</span>
          </h2>
          <p className="mt-4 text-[16px] font-light text-[#262522CC]">
            Our journey is crafted with dedication, creativity, and an
            unrelenting commitment to delivering delightful culinary
            experiences. Join us in savoring the essence of every dish and the
            stories that unfold.
          </p>
          <Link
            to="/about-us"
            className="hidden lg:inline-flex mt-6 w-fit h-11 items-center justify-center rounded-full border border-[#6c6157] px-6 text-[11px] font-bold uppercase tracking-[0.14em] text-[#2d2822] transition hover:bg-white/70"
          >
            Read More
          </Link>
        </div>

        <div className="overflow-hidden rounded-[1.65rem] h-64 lg:h-auto order-2 lg:order-0">
          <img
            src={aboutPanImage}
            alt="Seared salmon in a pan"
            className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="overflow-hidden rounded-[1.65rem] h-64 lg:h-auto order-4 lg:order-0 lg:row-span-2">
          <img
            src={aboutKitchenImage}
            alt="Chef plating dishes in the kitchen"
            className="h-full w-full object-cover object-[59%_center] hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="overflow-hidden rounded-[1.65rem] h-64 lg:h-auto order-3 lg:order-0 lg:col-span-2">
          <img
            src={aboutCookingImage}
            alt="Fresh vegetables cooking in a steaming pan"
            className="h-full w-full object-cover object-[center_56%] hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}
