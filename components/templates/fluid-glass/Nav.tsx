"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useContent } from "@/components/ContentProvider";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const { business, contact } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`transition-all duration-500 ${scrolled ? "glass" : ""}`}>
        <nav className="u-container flex items-center justify-between py-4">
          <a href="#top" className="text-display text-xl tracking-tight">
            {business.name}
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="link-line text-sm text-dim hover:text-fg">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href={`tel:${contact.phoneTel}`} className="btn-primary hidden md:inline-flex">
              Call {contact.phone}
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center md:hidden"
              aria-label="Open menu"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-strong fixed inset-0 z-50 flex flex-col md:hidden"
          >
            <div className="u-container flex items-center justify-between py-4">
              <span className="text-display text-xl">{business.name}</span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav className="u-container flex flex-1 flex-col justify-center gap-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.07 }}
                  className="text-display border-b hairline py-4 text-4xl"
                >
                  {l.label}
                </motion.a>
              ))}
              <a href={`tel:${contact.phoneTel}`} className="btn-primary mt-8">
                Call {contact.phone}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
