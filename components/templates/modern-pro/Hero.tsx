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
        <span key={i} className="text-accent">{part.slice(1, -1)}</span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      )
    );
}

export default function Hero() {
  const { business, contact, reviews, serviceArea, services } = useContent();
  const ed = useEditable();

  const facts = [
    { k: `${reviews.rating}/5`, v: `${reviews.count}+ ${reviews.source} reviews` },
    { k: `Since ${business.foundedYear}`, v: "Trusted locally" },
    { k: `${services.length}`, v: "Service areas" },
    { k: `${serviceArea.length}+`, v: "Communities served" },
  ];

  return (
    <section id="top" className="u-container relative pb-16 pt-32 md:pt-40">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <motion.p {...fadeUp(0)} className="text-eyebrow mb-6 text-accent">
            Trusted local professionals
          </motion.p>
          <h1 className="text-display text-[clamp(2.4rem,5.5vw,4.5rem)]">
            <span className="block overflow-hidden pb-[0.08em]">
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
          <motion.div {...fadeUp(0.4)} className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">Request a consultation</a>
            <a href={`tel:${contact.phoneTel}`} className="btn-ghost">Call {contact.phone}</a>
          </motion.div>
        </div>

        <motion.dl
          {...fadeUp(0.3)}
          className="grid grid-cols-2 gap-px overflow-hidden border hairline-strong u-radius"
          style={{ background: "var(--hairline-strong)" }}
        >
          {facts.map((f, i) => (
            <div key={i} className="p-6" style={{ background: "var(--bg)" }}>
              <dt className="text-display text-3xl leading-none">{f.k}</dt>
              <dd className="text-eyebrow mt-2.5">{f.v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
