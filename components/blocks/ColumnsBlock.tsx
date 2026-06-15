"use client";

import Reveal from "../Reveal";
import { useEditable } from "../ContentProvider";

export default function ColumnsBlock({
  section,
  index = 0,
}: {
  section?: { data?: Record<string, unknown> };
  index?: number;
}) {
  const ed = useEditable();
  const d = (section?.data || {}) as Record<string, string | undefined>;
  const cols = [
    { h: "col1Heading", b: "col1Body" },
    { h: "col2Heading", b: "col2Body" },
    { h: "col3Heading", b: "col3Body" },
  ];

  return (
    <section className="border-t hairline py-24 md:py-32">
      <div className="mx-auto grid max-w-shell gap-10 px-6 md:grid-cols-3 md:gap-12 md:px-10">
        {cols.map((c) => (
          <Reveal key={c.h}>
            <h3 className="text-display text-2xl md:text-3xl" {...ed(`sections.${index}.data.${c.h}`)}>
              {d[c.h] || "Heading"}
            </h3>
            <p className="text-dim mt-3 leading-relaxed" {...ed(`sections.${index}.data.${c.b}`)}>
              {d[c.b] || "Describe it here."}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
