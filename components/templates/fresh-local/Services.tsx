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
    <Section id="services" eyebrow="What we do" index="✦" title="How we can help" align="center">
      <motion.div {...staggerParent()} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.article
            key={s.slug}
            variants={staggerChild}
            className="lift u-radius-lg p-7"
            style={{ background: "color-mix(in srgb, var(--fg) 4%, var(--bg))" }}
          >
            <span
              className="grid h-11 w-11 place-items-center rounded-full text-sm font-semibold"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-display mt-5 text-xl">{s.title}</h3>
            <p className="text-dim mt-2.5 text-sm leading-relaxed" {...ed(`services.${i}.blurb`)}>
              {s.blurb}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
