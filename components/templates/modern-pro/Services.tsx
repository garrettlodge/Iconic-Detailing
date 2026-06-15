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
    <Section id="services" eyebrow="What we do" index="01" title="Areas of service">
      <motion.div
        {...staggerParent()}
        className="grid gap-px overflow-hidden border hairline-strong u-radius sm:grid-cols-2 lg:grid-cols-3"
        style={{ background: "var(--hairline)" }}
      >
        {services.map((s, i) => (
          <motion.article
            key={s.slug}
            variants={staggerChild}
            className="group p-7"
            style={{ background: "var(--bg)" }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-display text-lg">{s.title}</h3>
              <span className="text-eyebrow text-accent">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <p className="text-dim mt-3 text-sm leading-relaxed" {...ed(`services.${i}.blurb`)}>
              {s.blurb}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
