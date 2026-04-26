import { Link } from "react-router-dom";
import { useUser } from "@clerk/react";

export default function JoinTheFunSection() {
  const { isSignedIn } = useUser();

  if (isSignedIn) return null;

  return (
    <section className="relative overflow-hidden rounded-4xl bg-[#EE6352] px-5 py-12 text-center text-white sm:px-8 sm:py-14 lg:px-10 lg:py-16">
      <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-[#EE6352] opacity-80 sm:-left-24 sm:-top-24 sm:h-80 sm:w-80 lg:h-96 lg:w-96" />
      <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[#EE6352] opacity-80 sm:-right-24 sm:-top-24 sm:h-80 sm:w-80 lg:h-96 lg:w-96" />
      <div className="absolute -bottom-36 left-1/2 h-80 w-[140%] -translate-x-1/2 rounded-full bg-[#EE6352] opacity-80" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffe7dd] sm:text-[11px]">
          Sign Up
        </span>

        <h2 className="mt-3 text-[2.3rem] font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-[3.4rem] lg:text-[4.15rem]">
          <span className="block">Join The Fun</span>
          <span className="block">Create Account Now!</span>
        </h2>

        <p className="mt-4 text-sm leading-6 text-[#fff0ea] sm:text-base">
          <span className="block">
            Create an account to save your favorite recipes, share your own
          </span>
          <span className="block">
            dishes, and enjoy a personalized cooking experience.
          </span>
        </p>

        <Link
          to="/signup"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#1e1a18] px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#2c2724]"
        >
          Sign Up
        </Link>
      </div>
    </section>
  );
}
