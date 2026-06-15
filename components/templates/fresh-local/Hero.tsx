"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { fadeUp, maskReveal } from "@/lib/motion";
import { useContent, useEditable } from "@/components/ContentProvider";
import Stars from "@/components/ui/Stars";

function renderTagline(tagline: string) {
  return tagline
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("*") && part.endsWith("*") ? (
        <span key={i} className="text-accent">{part.slice(1, -1)}</span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      )
    );
}

export default function Hero() {
  const { business, contact, reviews } = useContent();
  const ed = useEditable();

  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-32 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(60% 50% at 50% 0%, var(--accent-soft), transparent 70%)" }}
      />
      <div className="u-container text-center">
        <motion.div
          {...fadeUp(0)}
          className="mb-6 inline-flex items-center gap-2 rounded-full border hairline-strong px-4 py-1.5"
        >
          <Stars rating={reviews.rating} className="text-accent text-xs" />
          <span className="text-sm text-dim">Loved by {reviews.count}+ local neighbors</span>
        </motion.div>

        <h1 className="text-display mx-auto max-w-[16ch] text-[clamp(2.4rem,6vw,5rem)]">
          <span className="block overflow-hidden pb-[0.12em]">
            <motion.span variants={maskReveal(0.1)} initial="hidden" animate="show" className="block">
              {renderTagline(business.tagline)}
            </motion.span>
          </span>
        </h1>

        <motion.div {...fadeUp(0.3)} className="mx-auto mt-6 max-w-2xl">
          <p className="text-dim text-base leading-relaxed md:text-lg" {...ed("business.description")}>
            {business.description}
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.4)} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href={`tel:${contact.phoneTel}`} className="btn-primary">Call {contact.phone}</a>
          <a href="#contact" className="btn-ghost">Get a free quote</a>
        </motion.div>

        <motion.div {...fadeUp(0.5)} className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex aspect-[3/4] items-center justify-center u-radius-lg"
              style={{ background: "color-mix(in srgb, var(--fg) 8%, var(--bg))" }}
            >
              <span className="text-eyebrow">Photo</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
