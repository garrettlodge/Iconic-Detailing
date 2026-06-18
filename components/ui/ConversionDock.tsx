"use client";

import { useContent } from "../ContentProvider";

/**
 * Always-visible conversion chrome:
 *   • mobile  → frosted sticky bottom bar (Call + Get a quote)
 *   • desktop → floating call pill bottom-right
 * Reads the phone straight from content, so it works on every template/client.
 */
export default function ConversionDock() {
  const { contact } = useContent();
  if (!contact?.phoneTel) return null;

  return (
    <>
      {/* spacer so the fixed bar never covers the footer's last line on mobile */}
      <div aria-hidden className="h-[76px] md:hidden" />

      {/* mobile sticky bar */}
      <div
        className="glass fixed inset-x-0 bottom-0 z-40 border-t md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)", borderRadius: 0 }}
      >
        <div className="mx-auto flex max-w-shell items-stretch gap-2 p-2.5">
          <a
            href={`tel:${contact.phoneTel}`}
            className="btn-primary min-w-0 flex-1 justify-center"
          >
            Call now
          </a>
          <a
            href="#contact"
            className="btn-ghost min-w-0 flex-1 justify-center"
          >
            Get a quote
          </a>
        </div>
      </div>

      {/* desktop floating call — wrapped so visibility lives on the parent,
          immune to btn-primary's display cascade */}
      <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden md:block">
        <a
          href={`tel:${contact.phoneTel}`}
          className="btn-primary pointer-events-auto inline-flex"
          style={{ boxShadow: "0 16px 40px -12px var(--accent)" }}
          aria-label={`Call ${contact.phone}`}
        >
          <PhoneIcon /> {contact.phone}
        </a>
      </div>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
