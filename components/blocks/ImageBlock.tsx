"use client";

import Reveal from "../Reveal";
import { useEditable } from "../ContentProvider";

// A custom image block. The image URL is set in Mission Control's block
// editor; the caption is inline-editable in preview.
export default function ImageBlock({
  section,
  index = 0,
}: {
  section?: { data?: { image?: string; caption?: string } };
  index?: number;
}) {
  const ed = useEditable();
  const data = section?.data || {};

  return (
    <section className="border-t hairline py-16 md:py-24">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <Reveal>
          {data.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image}
              alt={data.caption || ""}
              className="w-full rounded-lg border hairline object-cover"
            />
          ) : (
            <div className="flex aspect-[16/9] w-full items-center justify-center rounded-lg border border-dashed hairline-strong">
              <span className="text-eyebrow">Add an image URL in the editor</span>
            </div>
          )}
          <p
            className="text-dim mt-4 text-center text-sm"
            {...ed(`sections.${index}.data.caption`)}
          >
            {data.caption || "Caption"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
