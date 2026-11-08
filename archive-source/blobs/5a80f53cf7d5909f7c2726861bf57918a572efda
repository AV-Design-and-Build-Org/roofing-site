import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  name: siteConfig.businessName,
  alternateName: siteConfig.legalName,
  description: siteConfig.metaDescription,
  url: siteConfig.siteUrl,
  telephone: siteConfig.phoneE164,
  areaServed: siteConfig.allCities.map((city) => ({
    "@type": "City",
    name: city,
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: siteConfig.reviewRating,
    reviewCount: siteConfig.reviewCount,
  },
  sameAs: [siteConfig.googleBusinessProfileUrl],
};

const featuredServices = [
  {
    service: siteConfig.services.find((item) => item.slug === "roof-repair") ?? siteConfig.services[0],
  },
  {
    service: siteConfig.services.find((item) => item.slug === "roof-replacement") ?? siteConfig.services[1],
  },
  {
    service: siteConfig.services.find((item) => item.slug === "roof-inspections") ?? siteConfig.services[4],
  },
  {
    service: siteConfig.services.find((item) => item.slug === "emergency-roofing") ?? siteConfig.services[5],
  },
];

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden bg-[#10233c] text-white">
        <div className="absolute inset-0">
          <Image
            src="/site/home-hero-los-angeles-roofing.jpg"
            alt="Finished residential roofing project in Los Angeles"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,35,60,0.92)_0%,rgba(16,35,60,0.82)_42%,rgba(16,35,60,0.52)_68%,rgba(16,35,60,0.34)_100%)]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="inline-flex rounded-sm bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#f2d19b]">
              Los Angeles Roofing Services
            </p>
            <h1 className="mt-6 max-w-5xl font-[family-name:var(--font-heading)] text-6xl uppercase leading-[0.92] tracking-[0.05em] text-white sm:text-7xl lg:text-[5.5rem]">
              Roof repair, roof replacement, and roofing services across Los Angeles.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              Rise Roofing serves residential and commercial properties across Los Angeles and nearby California cities with a trust-first local contractor presence, clean communication, and roofing pages built for real estimate intent.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center justify-center rounded-sm bg-[#b88a44] px-6 py-4 text-base font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#a9792f]"
              >
                Call for an estimate
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-sm border border-white/20 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
                View roofing services
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {siteConfig.trustBar.map((item) => (
                <div key={item} className="border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-slate-100 backdrop-blur-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <aside className="overflow-hidden border border-white/10 bg-white text-slate-900 shadow-[0_30px_80px_rgba(5,15,28,0.35)]">
            <div className="border-b border-stone-200 bg-[#f8f4ec] p-6">
              <Image
                src={siteConfig.brand.primaryLogo}
                alt={`${siteConfig.businessName} logo`}
                width={320}
                height={110}
                className="h-auto w-[220px]"
                priority
              />
            </div>

            <div className="p-6">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#b88a44]">Estimate Request</p>
              <h2 className="mt-3 text-3xl font-extrabold text-[#10233c]">Start with a quick call.</h2>
              <p className="mt-4 leading-7 text-slate-600">
                Whether the next step is a repair, a replacement, or a roof inspection, the goal is simple: give property owners a clear path from first call to written recommendation.
              </p>

              <div className="mt-6 space-y-3 border-t border-stone-200 pt-6">
                {siteConfig.stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-semibold uppercase tracking-[0.18em] text-slate-500">{stat.label}</span>
                    <span className="text-right font-bold text-[#10233c]">{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center justify-center rounded-sm bg-[#10233c] px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#183357]"
                >
                  {siteConfig.phoneDisplay}
                </a>
                <a
                  href={siteConfig.googleBusinessProfileUrl}
                  className="inline-flex items-center justify-center rounded-sm border border-stone-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#b88a44] hover:text-[#10233c]"
                >
                  View Google Business Profile
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#b88a44]">Roofing Services</p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-5xl uppercase tracking-[0.08em] text-[#10233c] sm:text-6xl">
              Built around the services people actually search for.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Rise Roofing is structured around the services people actually search for when they need help now — repair, replacement, inspections, and urgent roofing response.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredServices.map(({ service }) => (
            <article key={service.slug} className="overflow-hidden border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="relative h-56">
                <Image src={service.thumbnailImage} alt={service.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,35,60,0.06)_0%,rgba(16,35,60,0.74)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#f2d19b]">Rise Roofing</p>
                  <h3 className="mt-2 text-3xl font-extrabold">{service.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="leading-7 text-slate-600">{service.excerpt}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 inline-flex text-sm font-bold uppercase tracking-[0.12em] text-[#10233c] transition hover:text-[#b88a44]"
                >
                  View service →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#b88a44]">Expert Roofing Repair and Service</p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-5xl uppercase tracking-[0.08em] text-[#10233c] sm:text-6xl">
              Local roofing built around trust, workmanship, and clear communication.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Rise Roofing is positioned for homeowners, property managers, and commercial clients who want clear scope, dependable scheduling, and a company that communicates like a real local contractor.
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              The site foundation supports Google Business Profile trust, service-specific search intent, and city-by-city SEO growth across the greater Los Angeles market.
            </p>
            <div className="mt-8">
              <Link
                href="/service-areas"
                className="inline-flex items-center justify-center rounded-sm bg-[#10233c] px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#183357]"
              >
                Explore service areas
              </Link>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="relative overflow-hidden border border-stone-200 bg-[#10233c] p-8 text-white min-h-[340px]">
              <Image
                src="/site/section-expert-roofing-team.jpg"
                alt="Rise Roofing team beside a completed project"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,35,60,0.84)_0%,rgba(16,35,60,0.74)_100%)]" />
              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#f2d19b]">Local Roofing Experts</p>
                <ul className="mt-6 grid gap-4">
                  {siteConfig.differentiators.map((item) => (
                    <li key={item.title} className="border border-white/10 bg-white/5 p-4">
                      <p className="font-bold text-white">{item.title}</p>
                      <p className="mt-2 leading-7 text-slate-200">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border border-stone-200 bg-[#f8f4ec] p-8">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#b88a44]">Core page stack</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {siteConfig.services.map((service) => (
                  <span key={service.slug} className="border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                    {service.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border border-stone-200 bg-[#10233c] p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#f2d19b]">Five-Star Reviews</p>
            <h2 className="mt-4 text-4xl font-extrabold">Google trust should be easy to find.</h2>
            <p className="mt-4 leading-8 text-slate-200">
              The public profile already shows a {siteConfig.reviewRating.toFixed(1)} rating with {siteConfig.reviewCount} public Google reviews, so the website should reinforce that trust instead of burying it.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.googleBusinessProfileUrl}
                className="inline-flex items-center justify-center rounded-sm bg-[#b88a44] px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#a9792f]"
              >
                Explore all reviews
              </a>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center justify-center rounded-sm border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="border border-stone-200 bg-white p-8">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#b88a44]">How work starts</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {siteConfig.process.map((step, index) => (
                <div key={step} className="border border-stone-200 bg-[#f8f4ec] p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#10233c]">Step {index + 1}</p>
                  <p className="mt-3 text-lg font-bold text-[#10233c]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="mb-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#b88a44]">Service Areas</p>
              <h2 className="mt-3 font-[family-name:var(--font-heading)] text-5xl uppercase tracking-[0.08em] text-[#10233c] sm:text-6xl">
                Greater Los Angeles first. Expand smart.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Rise Roofing is set up to grow from Los Angeles into nearby high-value cities instead of spraying out thin pages in every direction on day one.
              </p>
            </div>
            <div className="relative min-h-[260px] overflow-hidden border border-stone-200 bg-[#10233c]">
              <Image
                src="/site/section-local-roofing-la.jpg"
                alt="Finished roof in a Los Angeles neighborhood"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,35,60,0.68)_0%,rgba(16,35,60,0.42)_100%)]" />
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {siteConfig.areaGroups.map((group) => (
              <article key={group.region} className="border border-stone-200 bg-[#f8f4ec] p-6">
                <h3 className="text-2xl font-extrabold text-[#10233c]">{group.region}</h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  {group.cities.map((city) => (
                    <span key={city} className="bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-stone-200">
                      {city}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="relative overflow-hidden border border-stone-200 bg-[#10233c] p-8 text-white lg:p-10">
          <Image
            src="/site/cta-finished-roof-project.jpg"
            alt="Finished roofing project banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,35,60,0.9)_0%,rgba(23,49,80,0.82)_70%,rgba(184,138,68,0.56)_100%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#f2d19b]">Get Started With Your Roofing Project</p>
              <h2 className="mt-3 font-[family-name:var(--font-heading)] text-5xl uppercase tracking-[0.08em] text-white sm:text-6xl">
                Built to earn trust fast and turn search traffic into estimate calls.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">
                Rise Roofing now has the core image foundation in place: a finished-project hero, service imagery, local-market visuals, and contractor-style trust cues that fit the brand direction.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex w-full items-center justify-center rounded-sm bg-white px-6 py-4 text-base font-bold uppercase tracking-[0.12em] text-[#10233c] transition hover:bg-slate-100 lg:w-auto"
              >
                Call {siteConfig.businessName}
              </a>
              <Link
                href="/services"
                className="inline-flex w-full items-center justify-center rounded-sm border border-white/20 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10 lg:w-auto"
              >
                Review service pages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
