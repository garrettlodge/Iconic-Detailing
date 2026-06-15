# Local Business Website Factory

A **config-driven website factory** for local service businesses — plumbers, electricians, HVAC, roofers, contractors, dentists, attorneys, restaurants, salons, and any service business that lives or dies on Google reviews and a ringing phone.

**One engine, seven design skins.** Every site is driven by a single file — [`site.content.json`](site.content.json). Flip one key (`template`) and the *same* business renders in a completely different premium look. Spinning up a new client is editing one file (or pasting their Google info and running one command).

The aesthetic is reverse-engineered from editorial-luxury sites (think [fluid.glass](https://fluid.glass)): oversized type, generous whitespace, tasteful **CSS frosted glass**, slow scroll reveals, hairline grids — done with pure CSS (no WebGL) so it loads instantly and ranks well.

---

## The template library

Same content, seven looks. Set `"template"` in `site.content.json`:

| `template` | Vibe | Best-fit industries |
|---|---|---|
| `studio` | Clean editorial sans (the original) | Any trade — the all-rounder & default |
| `fluid-glass` ⭐ | Editorial luxury · frosted glass · Fraunces serif | Real estate, attorneys, dentists, med-spas, architects |
| `bold-trade` | Dark industrial · heavy Archivo · squared | Plumbers, electricians, HVAC, roofers, contractors |
| `fresh-local` | Bright, friendly, rounded | Landscapers, painters, cleaners, detailers, handymen |
| `clinical-calm` | Airy, soft blue-white, reassuring | Dentists, chiropractors, PT, optometry, wellness |
| `warm-table` | Rich, elegant serif, sensory | Restaurants, cafés, caterers, salons, barbers |
| `modern-pro` | Sharp, corporate-clean, navy | Attorneys, accountants, insurance, B2B, agencies |

> Don't know which fits? The Google importer auto-recommends one from the business category. You can always preview others by changing the one key.

---

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for layout, **CSS variables** for theming (one accent + per-template token themes)
- **Framer Motion** reveals/variants ([`lib/motion.ts`](lib/motion.ts)) · **Lenis** smooth scroll ([`components/SmoothScroll.tsx`](components/SmoothScroll.tsx)) · **GSAP** available for scroll-driven moments
- **next/font** — loads only the *active* template's fonts (no perf tax)
- **schema.org JSON-LD** generated from config ([`lib/schema.ts`](lib/schema.ts)) + `sitemap.ts` + `robots.ts`
- Deploys to **Netlify** via `@netlify/plugin-nextjs` (never set `output: "standalone"`)

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3210 (or 3000)
```

| Script | Does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` — run before every deploy |
| `npm run import:google` | Build `site.content.json` from pasted Google info |

---

## New client in under 30 minutes

### Option A — paste from Google (fastest)

1. **Use this template** on GitHub → create the client's repo, clone it.
2. `cp google-input.example.json google-input.json`
3. Open the client's **Google Business Profile** and paste the public info into `google-input.json` (name, category, phone, address, hours, rating, review count, a few reviews, photos). Blank fields fall back to industry-aware starter copy.
4. `npm run import:google` → writes `site.content.json`, auto-detects the industry, and picks a recommended `template`.
5. `npm run dev`, review, tweak copy. Change `"template"` to try any of the 7 looks.
6. Drop real photos in [`/public`](public); add `public/og.jpg` (1200×630).
7. Push → import on Netlify → add the domain.

### Option B — by hand

Skip the importer and edit [`site.content.json`](site.content.json) directly — every field is documented below. Then steps 5–7 above.

> Mission Control (the visual CMS) edits the same `site.content.json` live — this factory stays fully compatible with it.

---

## Config reference

Everything lives in [`site.content.json`](site.content.json) (typed by `site.config.ts`).

| Group | Field | What it does |
|---|---|---|
| **(root)** | `template` | Which of the 7 designs renders the site. Omit → `studio` |
| **business** | `name` | Wordmark, titles, footer, schema |
| | `tagline` | Hero headline. Wrap a word in `*asterisks*` → accent (italic serif / colored, per template) |
| | `description` | Hero paragraph **and** meta description |
| | `industry` | `plumber`·`electrician`·`hvac`·`roofer`·`contractor`·`handyman`·`painter`·`landscaper`·`detailer`·`dentist`·`chiropractor`·`restaurant`·`realestate`·`attorney`·`accountant`·`insurance`·`salon`·`other` → picks schema.org `@type` |
| | `foundedYear`, `license`, `domain` | "Since {year}", license line, and canonical/OG/schema URLs |
| **contact** | `phone`/`phoneTel` | Display number + `tel:` href |
| | `email`, `address`, `hours`, `mapsUrl` | NAP, hours table, Maps link, schema |
| | `geo` *(optional)* | `{ lat, lng }` → schema `GeoCoordinates` (boosts Maps/local SEO) |
| **serviceArea** | `string[]` | Cities served → Service Area section + schema `areaServed` |
| **services** | `{ slug, title, blurb }[]` | Services section + schema `hasOfferCatalog` |
| **reviews** | `rating`, `count`, `source`, `sourceUrl`, `items[]` | Rating block + quote cards + schema (emitted only when count > 0) |
| **process** | `{ n, title, body }[]` | "How it works" steps |
| **faq** | `{ q, a }[]` | Accordion + schema `FAQPage` (rich-result eligible) |
| **about** | `owner`, `ownerRole`, `photo`, `paragraphs[]` | About section |
| **portfolio** *(optional)* | `{ title, intro, items[] }` | Filterable project grid + lightbox. Items with no `src` show a labelled placeholder |
| **beforeAfter** *(optional)* | `{ title, intro, items[] }` | Drag-to-compare sliders |
| **cta** *(optional)* | `{ heading, body, primary, secondary }` | Closing call-to-action band |
| **social** | `google`, `facebook`, `instagram`, `yelp` | Footer links + schema `sameAs` |
| **theme** | `mode`, `accent`, `bg?`, `fg?` | Accent always wins per-template; bg/fg optionally override the template palette |

---

## How the factory works

```
site.content.json ──(template key)──┐
                                     ▼
            components/templates/registry.tsx
   resolves each section to the active template's component,
   falling back to the proven base (studio) when not overridden
                                     ▼
   app/templates.css   →  per-template token theme (palette, type, radii, glass)
   lib/fonts.ts        →  loads only that template's 3 fonts
   lib/motion.ts       →  shared Framer variants + one signature easing
```

- **Add a template:** create `components/templates/<key>/` with the sections you want to override, add a token block in `app/templates.css`, register it in `registry.tsx` and `lib/templates.ts`. Everything you *don't* override inherits the base section, restyled by your tokens.
- **Sections** (interchangeable): Hero, TrustBar, Services, Process, Portfolio, BeforeAfter, Reviews, About, ServiceArea, FAQ, CTA, Contact — plus Nav/Footer chrome. Order/visibility/background per template in `registry.tsx` (`LAYOUT_OVERRIDES`), or per client via `site.content.json` `sections[]` (Mission Control).
- **Conversion chrome:** sticky mobile call bar + floating call button ([`components/ui/ConversionDock.tsx`](components/ui/ConversionDock.tsx)) on every premium template.

---

## Local-SEO checklist (per client)

- [ ] **NAP matches the Google Business Profile exactly** (name/address/phone). Inconsistent NAP is the #1 local-SEO killer.
- [ ] **Real review numbers** in `reviews` (the schema claims them publicly).
- [ ] **`sourceUrl`** points at the real Google reviews.
- [ ] **Fill the FAQ** → `FAQPage` rich-result eligibility.
- [ ] **Add `public/og.jpg`** (1200×630).
- [ ] **Set the real `domain`** (builds canonical/OG/schema/sitemap URLs).
- [ ] *(Optional)* add `contact.geo` `{ lat, lng }` for `GeoCoordinates`.
- [ ] Verify the domain in **Google Search Console**; submit `/sitemap.xml`.
- [ ] Run the live URL through the **[Rich Results Test](https://search.google.com/test/rich-results)** — confirm `LocalBusiness` (+ `FAQPage`) parse cleanly.

`/sitemap.xml` and `/robots.txt` are generated automatically from `app/sitemap.ts` and `app/robots.ts`.

---

## Deploy to Netlify

`netlify.toml` + `@netlify/plugin-nextjs` are preconfigured. **Do not** add `output: "standalone"`.

1. Push the client repo to GitHub.
2. Netlify → **Add new site → Import an existing project → GitHub** → pick the repo → **Deploy** (build settings are read from `netlify.toml`).
3. **Domain management** → add the domain. DNS: apex **A** → `75.2.60.5`, `www` **CNAME** → `your-site.netlify.app`. HTTPS (Let's Encrypt) is automatic.

---

## Propagating template updates to existing client repos

The engine is shared; client content is not. To pull engine updates into a client repo without clobbering their content:

```bash
rsync -a --delete \
  --exclude='.git' --exclude='node_modules' --exclude='.next' \
  --exclude='site.content.json' --exclude='public/uploads' \
  client-template/ <client-repo>/
```

The `site.content.json` and `public/uploads` excludes are **critical** — they live only in the client repo.
