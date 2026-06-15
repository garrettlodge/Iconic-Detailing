"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Section from "./ui/Section";
import { staggerParent, staggerChild } from "@/lib/motion";
import { useContent } from "./ContentProvider";

type Item = { src?: string | null; alt?: string; category?: string; caption?: string };

/** Filterable project grid with a lightbox. Renders nothing without items. */
export default function Portfolio() {
  const { portfolio } = useContent();
  const items: Item[] = portfolio?.items ?? [];
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<number | null>(null);

  const cats = useMemo(
    () => [
      "All",
      ...Array.from(new Set(items.map((i) => i.category).filter(Boolean) as string[])),
    ],
    [items]
  );

  if (!items.length) return null;

  const shown = items
    .map((it, i) => ({ ...it, i }))
    .filter((it) => filter === "All" || it.category === filter);

  return (
    <Section
      id="portfolio"
      eyebrow="Our work"
      index="✦"
      title={portfolio?.title ?? "Recent projects"}
      intro={portfolio?.intro}
    >
      {cats.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                filter === c
                  ? "border-transparent bg-[var(--fg)] text-[var(--bg)]"
                  : "hairline-strong text-dim hover:text-fg"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <motion.div
        {...staggerParent()}
        className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5"
      >
        {shown.map((it) => (
          <motion.button
            key={it.i}
            variants={staggerChild}
            onClick={() => setActive(it.i)}
            className="lift group relative aspect-[4/5] overflow-hidden u-radius text-left"
          >
            <Tile {...it} />
          </motion.button>
        ))}
      </motion.div>

      {active !== null && (
        <Lightbox item={items[active]} onClose={() => setActive(null)} />
      )}
    </Section>
  );
}

function Tile({ src, caption, large }: Item & { large?: boolean }) {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt={caption ?? "Project"}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ background: "color-mix(in srgb, var(--fg) 8%, var(--bg))" }}
        >
          <span className="text-eyebrow">{large ? "Project photo" : "Photo"}</span>
        </div>
      )}
      {caption && !large && (
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-3 text-sm text-white opacity-0 transition duration-300 group-hover:opacity-100">
          {caption}
        </span>
      )}
    </>
  );
}

function Lightbox({ item, onClose }: { item: Item; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong relative w-full max-w-3xl overflow-hidden u-radius-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-[4/3] w-full">
          <Tile {...item} large />
        </div>
        {item.caption && <p className="text-dim p-4 text-sm">{item.caption}</p>}
        <button
          onClick={onClose}
          className="glass absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full"
          aria-label="Close"
        >
          ✕
        </button>
      </motion.div>
    </div>
  );
}
