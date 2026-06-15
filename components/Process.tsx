"use client";

import Reveal from "./Reveal";
import { useContent, useEditable } from "@/components/ContentProvider";

export default function Process() {
  const { process } = useContent();
  const ed = useEditable();

  return (
    <section id="process" className="scroll-mt-24 border-t hairline py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <Reveal>
          <p className="text-eyebrow mb-6">02 — How it works</p>
          <h2 className="text-display max-w-2xl text-4xl md:text-6xl">
            Simple, honest, no surprises.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 border-t hairline pt-12 md:grid-cols-4 md:gap-8">
          {process.map((step, i) => (
            <Reveal key={step.n} delay={Math.min(i * 0.08, 0.3)}>
              <div>
                <span className="text-display text-accent text-5xl">
                  {step.n}
                </span>
                <h3 className="mt-5 text-lg font-medium" {...ed(`process.${i}.title`)}>
                  {step.title}
                </h3>
                <p
                  className="text-dim mt-3 text-sm leading-relaxed"
                  {...ed(`process.${i}.body`)}
                >
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
