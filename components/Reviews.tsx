"use client";

import Reveal from "./Reveal";
import { useContent, useEditable } from "@/components/ContentProvider";

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span aria-label={`${rating} out of 5 stars`} className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className={i < full ? "text-accent" : "text-dim"}
          style={{ fontSize: "0.95rem" }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function Reviews() {
  const { reviews } = useContent();
  const ed = useEditable();

  return (
    <section id="reviews" className="scroll-mt-24 border-t hairline py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div>
              <p className="text-eyebrow mb-6">03 — Reviews</p>
              <h2 className="text-display max-w-xl text-4xl md:text-6xl">
                Trusted by your neighbors.
              </h2>
            </div>

            {/* Aggregate stat block */}
            <div className="flex items-center gap-4 md:flex-col md:items-end md:text-right">
              <span className="text-display text-7xl leading-none md:text-8xl">
                {reviews.rating}
              </span>
              <div className="flex flex-col gap-1 md:items-end">
                <Stars rating={reviews.rating} />
                <span className="text-dim text-sm">
                  {reviews.count} reviews on {reviews.source}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {reviews.items.map((r, i) => (
            <Reveal key={i} delay={Math.min(i * 0.06, 0.24)}>
              <figure className="lift relative h-full overflow-hidden rounded-lg border hairline p-8 md:p-10">
                <span
                  aria-hidden
                  className="text-display text-accent pointer-events-none absolute -right-1 top-2 text-[7rem] leading-none opacity-15"
                >
                  &rdquo;
                </span>
                <Stars rating={r.rating} />
                <blockquote
                  className="text-display relative mt-5 text-xl leading-snug md:text-2xl"
                  {...ed(`reviews.items.${i}.body`)}
                >
                  {r.body}
                </blockquote>
                <figcaption className="mt-7 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="bg-soft text-accent flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                    >
                      {(r.author || "").trim().charAt(0).toUpperCase() || "★"}
                    </span>
                    <span
                      className="font-medium"
                      {...ed(`reviews.items.${i}.author`)}
                    >
                      {r.author}
                    </span>
                  </span>
                  <span className="text-dim">{r.date}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12">
          <a
            href={reviews.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Read all {reviews.count}+ reviews on {reviews.source}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
