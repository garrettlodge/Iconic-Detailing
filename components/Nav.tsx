"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useContent, useEditable } from "@/components/ContentProvider";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#reviews", label: "Reviews" },
  { href: "#about", label: "About" },
  { href: "#areas", label: "Service Area" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const { business, contact } = useContent();
  const ed = useEditable();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--bg) 82%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--hairline)" : "transparent"}`,
      }}
    >
      <nav className="mx-auto flex max-w-shell items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          className="text-display text-xl tracking-tight md:text-2xl"
          {...ed("business.name")}
        >
          {business.name}
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-line text-dim text-sm transition-colors hover:text-[color:var(--fg)]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={`tel:${contact.phoneTel}`}
            className="link-line text-sm font-medium"
          >
            {contact.phone}
          </a>
          <a href="#contact" className="btn-primary">
            Get a quote
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
            <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="13" x2="22" y2="13" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: "var(--bg)" }}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-display text-xl">{business.name}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-1 px-6 pt-8">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-display border-b hairline py-4 text-4xl"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 px-6 pb-10">
              <a
                href={`tel:${contact.phoneTel}`}
                onClick={() => setOpen(false)}
                className="btn-ghost w-full"
              >
                Call {contact.phone}
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                Get a quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
