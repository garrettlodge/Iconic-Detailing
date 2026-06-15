"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { fadeUp, maskReveal } from "@/lib/motion";
import { useContent, useEditable } from "@/components/ContentProvider";

function renderTagline(tagline: string) {
  return tagline
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("*") && part.endsWith("*") ? (
        <span key={i} className="italic text-accent">{part.slice(1, -1)}</span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      )
    );
}

export default function Hero() {
  const { business, contact } = useContent();
  const ed = useEditable();

  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-32 md:pt-40">
      <div className="u-container text-center">
        <motion.p {...fadeUp(0)} className="text-eyebrow mb-6">
          Est. {business.foundedYear} · Neighborhood favorite
        </motion.p>
        <h1 className="text-display mx-auto max-w-[15ch] text-[clamp(2.6rem,7vw,5.5rem)]">
          <span className="block overflow-hidden pb-[0.14em]">
            <motion.span variants={maskReveal(0.1)} initial="hidden" animate="show" className="block">
              {renderTagline(business.tagline)}
            </motion.span>
          </span>
        </h1>
        <motion.div {...fadeUp(0.3)} className="mx-auto mt-6 max-w-xl">
          <p className="text-dim text-base leading-relaxed md:text-lg" {...ed("business.description")}>
            {business.description}
          </p>
        </motion.div>
        <motion.div {...fadeUp(0.4)} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="#services" className="btn-primary">View the menu</a>
          <a href={`tel:${contact.phoneTel}`} className="btn-ghost">Reserve · {contact.phone}</a>
        </motion.div>
      </div>

      <motion.div {...fadeUp(0.5)} className="u-container mt-14">
        <div
          className="grid aspect-[16/7] place-items-center overflow-hidden u-radius-lg"
          style={{ background: "color-mix(in srgb, var(--fg) 8%, var(--bg))" }}
        >
          <span className="text-eyebrow">Your photo here</span>
        </div>
      </motion.div>
    </section>
  );
}
