"use client";

import { useEditable } from "../ContentProvider";

function embedUrl(url?: string): string | null {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return /^https?:\/\//.test(url) ? url : null;
}

export default function VideoBlock({
  section,
  index = 0,
}: {
  section?: { data?: { url?: string; caption?: string } };
  index?: number;
}) {
  const ed = useEditable();
  const data = section?.data || {};
  const src = embedUrl(data.url);

  return (
    <section className="border-t hairline py-16 md:py-24">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        {src ? (
          <div className="aspect-video w-full overflow-hidden rounded-lg border hairline">
            <iframe
              src={src}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video"
            />
          </div>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed hairline-strong">
            <span className="text-eyebrow">Add a YouTube or Vimeo link in the editor</span>
          </div>
        )}
        <p className="text-dim mt-4 text-center text-sm" {...ed(`sections.${index}.data.caption`)}>
          {data.caption || "Caption"}
        </p>
      </div>
    </section>
  );
}
