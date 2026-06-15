"use client";

import Reveal from "../Reveal";

export default function GalleryBlock({
  section,
}: {
  section?: { data?: Record<string, unknown> };
  index?: number;
}) {
  const d = (section?.data || {}) as Record<string, string | undefined>;
  const imgs = [d.image1, d.image2, d.image3, d.image4].filter(Boolean) as string[];

  return (
    <section className="border-t hairline py-16 md:py-24">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <Reveal>
          {imgs.length ? (
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {imgs.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="aspect-[4/3] w-full rounded-lg border hairline object-cover"
                />
              ))}
            </div>
          ) : (
            <div className="flex aspect-[16/9] w-full items-center justify-center rounded-lg border border-dashed hairline-strong">
              <span className="text-eyebrow">Add images in the editor</span>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
