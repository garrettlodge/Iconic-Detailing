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
    <Section id="services" eyebrow="The menu" index="✦" title="What we offer" align="center">
      <motion.div {...staggerParent()} className="mx-auto max-w-3xl">
        {services.map((s, i) => (
          <motion.div
            key={s.slug}
            variants={staggerChild}
            className="flex items-baseline gap-5 border-b hairline py-5 last:border-0"
          >
            <span className="text-display text-lg text-accent">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex-1">
              <h3 className="text-display text-xl">{s.title}</h3>
              <p className="text-dim mt-1 text-sm leading-relaxed" {...ed(`services.${i}.blurb`)}>
                {s.blurb}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
