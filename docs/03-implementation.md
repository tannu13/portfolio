# Phase 6 — Implementation

**Status: implemented.** The portfolio is at `/`; the design system it is built
from is at `/design-system`.

---

## Architecture

Astro, static output, no UI framework. React was not added: nothing on the page
needs client-side state that outlives a single interaction, so every section is
an Astro component and the only JavaScript is a handful of small vanilla
modules.

```
src/
├── data/            content — the only place facts live
│   ├── types.ts     the content model
│   ├── site.ts      identity, links, nav, hero flow
│   ├── projects.ts  two projects incl. architecture + deep dives
│   ├── experience.ts three roles + the derived career axis
│   └── expertise.ts five capability groups
├── components/
│   ├── atoms/ molecules/ organisms/ templates/   the design system
│   └── sections/    Hero · Projects · Experience · Expertise · Contact
├── layouts/BaseLayout.astro
├── styles/          fonts · tokens · reset · base · motion
└── pages/
    ├── index.astro          the portfolio
    └── design-system.astro  the system, noindex
```

Client JavaScript, all of it:

| Module  | Job                                                                                     |
| ------- | --------------------------------------------------------------------------------------- |
| theme   | applies a stored theme before first paint; toggles and remembers                        |
| reveal  | one IntersectionObserver, reveals each element once                                     |
| navbar  | compact menu, and the active-section marker                                             |
| diagram | measures connectors from the DOM, runs the entrance, highlights on hover, pins on click |
| copy    | copies the email address and confirms in place                                          |

## Content model

Sections read from `src/data` and nothing else, so adding a project or a role is
a data change. Notably:

- **Diagrams are data.** `stages` and `edges` per project; the component
  measures the layout and draws the connectors, in either orientation.
- **Deep dives are data.** Six titled sections per project — architecture, key
  decisions, failure and recovery, performance, trade-offs, implementation
  notes — rendered into a native `<details>` so they stay on the page and stay
  in the document.
- **The career axis is derived.** Each role carries `from`/`to` as `YYYY-MM`;
  the span positions and the axis ticks are computed from those, so the
  timeline cannot drift from the dates.
- **Missing links are modelled, not faked.** `demoUrl: null` renders a pending
  marker instead of a link that goes nowhere.

## Page

```
#home        Hero — name, title, positioning, actions, and the shape every
             system on this page has in common, drawn in the same language the
             project diagrams use
#projects    Two case studies, each with its architecture in place and its
             deep dive underneath
#experience  Three roles as spans on one career trace, quieter than projects
#expertise   Five capability groups, typography only
#contact     One address, three links
```

Projects come before experience on purpose: the page answers _what can this
engineer build_ before _where has this engineer worked_.

Section numbers were dropped from the page. Numbering the projects means
something — there are two, in order of weight. Numbering the sections as well
put two `01`s next to each other and told the reader nothing.

---

## Open items

These are the things that are wrong on purpose, because guessing would be worse:

1. **Live demo URLs are null**, so both projects show a pending marker.

## Not done yet

Phase 7 (performance pass and CDN deployment), Phase 8 (Open Graph, sitemap,
robots.txt, full accessibility audit) and Phase 9 (review from the recruiter,
hiring-manager and senior-engineer perspectives).
