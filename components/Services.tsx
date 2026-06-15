"use client";

import Reveal from "./Reveal";
import { useContent, useEditable } from "@/components/ContentProvider";

export default function Services() {
  const { services } = useContent();
  const ed = useEditable();

  return (
    <section id="services" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <Reveal>
          <p className="text-eyebrow mb-6">01 — Services</p>
          <h2 className="text-display max-w-2xl text-4xl md:text-6xl">
            What we do, done right.
          </h2>
        </Reveal>

        <div className="mt-14 border-b hairline">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i * 0.05, 0.25)}>
              <a
                href="#contact"
                className="group block border-t hairline py-8 md:py-10"
              >
                <div className="flex items-start gap-5 md:gap-10">
                  <span className="text-eyebrow pt-3 md:pt-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-10">
                    <h3
                      className="text-display text-3xl leading-none transition-colors duration-300 group-hover:text-[color:var(--accent)] md:text-5xl"
                      {...ed(`services.${i}.title`)}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="text-dim max-w-md text-sm leading-relaxed md:text-right"
                      {...ed(`services.${i}.blurb`)}
                    >
                      {s.blurb}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="text-dim pt-2 text-2xl transition-all duration-300 group-hover:translate-x-1 group-hover:text-[color:var(--accent)]"
                  >
                    →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
