"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { fadeUp, maskReveal } from "@/lib/motion";
import { useContent, useEditable } from "@/components/ContentProvider";
import Glass from "@/components/ui/Glass";
import Stars from "@/components/ui/Stars";
import Parallax from "@/components/ui/Parallax";

/** Turn *asterisk-wrapped* words into an italic serif accent. */
function renderTagline(tagline: string) {
  return tagline
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("*") && part.endsWith("*") ? (
        <em key={i} className="italic text-accent">
          {part.slice(1, -1)}
        </em>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      )
    );
}

export default function Hero() {
  const { business, contact, reviews } = useContent();
  const ed = useEditable();

  return (
    <section id="top" className="u-container relative pb-16 pt-28 md:pb-24 md:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(48% 60% at 85% 4%, var(--accent-soft), transparent 70%)",
        }}
      />
      <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <motion.div
            {...fadeUp(0)}
            className="text-eyebrow mb-7 inline-flex items-center gap-2.5"
          >
            <Stars rating={reviews.rating} className="text-accent text-[0.8rem]" />
            <span>
              {reviews.rating} on {reviews.source} · {reviews.count}+ reviews
            </span>
          </motion.div>

          <h1 className="text-display text-[clamp(2.3rem,4.8vw,4rem)]">
            <span className="block overflow-hidden pb-[0.14em]">
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

          <motion.div {...fadeUp(0.3)} className="mt-7 max-w-xl">
            <p
              className="text-dim text-base leading-relaxed md:text-lg"
              {...ed("business.description")}
            >
              {business.description}
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="mt-9 flex flex-wrap items-center gap-4">
            <a href={`tel:${contact.phoneTel}`} className="btn-primary">
              Call {contact.phone}
            </a>
            <a href="#contact" className="btn-ghost">
              Request an estimate
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="mt-9">
            <p className="text-eyebrow" {...ed("business.license")}>
              {business.license}
            </p>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.25)} className="relative hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden u-radius-lg">
            <Parallax speed={0.1} className="-mt-[8%] h-[116%]">
              <div
                className="flex h-full w-full items-center justify-center"
                style={{ background: "color-mix(in srgb, var(--fg) 8%, var(--bg))" }}
              >
                <span className="text-eyebrow">Your photo here</span>
              </div>
            </Parallax>
          </div>

          <Glass className="absolute -left-6 top-10 px-5 py-4">
            <p className="text-display text-2xl">Since {business.foundedYear}</p>
            <p className="text-eyebrow mt-1">Family-run &amp; local</p>
          </Glass>
          <Glass className="absolute -left-4 bottom-12 px-5 py-4">
            <p className="text-display text-2xl text-accent">★ {reviews.rating}</p>
            <p className="text-eyebrow mt-1">{reviews.count}+ reviews</p>
          </Glass>
        </motion.div>
      </div>
    </section>
  );
}
