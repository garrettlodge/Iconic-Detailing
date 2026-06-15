"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { fadeUp, maskReveal } from "@/lib/motion";
import { useContent, useEditable } from "@/components/ContentProvider";
import Glass from "@/components/ui/Glass";

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

const POINTS = ["New patients welcome", "Most insurance accepted", "Same-week appointments"];

export default function Hero() {
  const { business, contact, reviews } = useContent();
  const ed = useEditable();

  return (
    <section id="top" className="u-container relative pb-16 pt-32 md:pt-40">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <motion.p {...fadeUp(0)} className="text-eyebrow mb-6 text-accent">
            Gentle, modern care
          </motion.p>
          <h1 className="text-display text-[clamp(2.4rem,5.5vw,4.5rem)]">
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span variants={maskReveal(0.1)} initial="hidden" animate="show" className="block">
                {renderTagline(business.tagline)}
              </motion.span>
            </span>
          </h1>
          <motion.div {...fadeUp(0.3)} className="mt-6 max-w-xl">
            <p className="text-dim text-base leading-relaxed md:text-lg" {...ed("business.description")}>
              {business.description}
            </p>
          </motion.div>
          <motion.ul {...fadeUp(0.4)} className="mt-7 grid gap-2.5">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm">
                <Check /> {p}
              </li>
            ))}
          </motion.ul>
          <motion.div {...fadeUp(0.5)} className="mt-9 flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">Book an appointment</a>
            <a href={`tel:${contact.phoneTel}`} className="btn-ghost">Call {contact.phone}</a>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.25)} className="relative">
          <div
            className="grid aspect-[4/5] place-items-center overflow-hidden u-radius-lg"
            style={{ background: "color-mix(in srgb, var(--fg) 7%, var(--bg))" }}
          >
            <span className="text-eyebrow">Your photo here</span>
          </div>
          <Glass className="absolute -bottom-5 left-6 right-6 flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-display text-xl text-accent">★ {reviews.rating}</p>
              <p className="text-eyebrow mt-1">{reviews.count}+ patient reviews</p>
            </div>
            <a href={`tel:${contact.phoneTel}`} className="btn-primary">Call</a>
          </Glass>
        </motion.div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
