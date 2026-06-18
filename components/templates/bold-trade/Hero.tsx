"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { fadeUp, maskReveal } from "@/lib/motion";
import { useContent, useEditable } from "@/components/ContentProvider";

/** Accent word(s) wrapped in *asterisks* render in the brand color. */
function renderTagline(tagline: string) {
  return tagline
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("*") && part.endsWith("*") ? (
        <span key={i} className="text-accent">
          {part.slice(1, -1)}
        </span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      )
    );
}

export default function Hero() {
  const { business, contact, reviews, serviceArea } = useContent();
  const ed = useEditable();

  const stats = [
    { k: `★ ${reviews.rating}`, v: `${reviews.count}+ ${reviews.source} reviews` },
    { k: `Since ${business.foundedYear}`, v: "Family-run & local" },
    { k: `${serviceArea.length}+`, v: "Areas served" },
  ];

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[80%] w-[60%]"
        style={{
          background:
            "radial-gradient(60% 70% at 85% 8%, var(--accent-soft), transparent 70%)",
        }}
      />
      <div className="u-container">
        <motion.p {...fadeUp(0)} className="text-eyebrow mb-7 text-accent">
          Licensed · Insured · 24/7 Emergency Service
        </motion.p>

        <h1 className="text-display uppercase text-[clamp(2.5rem,8vw,6.25rem)]">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              variants={maskReveal(0.1)}
              initial="hidden"
              animate="show"
              className="block"
            >
              {renderTagline(business.tagline)}
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div {...fadeUp(0.3)} className="max-w-xl">
            <p
              className="text-dim text-base leading-relaxed md:text-lg"
              {...ed("business.description")}
            >
              {business.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={`tel:${contact.phoneTel}`} className="btn-primary">
                Call {contact.phone}
              </a>
              <a href="#contact" className="btn-ghost">
                Get a free quote
              </a>
            </div>
          </motion.div>

          <motion.dl
  {...fadeUp(0.45)}
  className="grid grid-cols-1 divide-y hairline-strong border hairline-strong u-radius overflow-hidden sm:grid-cols-3 sm:divide-y-0 sm:divide-x"
>
  {stats.map((s, i) => (
    <div key={i} className="min-w-0 px-5 py-4">
      <dt className="text-display text-2xl leading-none">{s.k}</dt>
      <dd className="text-eyebrow mt-2">{s.v}</dd>
    </div>
  ))}
</motion.dl>
        </div>
      </div>
    </section>
  );
}
