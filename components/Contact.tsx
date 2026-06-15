"use client";

import Reveal from "./Reveal";
import { useContent, useEditable } from "@/components/ContentProvider";

export default function Contact() {
  const { contact, business } = useContent();
  const { address } = contact;
  const ed = useEditable();

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t hairline py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, var(--accent-soft), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-shell px-6 md:px-10">
        <Reveal>
          <p className="text-eyebrow mb-6">07 — Get in touch</p>
          <h2 className="text-display text-[clamp(2.5rem,8vw,5rem)]">
            Get in touch.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-20">
          <Reveal delay={0.1}>
            <div className="space-y-8">
              <div>
                <p className="text-eyebrow mb-3">Call</p>
                <a
                  href={`tel:${contact.phoneTel}`}
                  className="link-line text-display text-4xl md:text-5xl"
                  {...ed("contact.phone")}
                >
                  {contact.phone}
                </a>
              </div>
              <div>
                <p className="text-eyebrow mb-3">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="link-line text-lg"
                  {...ed("contact.email")}
                >
                  {contact.email}
                </a>
              </div>
              <div>
                <p className="text-eyebrow mb-3">Visit</p>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line text-lg"
                >
                  {address.street}, {address.city}, {address.state}{" "}
                  {address.zip}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-lg border hairline p-8 md:p-10">
              <p className="text-eyebrow mb-6">Hours</p>
              <dl className="space-y-3">
                {contact.hours.map((h) => (
                  <div
                    key={h.days}
                    className="flex items-baseline justify-between gap-6 border-b hairline pb-3 last:border-b-0 last:pb-0"
                  >
                    <dt className="font-medium">{h.days}</dt>
                    <dd className="text-dim text-sm">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={`tel:${contact.phoneTel}`}
                className="btn-primary mt-8 w-full"
              >
                Call now
              </a>
              <p className="text-eyebrow mt-6 text-center">
                {business.license}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
