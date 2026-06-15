"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import Eyebrow from "./Eyebrow";

/**
 * Reusable section scaffold: container + optional animated header
 * (eyebrow / title / intro). Bespoke template sections compose this so spacing,
 * width, and reveal motion stay consistent everywhere.
 */
export default function Section({
  id,
  eyebrow,
  index,
  title,
  intro,
  align = "left",
  className = "",
  containerClassName = "",
  children,
}: {
  id?: string;
  eyebrow?: string;
  index?: string;
  title?: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  containerClassName?: string;
  children?: ReactNode;
}) {
  const hasHeader = eyebrow || title || intro;
  return (
    <section id={id} className={`u-section ${className}`}>
      <div className={`u-container ${containerClassName}`}>
        {hasHeader && (
          <motion.header
            {...fadeUp()}
            className={
              align === "center"
                ? "mx-auto mb-12 max-w-2xl text-center md:mb-16"
                : "mb-12 max-w-3xl md:mb-16"
            }
          >
            {eyebrow && (
              <Eyebrow index={index} className={align === "center" ? "justify-center" : ""}>
                {eyebrow}
              </Eyebrow>
            )}
            {title && (
              <h2 className="text-display mt-5 text-[clamp(2rem,4.5vw,3.4rem)]">{title}</h2>
            )}
            {intro && (
              <p className="text-dim mt-5 text-base leading-relaxed md:text-lg">{intro}</p>
            )}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  );
}
