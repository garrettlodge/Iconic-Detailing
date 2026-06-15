import type { Industry, TemplateKey } from "@/site.config";

/**
 * ═══════════════════════════════════════════════════════════════════════
 *  TEMPLATE REGISTRY (metadata only — no React, safe to import anywhere)
 * ═══════════════════════════════════════════════════════════════════════
 *  One engine, many skins. Every template consumes the SAME site.content.json;
 *  only the look changes. Switch `template` in site.content.json to re-skin the
 *  whole site. Section COMPONENTS live in components/templates/registry.tsx;
 *  token THEMES live in app/templates.css. This file is the human-facing index
 *  used by docs, the template gallery, and font/layout resolution.
 */

export type TemplateMeta = {
  key: TemplateKey;
  name: string;
  /** One-line positioning for the gallery / sales deck. */
  tagline: string;
  description: string;
  /** Best-fit industries (drives the "recommended template" hint per client). */
  industries: Industry[];
  /** Three preview swatches for the gallery chip: [surface, accent, ink]. */
  swatches: [string, string, string];
  /** Human-readable font pairing (for docs; actual loading is in lib/fonts.ts). */
  fonts: { display: string; body: string };
};

export const DEFAULT_TEMPLATE: TemplateKey = "studio";

export const TEMPLATES: Record<TemplateKey, TemplateMeta> = {
  studio: {
    key: "studio",
    name: "Studio",
    tagline: "Clean, bold, editorial — the original.",
    description:
      "Confident sans-serif headlines, full-pill buttons, kinetic service marquee. The all-rounder that works for any trade.",
    industries: ["plumber", "contractor", "electrician", "hvac", "roofer", "other"],
    swatches: ["#f7f5f1", "#b4532a", "#1f1d1b"],
    fonts: { display: "Inter", body: "Inter" },
  },
  "fluid-glass": {
    key: "fluid-glass",
    name: "Fluid Glass",
    tagline: "Editorial luxury with frosted glass.",
    description:
      "Big serif display, airy whitespace, hairline grid, tasteful backdrop-blur glass. Makes any operator look high-end.",
    industries: ["realestate", "attorney", "dentist", "salon", "contractor", "other"],
    swatches: ["#f1efe9", "#b08d57", "#16151a"],
    fonts: { display: "Fraunces", body: "Inter" },
  },
  "bold-trade": {
    key: "bold-trade",
    name: "Bold Trade",
    tagline: "High-contrast, industrial, get-it-done.",
    description:
      "Heavy grotesk, dark base, a single safety-bright accent, square edges. Built to read as rugged and dependable.",
    industries: ["plumber", "electrician", "hvac", "roofer", "contractor", "handyman"],
    swatches: ["#0c0d0f", "#ff5a1f", "#f4f5f6"],
    fonts: { display: "Archivo", body: "Inter" },
  },
  "fresh-local": {
    key: "fresh-local",
    name: "Fresh Local",
    tagline: "Bright, friendly, approachable.",
    description:
      "Rounded geometric type, warm light palette, soft cards. Feels neighborly and easy to trust.",
    industries: ["landscaper", "painter", "detailer", "handyman", "other"],
    swatches: ["#fbfaf7", "#2fae66", "#1d2421"],
    fonts: { display: "Poppins", body: "Plus Jakarta Sans" },
  },
  "clinical-calm": {
    key: "clinical-calm",
    name: "Clinical Calm",
    tagline: "Airy, soft, reassuring.",
    description:
      "Quiet humanist type, soft blue-white palette, generous spacing, trust-forward. Calms anxious patients.",
    industries: ["dentist", "chiropractor", "salon", "other"],
    swatches: ["#f4f8fb", "#2f8fb3", "#14202a"],
    fonts: { display: "Outfit", body: "Inter" },
  },
  "warm-table": {
    key: "warm-table",
    name: "Warm Table",
    tagline: "Rich, textured, sensory.",
    description:
      "Elegant serif, warm earthy palette, ambiance-led imagery. Built to make food and hospitality feel inviting.",
    industries: ["restaurant", "salon", "other"],
    swatches: ["#faf6f0", "#b5462f", "#221a14"],
    fonts: { display: "Playfair Display", body: "Karla" },
  },
  "modern-pro": {
    key: "modern-pro",
    name: "Modern Pro",
    tagline: "Sharp, corporate-clean, credible.",
    description:
      "Crisp geometric headlines, navy-neutral palette, structured grid. Signals competence and authority.",
    industries: ["attorney", "accountant", "insurance", "realestate", "other"],
    swatches: ["#f7f8fa", "#2f4bda", "#0f1622"],
    fonts: { display: "Space Grotesk", body: "Inter" },
  },
};

export const TEMPLATE_LIST: TemplateMeta[] = Object.values(TEMPLATES);
export const TEMPLATE_KEYS: TemplateKey[] = Object.keys(TEMPLATES) as TemplateKey[];

/** Normalize an unknown/legacy value to a valid template key. */
export function resolveTemplate(key?: string | null): TemplateKey {
  return key && key in TEMPLATES ? (key as TemplateKey) : DEFAULT_TEMPLATE;
}

/** Suggest the best-fit template for an industry (used by the import tooling). */
export function recommendTemplate(industry: Industry): TemplateKey {
  const match = TEMPLATE_LIST.find(
    (t) => t.key !== "studio" && t.industries.includes(industry)
  );
  return match?.key ?? DEFAULT_TEMPLATE;
}
