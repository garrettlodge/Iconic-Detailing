"use client";

import { useContent } from "@/components/ContentProvider";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "How it works" },
  { href: "#reviews", label: "Reviews" },
  { href: "#about", label: "About" },
  { href: "#areas", label: "Service Area" },
  { href: "#faq", label: "FAQ" },
];

const SOCIAL_LABELS: Record<string, string> = {
  google: "Google",
  facebook: "Facebook",
  instagram: "Instagram",
  yelp: "Yelp",
};

export default function Footer() {
  const { business, contact, social } = useContent();
  const { address } = contact;
  const year = new Date().getFullYear();

  const socials = Object.entries(social).filter(([, v]) => Boolean(v)) as [
    string,
    string,
  ][];

  return (
    <footer className="relative overflow-hidden border-t hairline pt-20">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="text-display text-2xl">{business.name}</p>
            <p className="text-dim mt-3 max-w-xs text-sm leading-relaxed">
              {business.tagline.replace(/\*/g, "")}
            </p>
          </div>

          <div>
            <p className="text-eyebrow mb-4">Contact</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`tel:${contact.phoneTel}`}
                  className="link-line"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="link-line">
                  {contact.email}
                </a>
              </li>
              <li className="text-dim">
                {address.street}
                <br />
                {address.city}, {address.state} {address.zip}
              </li>
            </ul>
          </div>

          <div>
            <p className="text-eyebrow mb-4">Explore</p>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-line">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {socials.length > 0 && (
            <div>
              <p className="text-eyebrow mb-4">Follow</p>
              <ul className="space-y-2 text-sm">
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-line"
                    >
                      {SOCIAL_LABELS[key] ?? key}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Colossal wordmark watermark — SVG scales to fit any name length */}
        <div className="pointer-events-none mt-16 select-none" aria-hidden>
          <svg viewBox="0 0 1000 150" className="block w-full" style={{ opacity: 0.06 }}>
            <text
              x="500"
              y="120"
              textAnchor="middle"
              textLength="980"
              lengthAdjust="spacingAndGlyphs"
              fontFamily="var(--font-sans), system-ui, sans-serif"
              fontWeight="600"
              fontSize="140"
              fill="var(--fg)"
            >
              {business.name}
            </text>
          </svg>
        </div>

        <div className="text-dim flex flex-col gap-2 border-t hairline py-8 text-xs md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {business.name}. All rights reserved.
          </span>
          <span>{business.license}</span>
        </div>
      </div>
    </footer>
  );
}
