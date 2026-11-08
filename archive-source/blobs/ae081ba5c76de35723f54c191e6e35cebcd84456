import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Roofing Services",
  description:
    "Explore roof repair, roof replacement, inspections, emergency roofing, storm damage roofing, and residential and commercial roofing services from Rise Roofing.",
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
      <section className="grid gap-8 border border-stone-200 bg-white p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:p-10">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#b88a44]">Roofing Services</p>
          <h1 className="mt-4 font-[family-name:var(--font-heading)] text-6xl uppercase tracking-[0.08em] text-[#10233c] sm:text-7xl">
            Roofing services built around real local demand.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Explore the core roofing services Rise Roofing provides across Los Angeles and nearby California cities, from urgent repairs to full replacement planning and inspection support.
          </p>
        </div>

        <div className="border border-stone-200 bg-[#f8f4ec] p-6">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#10233c]">Quick contact</p>
          <p className="mt-3 text-2xl font-extrabold text-[#10233c]">Need roofing help now?</p>
          <p className="mt-3 leading-7 text-slate-600">
            Use the services below to find the most relevant page, or call directly if the issue is urgent.
          </p>
          <a
            href={siteConfig.phoneHref}
            className="mt-6 inline-flex rounded-sm bg-[#10233c] px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#183357]"
          >
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {siteConfig.services.map((service) => (
          <article key={service.slug} className="overflow-hidden border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="relative h-56 overflow-hidden">
              <Image src={service.thumbnailImage} alt={service.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,35,60,0.12)_0%,rgba(16,35,60,0.78)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 px-6 py-5 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#f2d19b]">Rise Roofing</p>
                <h2 className="mt-3 text-3xl font-extrabold">{service.title}</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="leading-7 text-slate-600">{service.excerpt}</p>
              <ul className="mt-5 grid gap-3 text-sm text-slate-600">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#b88a44]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/services/${service.slug}`}
                className="mt-6 inline-flex text-sm font-bold uppercase tracking-[0.12em] text-[#10233c] transition hover:text-[#b88a44]"
              >
                Open Service Page →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
