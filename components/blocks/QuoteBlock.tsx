"use client";

import Reveal from "../Reveal";
import { useEditable } from "../ContentProvider";

export default function QuoteBlock({
  section,
  index = 0,
}: {
  section?: { data?: { quote?: string; attribution?: string } };
  index?: number;
}) {
  const ed = useEditable();
  const data = section?.data || {};

  return (
    <section className="border-t hairline py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <Reveal>
          <blockquote
            className="text-display text-3xl leading-snug md:text-4xl"
            {...ed(`sections.${index}.data.quote`)}
          >
            {data.quote || "Something great a customer said."}
          </blockquote>
          <p className="text-eyebrow mt-6" {...ed(`sections.${index}.data.attribution`)}>
            {data.attribution || "Happy customer"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
