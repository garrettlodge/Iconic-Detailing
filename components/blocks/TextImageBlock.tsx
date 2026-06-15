"use client";

import Reveal from "../Reveal";
import { useEditable } from "../ContentProvider";

// A custom text-beside-image block. Text is inline-editable; image URL and
// side are set in Mission Control's block editor.
export default function TextImageBlock({
  section,
  index = 0,
}: {
  section?: {
    data?: {
      heading?: string;
      body?: string;
      image?: string;
      imagePosition?: string;
    };
  };
  index?: number;
}) {
  const ed = useEditable();
  const data = section?.data || {};
  const imageRight = data.imagePosition !== "left";

  const Text = (
    <Reveal>
      <h2 className="text-display text-3xl md:text-5xl" {...ed(`sections.${index}.data.heading`)}>
        {data.heading || "Heading"}
      </h2>
      <p
        className="text-dim mt-6 leading-relaxed"
        {...ed(`sections.${index}.data.body`)}
      >
        {data.body || "Add your text here. Click to edit."}
      </p>
    </Reveal>
  );

  const Img = (
    <Reveal>
      {data.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.image}
          alt={data.heading || ""}
          className="aspect-[4/3] w-full rounded-lg border hairline object-cover"
        />
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border border-dashed hairline-strong">
          <span className="text-eyebrow">Add an image URL</span>
        </div>
      )}
    </Reveal>
  );

  return (
    <section className="border-t hairline py-24 md:py-32">
      <div className="mx-auto grid max-w-shell items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-10">
        {imageRight ? (
          <>
            {Text}
            {Img}
          </>
        ) : (
          <>
            {Img}
            {Text}
          </>
        )}
      </div>
    </section>
  );
}
