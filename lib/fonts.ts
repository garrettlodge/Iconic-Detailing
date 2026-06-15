import {
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Fraunces,
  Archivo,
  Poppins,
  Plus_Jakarta_Sans,
  Outfit,
  Playfair_Display,
  Karla,
  Space_Grotesk,
} from "next/font/google";
import type { TemplateKey } from "@/site.config";
import { DEFAULT_TEMPLATE } from "@/lib/templates";

/**
 * ═══════════════════════════════════════════════════════════════════════
 *  PER-TEMPLATE FONTS
 * ═══════════════════════════════════════════════════════════════════════
 *  Every family is declared here, but a built site only DOWNLOADS the three
 *  fonts its active template uses (next/font self-hosts + tree-shakes by
 *  usage — unused @font-face never gets fetched). layout.tsx applies the
 *  active template's font classes to <html> and maps the generic
 *  --font-display / --font-sans / --font-mono tokens onto the chosen families,
 *  so components keep using one stable token contract across all templates.
 */

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const karla = Karla({ subsets: ["latin"], variable: "--font-karla", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

type Family = { cls: string; varName: string };
const F: Record<string, Family> = {
  instrument: { cls: instrument.variable, varName: "--font-instrument" },
  inter: { cls: inter.variable, varName: "--font-inter" },
  jetbrains: { cls: jetbrains.variable, varName: "--font-jetbrains" },
  fraunces: { cls: fraunces.variable, varName: "--font-fraunces" },
  archivo: { cls: archivo.variable, varName: "--font-archivo" },
  poppins: { cls: poppins.variable, varName: "--font-poppins" },
  jakarta: { cls: jakarta.variable, varName: "--font-jakarta" },
  outfit: { cls: outfit.variable, varName: "--font-outfit" },
  playfair: { cls: playfair.variable, varName: "--font-playfair" },
  karla: { cls: karla.variable, varName: "--font-karla" },
  space: { cls: space.variable, varName: "--font-space" },
};

type Trio = { display: keyof typeof F; sans: keyof typeof F; mono: keyof typeof F };
const TEMPLATE_FONTS: Record<TemplateKey, Trio> = {
  studio: { display: "instrument", sans: "inter", mono: "jetbrains" },
  "fluid-glass": { display: "fraunces", sans: "inter", mono: "jetbrains" },
  "bold-trade": { display: "archivo", sans: "inter", mono: "jetbrains" },
  "fresh-local": { display: "poppins", sans: "jakarta", mono: "jetbrains" },
  "clinical-calm": { display: "outfit", sans: "inter", mono: "jetbrains" },
  "warm-table": { display: "playfair", sans: "karla", mono: "jetbrains" },
  "modern-pro": { display: "space", sans: "inter", mono: "jetbrains" },
};

/** Space-joined next/font className list to apply to <html> for a template. */
export function getTemplateFontClass(key: TemplateKey): string {
  const t = TEMPLATE_FONTS[key] ?? TEMPLATE_FONTS[DEFAULT_TEMPLATE];
  return [F[t.display].cls, F[t.sans].cls, F[t.mono].cls].join(" ");
}

/** Inline CSS-var map wiring the generic tokens to the template's families. */
export function getTemplateFontVars(key: TemplateKey): Record<string, string> {
  const t = TEMPLATE_FONTS[key] ?? TEMPLATE_FONTS[DEFAULT_TEMPLATE];
  return {
    "--font-display": `var(${F[t.display].varName})`,
    "--font-sans": `var(${F[t.sans].varName})`,
    "--font-mono": `var(${F[t.mono].varName})`,
  };
}
