# Portfolio — Tanuj Pant

A single-page portfolio for a full-stack engineer, and the design system it was
cut from. Live at **[tanujpant.com](https://tanujpant.com)**; the system it is
built from is published alongside it at **`/design-system`**.

Astro, static output, no UI framework, no trackers, no analytics.

---

## Why it exists

The audience is recruiters, hiring managers, and engineers evaluating technical
depth — three readers with very different patience. The whole site is built
around one objective:

> Within 60–90 seconds a reviewer should understand who I am, what I have built,
> what I have done professionally, what I specialise in, and how to reach me.
> After that, anyone technically curious should be able to keep going, as deep
> as they want.

That produces the page's two speeds. The surface is skimmable — hero, two
projects with their architecture drawn in place, a career trace, five capability
groups, one contact block. Underneath every project sits a deep dive in a native
`<details>`: architecture, key decisions, failure and recovery, performance,
trade-offs, implementation notes. Nothing is hidden behind a route, a modal, or
a fetch; the depth is on the page, collapsed.

Projects come before experience on purpose. The page answers *what can this
engineer build* before *where has this engineer worked*.

The other objective is less stated but just as real: the site itself should be
evidence. A portfolio that claims care about performance and systems thinking,
and then ships a 2MB template with six web fonts, has argued against itself.

---

## How it was built: the system first, the page second

This repo was not built page-down. It was built **component-up**, in the order
[Atomic Design](https://atomicdesign.bradfrost.com/) prescribes, and the page
was carved out of the finished vocabulary afterwards.

**1. Foundations.** Before any component existed, the design direction was
settled and encoded as tokens in `src/styles/tokens.css`, in two layers:
primitives (`--n-500`, `--jade-400`) that no component may reference, and
semantics (`--surface-raised`, `--text-secondary`, `--signal`) that are the only
tokens component CSS is allowed to touch. Theming happens exclusively by
remapping layer 2 — which is why light/dark is a few dozen custom property
reassignments and not a second stylesheet.

**2. Atoms.** `Button`, `Tag`, `Eyebrow`, `Ruler`, `StatusDot`, `TextLink`,
`ArchNode`, `ThemeToggle`, `Icon`, `Reveal` — the smallest things with a
behaviour of their own.

**3. Molecules.** `SectionHeading`, `TagList`, `MetricReadout`, `Disclosure`,
`LinkRow` — atoms in fixed relationships.

**4. Organisms.** `ArchitectureDiagram`, `CareerTrace`, `ProjectBlock`,
`ExperienceEntry`, `ExpertiseGroup`, `ContactBlock`, `Navbar` — self-contained
regions that own real behaviour.

**5. Templates.** `Section` — the shared shell every section on the page sits in.

**6. Sections, last.** `Hero`, `Projects`, `Experience`, `Expertise`, `Contact`
are thin. They compose organisms and read content from `src/data`. Almost no
section owns styling of its own, because by the time they were written there was
nothing left for them to invent.

The payoff of that order is `/design-system`. It is not a screenshot gallery or
a hand-written spec — it imports and renders the *same* components the portfolio
does, so it cannot drift from the site. If a token changes, both pages change.
It ships with the site (noindex) because for this particular portfolio, the
system is as much the work as the page is.

---

## The design direction — "Instrument"

The brief was modern, technical, precise, and emphatically not a template. The
vernacular is **measurement equipment**: drafting vellum, instrument scales,
trace waterfalls, an oscilloscope screen at rest.

- **The substrate is vellum-grey**, not white and not black — a neutral ramp
  with a faint petrol-green cast, so accents sit in the same family as the
  ground instead of fighting it.
- **Colour describes system behaviour, never vendor identity.** Jade is signal
  and live data, ultramarine is structure and synchronous flow, amber is caution
  and failure paths. A stack list is therefore monochrome; a diagram is not.
- **The structural device is a measurement rule** — a hairline with minor ticks
  every 12px and a major tick every 60px. It divides sections, underlines
  headings, marks the active nav item, and reappears as the tick before every
  list item. It encodes position, so it is information rather than ornament.
- **Two faces, both self-hosted latin-subset variable woff2, 73KB total.**
  Archivo for prose, Martian Mono (condensed and tracked out) for labels, data,
  and diagram annotation.

Deliberately avoided: neon-on-black terminal styling, a wall of technology
logos, glassmorphism, gradient hero blobs, and card-everything layouts.

---

## Content is data, and so are the diagrams

Sections read from `src/data` and nowhere else, so adding a project or a role is
a data change, not a layout change.

- **Diagrams are data.** Each project declares `stages` and `edges`;
  `ArchitectureDiagram` measures the resulting layout in the DOM and draws the
  connectors itself, in either orientation.
- **The career axis is derived.** Roles carry `from`/`to` as `YYYY-MM`; segment
  positions and axis ticks are computed from those, so the timeline cannot drift
  from the dates.
- **Missing links are modelled, not faked.** A `demoUrl: null` renders a pending
  marker rather than a link that goes nowhere.

Client JavaScript, in full: a pre-paint theme applier, one `IntersectionObserver`
for reveals, the navbar's compact menu and active-section marker, the diagram's
measure/hover/pin behaviour, and copy-to-clipboard on the email address. All
vanilla, all small. React was considered and not added — nothing on the page
needs client state that outlives a single interaction.

---

## Repo layout

```
src/
├── data/                  content — the only place facts live
│   ├── types.ts           the content model
│   ├── site.ts            identity, links, nav, hero flow
│   ├── projects.ts        case studies incl. architecture + deep dives
│   ├── experience.ts      roles + the derived career axis
│   └── expertise.ts       capability groups
├── components/
│   ├── atoms/             ── the design system, built in this order
│   ├── molecules/
│   ├── organisms/
│   ├── templates/
│   ├── design-system/     Specimen + Swatch, used only by /design-system
│   └── sections/          Hero · Projects · Experience · Expertise · Contact
├── layouts/BaseLayout.astro
├── styles/                fonts · tokens · reset · base · motion
└── pages/
    ├── index.astro        the portfolio
    └── design-system.astro the system it is built from (noindex)
docs/                      the build log — see below
```

---

## Running it locally

Requires **Node ≥ 22.12** and **pnpm**.

```sh
pnpm install
pnpm dev        # http://localhost:4321
```

Then open `/` for the portfolio and `/design-system` for the system behind it.
When changing anything visual, work in `/design-system` first — if a change
needs a new token or a new component, it belongs there before it appears on the
page.

| Command        | Action                                        |
| :------------- | :-------------------------------------------- |
| `pnpm install` | Install dependencies                          |
| `pnpm dev`     | Dev server at `localhost:4321`                |
| `pnpm build`   | Static build to `./dist/`                     |
| `pnpm preview` | Serve the production build locally            |

---

## Deployment

`pnpm build` emits fully static assets to `dist/`. Pushing to `master` triggers
`.github/workflows/deploy.yml`, which builds, assumes an AWS role via OIDC,
syncs `dist/` to S3, and invalidates the CloudFront distribution. No backend, no
server runtime, nothing to keep alive.

---

## The build log

`docs/` holds the actual working documents, in order, and they are worth reading
if you are curious how the thing was reasoned about rather than just how it
turned out:

| Doc | What it covers |
| :-- | :-- |
| `01-plan.md` | The brief, the fixed decisions, the section structure |
| `02-design-system.md` | The "Instrument" direction, tokens, type, colour |
| `03-implementation.md` | Architecture, the content model, what is still open |
| `04-experience-timeline.md` | Turning three role blocks into one continuous career trace |
| `05-content-refactor.md` | Making the project deep dives less dense without losing depth |

---

## Reusing this

The content in `src/data` is mine. The design system is deliberately generic
underneath it — if the tokens, the atomic layering, or the diagram-as-data
approach are useful to you, take them. Attribution appreciated, not required.
