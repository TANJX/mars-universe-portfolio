# Portfolio Website — Phase 1 Plan

## Goal

Ship a minimal, single-page portfolio site at **marstanjx.com** that:

1. Introduces who I am (intro lives in `../notes/intro.md`, English finalized).
2. Points visitors to my socials.
3. Lists ten projects below the socials row, reverse-chronological, with minimal `/project/[slug]` pages for self-hosted video items.
4. Archives my old site at `/archive/` so it's still reachable.

Inspiration: Austin Valleskey-style single column, dark background, generous whitespace, tight typographic rhythm. The projects list takes its visual cue from Brian Lovin's projects index — bold short titles, muted descriptions, ↗ glyph for external links.

**Stack:** Next.js (App Router) + Tailwind on Vercel.

---

## Reference Docs

- `../notes/intro.md` — canonical intro copy in three locales (English final; 中文/日本語 drafts). Implementation agent sources per-locale text from this file.
- `../notes/intro-v2.md` — polish history for the intro.
- `../notes/de-jd.md` — Design Engineer JD Mars authored. Source of truth for tone/values: *taste in engineering*, design systems as infrastructure, AI-native craft, internal tooling. The site itself should embody these values — quality of execution outranks feature count.
- `projects-schema.md` — schema for projects data, plus open implementation decisions for that section.
- `../notes/projects.md` — raw data list of projects with URLs, years, and Mars's notes.

---

## Visual Layout

```
┌─────────────────────────────────────────────────┐
│                                          [☼/☾]  │  ← theme toggle, top-right
│                                                 │
│   Mars Tan                                      │
│   Senior Design Engineer at InstaLILY AI.       │
│                                                 │
│   A good product is both crafted and built…     │  ¶1 belief
│                                                 │
│   At InstaLILY, I iterate on prototyping…       │  ¶2 work
│                                                 │
│   Before this, I studied Arts, Technology…      │  ¶3 origin
│                                                 │
│                                                 │
│   LinkedIn   GitHub   Email   Archive           │  ← socials row
│                                                 │
│                                                 │
│   Projects                                      │  ← section label, muted
│                                                 │
│   Maimai            Per-round pricing…    2026  │
│   Nessie            A launch video for…   2025  │
│   AI Agents         Animated agentic…     2024  │
│   Diffusion-GAN     A reproduction…       2023  │
│   Groupoo           Launch video I…       2022  │
│   Motion Reel       Years of animation…   2021  │
│   Mars Website      My old portfolio…     2020  │
│   AARDVARC          A syllabus tool I…    2019  │
│   Lucky Ball        [tbd]                 2019  │
│   Japanese Notes    My JLPT notebook…     2018  │
│                                                 │
└─────────────────────────────────────────────────┘
```

Single centered column. Max-width ~600px shared by intro and projects. Everything left-aligned.

**Project rows have three visual regions:**

- **Title** (bold) on the left. No external-link glyph — external vs internal isn't surfaced visually.
- **Description** (muted) in the middle column.
- **Year** (muted, right-aligned) on the right.

On narrow screens (≤ ~520px) the year stacks under the description rather than competing for horizontal space.

---

## Content Blocks

### Header

- **Name:** *Mars Tan* (~32–40px, bold)
- **Role line:** *Senior Design Engineer at InstaLILY AI.* (muted)

In the multi-locale version (post-Phase 1), the role line localizes per `../notes/intro.md` per-locale role string. Phase 1 ships English only.

### Intro

Three paragraphs, locked. Source: `../notes/intro.md` → `## English`.

All copy in this section is multilingual (en/zh/ja); the `LangSwitcher` in the top-right swaps it.

### Links Row

Plain underlined text links, separated by spaces. Same row pattern as Valleskey. Sits directly under the intro, above the Projects section.

- **LinkedIn** → linkedin.com/in/[handle]
- **GitHub** → github.com/[handle]
- **Email** → mailto:mars@instalily.ai
- **Archive** → /archive

Labels (LinkedIn / GitHub / Email / Archive) are localized per `LangContext`.

### Projects (NEW)

Sits at the bottom of the page, **below the socials row**. Section label *"Projects"* in muted body color, smaller than body text. Followed by a list of rows sorted by `year` descending; same-year items keep their data-array order (stable sort).

- **Data source:** `src/data/projects.ts` exporting a typed array. Schema in `projects-schema.md`.
- **Item count today:** 10, spanning 2018-2026.
- **Row link target:** `url` (external, opens in new tab) or `/project/[slug]` (internal page).
- **External marker:** none — external rows are visually identical to internal ones; only `target="_blank"` differs.
- **Hover:** entire row is the trigger; only the title gets underlined on hover (description and year stay plain).
- **i18n:** every visible string in this section — section label, project titles, descriptions, and the back link on `/project/[slug]` — is keyed off the current `Lang` from `LangContext`. Year is a number and stays as-is across locales.

---

## /project/[slug] Pages (NEW)

Minimal pages used for self-hosted video items today, and any future internal project pages later. Single-purpose: show the asset, give a way back.

**Layout:**

```
┌─────────────────────────────────────────────────┐
│   ← Back                                        │
│                                                 │
│   AI Agents                                     │  ← title
│   2024 · Animated agentic workflow.             │  ← meta, muted
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │                                         │   │  ← video player
│   │              [video]                    │   │
│   │                                         │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

- **Back link** at top-left, `← Back`, routes to `/`. Same muted text-link treatment.
- **Title** — project's `title`, same style as the home-page name (bold, ~32–40px).
- **Meta line** — `year · description`, muted, small.
- **Video player** — driven by the `video` field on the project:
  - **Self-hosted** (AI Agents, Groupoo, Motion Reel): native `<video>` element from `video.src`. Apply `loop autoplay muted playsinline` when `video.loop` is true. Otherwise show `controls`.
  - **YouTube embed** (none today — Diffusion-GAN goes to YouTube via external `url`, not via internal page; reserved for any future internal-page items): iframe with `?rel=0&modestbranding=1`.

Same column width as home. Same theme tokens.

**Asset prep:**

- Self-hosted videos live in `/public/videos/[slug].mp4`. Optimize before committing — `ffmpeg -c:v libx264 -crf 23 -preset medium -movflags +faststart` is a sane default.
- For looping items, strip audio entirely (`-an`) — browsers block autoplay-with-sound, and the asset is smaller.
- AI Agents specifically: 10-second loop, no audio.

**Route convention:** `/project/[slug]` (singular, per Mars's preference). Conventional Next.js style is `/projects/[slug]` (plural, mirroring the section name) — flagged as Open Decision below.

---

## Style Direction

Both palettes share the same type ramp, spacing, and link treatment — only color tokens swap.

| Token         | Dark mode    | Light mode  |
|---------------|--------------|-------------|
| Background    | `#0a0a0a`    | `#fafafa`   |
| Body text     | `#e5e5e5`    | `#171717`   |
| Muted text    | `#888`       | `#666`      |
| Link underline| `#444`       | `#bbb`      |

| Element              | Choice                                                       |
|----------------------|--------------------------------------------------------------|
| Font                 | System sans (or Inter / Geist) — clean, no serif             |
| Name / project title | ~32–40px, bold                                               |
| Body size            | ~16–18px, line-height 1.6                                    |
| Section label        | ~13–14px, muted, sentence case (*Projects*)                  |
| Project row title    | Body size, bold                                              |
| Project description  | Body size, muted                                             |
| Project year         | Body size, muted, right-aligned                              |
| Link style           | Project rows: no underline by default; only the title underlines on row hover. Other links stay underlined. |
| Paragraph spacing    | ~1.5rem between intro paragraphs                             |
| Project row spacing  | ~0.75rem vertical                                            |
| Section spacing      | ~3rem between intro and socials row, ~3rem between socials and Projects |
| Width                | max-width ~600px, centered, padded on mobile                 |

---

## Theme (Dark / Light)

Site supports both modes with a manual toggle.

**Default:** follow `prefers-color-scheme` on first visit; once the user toggles, persist their choice and use it on subsequent visits.

**Implementation:**

- Use [`next-themes`](https://github.com/pacocoursey/next-themes) — handles system preference, persistence (localStorage), and SSR-safe class swapping with no flash on load.
- Tailwind config: `darkMode: 'class'` so `dark:` variants key off `<html class="dark">`.
- Colors live as CSS variables in `globals.css`. Components reference semantic tokens (`bg-background`, `text-foreground`, `text-muted`) instead of raw hex. Variable values flip under `.dark`.
- Toggle UI: small text or glyph button in the top-right corner of the page (e.g. `☼ / ☾`). Quiet — should not compete with the intro.

**Why this matters:** A craft signal. Theme handling done well (no FOUC, respects system, persists, accessible toggle) is exactly the "considered detail" the JD calls out. Done sloppily it's the opposite signal.

---

## Archive Strategy

Old marstanjx.com content gets dropped into `public/archive/` and served as static files at `marstanjx.com/archive/`. No DNS work, no separate deploy. The footer link points at `/archive`.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Theme:** `next-themes`
- **Host:** Vercel
- **Domain:** marstanjx.com (point apex + www at Vercel)

---

## File Structure

```
mars-website/
├── app/
│   ├── layout.tsx                # root layout, fonts, metadata, theme provider
│   ├── page.tsx                  # home: header + intro + projects + footer
│   ├── project/
│   │   └── [slug]/
│   │       └── page.tsx          # individual project page (back + meta + video)
│   └── globals.css               # Tailwind directives + CSS variable tokens
├── components/
│   ├── theme-toggle.tsx
│   ├── projects-list.tsx         # renders the projects section
│   └── video-player.tsx          # <video> wrapper with loop opt
├── data/                         # all multilingual content lives here
│   ├── intro.tsx                 # name, role, paragraphs per locale
│   ├── projects.ts               # typed array of Project records (schema in docs/plan/projects-schema.md)
│   └── socials.ts                # localized labels for the socials row
├── docs/
│   ├── plan/
│   │   ├── 20260430-archive-migration-prompt.md
│   │   ├── 20260501-portfolio-phase-1.md
│   │   ├── 20260501-projects-schema.md
│   │   └── 20260502-repo-archive-review.md
│   └── notes/
│       ├── intro.md
│       ├── intro-v2.md
│       ├── de-jd.md
│       └── projects.md
├── public/
│   ├── favicon.svg
│   ├── videos/
│   │   ├── ai-agents.mp4
│   │   ├── groupoo.mp4
│   │   └── motion-reel.mp4
│   └── archive/                  # old site, served at /archive
│       └── index.html
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## Phase 1 Checklist

- [x] Tech stack — Next.js + Tailwind on Vercel
- [x] Role line — Senior Design Engineer at InstaLILY AI
- [x] Intro v2 final (English, in `../notes/intro.md`)
- [x] Projects schema and data drafted (`projects-schema.md`, `../notes/projects.md`)
- [x] Project descriptions drafted for 8 of 10 items (Lucky Ball still needs one)
- [ ] Scaffold Next.js app with Tailwind (`app/page.tsx`, `app/layout.tsx`, `globals.css`)
- [ ] Set up theme system: `next-themes` + CSS variable tokens + Tailwind `darkMode: 'class'`
- [ ] Implement single-page home layout (header + intro + projects + footer)
- [ ] Build dark/light toggle (no-FOUC, respects system, persists)
- [ ] Implement Projects section: row layout, ↗ for external, year column, reverse-chrono sort
- [ ] Implement `/project/[slug]` pages: back link, meta, self-hosted video player with loop opt
- [ ] Optimize and drop video assets into `public/videos/`
- [ ] Write missing description: Lucky Ball
- [ ] Wire up footer links (URLs to be supplied)
- [ ] Drop old site into `public/archive/`
- [ ] Add favicon + OG image + page metadata
- [ ] Deploy to Vercel
- [ ] Point marstanjx.com DNS at the new deploy

---

## Open Decisions (affect implementation)

Don't block scaffolding, but should be answered before final polish.

- **Show year on project rows, or hide it?** Currently in the layout. Easy to remove if Mars wants the strict reference style.
- **Route convention** — `/project/[slug]` (Mars's pref) vs `/projects/[slug]` (Next.js convention). Pick one before wiring routes.
- **Inline-list preview for AI Agents loop?** Currently page-only. Could play a small loop in the row. Adds work for a single qualifying item.
- **External link icon style** — ↗ glyph (committed). Switchable to lucide-react `ExternalLink` SVG if Mars wants more weight.
- **Title shortenings to confirm** — *Maimai* vs *Maimai Per Round*; *Diffusion-GAN Paper* (committed); *Motion Reel*, *Nessie*, *Groupoo* (committed).

Tracked in `projects-schema.md`.

---

## Deferred (revisit later)

- LinkedIn + GitHub URLs — placeholders for now.
- Old marstanjx.com files — drop into `public/archive/` when available.
- Signature inline detail (Valleskey-style glyph in the bio) — explore once base layout is in.
- Footer/nav link order and hover behavior.

---

## Out of Scope for Phase 1

- Long-form case studies (minimal `/project/[slug]` video pages are *in*; full write-ups are not).
- Blog or writing.
- Page-level animations / transitions.
- Analytics.
- Custom typography (web fonts).
- Multilingual intro + language switcher. Intro layout in Phase 1 should leave room for a switcher to be added later (likely top-right corner, possibly paired with the theme toggle).

These all live in later phases.
