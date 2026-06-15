"use client";

import Reveal from "../Reveal";
import { useEditable } from "../ContentProvider";

// A custom text block the user adds via Mission Control. Content lives on the
// section itself (section.data); text is inline-editable in preview.
export default function TextBlock({
  section,
  index = 0,
}: {
  section?: { data?: { heading?: string; body?: string } };
  index?: number;
}) {
  const ed = useEditable();
  const data = section?.data || {};

  return (
    <section className="scroll-mt-24 border-t hairline py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <Reveal>
          <h2
            className="text-display max-w-3xl text-3xl md:text-5xl"
            {...ed(`sections.${index}.data.heading`)}
          >
            {data.heading || "Heading"}
          </h2>
          <p
            className="text-dim mt-6 max-w-2xl leading-relaxed md:text-lg"
            {...ed(`sections.${index}.data.body`)}
          >
            {data.body || "Add your text here. Click to edit."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
