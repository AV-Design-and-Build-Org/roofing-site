import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serviceMap, siteConfig } from "@/lib/site-config";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return siteConfig.services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = siteConfig.services.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: `${service.title} from ${siteConfig.businessName} in ${siteConfig.primaryCity} and nearby California service areas.`,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = serviceMap[slug as keyof typeof serviceMap];

  if (!service) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
      <section className="grid gap-8 border border-stone-200 bg-white p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:p-10">
        <div>
          <Link
            href="/services"
            className="text-sm font-bold uppercase tracking-[0.24em] text-[#b88a44] transition hover:text-[#10233c]"
          >
            ← Back to services
          </Link>
          <h1 className="mt-4 font-[family-name:var(--font-heading)] text-6xl uppercase tracking-[0.08em] text-[#10233c] sm:text-7xl">
            {service.heroTitle}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{service.summary}</p>
        </div>

        <div className="overflow-hidden border border-stone-200 bg-[#10233c] text-white">
          <div className="relative h-72 lg:h-full lg:min-h-[360px]">
            <Image src={service.heroImage} alt={service.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,35,60,0.08)_0%,rgba(16,35,60,0.72)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#f2d19b]">Service overview</p>
              <div className="mt-4 grid gap-3">
                {service.bullets.map((bullet) => (
                  <div key={bullet} className="border border-white/10 bg-white/10 p-4 text-slate-100 backdrop-blur-sm">
                    {bullet}
                  </div>
                ))}
              </div>
              <a
                href={siteConfig.phoneHref}
                className="mt-6 inline-flex w-full items-center justify-center rounded-sm bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#10233c] transition hover:bg-slate-100"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="border border-stone-200 bg-white p-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#b88a44]">When to call</p>
          <p className="mt-4 leading-8 text-slate-600">
            If you are seeing visible roof wear, active leaks, storm-related problems, or signs the roof may need more than a temporary patch, this is the point where a clear inspection and recommendation matters.
          </p>
        </div>

        <div className="border border-stone-200 bg-[#f8f4ec] p-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#b88a44]">Service areas we focus on</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {siteConfig.featuredCities.map((city) => (
              <span key={city} className="bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-stone-200">
                {service.shortLabel} • {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 border border-stone-200 bg-[linear-gradient(135deg,#10233c_0%,#173150_70%,#b88a44_100%)] p-8 text-white lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#f2d19b]">Need help with this service?</p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-5xl uppercase tracking-[0.08em] text-white sm:text-6xl">
              Call Rise Roofing for the next clear step.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">
              Whether the property needs urgent attention, a replacement conversation, or a professional inspection, Rise Roofing is positioned to help property owners move from uncertainty to a clear plan.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex w-full items-center justify-center rounded-sm bg-white px-6 py-4 text-base font-bold uppercase tracking-[0.12em] text-[#10233c] transition hover:bg-slate-100 lg:w-auto"
            >
              Call {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/service-areas"
              className="inline-flex w-full items-center justify-center rounded-sm border border-white/20 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10 lg:w-auto"
            >
              View Service Areas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
