/**
 * Identity, links and navigation.
 *
 * ─────────────────────────────────────────────────────────────────────
 * TODO before deploying — the only values on the site that are guesses.
 * Everything else comes from the plan.
 *   · GITHUB_USER / LINKEDIN_SLUG — confirm the real handles
 *   · repo URLs in src/data/projects.ts
 *   · public/resume.pdf — the resume
 *   · demo URLs stay null until the deployments are up
 * ─────────────────────────────────────────────────────────────────────
 */
const GITHUB_USER = "tannu13";
const LINKEDIN_SLUG = "tanujpant13";

export const site = {
  name: "Tanuj Pant",
  monogram: "TP",
  title: "Full-Stack Engineer · Distributed Systems · AI",
  positioning:
    "Full-stack engineer with 7+ years building and scaling production systems, with a focus on performance, reliability, distributed systems and AI engineering.",
  email: "tanujpant13@gmail.com",
  githubUrl: `https://github.com/${GITHUB_USER}`,
  githubHandle: `@${GITHUB_USER}`,
  linkedinUrl: `https://www.linkedin.com/in/${LINKEDIN_SLUG}/`,
  linkedinHandle: `in/${LINKEDIN_SLUG}`,
  resumeUrl: "/resume.pdf",
  contactPrompt: "Have an interesting engineering problem? Let's talk.",
  seo: {
    title: "Tanuj Pant — Full-Stack Engineer · Distributed Systems · AI",
    description:
      "Full-stack engineer with 7+ years building and scaling production systems. Event-driven trading infrastructure, AI coding platforms, and the performance work in between.",
  },
} as const;

export const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Expertise", href: "#expertise" },
  { label: "Contact", href: "#contact" },
];

/** The hero's technical visual: the shape every system on this page
    has in common — something happens, it is written down, something
    reads it, the result is kept. */
export const heroFlow = {
  stages: [
    { nodes: [{ id: "h-event", label: "Event", kind: "client" as const }] },
    { nodes: [{ id: "h-queue", label: "Log", kind: "stream" as const }] },
    { nodes: [{ id: "h-worker", label: "Worker", kind: "engine" as const }] },
    { nodes: [{ id: "h-store", label: "Store", kind: "store" as const }] },
  ],
  edges: [
    { from: "h-event", to: "h-queue", mode: "sync" as const, animated: true },
    { from: "h-queue", to: "h-worker", mode: "async" as const, animated: true },
    { from: "h-worker", to: "h-store", mode: "async" as const, animated: true },
    { from: "h-queue", to: "h-store", mode: "degraded" as const },
  ],
};
