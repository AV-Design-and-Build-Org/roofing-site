import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Rise Roofing serves Los Angeles and selected nearby cities across greater LA and Orange County with a local SEO foundation designed to expand intelligently.",
};

export default function ServiceAreasPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
      <section className="grid gap-8 border border-stone-200 bg-white p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:p-10">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#b88a44]">Service Areas</p>
          <h1 className="mt-4 font-[family-name:var(--font-heading)] text-6xl uppercase tracking-[0.08em] text-[#10233c] sm:text-7xl">
            Greater Los Angeles service-area foundation.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            The right move here is not to flood the internet with every city inside a 100-mile radius. It is to focus on the cities most likely to drive real leads first, then expand service-and-city combinations methodically.
          </p>
        </div>

        <div className="border border-stone-200 bg-[#10233c] p-6 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#f2d19b]">Recommended starting markets</p>
          <p className="mt-3 leading-7 text-slate-200">
            Los Angeles itself should anchor the build, followed by nearby high-value cities like Pasadena, Glendale, Burbank, Santa Monica, Long Beach, Torrance, Anaheim, Irvine, and Newport Beach.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        {siteConfig.areaGroups.map((group) => (
          <article key={group.region} className="border border-stone-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#b88a44]">{group.region}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {group.cities.map((city) => (
                <span
                  key={city}
                  className="bg-[#f8f4ec] px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-stone-200"
                >
                  {city}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="border border-stone-200 bg-white p-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#b88a44]">How to expand later</p>
          <ul className="mt-5 grid gap-3 text-slate-600">
            <li className="border border-stone-200 bg-[#f8f4ec] p-4">Start with the homepage, service pages, and Google Business Profile alignment.</li>
            <li className="border border-stone-200 bg-[#f8f4ec] p-4">Next pair the highest-value services with the highest-value nearby cities.</li>
            <li className="border border-stone-200 bg-[#f8f4ec] p-4">Then publish city-specific proof, reviews, photos, and internal links instead of thin duplicate text.</li>
          </ul>
        </div>

        <div className="border border-stone-200 bg-[#10233c] p-8 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#f2d19b]">Need help now?</p>
          <p className="mt-4 text-3xl font-extrabold">Call Rise Roofing directly.</p>
          <p className="mt-4 leading-8 text-slate-200">
            If the next step is an estimate, an inspection, or an urgent roofing conversation, direct contact should stay obvious on every page.
          </p>
          <a
            href={siteConfig.phoneHref}
            className="mt-6 inline-flex rounded-sm bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#10233c] transition hover:bg-slate-100"
          >
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </section>
    </main>
  );
}
