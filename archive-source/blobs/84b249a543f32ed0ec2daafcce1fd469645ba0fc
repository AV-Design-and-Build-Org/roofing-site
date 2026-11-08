export type Service = {
  slug: string;
  title: string;
  shortLabel: string;
  thumbnailImage: string;
  heroImage: string;
  excerpt: string;
  heroTitle: string;
  summary: string;
  bullets: string[];
};

export type AreaGroup = {
  region: string;
  cities: string[];
};

const services: Service[] = [
  {
    slug: "roof-repair",
    title: "Roof Repair",
    shortLabel: "Roof repair",
    thumbnailImage: "/site/service-roof-repair.jpg",
    heroImage: "/site/hero-roof-repair.jpg",
    excerpt:
      "Leak detection, flashing fixes, damaged shingle repair, and targeted work that helps stop a small issue from turning into a major one.",
    heroTitle: "Roof repair in Los Angeles and nearby cities",
    summary:
      "When a roof starts leaking, lifting, or showing visible wear, homeowners need clear next steps fast. This page is positioned around urgent local search intent and estimate requests.",
    bullets: [
      "Leak investigation and problem-area repair",
      "Shingle, flashing, and penetration detail repairs",
      "Work scoped clearly before major damage spreads",
    ],
  },
  {
    slug: "roof-replacement",
    title: "Roof Replacement",
    shortLabel: "Roof replacement",
    thumbnailImage: "/site/service-roof-replacement.jpg",
    heroImage: "/site/hero-roof-replacement.jpg",
    excerpt:
      "Full replacement planning for aging, storm-damaged, or failing roofs with clear scope, material direction, and clean project communication.",
    heroTitle: "Roof replacement for aging and storm-damaged roofs",
    summary:
      "This service page is aimed at high-intent searches where the roof is past patchwork and the customer needs a full replacement conversation.",
    bullets: [
      "Replacement planning for worn or failing roofs",
      "Clear estimate structure and scope walkthrough",
      "Residential and commercial project consideration",
    ],
  },
  {
    slug: "residential-roofing",
    title: "Residential Roofing",
    shortLabel: "Residential roofing",
    thumbnailImage: "/site/hero-residential-roofing.jpg",
    heroImage: "/site/hero-residential-roofing.jpg",
    excerpt:
      "Residential roofing support for repairs, replacements, inspections, and storm-related issues across the greater Los Angeles market.",
    heroTitle: "Residential roofing built around fast communication and clean execution",
    summary:
      "For homeowners, trust and responsiveness matter as much as the work itself. This page is built to speak directly to that buyer mindset.",
    bullets: [
      "Single-family home roofing services",
      "Repair and replacement pathways",
      "Inspection and maintenance-focused conversations",
    ],
  },
  {
    slug: "commercial-roofing",
    title: "Commercial Roofing",
    shortLabel: "Commercial roofing",
    thumbnailImage: "/site/hero-commercial-roofing.jpg",
    heroImage: "/site/hero-commercial-roofing.jpg",
    excerpt:
      "Commercial roofing support for buildings that need responsive communication, clean scheduling, and dependable scope clarity.",
    heroTitle: "Commercial roofing for property managers and business owners",
    summary:
      "This page targets commercial intent without over-claiming specialties that were not provided. It focuses on responsiveness, scope clarity, and practical execution.",
    bullets: [
      "Commercial roof repair and replacement conversations",
      "Scope planning for offices, retail, and mixed-use properties",
      "Minimizing disruption with organized scheduling",
    ],
  },
  {
    slug: "roof-inspections",
    title: "Roof Inspections",
    shortLabel: "Roof inspections",
    thumbnailImage: "/site/service-roof-inspection.jpg",
    heroImage: "/site/hero-roof-inspections.jpg",
    excerpt:
      "Inspection support for visible wear, storm follow-up, resale prep, or peace-of-mind before a small issue becomes a larger expense.",
    heroTitle: "Roof inspections for buyers, owners, and post-storm checkups",
    summary:
      "A strong local roofing site needs an inspection page because many first contacts are informational before they become repair or replacement jobs.",
    bullets: [
      "Post-storm visual condition checks",
      "Inspection support before repair or replacement decisions",
      "Clear findings and practical next-step guidance",
    ],
  },
  {
    slug: "emergency-roofing",
    title: "Emergency Roofing",
    shortLabel: "Emergency roofing",
    thumbnailImage: "/site/service-emergency-roofing.jpg",
    heroImage: "/site/hero-emergency-roofing.jpg",
    excerpt:
      "Emergency roof repair and protective response for active leaks, exposed roof sections, and urgent situations that cannot sit unattended.",
    heroTitle: "Emergency roof response when the problem cannot wait",
    summary:
      "This page targets urgent, high-intent searches. The copy stays careful and avoids claiming 24/7 service explicitly while still speaking to emergency demand.",
    bullets: [
      "Urgent leak and weather exposure response",
      "Temporary protection and next-step stabilization",
      "Fast path from first call to inspection scheduling",
    ],
  },
  {
    slug: "storm-damage-roofing",
    title: "Storm Damage Roofing",
    shortLabel: "Storm damage",
    thumbnailImage: "/site/hero-storm-damage-roofing.jpg",
    heroImage: "/site/hero-storm-damage-roofing.jpg",
    excerpt:
      "Storm-related roofing support for wind damage, lifted shingles, visible impact, and the kind of roof wear that shows up after bad weather.",
    heroTitle: "Storm damage roofing support across greater Los Angeles",
    summary:
      "Storm-related pages convert well because the search intent is urgent and specific. This page is structured to support that search behavior while staying honest.",
    bullets: [
      "Visible storm damage follow-up",
      "Inspection and damage documentation conversation",
      "Repair vs. replacement next-step guidance",
    ],
  },
];

const areaGroups: AreaGroup[] = [
  {
    region: "Los Angeles core",
    cities: ["Los Angeles", "Pasadena", "Glendale", "Burbank", "Santa Monica", "Beverly Hills"],
  },
  {
    region: "San Fernando Valley & nearby",
    cities: ["Calabasas", "Woodland Hills", "Studio City", "Sherman Oaks", "Van Nuys", "Santa Clarita"],
  },
  {
    region: "South Bay & coastal",
    cities: ["Torrance", "Redondo Beach", "Manhattan Beach", "Long Beach", "Inglewood"],
  },
  {
    region: "Orange County reach",
    cities: ["Anaheim", "Irvine", "Newport Beach", "Huntington Beach", "Costa Mesa"],
  },
];

const allCities = areaGroups.flatMap((group) => group.cities);

export const siteConfig = {
  businessName: "Rise Roofing",
  legalName: "Rise Roofing",
  primaryCity: "Los Angeles",
  state: "CA",
  audience: "Residential & commercial roofing",
  phoneDisplay: "(323) 417-5261",
  phoneE164: "+13234175261",
  phoneHref: "tel:+13234175261",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  googleBusinessProfileUrl: "https://share.google/Jbeck6wakyPavHWgz",
  reviewRating: 5.0,
  reviewCount: 7,
  serviceAreaLabel: "Los Angeles and high-value cities across greater LA and Orange County",
  serviceAreaType: "Service-area roofing company",
  metaDescription:
    "Rise Roofing provides roof repair, roof replacement, inspections, emergency roofing, and residential and commercial roofing service across Los Angeles and nearby California cities.",
  hero: {
    eyebrow: "LOCAL ROOFING • LOS ANGELES • RESIDENTIAL + COMMERCIAL",
    headline: "Roofing built for urgent problems, clear communication, and clean execution.",
    subheadline:
      "Rise Roofing is being launched as a serious local lead-generation foundation — built to win trust fast, capture estimate calls, and scale into a proper city-by-city SEO machine across greater Los Angeles.",
    primaryCta: "Call for an estimate",
    secondaryCta: "View roofing services",
  },
  trustBar: [
    "5.0 Google rating",
    "7 public Google reviews",
    "Residential + commercial",
    "Los Angeles service focus",
  ],
  differentiators: [
    {
      title: "Built for local intent",
      description:
        "The structure prioritizes high-intent service pages, local trust, and a clean path from search result to call or estimate request.",
    },
    {
      title: "Clear scope and clean communication",
      description:
        "The copy leans into what real buyers care about: responsiveness, honest next steps, and crews that leave a clean job site behind.",
    },
    {
      title: "Ready to scale",
      description:
        "This foundation is designed so city pages, review proof, analytics, and tracking can be added without rebuilding the site from scratch.",
    },
  ],
  process: [
    "Call Rise Roofing or request an estimate",
    "Review the property and roof condition",
    "Get a clear repair-or-replacement recommendation",
    "Schedule the job and keep the scope moving cleanly",
  ],
  faqs: [
    {
      question: "What roofing pages should launch first?",
      answer:
        "For a new local roofing business, the strongest early pages are roof repair, roof replacement, residential roofing, commercial roofing, inspections, emergency roofing, and storm damage roofing.",
    },
    {
      question: "Why start with Los Angeles and nearby cities instead of every city at once?",
      answer:
        "Because local SEO works better when the foundation is believable. Strong service pages and a focused service-area strategy outperform a thin site stuffed with dozens of weak city pages.",
    },
    {
      question: "Can this site expand later without a rebuild?",
      answer:
        "Yes. The architecture is being set up to support future city pages, more service pages, analytics, schema improvements, and ongoing content work.",
    },
  ],
  stats: [
    { label: "Primary market", value: "Los Angeles" },
    { label: "Service model", value: "Service-area business" },
    { label: "Google rating", value: "5.0 / 7 reviews" },
  ],
  brand: {
    primaryLogo: "/brand/rise-roofing-logo-primary.png",
    markLogo: "/brand/rise-roofing-mark.png",
    alternateLogo: "/brand/rise-roofing-logo-alt.png",
  },
  services,
  areaGroups,
  allCities,
  featuredCities: [
    "Los Angeles",
    "Pasadena",
    "Santa Monica",
    "Glendale",
    "Burbank",
    "Long Beach",
    "Torrance",
    "Anaheim",
    "Irvine",
    "Newport Beach",
  ],
} as const;

export const serviceMap = Object.fromEntries(services.map((service) => [service.slug, service])) as Record<
  Service["slug"],
  Service
>;

export type SiteConfig = typeof siteConfig;
