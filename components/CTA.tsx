"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { useContent } from "./ContentProvider";

/** Closing call-to-action band — frosted glass panel with a soft accent glow. */
export default function CTA() {
  const { cta, contact } = useContent();
  const heading = cta?.heading ?? "Ready when you are.";

  return (
    <section className="u-section">
      <div className="u-container">
        <motion.div
          {...fadeUp()}
          className="glass relative overflow-hidden u-radius-lg px-6 py-16 text-center md:px-16 md:py-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 120% at 50% 0%, var(--accent-soft), transparent 70%)",
            }}
          />
          <h2 className="text-display mx-auto max-w-3xl text-[clamp(2rem,5vw,4rem)]">
            {heading}
          </h2>
          {cta?.body && (
            <p className="text-dim mx-auto mt-5 max-w-xl text-base leading-relaxed md:text-lg">
              {cta.body}
            </p>
          )}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href={`tel:${contact.phoneTel}`} className="btn-primary">
              {cta?.primary ?? `Call ${contact.phone}`}
            </a>
            <a href="#contact" className="btn-ghost">
              {cta?.secondary ?? "Request an estimate"}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
