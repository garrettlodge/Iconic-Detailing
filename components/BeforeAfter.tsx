"use client";

import { useRef, useState } from "react";
import Section from "./ui/Section";
import { useContent } from "./ContentProvider";

/** Before/After section — one draggable reveal slider per item. */
export default function BeforeAfter() {
  const { beforeAfter } = useContent();
  if (!beforeAfter?.items?.length) return null;

  return (
    <Section
      id="before-after"
      eyebrow="Before / After"
      index="✦"
      title={beforeAfter.title ?? "See the difference"}
      intro={beforeAfter.intro}
    >
      <div className="grid gap-8 md:grid-cols-2">
        {beforeAfter.items.map((it, i) => (
          <Slider key={i} {...it} />
        ))}
      </div>
    </Section>
  );
}

function Slider({
  before,
  after,
  label,
  caption,
}: {
  before?: string | null;
  after?: string | null;
  label?: string;
  caption?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const set = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <figure>
      <div
        ref={ref}
        className="group relative aspect-[4/3] cursor-ew-resize select-none overflow-hidden u-radius"
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          set(e.clientX);
        }}
        onPointerMove={(e) => e.buttons === 1 && set(e.clientX)}
      >
        <Panel kind="after" src={after} />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Panel kind="before" src={before} />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/85" />
          <div className="glass absolute top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-fg">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
            </svg>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(+e.target.value)}
          aria-label={label ? `${label}: reveal before and after` : "Reveal before and after"}
          className="sr-only"
        />
      </div>
      {(label || caption) && (
        <figcaption className="text-dim mt-3 text-sm">{label ?? caption}</figcaption>
      )}
    </figure>
  );
}

function Panel({ kind, src }: { kind: "before" | "after"; src?: string | null }) {
  if (src)
    return (
      <img
        src={src}
        alt={kind}
        className="h-full w-full object-cover"
        draggable={false}
      />
    );
  const isAfter = kind === "after";
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        background: isAfter
          ? "color-mix(in srgb, var(--accent) 16%, var(--bg))"
          : "color-mix(in srgb, var(--fg) 8%, var(--bg))",
      }}
    >
      <span className="text-eyebrow">{kind}</span>
    </div>
  );
}
