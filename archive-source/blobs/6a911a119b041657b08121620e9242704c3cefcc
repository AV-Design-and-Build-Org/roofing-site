import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Roofing Services" },
  { href: "/service-areas", label: "Service Areas" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-white/10 bg-[#10233c] text-sm text-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p className="font-medium tracking-[0.02em]">
            Los Angeles roofing services for residential and commercial properties
          </p>
          <a href={siteConfig.phoneHref} className="font-semibold text-[#f2d19b] transition hover:text-white">
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="border-b border-stone-200 bg-white/96 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-4">
            <Image
              src={siteConfig.brand.primaryLogo}
              alt={`${siteConfig.businessName} logo`}
              width={240}
              height={82}
              className="h-auto w-[150px] min-w-[150px] sm:w-[180px]"
              priority
            />
            <div className="hidden min-w-0 border-l border-stone-200 pl-4 md:block">
              <p className="truncate text-xs font-semibold uppercase tracking-[0.28em] text-[#b88a44]">
                {siteConfig.audience}
              </p>
              <p className="truncate text-sm text-slate-600">Serving Los Angeles and nearby California cities</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-700 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-[#10233c]">
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.googleBusinessProfileUrl}
              className="transition hover:text-[#10233c]"
            >
              Google Profile
            </a>
          </nav>

          <a
            href={siteConfig.phoneHref}
            className="inline-flex shrink-0 items-center justify-center rounded-sm bg-[#b88a44] px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#a9792f]"
          >
            Call Now
          </a>
        </div>
      </div>
    </header>
  );
}
