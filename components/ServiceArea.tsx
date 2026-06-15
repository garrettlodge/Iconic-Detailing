"use client";

import { Fragment } from "react";
import Reveal from "./Reveal";
import { useContent } from "@/components/ContentProvider";

export default function ServiceArea() {
  const { serviceArea, contact } = useContent();

  return (
    <section id="areas" className="scroll-mt-24 border-t hairline py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <Reveal>
          <p className="text-eyebrow mb-6">05 — Service Area</p>
          <p className="text-dim mb-10 max-w-xl">
            Proudly serving {contact.address.city} and the surrounding
            communities. If you&rsquo;re nearby and don&rsquo;t see your town,
            give us a call &mdash; we likely cover it.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-display max-w-5xl text-3xl leading-snug md:text-5xl">
            {serviceArea.map((city, i) => (
              <Fragment key={city}>
                {i > 0 && <span className="text-accent px-3">·</span>}
                {city}
              </Fragment>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
