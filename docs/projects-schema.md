# Projects — Schema

A working doc for the Projects section that goes under the bio. Reference style: minimal list (à la Brian Lovin) — bold short title, muted description, optional ↗ arrow for external links.

The raw data list lives in `20260501-projects.md`. This doc defines the schema we'll structure that data into; the implementation agent will source per-project fields from a typed file (`src/data/projects.ts`).

---

## Decisions Locked

- **Title length:** strict short — keep under ~3 words. Long descriptive titles get shortened; the long form goes into `description`.
- **Year:** single year only. No ranges. Mars to update raw data so each item has one year (e.g. *Japanese Notes* "2018 / 2019" → pick one).
- **Video hosting (AI Agents, Groupoo, Motion Reel):** self-hosted under `/public/videos/`. They're short enough that bundle-size impact is small. AI Agents specifically is a 10-second loop that needs `loop autoplay muted playsinline`.
- **Video items get an internal page** at `/project/[slug]` containing a minimal video player and a back button. (Inline-in-list playback for short loopers is still an open question — see Open Decision F.)
- **Nessie hosting still open** — see Open Decision A.

---

## Reference Layout

The reference image shows three visual elements per row:

```
[bold short title]  [↗ if external]   [muted description]
```

Year is *not visible* in the reference. We're still deciding whether marstanjx.com follows that or surfaces year — see Open Decision #1 below.

---

## Schema

```ts
type Project = {
  // Required
  title: string;        // short, display-only — strict ≤ ~3 words
  description: string;  // a few words — muted secondary text
  year: number;         // single year, used for sort

  // Exactly one of these — discriminates how the row renders in the list
  url?: string;         // external URL → row gets ↗ arrow, opens in new tab
  slug?: string;        // internal page → /project/[slug]

  // Used on the /project/[slug] page (and optionally inline — see Open Decision F)
  video?: {
    src?: string;       // self-hosted asset, e.g. "/videos/ai-agents.mp4"
    poster?: string;    // optional poster image
    loop?: boolean;     // true for AI Agents (10s loop, autoplay, muted)
    youtubeId?: string; // alternative to src — for any items hosted on YouTube
  };
};
```

### Field reasoning

- **`title`** is display-only and forced short. Long titles (*Motion Graphics and Animation Reel*) get shortened (*Motion Reel*); the full descriptor goes into `description`.
- **`description`** is the muted secondary text — a few words, not a sentence. Seven of nine items currently lack one.
- **`year`** is a number for trivial sort math. No ranges; multi-year items pick one year.
- **`url` vs `slug`** — exactly one per project. Discriminator the renderer keys off:
  - `url` → external link with ↗ arrow.
  - `slug` → internal `/project/[slug]` page.
- **`video`** — only meaningful when `slug` is set. `src` for self-hosted assets (AI Agents, Groupoo, Motion Reel); `youtubeId` if any item ends up on YouTube (likely just Nessie if you go that route). One of the two should be present, not both.
- **`video.loop`** — opt-in per video. `true` for AI Agents (and any future short loopers). Implies autoplay + muted + playsinline at the player level.

### Dropped from earlier draft

- ~~`yearEnd`~~ — single-year-only decision removes the need.
- ~~`archived`~~ — skip for now (Open Decision #6 closed; can add later).
- ~~`featured`~~ — premature; reverse-chronological sort is enough.
- ~~`kind`~~ — redundant; presence of `url` vs `slug` is the discriminator.

### Open question on schema shape

If we add inline-list playback for short loopers (Open Decision F), the `video` object might need a flag like `inlineInList?: boolean` so the renderer knows whether to surface the asset in the list itself or only on `/project/[slug]`. Hold on adding that field until Decision F is settled.

---

## `/project/[slug]` Page Pattern

Used for video items and any future internal project pages. Minimum content:

- **Back button** at the top — returns to home (the projects list lives there).
- **Title** — the project's `title`.
- **Year** + **description** — small, muted.
- **Video player** — driven by the `video` field:
  - **Self-hosted (default for AI Agents, Groupoo, Motion Reel):** native `<video>` element, sourced from `video.src`. Apply `loop autoplay muted playsinline` if `video.loop` is true.
  - **YouTube (only if needed for Nessie):** iframe embed with minimal chrome (`?rel=0&modestbranding=1`).
- Nothing else for v1. Long-form case-study content can come later via MDX if a project earns it.

### Asset notes

- Self-hosted videos live in `/public/videos/[slug].mp4`. Optimize before committing — `ffmpeg -c:v libx264 -crf 23 -preset medium -movflags +faststart` is a sane default. AAC audio at 128kbps. AI Agents (10s loop) will be tiny; Groupoo and Motion Reel longer but still manageable.
- For looping items, mute the audio in the asset itself (`-an` to strip audio entirely) — autoplay with sound is blocked by browsers anyway.

### Route convention

Mars wrote `/project/[slug]` (singular). Conventional Next.js style is `/projects/[slug]` (plural, mirroring the section name). Both work; pick one before routing gets wired.

---

## Mapping Your 9 Projects

Each row reflects the locked schema. ⚠ = needs your input before this can ship.

| # | title (short) | description | year | url / slug | video |
|---|---|---|---|---|---|
| 1 | Maimai Per Round *(or shorten to Maimai?)* | Per-round maimai pricing across NYC and NJ. | 2026 | url: maimai.marstanjx.com | — |
| 2 | Nessie ⚠ | ⚠ *needs description* | 2025 | ⚠ *url: linkedin... OR slug — see Open Decision A* | ⚠ if internal |
| 3 | AI Agents | Motion graphics to illustrate an agentic workflow. | 2024 | slug: `ai-agents` | src: `/videos/ai-agents.mp4`, loop: true |
| 4 | Groupoo ⚠ | ⚠ *needs description* | 2022 | slug: `groupoo` | src: `/videos/groupoo.mp4` |
| 5 | Motion Reel ⚠ *(shortened from "Motion Graphics and Animation Reel")* | ⚠ *needs description* | 2020 | slug: `motion-reel` | src: `/videos/motion-reel.mp4` |
| 6 | Mars Website | ⚠ *needs description (e.g. "My old portfolio, archived.")* | 2020 | url: archive.marstanjx.com | — |
| 7 | Lucky Ball | ⚠ *needs description* | 2019 | url: demo.marstanjx.com/game | — |
| 8 | AARDVARC | ⚠ *needs description* | 2019 | url: aardvarc.archive.marstanjx.com | — |
| 9 | Japanese Notes | ⚠ *needs description (e.g. "Self-study notes for the JLPT N5.")* | ⚠ *2018 or 2019?* | url: notes.marstanjx.com/n5/chapter/1 | — |

Status by gap:
- **7 of 9 need descriptions written.** Largest piece of content work.
- **3 need video assets** (AI Agents, Groupoo, Motion Reel) — exported, optimized, dropped into `/public/videos/`.
- **1 needs a year decision** (Japanese Notes).
- **1 needs a routing decision** (Nessie — external LinkedIn link, or internal page with self-hosted/YouTube video?).
- **2 candidate title shortenings** (Maimai Per Round → Maimai? Motion Reel from Motion Graphics and Animation Reel — confirm).

---

## Remaining Open Decisions

### A. Nessie — external link or internal page?

Currently a LinkedIn link. Three options now (since we're self-hosting the others):

- **Keep as `url`** pointing at LinkedIn. Zero work, sends users off-site, mismatched chrome.
- **Self-host like AI Agents/Groupoo/Motion Reel.** Get the original video file, drop into `/public/videos/nessie.mp4`, treat as a `slug` item. Most consistent.
- **YouTube (re-upload).** Most expensive, least consistent now that the others are self-hosted — probably not worth it unless the file is too large to self-host.

Lean: **self-host** if you have the original file; **keep as LinkedIn url** if you don't.

### B. Show year on the page, or hide it?

Reference hides year. With nine projects spanning 2018-2026, you have a story worth surfacing.

- **Hide year** — minimal, reference-faithful.
- **Show year quietly** — small muted column or trailing *— 2026* after description.

Lean: **show**. The arc is part of what's interesting.

### C. External link icon style

- ↗ glyph (Unicode) — reference-faithful, zero-weight.
- SVG icon (lucide-react) — slightly fancier.
- No icon — readers infer.

Lean: **↗ glyph**.

### D. Route convention — `/project/[slug]` or `/projects/[slug]`?

You wrote `/project/[slug]` (singular). Conventional Next.js style is `/projects/[slug]` (plural). Both work; pick one before routing gets wired.

### E. Title shortenings to confirm

- *Maimai Per Round* (3 words, borderline) → keep, or shorten to *Maimai*?
- *Motion Graphics and Animation Reel* → *Motion Reel*? Or *Reel*?
- *Nessie Launch Video* → *Nessie* (already in mapping above)
- *Groupoo Launch Video* → *Groupoo* (already in mapping above)

### F. Inline-list playback for short loopers? (NEW)

AI Agents is a 10-second loop. That's exactly the kind of asset that works as an inline preview *in the projects list itself* — short, soundless, restarts automatically, no click needed. (Brian Lovin's site does this for some entries.)

Two options:

- **Inline only on `/project/ai-agents`** (current schema default). User clicks through to see the loop. Consistent with how Groupoo and Motion Reel will work.
- **Inline in the list AND on the project page.** Loop plays as a small thumbnail next to the title in the list; clicking opens the dedicated page. More design effort, more visual energy on the home page.

The second option only really makes sense for short loopers (≤ ~15s, no audio). Groupoo and Motion Reel are probably too long. So enabling it adds a "preview-in-list" treatment that *only AI Agents qualifies for today* — possibly a future-flexible move if you ever make more 10-second loops, possibly over-engineering for one project.

Lean: **page-only for v1**. Revisit if you make more short loopers. Adding inline-in-list later is cheap (one boolean field on the schema, one rendering branch).

---

## Where the Data Lives

**`src/data/projects.ts`** exporting a typed array. Type-safe, no parser, easy for the implementation agent to consume. Migrate to per-project MDX files only if/when long-form case studies show up.

---

## What's Left to Unblock Shipping

1. **Write the 7 missing descriptions.** Largest content gap.
2. **Upload three videos to YouTube** and grab their IDs (AI Agents, Groupoo, Motion Reel).
3. **Decide Nessie's path** (external LinkedIn vs internal YouTube re-upload).
4. **Pick one year** for Japanese Notes.
5. **Confirm title shortenings.**
6. **Decide year visibility** (show or hide on the list).
7. **Confirm route convention** (`/project/` vs `/projects/`).

Items 1-5 are content work. Items 6-7 are 5-second design calls.
