/**
 * The site's content model. Sections read from these shapes only, so
 * adding a project or a role is a data change, not a UI change.
 */

/* ---------- Architecture diagrams ---------------------------------- */

/** What a component is. Drawn as border treatment, never as colour. */
export type NodeKind = 'client' | 'service' | 'engine' | 'store' | 'stream' | 'external';

/** How data moves along a connection. Drawn as colour. */
export type EdgeMode = 'sync' | 'async' | 'degraded';

export interface DiagramNode {
  id: string;
  label: string;
  sub?: string;
  kind?: NodeKind;
}

export interface DiagramStage {
  label?: string;
  nodes: DiagramNode[];
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  mode?: EdgeMode;
  animated?: boolean;
}

export interface Architecture {
  stages: DiagramStage[];
  edges: DiagramEdge[];
  caption?: string;
}

/* ---------- Projects ------------------------------------------------ */

export interface DeepDiveSection {
  title: string;
  body: string[];
}

export interface Project {
  id: string;
  index: string;
  title: string;
  description: string;
  technologies: string[];
  concepts: string[];
  /** null until the deployment exists — the UI shows a pending marker
      rather than a link that goes nowhere. */
  demoUrl: string | null;
  githubUrl: string | null;
  architecture: Architecture;
  deepDive: DeepDiveSection[];
}

/* ---------- Experience ---------------------------------------------- */

export interface Role {
  id: string;
  company: string;
  role: string;
  location: string;
  /** Inclusive months, `YYYY-MM`. Positions on the career axis are
      derived from these, so the timeline cannot drift from the dates. */
  from: string;
  to: string;
  current?: boolean;
  tone?: 'signal' | 'flow' | 'neutral';
  stories: string[];
  detail?: string[];
  metric?: { value: string; unit?: string; label: string };
}

/* ---------- Expertise ------------------------------------------------ */

export interface ExpertiseArea {
  title: string;
  summary: string;
  items: string[];
}
