# Portfolio Website — Phase 1 Plan

## Goal

Ship a minimal, single-page portfolio site at **marstanjx.com** that:

1. Introduces who I am (a few sentences — v1 in `intro.md`).
2. Points visitors to my socials.
3. Archives my old site so it's still reachable.

That's it. No projects, no case studies, no blog yet — those come in later phases.

Inspiration: the Austin Valleskey-style single column, dark background, generous whitespace, tight typographic rhythm.

**Stack:** Next.js on Vercel.

## Reference Docs

- `intro.md` — v1 of the intro copy.
- `de-jd.md` — the Design Engineer job description Mars authored. Use it as the source of truth for how Mars thinks about the role: "taste in engineering," design systems as infrastructure, AI-native craft, internal tooling. The site's tone, copy, and craft level should embody those values — anything that ships here is also a portfolio for the JD itself.

---

## Visual Layout

```
┌─────────────────────────────────────────────┐
│                                             │
│                                             │
│   Mars Tan                                  │
│   [Role], [Company]                         │
│                                             │
│                                             │
│   [Intro paragraph 1 — TBD by Mars]         │
│                                             │
│   [Intro paragraph 2 — TBD by Mars]         │
│                                             │
│   [Intro paragraph 3 — TBD by Mars]         │
│                                             │
│                                             │
│   LinkedIn   GitHub   Email   Archive       │
│                                             │
│                                             │
└─────────────────────────────────────────────┘
```

Single centered column, ~600px max-width. Everything left-aligned within the column. Footer-style row of underlined text links at the bottom.

---

## Content Blocks

### Header
- **Name:** Mars Tan
- **Role line:** `Senior Design Engineer at [InstaLILY AI](https://instalily.ai).`

### Intro
v1 lives in `intro.md`. Current shape:

- ¶1 — Origin / education (Arts, Tech, and Business of Innovation @ USC Iovine and Young).
- ¶2 — What I actually do at InstaLILY (AI-native experiences + systems behind them).
- ¶3 — Languages, with 日本語 linking to my N5 notes.

Inline links inside body text — treat the `(url)` syntax in `intro.md` as link targets attached to the preceding phrase (e.g. `InstaLILY AI`, `日本語`).

### Links Row
Plain underlined text links, separated by spaces:

- **LinkedIn** → linkedin.com/in/[handle]
- **GitHub** → github.com/[handle]
- **Email** → mailto:mars@instalily.ai
- **Archive** → marstanjx.com (the old site, hosted somewhere — see "Archive Strategy" below)

---

## Style Direction

Both palettes share the same type ramp, spacing, and link treatment — only color tokens swap.

| Element       | Dark mode                | Light mode               |
|---------------|--------------------------|--------------------------|
| Background    | `#0a0a0a`                | `#fafafa`                |
| Body text     | `#e5e5e5`                | `#171717`                |
| Muted text    | `#888`                   | `#666`                   |
| Link underline| `#444`                   | `#bbb`                   |

| Element       | Choice                                              |
|---------------|-----------------------------------------------------|
| Font          | System sans (or Inter / Geist) — clean, no serif    |
| Name size     | ~32–40px, bold                                      |
| Body size     | ~16–18px, line-height 1.6                           |
| Link style    | Underlined, no color shift on hover (just opacity)  |
| Spacing       | Generous — ~1.5rem between paragraphs               |
| Width         | max-width ~600px, centered, padded on mobile        |

---

## Theme (Dark / Light)

Site supports both modes with a manual toggle.

**Default:** follow `prefers-color-scheme` on first visit; once the user toggles, persist their choice and use it on subsequent visits.

**Implementation:**
- Use [`next-themes`](https://github.com/pacocoursey/next-themes) — handles system preference, persistence (localStorage), and SSR-safe class swapping with no flash on load.
- Tailwind config: `darkMode: 'class'` so `dark:` variants key off `<html class="dark">`.
- Express colors as CSS variables in `globals.css` so the rest of the app references semantic tokens (`bg-background`, `text-foreground`, `text-muted`) instead of raw hex. Variable values flip under `.dark`.
- Toggle UI: small text button in the top-right corner of the page (e.g. a `☼ / ☾` glyph or "light / dark" text) — keep it quiet so it doesn't compete with the intro.

**Why this matters here:** A craft signal. Theme handling done well (no FOUC, respects system, persists, accessible toggle) is exactly the "considered detail" the JD calls out. Done sloppily it's the opposite signal.

---

## Archive Strategy

Old marstanjx.com content — two options:

1. **Subdomain** — host old site at `archive.marstanjx.com` and link to it.
2. **Subpath** — drop old site files into `/archive/` on the new site.

Recommendation: **subpath** (`/archive/`) — simpler, no DNS work, single deploy.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Host:** Vercel
- **Domain:** marstanjx.com (point apex + www at Vercel)

---

## File Structure (Phase 1, Next.js App Router + Tailwind)

```
mars-website/
├── app/
│   ├── layout.tsx          # root layout, fonts, metadata
│   ├── page.tsx            # the single home page
│   └── globals.css         # Tailwind directives + base styles
├── docs/                   # planning + content drafts (this folder)
│   ├── PLAN.md
│   ├── intro.md
│   └── de-jd.md
├── public/
│   ├── favicon.svg
│   └── archive/            # old site, served at /archive
│       └── index.html
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

Note: dropping the old site into `public/archive/` lets Vercel serve it as static files at `marstanjx.com/archive/` with zero extra config.

---

## Phase 1 Checklist

- [x] Confirm tech stack — Next.js + Tailwind on Vercel
- [x] Confirm role line — Senior Design Engineer at InstaLILY AI
- [x] Intro v1 drafted (`intro.md`)
- [ ] Polish intro copy (v2 pass)
- [ ] Scaffold Next.js app with Tailwind (`app/page.tsx`, `app/layout.tsx`, `globals.css`)
- [ ] Set up theme system: `next-themes` + CSS variable tokens + Tailwind `darkMode: 'class'`
- [ ] Implement single-page layout matching mock
- [ ] Build dark/light toggle (no-FOUC, respects system, persists)
- [ ] Wire up footer links (URLs filled in later)
- [ ] Drop old site into `public/archive/`
- [ ] Add favicon + OG image + page metadata
- [ ] Deploy to Vercel
- [ ] Point marstanjx.com DNS at the new deploy

---

## Deferred (revisit later)

- LinkedIn + GitHub URLs — placeholders for now.
- Old marstanjx.com files — drop into `public/archive/` when available.
- Inline link styling for `(url)` syntax in `intro.md`.
- Signature inline detail (Valleskey-style glyph) — explore once base layout is in.
- Footer/nav link order and hover behavior.

---

## Out of Scope for Phase 1

- Projects / case studies
- Blog or writing
- Animations
- Analytics
- Custom typography (web fonts)
- Multilingual intro + language switcher (Mars will write the intro in multiple languages and add a switcher; intro layout in Phase 1 should leave room for the switcher to be added without rework)

These all live in later phases.
