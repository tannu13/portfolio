# Tanuj Pant — Portfolio Website

## Project Goal

Build a single-page professional portfolio for Tanuj Pant, a full-stack engineer specializing in:

> Full-Stack Engineer · Distributed Systems · AI

The portfolio should primarily serve recruiters, hiring managers, and engineers evaluating technical depth.

The site should feel like a polished engineering product rather than a generic personal portfolio.

The core objective is:

> Within 60–90 seconds, a reviewer should understand who I am, what I have built, what I have done professionally, what technical areas I specialize in, and how to contact/find me.

The portfolio should then allow technically interested reviewers to progressively explore deeper engineering details.

---

# DECISIONS ALREADY MADE

These decisions are fixed unless explicitly changed later.

## Framework / Technology

- Use **Astro** as the primary frontend framework.
- Use **TypeScript**.
- React can be used selectively through Astro's React integration where interactivity genuinely benefits from React.
- Prefer Astro's static/pre-rendered architecture.
- The final site should be deployable as static assets.
- The eventual deployment target is:
  - Object storage
  - CDN
  - No backend required for the portfolio itself
- Performance is a major priority.
- Avoid adding infrastructure solely to demonstrate technical knowledge.

## Site Structure

The portfolio is a **single-page website**.

There should not initially be separate portfolio pages for projects.

Primary sections:

1. Home / Hero
2. Projects
3. Experience
4. Technical Expertise
5. Contact

Navigation should use in-page anchors:

- `#home`
- `#projects`
- `#experience`
- `#expertise`
- `#contact`

## Navigation

The navigation should be:

- Sticky
- Compact
- Always accessible while scrolling
- Highlight the currently active section
- Include a light/dark theme toggle
- Include a Resume link
- Include:
  - Projects
  - Experience
  - Expertise
  - Contact

On mobile, collapse navigation into a compact menu.

LinkedIn should be available somewhere on the site because recruiters/interviewers may expect it, but it should NOT be a prominent part of the site's identity.

---

# DESIGN DIRECTION

## Overall Visual Direction

The desired aesthetic is:

> Modern engineering + technical

The site should feel:

- Modern
- Technical
- Sophisticated
- Minimal but not bland
- Professional
- Fast
- Interactive
- Engineering-oriented

It should NOT feel like:

- A generic developer portfolio template
- A dashboard
- A SaaS landing page
- A resume copied into HTML
- A collection of flashy animations
- A personal/lifestyle blog

The design should communicate engineering ability through the visual language itself.

---

# CONTENT STRATEGY

The portfolio should NOT simply reproduce the resume.

The resume establishes professional credibility.

The portfolio should provide:

- Stronger project presentation
- Technical architecture
- Engineering decisions
- Trade-offs
- Failure/reliability considerations
- Performance considerations
- Technical depth

Use progressive disclosure:

### Level 1

Quickly communicate:

- Who I am
- What I specialize in
- What I've built

### Level 2

Show:

- Projects
- Experience
- Technologies
- Impact

### Level 3

Allow technical reviewers to explore:

- Architecture
- Data flow
- Key engineering decisions
- Trade-offs
- Reliability
- Performance
- Implementation details

Do not overwhelm the initial viewport with technical detail.

---

# PHASE 1 — CONTENT

## 1. Hero

### Name

Tanuj Pant

### Title

Full-Stack Engineer · Distributed Systems · AI

### Supporting statement

Use a concise professional positioning statement along the lines of:

> Full-stack engineer with 7+ years of experience building and scaling production systems, with a focus on performance, reliability, distributed systems, and AI engineering.

### Hero actions

- View Projects
- Download Resume

Secondary links:

- GitHub
- LinkedIn
- Email

Do not include personal/lifestyle information.

The portfolio should remain 100% professionally focused.

---

# 2. Projects

Projects are the most important section after the hero.

Prefer two excellent, technically deep projects over many shallow projects.

## Project 01 — Event-Driven Perpetual Futures Matching Engine

Title:

> Event-Driven Perpetual Futures Matching Engine

Description:

> A high-performance, fault-tolerant, event-driven perpetual futures trading platform built around an in-memory matching engine and decoupled microservice architecture.

Technologies:

- TypeScript
- Node.js
- Redis
- Redis Streams
- PostgreSQL
- Docker

Key concepts:

- In-memory matching engine
- Event-driven architecture
- Distributed microservices
- Asynchronous messaging
- Fault tolerance
- Reliability
- High-throughput processing

Links:

- Live Demo — PLACEHOLDER
- GitHub — existing repository
- Technical Deep Dive — in-page expansion

The project should eventually expose deeper technical material covering:

- Architecture
- Order lifecycle
- Matching engine
- Event flow
- Persistence
- Failure handling
- Concurrency/correctness
- Trade-offs
- Performance

The architecture diagram should be visible directly within the project section.

Do NOT hide the architecture behind a separate page.

---

## Project 02 — Lovable Clone / AI Coding Platform

Title:

> AI Coding Platform

Description:

> An AI-powered coding platform inspired by Lovable, featuring isolated Kubernetes workspaces, LLM tool calling, real-time streaming, live previews, and multi-agent orchestration.

Technologies:

- TypeScript
- React
- Node.js
- Express
- Bun
- Redis
- Kubernetes
- LLMs

Key concepts:

- AI coding agent
- LLM tool calling
- Agent orchestration
- Multi-agent workflows
- Isolated Kubernetes workspaces
- Real-time streaming
- Live previews

Links:

- Live Demo — PLACEHOLDER
- GitHub — existing repository
- Technical Deep Dive — in-page expansion

The architecture diagram should be visible directly within the project section.

Eventually cover:

- Conversation flow
- Agent architecture
- LLM/tool interaction
- Queue/work scheduling
- Kubernetes workspace isolation
- Code generation
- Live preview architecture
- Real-time streaming
- Failure handling
- Scalability
- Trade-offs

---

# 3. Experience

Use the following professional experience as the source content.

## FreightExchange

Role:

> Developer

Location:

> Australia

Period:

> Nov 2022 – Jan 2026

Primary stories:

- Led migration from a monolith to REST-based microservices.
- Defined service boundaries and API contracts.
- Designed virtualized data tables for 10K+ records.
- Supported responsive inline and bulk editing.
- Automated carrier onboarding, rate management, and invoice reconciliation.
- Reduced manual processing from approximately 3 weeks to 1–2 days.
- Integrated Stripe as part of a SaaS business-model transition.

This should be the most prominent experience entry.

---

## Wootag

Role:

> Software Engineer

Location:

> Singapore

Period:

> Apr 2021 – Nov 2022

Primary stories:

- Built React-based workflows for interactive video advertising.
- Integrated React authoring with a lightweight Preact ad player.
- Used iframe + postMessage communication for synchronization.
- Optimized publisher-side ad delivery under strict bundle-size constraints.
- Supported lightweight ad experiences across 50+ publishers.

This entry demonstrates frontend architecture and performance engineering.

---

## Pinch / ACL Mobile

Role:

> Application Developer

Location:

> India

Period:

> Jul 2018 – Mar 2021

Primary stories:

- Built Vue.js and React applications end-to-end.
- Owned UI architecture and integrations.
- Redesigned high-volume CSV ingestion pipelines.
- Processed 1–4M-row files.
- Reworked background processing and database persistence.
- Reduced end-to-end processing time by approximately 86–95%.

This entry demonstrates data-intensive systems and performance optimization.

---

# 4. Technical Expertise

Do NOT present this as a giant list of technology logos.

Organize skills by engineering capability.

## Full-Stack

- React
- Next.js
- TypeScript
- JavaScript
- Node.js
- UI architecture
- Frontend performance

## Distributed Systems

- Microservices
- Redis
- Redis Streams
- REST APIs
- Background processing
- Async workflows
- Fault tolerance
- Idempotency
- Scalability
- System design

## Data & Performance

- PostgreSQL
- MySQL
- Bulk inserts
- Data ingestion pipelines
- Data-intensive systems
- Benchmarking
- Performance optimization
- Large dataset processing

## Infrastructure & Observability

- Docker
- Kubernetes
- Service Mesh
- OpenTelemetry
- Prometheus
- Tempo
- Loki
- Grafana
- OTLP

## AI Engineering

- Coding agents
- LLM tool calling
- Context management
- Hooks
- Compaction
- Sub-agent orchestration
- Custom coding-agent harnesses

The technologies should communicate capabilities rather than simply claim familiarity.

---

# 5. Contact

Keep the contact section simple.

Suggested messaging:

> Have an interesting engineering problem? Let's talk.

Links:

- Email
- GitHub
- LinkedIn
- Resume

No contact form is required initially.

No personal information beyond professional contact details.

---

# PHASE 2 — INFORMATION ARCHITECTURE

The single-page information architecture is:

```text
/
│
├── #home
│
├── #projects
│   ├── Perpetual Futures Matching Engine
│   └── AI Coding Platform
│
├── #experience
│   ├── FreightExchange
│   ├── Wootag
│   └── Pinch / ACL Mobile
│
├── #expertise
│
└── #contact
```

## Section ordering

Use this exact high-level ordering:

```text
Hero
  ↓
Projects
  ↓
Experience
  ↓
Technical Expertise
  ↓
Contact
```

Projects intentionally appear before professional experience.

The portfolio should primarily answer:

> What can this engineer build?

before:

> Where has this engineer worked?

---

# PHASE 3 — WIREFRAME

The wireframe should follow this structure.

## Hero

Desktop:

```text
┌─────────────────────────────────────────────────────────────┐
│ TP       Projects  Experience  Expertise  Contact     ◐   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Tanuj Pant                           [Technical Visual]     │
│                                                             │
│ Full-Stack Engineer                                        │
│ · Distributed Systems · AI                                 │
│                                                             │
│ Concise positioning statement                              │
│                                                             │
│ [View Projects] [Resume]                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

The hero should contain a technical visual representing software engineering.

Preferred concept:

An abstract distributed-system visualization involving:

- Nodes
- Services
- Connections
- Data/events moving between nodes

It should subtly represent concepts such as:

```text
Event → Queue → Worker → Database
```

or:

```text
Request → Agent → Tool → Workspace → Preview
```

The exact visual design is a Phase 4 decision.

---

# Projects

Each project should be a large technical case-study block rather than a small generic card.

Each block should contain:

1. Project number
2. Project title
3. Concise description
4. Architecture diagram
5. Key technologies
6. Key technical concepts
7. Live Demo
8. GitHub
9. Technical Deep Dive

Architecture diagrams must be visible directly in the project section.

Do not initially send users to separate project pages.

---

# Project Interactions

Architecture diagrams should be interactive where appropriate.

Examples:

Hovering over a matching-engine component:

```text
Matching Engine
       ↓
Highlight connected components
```

Hovering over Redis Streams:

```text
Redis Streams
       ↓
Highlight event flow
```

Hovering over an event:

```text
ORDER_CREATED
───────────────►
```

For the AI project:

```text
User Prompt
    ↓
Agent
    ↓
Tool Call
    ↓
Workspace
    ↓
Generated Code
    ↓
Live Preview
```

Animations should help explain the architecture.

---

# Technical Deep Dive

Each project should have an expandable technical section.

Conceptually:

```text
[ + Technical Deep Dive ]
```

When expanded:

```text
Architecture
      ↓
Key Engineering Decisions
      ↓
Failure & Recovery
      ↓
Performance
      ↓
Trade-offs
      ↓
Implementation Details
```

Keep this content on the same page.

---

# Experience

Experience should be visually quieter than Projects.

Use a timeline/list structure.

Each role should initially show:

- Company
- Role
- Dates
- 2–3 strongest engineering stories

Additional details can expand inline.

Do not make every experience entry a large card.

---

# Technical Expertise

Use a typography-driven layout.

Avoid excessive cards and logos.

Group technologies under:

- Full-Stack
- Distributed Systems
- Data & Performance
- Infrastructure & Observability
- AI Engineering

---

# Contact

End with a minimal CTA and professional links.

---

# MOBILE WIREFRAME

The mobile design should be intentionally designed rather than simply shrinking desktop.

## Mobile navigation

```text
┌──────────────────────────────┐
│ TP                       ☰   │
└──────────────────────────────┘
```

Navigation opens a compact menu.

## Mobile project

```text
01

PERPETUAL FUTURES
MATCHING ENGINE

Description

┌─────────────────────┐
│                     │
│   Architecture      │
│      Diagram        │
│                     │
└─────────────────────┘

TypeScript
Node.js
Redis
PostgreSQL

[Demo] [GitHub]

[+ Technical Details]
```

Architecture diagrams should be adapted for narrow screens rather than simply scaled down until unreadable.

---

# PHASE 4 — VISUAL DESIGN SYSTEM

## Status

This phase has NOT been finalized yet.

The coding assistant should design and propose the visual system before implementing the final UI.

Do not arbitrarily lock visual decisions before reviewing the entire site.

## Goals

The visual system should communicate:

- Modern engineering
- Technical sophistication
- Precision
- Performance
- Reliability
- AI/distributed-systems themes

It should remain:

- Clean
- Readable
- Professional
- Fast
- Accessible

## Required themes

Implement:

- Light theme
- Dark theme
- User-controlled toggle
- Respect system preference initially

## Typography

Determine:

- Primary font
- Heading hierarchy
- Body typography
- Monospace/code typography
- Responsive type scale

Avoid loading unnecessary fonts.

Performance is important.

## Color system

Design a restrained palette.

Use color primarily for:

- hierarchy
- interaction
- architecture diagrams
- active states
- technical emphasis

Do not create a visually noisy rainbow of technology colors.

## Components

Define a reusable design system for:

- Navbar
- Buttons
- Links
- Section headings
- Project blocks
- Architecture nodes
- Architecture connections
- Technology tags
- Experience entries
- Expand/collapse sections
- Theme toggle
- Footer/contact links

##### The design system should be viewable at a separate endpoint so that all the components can be seen and verified before proceeding to the next phase. Use Atomic Design System to build this out.

---

# PHASE 5 — MOTION & MICRO-INTERACTIONS

Motion is required, but it must support the content.

Core rule:

> Every animation should communicate something, provide feedback, or guide attention.

## Good animation candidates

- Architecture nodes appearing
- Connections drawing
- Data packets moving through systems
- Event flow animations
- Hovering/highlighting dependencies
- Agent/tool/workspace flow
- Subtle button/link interactions
- Active navigation indicator
- Project section reveal
- Expand/collapse transitions
- Subtle terminal/code interactions

## Avoid

- Random floating particles
- Excessive parallax
- Large page transitions
- Constant background movement
- Spinning technology logos
- Animation solely for decoration
- Anything that hurts page performance

The site should feel:

> Alive, not busy.

Respect:

```css
prefers-reduced-motion
```

and provide reduced/no motion when requested.

---

# PHASE 6 — IMPLEMENTATION

## Architecture

Use:

```text
Astro
├── Static HTML
├── Static CSS
├── Optimized assets
└── React islands only where useful
```

Prefer Astro components for:

- Layout
- Sections
- Static content
- Project presentation
- Experience
- Expertise
- Navigation where possible

Use React only when the interaction genuinely benefits from client-side state.

Avoid turning the entire application into a React SPA.

## Content model

Separate content from presentation.

Projects should conceptually have data like:

```typescript
type Project = {
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  concepts: string[];
  demoUrl: string;
  githubUrl: string;
  architecture: ...;
  deepDive: ...;
};
```

Experience should similarly be structured data.

Do not hardcode every project directly into large UI components.

This should make adding future projects straightforward.

---

# PHASE 7 — PERFORMANCE & DEPLOYMENT

Performance is a first-class requirement.

## Deployment target

Final architecture:

```text
Git Repository
      ↓
Build
      ↓
Static Astro Output
      ↓
Object Storage
      ↓
CDN
      ↓
User
```

No runtime backend should be required.

## Performance principles

Prioritize:

- Minimal JavaScript
- Static HTML
- Minimal CSS
- Tree-shaking
- Code splitting where relevant
- Optimized images
- AVIF/WebP where appropriate
- Responsive image sizes
- Lazy loading below-the-fold assets
- Minimal font loading
- System fonts where practical
- Long-lived caching for immutable assets
- Hashed/static asset filenames
- CDN caching
- Brotli/gzip compression
- No unnecessary third-party scripts

Do not add analytics, tracking, embeds, or external libraries unless there is a clear benefit.

## Performance target

The site should aim for an extremely fast initial load and excellent Core Web Vitals.

The design should not be compromised by performance, but performance should be considered whenever adding:

- animation
- images
- fonts
- JavaScript
- third-party dependencies

---

# PHASE 8 — ACCESSIBILITY & SEO

Implement:

- Semantic HTML
- Correct heading hierarchy
- Keyboard navigation
- Visible focus states
- Accessible buttons
- Accessible navigation
- Accessible theme toggle
- Reduced-motion support
- Sufficient color contrast
- Proper alt text
- Responsive design

SEO:

- Page title
- Meta description
- Open Graph metadata
- Twitter/social metadata where appropriate
- Canonical URL
- Structured semantic content
- Sitemap
- robots.txt

The site should have a clean preview when its URL is shared.

---

# PHASE 9 — REVIEW & POLISH

Before considering the portfolio complete, evaluate it from three perspectives.

## Recruiter

Can they find within ~30–60 seconds:

- Name
- Role
- Experience
- Projects
- Resume
- Contact
- LinkedIn

## Hiring Manager

Can they quickly understand:

- What I build
- My strongest engineering areas
- My professional impact
- My technical breadth

## Senior Engineer

Can they investigate:

- Architecture
- Design decisions
- Trade-offs
- Distributed systems
- Performance
- Reliability
- AI engineering

If any answer is "no", fix information architecture/content before adding more visual effects.

---

# FINAL DESIGN PRINCIPLES

1. **Projects are the centerpiece.**
2. **Technical depth should be visible, not hidden.**
3. **Architecture diagrams are first-class content.**
4. **Animations should explain or enhance the engineering story.**
5. **The site should feel modern and technical, not like a dashboard.**
6. **Single page with in-page navigation.**
7. **Sticky navigation.**
8. **Light/dark theme toggle.**
9. **Professional information only.**
10. **LinkedIn exists but remains secondary.**
11. **Two strong technical projects are better than many shallow projects.**
12. **Astro should handle the majority of the site.**
13. **React should only be used where interactivity warrants it.**
14. **Static output is the deployment target.**
15. **Object storage + CDN is the eventual hosting architecture.**
16. **Performance is a first-class design constraint.**
17. **No unnecessary backend or infrastructure.**
18. **No excessive animation or visual noise.**
19. **Accessibility and reduced-motion support are required.**
20. **Do not optimize for showing off technology; optimize for communicating engineering ability.**

---

# EXECUTION ORDER

Follow this order strictly:

```text
PHASE 1
Content
        ↓
PHASE 2
Information Architecture
        ↓
PHASE 3
Wireframe
        ↓
PHASE 4
Visual Design System
        ↓
PHASE 5
Motion / Micro-interactions
        ↓
PHASE 6
Astro + React Implementation
        ↓
PHASE 7
Performance + CDN Deployment
        ↓
PHASE 8
Accessibility + SEO
        ↓
PHASE 9
Review + Polish
```

Do not skip directly to implementation.

Before moving from one phase to the next, validate that the current phase satisfies its goals.

For the current implementation task, **begin with Phase 4: Visual Design System**.

Do not implement the complete website yet.

First establish the visual language, typography, spacing, color system, component styling, architecture-diagram visual language, responsive principles, and animation language. Then use that system consistently during implementation.
