"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useContent, useEditable } from "@/components/ContentProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Render the tagline, turning *asterisk-wrapped* words into italic accents. */
function renderTagline(tagline: string) {
  return tagline
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={i} className="text-accent not-italic">
            {part.slice(1, -1)}
          </em>
        );
      }
      return <Fragment key={i}>{part}</Fragment>;
    });
}

export default function Hero() {
  const { business, contact, reviews, services } = useContent();
  const ed = useEditable();

  return (
    <section
      id="top"
      className="relative mx-auto max-w-shell px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(55% 75% at 82% 8%, var(--accent-soft), transparent 70%)" }}
      />
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <motion.p
            className="text-eyebrow mb-8 flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="text-accent">★</span>
            <span>
              Rated {reviews.rating} on {reviews.source} · {reviews.count}+
              reviews
            </span>
          </motion.p>

          <h1 className="text-display text-[clamp(3rem,9vw,7rem)]">
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.1 }}
              >
                {renderTagline(business.tagline)}
              </motion.span>
            </span>
          </h1>

          <Reveal delay={0.45} className="mt-8 max-w-xl">
            <p
              className="text-dim text-base leading-relaxed md:text-lg"
              {...ed("business.description")}
            >
              {business.description}
            </p>
          </Reveal>

          <Reveal delay={0.55} className="mt-10 flex flex-wrap items-center gap-4">
            <a href={`tel:${contact.phoneTel}`} className="btn-primary">
              Call {contact.phone}
            </a>
            <a href="#contact" className="btn-ghost">
              Request an estimate
            </a>
          </Reveal>

          <Reveal delay={0.65}>
            <p className="text-eyebrow mt-10" {...ed("business.license")}>
              {business.license}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="hidden lg:block">
          <HeroPlate year={business.foundedYear} rating={reviews.rating} />
        </Reveal>
      </div>

      {services.length > 0 && (
        <div className="relative mt-16 overflow-hidden border-y hairline py-4 md:mt-24">
          <div className="marquee-track">
            {[...services, ...services].map((s, i) => (
              <span
                key={i}
                className="text-display text-dim mx-8 inline-flex items-center gap-5 text-2xl md:text-3xl"
              >
                {s.title}
                <span className="text-accent text-sm">✦</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function HeroPlate({ year, rating }: { year: number; rating: number }) {
  return (
    <svg
      viewBox="0 0 480 600"
      className="h-auto w-full"
      role="img"
      aria-label="Editorial graphic"
    >
      <defs>
        <clipPath id="hero-frame">
          <rect x="1" y="1" width="478" height="598" rx="14" />
        </clipPath>
      </defs>

      <rect
        x="1"
        y="1"
        width="478"
        height="598"
        rx="14"
        fill="none"
        stroke="var(--hairline-strong)"
      />

      <g clipPath="url(#hero-frame)">
        {/* concentric ripples rising from the base */}
        <g fill="none" stroke="var(--fg)" strokeOpacity="0.12">
          <circle cx="240" cy="600" r="90" />
          <circle cx="240" cy="600" r="170" />
          <circle cx="240" cy="600" r="250" />
          <circle cx="240" cy="600" r="330" />
          <circle cx="240" cy="600" r="410" />
        </g>

        {/* plumb line + accent bob */}
        <line
          x1="240"
          y1="70"
          x2="240"
          y2="430"
          stroke="var(--fg)"
          strokeOpacity="0.45"
        />
        <circle cx="240" cy="430" r="8" fill="var(--accent)" />
        <path
          d="M232 430 L240 470 L248 430 Z"
          fill="var(--accent)"
          opacity="0.9"
        />
      </g>

      <text
        x="32"
        y="48"
        fill="var(--fg-dim)"
        fontFamily="var(--font-mono), monospace"
        fontSize="12"
        letterSpacing="3"
      >
        EST. {year}
      </text>
      <text
        x="448"
        y="48"
        textAnchor="end"
        fill="var(--accent)"
        fontFamily="var(--font-mono), monospace"
        fontSize="12"
        letterSpacing="3"
      >
        ★ {rating}
      </text>
      <text
        x="32"
        y="568"
        fill="var(--fg-dim)"
        fontFamily="var(--font-mono), monospace"
        fontSize="11"
        letterSpacing="3"
      >
        LICENSED · INSURED
      </text>
    </svg>
  );
}
