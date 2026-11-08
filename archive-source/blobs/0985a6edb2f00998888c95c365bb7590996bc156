import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-[#10233c] text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr_0.9fr] lg:px-8">
        <div>
          <Image
            src={siteConfig.brand.primaryLogo}
            alt={`${siteConfig.businessName} logo`}
            width={240}
            height={82}
            className="h-auto w-[190px]"
          />
          <p className="mt-5 max-w-md leading-7 text-slate-300">
            Rise Roofing provides roof repair, roof replacement, roof inspections, emergency roofing, and residential and commercial roofing service across Los Angeles and nearby California cities.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <p>
              <span className="font-semibold text-white">Phone:</span> {siteConfig.phoneDisplay}
            </p>
            <p>
              <span className="font-semibold text-white">Primary market:</span> {siteConfig.primaryCity}, {siteConfig.state}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-[#f2d19b]">Our Services</h3>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            {siteConfig.services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="transition hover:text-white">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-[#f2d19b]">Quick Links</h3>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            <li>
              <Link href="/services" className="transition hover:text-white">
                Roofing Services
              </Link>
            </li>
            <li>
              <Link href="/service-areas" className="transition hover:text-white">
                Service Areas
              </Link>
            </li>
            <li>
              <a href={siteConfig.googleBusinessProfileUrl} className="transition hover:text-white">
                Google Business Profile
              </a>
            </li>
            <li>
              <a href={siteConfig.phoneHref} className="transition hover:text-white">
                {siteConfig.phoneDisplay}
              </a>
            </li>
          </ul>

          <div className="mt-6 rounded-sm border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">Selected service areas</p>
            <p className="mt-2 leading-6">Los Angeles, Pasadena, Glendale, Burbank, Santa Monica, Long Beach, Torrance, Anaheim, Irvine, and nearby cities.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 {siteConfig.businessName}. All rights reserved.</p>
          <p>Built for local search, local trust, and direct estimate calls.</p>
        </div>
      </div>
    </footer>
  );
}
