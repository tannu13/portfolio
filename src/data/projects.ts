import type { Project } from "./types";

/**
 * TODO before deploying: `githubUrl` and `demoUrl` are null on both
 * projects because the real URLs are not known here. Null renders a
 * pending marker rather than a dead link, so the page is honest in the
 * meantime — but a portfolio with no repository links is a gap.
 */

export const projects: Project[] = [
  {
    id: "ai-coding-platform",
    index: "01",
    title: "AI Coding Platform",
    description:
      "An AI-powered coding platform inspired by Lovable, with isolated Kubernetes workspaces, an agent loop driven by LLM tool calling, real-time streaming, live previews, and sub-agent orchestration for focused work.",
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "Bun",
      "Redis",
      "Kubernetes",
      "LLMs",
    ],
    decisions: [
      {
        title: "Isolated Kubernetes workspace per conversation",
        body: "Each conversation gets its own Kubernetes pod with a shared PVC, keeping generated project state isolated while allowing the pod to be recreated independently of its lifecycle.",
      },
      {
        title: "Asynchronous agent execution",
        body: "User messages are persisted first and agent work is queued through Redis, so a long-running coding task isn't tied to the HTTP request or browser connection.",
      },
      {
        title: "Separate agent and app-runner processes",
        body: "The agent is responsible for reasoning and editing files; a dedicated app-runner container owns dependency installation and the development server. Both operate on the same shared workspace.",
      },
      {
        title: "Persistent state outside the workspace",
        body: "Conversation history lives in Postgres and chat history is backed up to S3-compatible storage, allowing the system to recreate a failed pod without losing the conversation.",
      },
      {
        title: "Sub-agents work in isolated Git worktrees",
        body: "Sub-agents can work in parallel without modifying the primary workspace directly. Their changes are returned as diff artifacts that the main agent can selectively apply.",
      },
    ],
    demoUrl: null,
    githubUrl: "https://github.com/tannu13/loveable-clone",
    architecture: {
      stages: [
        {
          label: "Client",
          nodes: [
            { id: "chat", label: "Chat UI", sub: "React", kind: "client" },
          ],
        },
        {
          label: "Session",
          nodes: [
            {
              id: "gw",
              label: "Session API",
              sub: "Bun + Express",
              kind: "service",
            },
            {
              id: "queue",
              label: "Work Queue",
              sub: "leased jobs",
              kind: "stream",
            },
          ],
        },
        {
          label: "Agent",
          nodes: [
            {
              id: "agent",
              label: "Agent Loop",
              sub: "tool calling",
              kind: "engine",
            },
            {
              id: "llm",
              label: "LLM Provider",
              sub: "streamed tokens",
              kind: "external",
            },
          ],
        },
        {
          label: "Workspace",
          nodes: [
            {
              id: "pod",
              label: "Workspace Pod",
              sub: "Kubernetes",
              kind: "service",
            },
            {
              id: "preview",
              label: "Live Preview",
              sub: "per-session URL",
              kind: "client",
            },
          ],
        },
      ],
      edges: [
        { from: "chat", to: "gw", mode: "sync", animated: true },
        { from: "gw", to: "queue", mode: "async", animated: true },
        { from: "queue", to: "agent", mode: "async", animated: true },
        { from: "agent", to: "llm", mode: "sync", animated: true },
        { from: "agent", to: "pod", mode: "sync", animated: true },
        { from: "pod", to: "preview", mode: "async", animated: true },
        { from: "agent", to: "queue", mode: "degraded" },
      ],
      caption:
        "A turn is queued rather than awaited, because a coding turn takes minutes. The agent loop drives tool calls against a pod that only this session can reach, and the preview is that pod’s own dev server.",
    },
    deepDive: [
      {
        title: "Architecture",
        body: [
          "A user message is persisted by the backend and pushed onto a Redis queue. An agent worker picks up the job, loads the conversation from Postgres, and executes the agent loop inside the conversation's Kubernetes workspace.",
          "The workspace contains separate agent and app-runner containers sharing a PVC. The agent edits the project while the app-runner owns the development server and exposes the generated application through Kubernetes Service and Ingress. Progress flows through Redis Pub/Sub → backend → WebSocket → browser.",
        ],
      },
      {
        title: "Reliability & Recovery",
        body: [
          "The system persists the conversation before agent execution begins, so a failed agent run doesn't lose the user's request.",
          "Conversation state is stored in Postgres rather than process memory, while chat history is also backed up to S3-compatible storage. If a workspace pod fails, it can be recreated and the conversation restored from persistent state rather than relying on the previous pod surviving.",
        ],
      },
      {
        title: "Performance & Scalability",
        body: [
          "Long-running agent work is asynchronous, allowing the API and WebSocket layers to remain independent of the execution time of a coding task.",
          "The app-runner is separated from the agent so generated applications can restart independently when files change. Sub-agents can also work on isolated Git worktrees, allowing focused tasks to execute without competing over the primary workspace.",
        ],
      },
      {
        title: "Trade-offs",
        body: [
          "A dedicated Kubernetes workspace per conversation provides strong isolation but introduces significant resource overhead.",
          "The shared PVC simplifies communication between the agent and app-runner, but also means workspace lifecycle and storage have to be managed separately from pod lifecycle.",
          "The architecture also deliberately keeps some production concerns open: authorization, secrets management, autoscaling, resource limits, retry/dead-letter handling, and multi-replica WebSocket scaling remain production-readiness work.",
        ],
      },
    ],
  },
  {
    id: "matching-engine",
    index: "02",
    title: "Event-Driven Perpetual Futures Matching Engine",
    description:
      "A high-performance, fault-tolerant perpetual futures trading platform built around an in-memory matching engine and a set of services that never call each other directly.",
    technologies: [
      "TypeScript",
      "Node.js",
      "Redis",
      "Redis Streams",
      "PostgreSQL",
      "Docker",
    ],
    decisions: [
      {
        title: "Single-instance deterministic matching",
        body: "All market tickers are processed sequentially through the matching engine so that order execution and balance-dependent decisions replay in exactly the same order after a failure.",
      },
      {
        title: "In-memory matching state",
        body: "The matching engine keeps the trading state in memory to achieve the low-latency execution path, while the database remains a durable record of transactions and positions.",
      },
      {
        title: "Application-level idempotency",
        body: "Each originating request receives a correlation ID. Consumers use that ID as the idempotency key rather than relying on the Redis Stream message ID, allowing retries of the same user action to remain safe.",
      },
      {
        title: "Snapshot + stream replay recovery",
        body: "The engine periodically snapshots its state to S3 and reconstructs the latest state by replaying Redis Stream events after the snapshot.",
      },
      {
        title: "Decoupled execution and persistence",
        body: "The matching engine publishes results to downstream streams while independent consumers handle database persistence and WebSocket updates, preventing those operations from blocking matching.",
      },
    ],
    demoUrl: "https://web.perps.tanujpant.com/",
    githubUrl: "https://github.com/tannu13/perp-v2",
    architecture: {
      stages: [
        {
          label: "Client",
          nodes: [
            { id: "ui", label: "Trading UI", sub: "React", kind: "client" },
          ],
        },
        {
          label: "Edge",
          nodes: [
            {
              id: "api",
              label: "Order API",
              sub: "validate, margin",
              kind: "service",
            },
          ],
        },
        {
          label: "Transport",
          nodes: [
            {
              id: "orders",
              label: "Order Stream",
              sub: "ORDER_CREATED",
              kind: "stream",
            },
          ],
        },
        {
          label: "Core",
          nodes: [
            {
              id: "engine",
              label: "Matching Engine",
              sub: "in-memory book",
              kind: "engine",
            },
          ],
        },
        {
          label: "Fan-out",
          nodes: [
            {
              id: "fills",
              label: "Fill Stream",
              sub: "ORDER_FILLED",
              kind: "stream",
            },
          ],
        },
        {
          label: "State",
          nodes: [
            {
              id: "pg",
              label: "PostgreSQL",
              sub: "trades, positions",
              kind: "store",
            },
            {
              id: "cache",
              label: "Redis",
              sub: "book snapshot",
              kind: "store",
            },
          ],
        },
      ],
      edges: [
        { from: "ui", to: "api", mode: "sync", animated: true },
        { from: "api", to: "orders", mode: "async", animated: true },
        { from: "orders", to: "engine", mode: "async", animated: true },
        { from: "engine", to: "fills", mode: "async", animated: true },
        { from: "fills", to: "pg", mode: "async", animated: true },
        { from: "fills", to: "cache", mode: "async" },
      ],
      caption:
        "An order is validated at the edge, written to a log, and matched by the single consumer of that log. Everything downstream — persistence, positions, market data — reads the result rather than waiting for it.",
    },
    deepDive: [
      {
        title: "Architecture",
        body: [
          "The API backend validates authenticated requests and pushes transactions into Redis Streams. The matching engine consumes those events and maintains the exchange state entirely in memory, handling order matching, margin verification, position tracking, and PnL calculations.",
          "Execution results are consumed independently by the DB writer and WebSocket server, keeping persistence and client updates off the matching path. The services can run as Bun processes or as containerized workloads on Kubernetes.",
        ],
      },
      {
        title: "Determinism & Idempotency",
        body: [
          "The engine intentionally processes all tickers sequentially. This avoids distributed coordination around shared user balances and, more importantly, guarantees that replaying the same event sequence produces the same decisions.",
          "For persistence, the system generates a correlation ID at the origin of a user action. The DB writer uses that ID as a unique key inside a database transaction, preventing duplicate mutations even when the same logical operation is delivered multiple times.",
        ],
      },
      {
        title: "Failure & Recovery",
        body: [
          "The matching engine periodically serializes its state and stores immutable snapshots in S3. After a restart, it loads the latest snapshot and replays the Redis Stream from the corresponding offset to reconstruct the state.",
          "This gives the system two recovery mechanisms working together: snapshots reduce replay time, while the event stream provides the missing history after the snapshot.",
        ],
      },
      {
        title: "Performance & Trade-offs",
        body: [
          "Keeping the matching state in memory avoids database round trips on the critical execution path, with the system targeting sub-millisecond transaction execution.",
          "The trade-off is deliberate: a single sequential engine limits horizontal scaling of the matching path. The design prioritizes deterministic execution and financial consistency over independently scaling multiple matching-engine instances.",
        ],
      },
    ],
  },
];
