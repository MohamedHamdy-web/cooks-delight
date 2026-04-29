import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CookingTipsSection({ sectionName, tips }) {
  return (
    <section>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black uppercase tracking-[0.01em] text-[#2d2822] sm:text-3xl">
          {sectionName}
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Previous ${sectionName}`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c7b9aa] text-[#7b6d60] transition hover:bg-white"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            aria-label={`Next ${sectionName}`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#7b6d60] text-[#2f261f] transition hover:bg-white"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tips.map((tip) => (
          <article
            key={tip.name}
            className="flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[#ddd2c6] bg-[#fffdfa] shadow-[0_10px_22px_rgba(91,62,44,0.05)]"
          >
            <div className="overflow-hidden">
              <img
                src={tip.image}
                alt={tip.name}
                className="h-55 w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col px-4 py-4">
              <h3 className="text-lg font-extrabold text-[#2e2822]">
                {tip.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#7b6d60]">
                {tip.description}
              </p>

              <div className="mt-auto flex flex-col gap-4 border-t border-[#ebe2d8] pt-5 sm:flex-row sm:items-center sm:justify-between">
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
  );
}
