"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useContent, useEditable } from "@/components/ContentProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FAQ() {
  const { faq } = useContent();
  const ed = useEditable();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 border-t hairline py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <p className="text-eyebrow mb-6">06 — Questions</p>
        <h2 className="text-display max-w-2xl text-4xl md:text-6xl">
          Frequently asked.
        </h2>

        <div className="mt-14 border-t hairline">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b hairline">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-5 py-6 text-left md:gap-8"
                >
                  <span className="text-eyebrow shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-display flex-1 text-xl md:text-2xl"
                    {...ed(`faq.${i}.q`)}
                  >
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className={`text-accent shrink-0 text-2xl leading-none transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p
                        className="text-dim max-w-2xl pb-7 pl-[3.25rem] leading-relaxed md:pl-16"
                        {...ed(`faq.${i}.a`)}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
