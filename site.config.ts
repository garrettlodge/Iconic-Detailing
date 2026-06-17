/**
 * ═══════════════════════════════════════════════════════════════════════
 *  site.config.ts — TYPES + WIRING.  ✦ EDIT CONTENT IN site.content.json ✦
 * ═══════════════════════════════════════════════════════════════════════
 *  Every bit of editable content — copy, services, reviews, hours, theme —
 *  lives in site.content.json. This file only declares the shape and
 *  re-exports it as a typed object, so the site stays fully type-checked.
 *
 *  Why JSON? So content can be edited two ways:
 *    • by hand — open site.content.json and change the values, or
 *    • on the board — Mission Control reads/writes that JSON for you.
 *
 *  To launch a new client:
 *    1. Edit site.content.json (or do it in Mission Control).
 *    2. Drop real photos in /public and point `about.photo` (and the Hero
 *       plate, if you swap it) at them.
 *  Convention: wrap a word in *asterisks* inside `business.tagline` to
 *  render it as an italic serif accent in the hero headline.
 */

import content from "./site.content.json";

export type Industry =
  | "plumber"
  | "electrician"
  | "hvac"
  | "roofer"
  | "contractor"
  | "handyman"
  | "painter"
  | "landscaper"
  | "detailer"
  | "dentist"
  | "chiropractor"
  | "restaurant"
  | "realestate"
  | "attorney"
  | "accountant"
  | "insurance"
  | "salon"
  | "other";

/**
 * Visual template (the design system that renders the site). Each key maps to
 * a token theme + a set of section components in /components/templates.
 * ABSENT → "studio" (the original Open-vibe look), so existing client repos
 * that don't set this keep rendering exactly as before. See lib/templates.ts.
 */
export type TemplateKey =
  | "studio"
  | "fluid-glass"
  | "bold-trade"
  | "fresh-local"
  | "clinical-calm"
  | "warm-table"
  | "modern-pro";

export interface SiteConfig {
  business: {
    name: string;
    tagline: string; // hero headline; *word* = italic accent
    description: string; // hero paragraph + meta description
    industry: Industry;
    foundedYear: number;
    license: string; // e.g. "Licensed & insured · TN #12345"
    domain: string; // bare domain, no protocol — e.g. "hawthorneplumbing.com"
  };
  contact: {
    phone: string; // display format, e.g. "(615) 555-0142"
    phoneTel: string; // tel: href, e.g. "+16155550142"
    email: string;
    address: { street: string; city: string; state: string; zip: string };
    hours: { days: string; time: string }[];
    mapsUrl: string; // Google Maps link to the business
    geo?: { lat: number; lng: number }; // optional → schema.org GeoCoordinates (boosts Maps/local SEO)
  };
  serviceArea: string[]; // cities served (drives ServiceArea + schema areaServed)
  services: { slug: string; title: string; blurb: string }[];
  reviews: {
    rating: number; // e.g. 4.9
    count: number; // e.g. 312
    source: string; // e.g. "Google"
    sourceUrl: string; // link to the public reviews
    items: { author: string; rating: number; date: string; body: string }[];
  };
  process: { n: string; title: string; body: string }[];
  faq: { q: string; a: string }[];
  about: {
    owner: string;
    ownerRole: string;
    photo: string | null; // /public path (e.g. "/owner.jpg") or null → SVG plate
    paragraphs: string[];
  };
  social: {
    google?: string;
    facebook?: string;
    instagram?: string;
    yelp?: string;
  };
  /** Optional project gallery (filterable grid + lightbox). Items with no `src`
   *  render a labelled placeholder, so the section is "drop your photos in" ready. */
  portfolio?: {
    title?: string;
    intro?: string;
    items: {
      src?: string | null;
      alt?: string;
      category?: string;
      caption?: string;
    }[];
  };
  /** Optional before/after drag sliders. */
  beforeAfter?: {
    title?: string;
    intro?: string;
    items: {
      before?: string | null;
      after?: string | null;
      label?: string;
      caption?: string;
    }[];
  };
  /** Optional closing call-to-action band copy. Falls back to phone CTA. */
  cta?: {
    heading: string;
    body?: string;
    primary?: string;
    secondary?: string;
  };
  theme: {
    mode: "light" | "dark"; // base palette; bg/fg below override it if set
    accent: string; // hex — single accent color used site-wide
    bg?: string; // optional custom background (hex) — overrides the mode default
    fg?: string; // optional custom text color (hex) — overrides the mode default
  };
  /** Which visual template renders this site. Omit → "studio" (original look).
   *  The business CONTENT above is identical across every template, so you can
   *  flip this one key to preview the same business in any design. */
  template?: TemplateKey;
  /** Optional page layout — section order, visibility, background tone, and
   *  user-added blocks (id + inline data). Absent = default layout. */
  sections?: {
    id?: string;
    type: string;
    visible: boolean;
    tone?: string;
    data?: Record<string, unknown>;
  }[];
}

// site.content.json holds the values; the cast applies the precise types.
// Cast through `unknown` because JSON widens unions (industry/theme.mode → string)
// and the optional `sections[]` Mission Control writes infers a shape TS won't
// directly overlap with SiteConfig. The JSON is authored to match SiteConfig.
export const siteConfig: SiteConfig = content as unknown as SiteConfig;

export default siteConfig;
