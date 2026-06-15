"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { staggerParent, staggerChild } from "@/lib/motion";
import { useContent, useEditable } from "@/components/ContentProvider";

export default function Services() {
  const { services } = useContent();
  const ed = useEditable();
  if (!services?.length) return null;

  return (
    <Section id="services" eyebrow="Services" index="01" title="What we do">
      <motion.div
        {...staggerParent()}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((s, i) => (
          <motion.article
            key={s.slug}
            variants={staggerChild}
            className="lift glass group u-radius p-7"
          >
            <p className="text-eyebrow">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="text-display mt-5 text-2xl">{s.title}</h3>
            <p
              className="text-dim mt-3 text-sm leading-relaxed"
              {...ed(`services.${i}.blurb`)}
            >
              {s.blurb}
            </p>
            <span className="text-accent mt-6 inline-flex translate-y-1 items-center gap-2 text-sm opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              Learn more
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
