"use client";

import type { ComponentType } from "react";
import type { TemplateKey } from "@/site.config";

// ── base (Studio) chrome + sections — also the fallback for every template ──
import Nav from "../Nav";
import Footer from "../Footer";
import Hero from "../Hero";
import TrustBar from "../TrustBar";
import Services from "../Services";
import Process from "../Process";
import Reviews from "../Reviews";
import About from "../About";
import ServiceArea from "../ServiceArea";
import FAQ from "../FAQ";
import Contact from "../Contact";
import BeforeAfter from "../BeforeAfter";
import Portfolio from "../Portfolio";
import CTA from "../CTA";

// ── Fluid Glass — bespoke overrides (flagship) ──
import FluidGlassNav from "./fluid-glass/Nav";
import FluidGlassHero from "./fluid-glass/Hero";
import FluidGlassServices from "./fluid-glass/Services";

// ── Bold Trade — bespoke overrides ──
import BoldTradeHero from "./bold-trade/Hero";
import BoldTradeServices from "./bold-trade/Services";

// ── Fresh Local ──
import FreshLocalHero from "./fresh-local/Hero";
import FreshLocalServices from "./fresh-local/Services";
// ── Clinical Calm ──
import ClinicalCalmHero from "./clinical-calm/Hero";
import ClinicalCalmServices from "./clinical-calm/Services";
// ── Warm Table ──
import WarmTableHero from "./warm-table/Hero";
import WarmTableServices from "./warm-table/Services";
// ── Modern Pro ──
import ModernProHero from "./modern-pro/Hero";
import ModernProServices from "./modern-pro/Services";

// ── user-content blocks (template-agnostic; always available) ──
import TextBlock from "../blocks/TextBlock";
import ImageBlock from "../blocks/ImageBlock";
import TextImageBlock from "../blocks/TextImageBlock";
import ButtonBlock from "../blocks/ButtonBlock";
import ColumnsBlock from "../blocks/ColumnsBlock";
import GalleryBlock from "../blocks/GalleryBlock";
import VideoBlock from "../blocks/VideoBlock";
import QuoteBlock from "../blocks/QuoteBlock";

/**
 * ═══════════════════════════════════════════════════════════════════════
 *  SECTION + CHROME REGISTRY  (one engine, many skins)
 * ═══════════════════════════════════════════════════════════════════════
 *  getSectionComponent / getChrome resolve a template's component for a given
 *  section type, falling back to the proven base (Studio) component when a
 *  template hasn't overridden it. So a brand-new template renders a complete,
 *  working site the moment its tokens exist — bespoke sections layer on top.
 *
 *  To give a template its own section: build it under
 *  components/templates/<key>/, then register it in SECTION_OVERRIDES below.
 */

export type SectionProps = {
  section?: { id?: string; type?: string; data?: Record<string, unknown> };
  index?: number;
};
export type SectionMap = Record<string, ComponentType<SectionProps>>;
export type Chrome = { Nav: ComponentType; Footer: ComponentType };

const BLOCKS: SectionMap = {
  textBlock: TextBlock,
  imageBlock: ImageBlock,
  textImageBlock: TextImageBlock,
  buttonBlock: ButtonBlock,
  columnsBlock: ColumnsBlock,
  galleryBlock: GalleryBlock,
  videoBlock: VideoBlock,
  quoteBlock: QuoteBlock,
};

const BASE_SECTIONS: SectionMap = {
  hero: Hero,
  trustbar: TrustBar,
  services: Services,
  process: Process,
  portfolio: Portfolio,
  beforeAfter: BeforeAfter,
  reviews: Reviews,
  about: About,
  serviceArea: ServiceArea,
  faq: FAQ,
  cta: CTA,
  contact: Contact,
};

const BASE_CHROME: Chrome = { Nav, Footer };

// Per-template overrides — populated as each template is built. Empty = inherit.
const SECTION_OVERRIDES: Partial<Record<TemplateKey, SectionMap>> = {
  "fluid-glass": {
    hero: FluidGlassHero,
    services: FluidGlassServices,
  },
  "bold-trade": {
    hero: BoldTradeHero,
    services: BoldTradeServices,
  },
  "fresh-local": {
    hero: FreshLocalHero,
    services: FreshLocalServices,
  },
  "clinical-calm": {
    hero: ClinicalCalmHero,
    services: ClinicalCalmServices,
  },
  "warm-table": {
    hero: WarmTableHero,
    services: WarmTableServices,
  },
  "modern-pro": {
    hero: ModernProHero,
    services: ModernProServices,
  },
};
const CHROME_OVERRIDES: Partial<Record<TemplateKey, Partial<Chrome>>> = {
  // The glass scroll-Nav is token-driven, so it re-skins per template for free.
  "fluid-glass": { Nav: FluidGlassNav },
  "bold-trade": { Nav: FluidGlassNav },
  "fresh-local": { Nav: FluidGlassNav },
  "clinical-calm": { Nav: FluidGlassNav },
  "warm-table": { Nav: FluidGlassNav },
  "modern-pro": { Nav: FluidGlassNav },
};

export function getSectionComponent(
  template: TemplateKey,
  type: string
): ComponentType<SectionProps> | null {
  const overrides = SECTION_OVERRIDES[template] ?? {};
  return overrides[type] ?? BASE_SECTIONS[type] ?? BLOCKS[type] ?? null;
}

export function getChrome(template: TemplateKey): Chrome {
  const o = CHROME_OVERRIDES[template] ?? {};
  return { Nav: o.Nav ?? BASE_CHROME.Nav, Footer: o.Footer ?? BASE_CHROME.Footer };
}

// ── Default page layouts (section order + background tones) ──
export type LayoutItem = {
  type: string;
  visible: boolean;
  tone?: string;
  data?: Record<string, unknown>;
};

export const BASE_LAYOUT: LayoutItem[] = [
  { type: "hero", visible: true },
  { type: "trustbar", visible: true },
  { type: "services", visible: true },
  { type: "process", visible: true, tone: "muted" },
  { type: "reviews", visible: true, tone: "contrast" },
  { type: "about", visible: true },
  { type: "serviceArea", visible: true, tone: "tint" },
  { type: "faq", visible: true },
  { type: "contact", visible: true },
];

const LAYOUT_OVERRIDES: Partial<Record<TemplateKey, LayoutItem[]>> = {
  // Editorial-luxury flow: lead with work, weave proof through the page.
  "fluid-glass": [
    { type: "hero", visible: true },
    { type: "trustbar", visible: true },
    { type: "services", visible: true },
    { type: "portfolio", visible: true, tone: "muted" },
    { type: "process", visible: true },
    { type: "beforeAfter", visible: true, tone: "tint" },
    { type: "reviews", visible: true, tone: "contrast" },
    { type: "about", visible: true },
    { type: "serviceArea", visible: true },
    { type: "faq", visible: true },
    { type: "cta", visible: true },
    { type: "contact", visible: true },
  ],
  // Trades flow: prove fast (trust + work), then process + before/after proof.
  "bold-trade": [
    { type: "hero", visible: true },
    { type: "trustbar", visible: true },
    { type: "services", visible: true },
    { type: "process", visible: true, tone: "muted" },
    { type: "beforeAfter", visible: true },
    { type: "portfolio", visible: true, tone: "muted" },
    { type: "reviews", visible: true, tone: "contrast" },
    { type: "serviceArea", visible: true },
    { type: "faq", visible: true },
    { type: "cta", visible: true },
    { type: "contact", visible: true },
  ],
  // Friendly services: gallery + before/after of work shine here.
  "fresh-local": [
    { type: "hero", visible: true },
    { type: "trustbar", visible: true },
    { type: "services", visible: true },
    { type: "portfolio", visible: true, tone: "muted" },
    { type: "beforeAfter", visible: true },
    { type: "process", visible: true },
    { type: "reviews", visible: true, tone: "tint" },
    { type: "about", visible: true },
    { type: "serviceArea", visible: true },
    { type: "faq", visible: true },
    { type: "cta", visible: true },
    { type: "contact", visible: true },
  ],
  // Healthcare: no "projects" — lead with trust, process, and reviews.
  "clinical-calm": [
    { type: "hero", visible: true },
    { type: "trustbar", visible: true },
    { type: "services", visible: true },
    { type: "process", visible: true, tone: "muted" },
    { type: "reviews", visible: true, tone: "tint" },
    { type: "about", visible: true },
    { type: "serviceArea", visible: true },
    { type: "faq", visible: true },
    { type: "cta", visible: true },
    { type: "contact", visible: true },
  ],
  // Hospitality: menu + ambiance gallery, then reviews and story.
  "warm-table": [
    { type: "hero", visible: true },
    { type: "services", visible: true },
    { type: "portfolio", visible: true, tone: "muted" },
    { type: "reviews", visible: true, tone: "contrast" },
    { type: "about", visible: true },
    { type: "serviceArea", visible: true, tone: "tint" },
    { type: "faq", visible: true },
    { type: "cta", visible: true },
    { type: "contact", visible: true },
  ],
  // Professional services: credibility, process, proof — no project gallery.
  "modern-pro": [
    { type: "hero", visible: true },
    { type: "trustbar", visible: true },
    { type: "services", visible: true },
    { type: "process", visible: true, tone: "muted" },
    { type: "reviews", visible: true, tone: "contrast" },
    { type: "about", visible: true },
    { type: "serviceArea", visible: true },
    { type: "faq", visible: true },
    { type: "cta", visible: true },
    { type: "contact", visible: true },
  ],
};

export function defaultLayoutFor(template: TemplateKey): LayoutItem[] {
  return LAYOUT_OVERRIDES[template] ?? BASE_LAYOUT;
}
