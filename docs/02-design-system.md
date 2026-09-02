# Phase 4 — Visual Design System

**Status: implemented.** Live at `/design-system` (noindex). Everything below is
code, not a proposal: the page renders the real components from
`src/components/**`, so it cannot drift from the site.

---

## Direction — "Instrument"

The brief asked for modern, technical, precise, and not-a-template. The
vernacular this portfolio borrows from is **measurement equipment**: drafting
vellum, instrument scales, trace waterfalls, oscilloscope screens at rest.

That gives three decisions everything else follows from:

1. **The substrate is vellum-grey, not white and not black.** A neutral ramp
   with a faint petrol-green cast, so the accents sit in the same family as
   the ground rather than fighting it.
2. **Colour describes system behaviour, never vendor identity.** A stack list
   is monochrome; a diagram is not.
3. **The structural device is a measurement rule** — a hairline with minor
   ticks every 12px and a major tick every 60px. It divides sections, sits
   under headings, marks the active nav item, and reappears as the tick before
   every eyebrow and list item. It encodes position, so it is information
   rather than ornament.

Deliberately avoided: neon-on-black terminal styling, a rainbow of technology
logos, glassmorphism, gradient hero blobs, and card-everything layouts.

---

## Typography

Two families, both self-hosted latin-subset variable woff2, both preloaded.
**73KB total.**

| Role | Face | Why |
| --- | --- | --- |
| Prose, headings | **Archivo** (`--font-sans`) | A grotesque cut from signage lettering — drawn for legibility at speed. Tightened to −0.035em at display sizes so headings read as machined type. |
| Labels, data, navigation, diagram annotation | **Martian Mono** (`--font-mono`) | A wide engineered mono with a width axis. Condensed to 87.5% and tracked out for labels, so they read as stamped equipment markings. This is the system's distinguishing voice. |
| Code samples | system mono stack (`--font-code`) | Martian Mono is too wide for long code lines, and shipping a third face for them is not worth the bytes. |

The scale is fluid via `clamp()` from 360px to 1440px:
`--fs-display`, `--fs-h1` … `--fs-micro`. See the Foundations section of
`/design-system` for live specimens of every step.

---

## Colour

**Neutrals** (`--n-25` … `--n-950`) carry surfaces, text and borders.
**Three accents**, each with one job:

| Token | Means | Used for |
| --- | --- | --- |
| `--signal` (jade) | live | active nav, event streams, running demos, hover state, measured wins |
| `--flow` (ultramarine) | structure | links, synchronous request paths, related-node highlight |
| `--caution` (amber) | caution | trade-offs, retries, failure paths |

Tokens come in two layers. Primitives hold raw values; **components reference
the semantic layer only** (`--surface-*`, `--text-*`, `--border-*`, `--signal`,
`--flow`, `--caution`). Theming is therefore a remap of about thirty custom
properties, not a rewrite — see `src/styles/tokens.css`.

Light and dark are both first-class. An inline script in `BaseLayout` applies a
stored choice before first paint; with no stored choice no attribute is set, so
`prefers-color-scheme` wins until the visitor states a preference.

---

## Architecture-diagram language

The most important visual decision in the system. Two variables are kept
separate so a reader can decode a system at a glance:

**Border style says what a component is**

| Kind | Treatment |
| --- | --- |
| `client` | the only rounded box — the human end |
| `service` | plain hairline box |
| `engine` | doubled rule, like machined housing — the core |
| `store` | sunken fill, weighted base |
| `stream` | ticked leading edge — an ordered log with offsets |
| `external` | dashed — outside the boundary we own |

**Line colour says how data moves**: `sync` (flow), `async` (signal),
`degraded` (caution, dashed). A short dash walking a wire is one event in
flight.

Diagrams are authored as data (`stages` + `edges`) and the connectors are
measured from the real DOM after layout. Stages are columns above 52rem and
rows below it, and the same edge data redraws orthogonally in either
orientation — the mobile diagram is a different drawing, not a shrunken one.
Hover or focus a node to preview its connections; click to hold the highlight,
Escape to release. Packets only animate while the diagram is on screen.

---

## Motion

*(Phase 5 — implemented. Live under `#motion` on `/design-system`.)*

| Token | Job |
| --- | --- |
| `--dur-1` 90ms | state echo — hover, press |
| `--dur-2` 160ms | control transitions |
| `--dur-3` 260ms | disclosure and reveal |
| `--dur-4` 420ms | section entrance |
| `--dur-flow` 2600ms | a packet crossing a diagram |

Easings: `--ease-standard`, `--ease-entrance`, `--ease-exit`, `--ease-snap`.

Every animation in the system either confirms an action, shows a relationship,
or explains data movement. Nothing moves on its own once the page has settled.

**Reveal.** Content arrives once, in reading order, so the eye is led down the
page rather than meeting a full screen at once. Four variants — `rise`, `fade`,
`scale`, `rule` — one shared IntersectionObserver, and it never replays on
scroll-back. The hidden state is scoped to `[data-js]`, set by the inline head
script, so without JavaScript nothing is ever hidden.

**Diagram entrance.** A diagram assembles in the order a reader would build it:

| | |
| --- | --- |
| 0–400ms | components appear, staggered 70ms per stage |
| 300–1000ms | connections draw along their own path; dashed failure paths fade in instead, because their pattern is information and cannot double as a wipe |
| 1150ms | events start moving, and stop again whenever the diagram leaves the screen |

It plays once, the first time the diagram is seen.

**Focus tracking.** The career trace marks whichever experience is crossing the
middle of the viewport, on a passive scroll listener throttled to a frame that
returns immediately once the answer stops changing. Only the active/inactive
state changes; the segments themselves never move.

**A constraint worth knowing.** `transform` on an ancestor makes it the
containing block for `position: sticky` descendants. Section bodies therefore
reveal with `fade` rather than `rise` — a rising section body would silently
break any sticky child inside it.

**Feedback.** Short and local, never longer than 260ms: controls sink 1px and
their trailing arrow steps forward; link underlines measure themselves out from
the left; the disclosure marker turns as it changes sign; the active nav tick
draws in; the copy button's label becomes its own result rather than raising a
toast somewhere else; hovering a diagram component dims everything it does not
touch.

**Excluded.** Ambient movement of any kind, parallax and scroll-linked effects,
page transitions, spinning logos, and animation on anything not yet read.

`prefers-reduced-motion: reduce` collapses all transitions to 1ms, stops the
status pulse, removes diagram packets, and shows revealed content immediately —
with every end state intact.

---

## Component inventory (atomic design)

```
src/components/
├── atoms/        Icon · Button · TextLink · Tag · Eyebrow · Ruler
│                 StatusDot · ThemeToggle · ArchNode
├── molecules/    SectionHeading · TagList · MetricReadout · Disclosure
│                 LinkRow
├── organisms/    Navbar · ArchitectureDiagram · CareerTrace · ProjectBlock
│                 ExperienceEntry · ExpertiseGroup · ContactBlock · DeepDive
└── templates/    Section
```

`CareerTrace` is the signature: a career reads like a distributed trace — one
axis, three segments, each with a start and a duration. It sticks under the
navigation for the length of the Experience section, so the timeline is a
persistent map rather than something the reader has to remember from the top of
the section. Two states only: the segment being read is `--signal`, the rest are
the same grey as the rule they sit on. It keeps Experience quieter than
Projects while still carrying real information.

---

## Composition rules

1. Components reference semantic tokens only — never a raw `--n-*` or a hex.
2. One primary button per view.
3. Colour describes system behaviour. Technology lists stay monochrome.
4. Elevation is a hairline. Shadow is reserved for the sticky navigation.
5. Architecture diagrams are content: in the section, never behind a link.
6. Animation explains, confirms, or directs attention. Anything else is cut.
7. Every interactive element has a visible focus state and an accessible name.

---

## Accessibility and performance baked in at this phase

- Semantic landmarks, skip link, visible focus ring on every control.
- Theme toggle is a `role="switch"` with a live-updating label.
- Diagram nodes are real buttons, so keyboard users get the same highlighting.
- Disclosures are native `<details>` — content is in the document and findable
  whether open or closed, and works with JavaScript off.
- No CSS or JS framework. Two font files. All page JavaScript is small vanilla
  modules for the navigation, the theme switch and the diagrams.

---

## Next

Phases 5 and 6 are done — see `docs/03-implementation.md`. Phase 7 (performance
and deployment) and Phase 8 (accessibility and SEO) are still open.
