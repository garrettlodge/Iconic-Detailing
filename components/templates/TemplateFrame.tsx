"use client";

import { useContent } from "../ContentProvider";
import { resolveTemplate } from "@/lib/templates";
import { getChrome } from "./registry";
import PageSections from "../PageSections";
import ConversionDock from "../ui/ConversionDock";

/**
 * The page shell. Picks the active template's Nav + Footer (falling back to
 * base), with the section list rendered between them. Kept as a thin client
 * component so app/page.tsx stays a server component for metadata/SEO.
 */
export default function TemplateFrame() {
  const content = useContent();
  const template = resolveTemplate(content.template);
  const { Nav, Footer } = getChrome(template);

  return (
    <>
      <Nav />
      <main>
        <PageSections />
      </main>
      <Footer />
      {/* Conversion chrome on premium templates; Studio stays exactly as-is. */}
      {template !== "studio" && <ConversionDock />}
    </>
  );
}
