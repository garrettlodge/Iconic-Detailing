"use client";

import Reveal from "./Reveal";
import { useContent, useEditable } from "@/components/ContentProvider";

export default function About() {
  const { about, business } = useContent();
  const ed = useEditable();
  const initials = about.owner
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <section id="about" className="scroll-mt-24 border-t hairline py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <Reveal>
          <p className="text-eyebrow mb-10">04 — About</p>
        </Reveal>

        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            {about.photo ? (
              <img
                src={about.photo}
                alt={`${about.owner}, ${about.ownerRole} at ${business.name}`}
                className="aspect-[4/5] w-full rounded-lg border hairline object-cover"
              />
            ) : (
              <AboutPlate initials={initials} role={about.ownerRole} />
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-display text-4xl md:text-5xl">
              Meet {about.owner}.
            </h2>
            <div className="mt-6 space-y-4">
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-dim leading-relaxed"
                  {...ed(`about.paragraphs.${i}`)}
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 border-t hairline pt-6">
              <p className="font-medium" {...ed("about.owner")}>{about.owner}</p>
              <p className="text-dim text-sm" {...ed("about.ownerRole")}>
                {about.ownerRole}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AboutPlate({ initials, role }: { initials: string; role: string }) {
  return (
    <svg
      viewBox="0 0 480 560"
      className="h-auto w-full"
      role="img"
      aria-label="Portrait placeholder"
    >
      <rect
        x="1"
        y="1"
        width="478"
        height="558"
        rx="14"
        fill="none"
        stroke="var(--hairline-strong)"
      />
      <circle
        cx="240"
        cy="232"
        r="118"
        fill="none"
        stroke="var(--fg)"
        strokeOpacity="0.12"
      />
      <text
        x="240"
        y="232"
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--fg)"
        fontFamily="var(--font-display), Georgia, serif"
        fontSize="120"
      >
        {initials}
      </text>
      <line
        x1="200"
        y1="392"
        x2="280"
        y2="392"
        stroke="var(--accent)"
        strokeWidth="2"
      />
      <text
        x="240"
        y="436"
        textAnchor="middle"
        fill="var(--fg-dim)"
        fontFamily="var(--font-mono), monospace"
        fontSize="12"
        letterSpacing="3"
      >
        {role.toUpperCase()}
      </text>
    </svg>
  );
}
