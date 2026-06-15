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
    <Section id="services" eyebrow="Services" index="✦" title="How we care for you" align="center">
      <motion.div {...staggerParent()} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.article
            key={s.slug}
            variants={staggerChild}
            className="glass lift u-radius-lg p-7"
          >
            <h3 className="text-display text-lg">{s.title}</h3>
            <p className="text-dim mt-2.5 text-sm leading-relaxed" {...ed(`services.${i}.blurb`)}>
              {s.blurb}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
