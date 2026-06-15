import type { ReactNode } from "react";

/** Mono micro-label — the signature "01 / SERVICES" editorial cue. */
export default function Eyebrow({
  children,
  index,
  className = "",
}: {
  children: ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <p className={`text-eyebrow flex items-center gap-2.5 ${className}`}>
      {index && <span className="text-accent">{index}</span>}
      {index && (
        <span aria-hidden className="h-px w-6" style={{ background: "var(--hairline-strong)" }} />
      )}
      <span>{children}</span>
    </p>
  );
}
