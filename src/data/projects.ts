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
      "An AI-powered coding platform in the shape of Lovable: isolated Kubernetes workspaces, an agent loop driven by LLM tool calling, real-time streaming, live previews, and sub-agent orchestration for focused work.",
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
    concepts: [
      "Agent loop",
      "LLM tool calling",
      "Sub-agent orchestration",
      "Workspace isolation",
      "Leased job queue",
      "Token streaming",
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
          "A prompt enters through the session API, which owns the conversation and nothing else. The work is queued in Redis rather than handled inline, because a coding turn takes minutes, not milliseconds.",
          "A worker leases the job and runs the agent loop: send the conversation and the tool schema to the model, receive a tool call, execute it against the session’s workspace, append the result, repeat until the model stops asking. Token and tool events stream back to the browser as they happen.",
          "The workspace is a pod in Kubernetes holding the project files, a package manager and a dev server. Its preview is exposed on a per-session URL, so what the user sees is the code actually running, not a re-render of it.",
        ],
      },
      {
        title: "Key engineering decisions",
        body: [
          "The model never touches the filesystem directly. Every effect goes through a named tool with a typed schema — read, write, list, run — so the blast radius of a bad generation is exactly what those tools allow.",
          "One workspace per session, isolated at the pod boundary. Generated code is untrusted code, and the isolation boundary is the one the platform already has.",
          "Long work is queued, not awaited. The request that starts a turn returns immediately; everything after that arrives over the stream, so a browser tab is never the thing holding the work open.",
          "Sub-agents get their own context. A focused task — find where this is configured, summarise this directory — runs as a fresh conversation and returns only its answer, so the parent’s context stays about the parent’s problem.",
        ],
      },
      {
        title: "Failure and recovery",
        body: [
          "Jobs are leased, not consumed. A worker that dies mid-turn loses its lease and the job returns to the queue rather than disappearing with the process.",
          "The conversation is the state, so a retry resumes from the last completed tool call instead of starting the turn again.",
          "A model call that fails, times out, or returns arguments that do not fit the schema is handed back to the model as a tool error. Recovering from its own mistake is something the model is good at; throwing at the boundary is not.",
          "Workspaces carry TTLs and resource limits and hold no outbound credentials, so an abandoned session expires on its own and a runaway process is bounded by the pod rather than by the cluster.",
          "A disconnected browser does not cancel a turn. Reconnecting replays the events it missed.",
        ],
      },
      {
        title: "Performance",
        body: [
          "Responses stream token by token, so the first useful output appears in about the time the model takes to start talking rather than the time it takes to finish.",
          "Context is managed rather than accumulated: superseded tool output is compacted out of the conversation, which keeps both latency and cost roughly flat as a session gets long.",
          "Workspace pods are pre-warmed, because cold-starting a container and installing dependencies is the slowest thing in a first turn.",
          "File reads are ranged and directory listings are depth-limited, so a large repository does not turn into a large prompt.",
        ],
      },
      {
        title: "Trade-offs",
        body: [
          "A pod per session buys strong isolation and pays for idle capacity. Pre-warming makes it faster and more expensive still.",
          "Tool calling is slower than letting the model write a script and running it, and worth it: a typed tool surface is something you can reason about, and a shell is not.",
          "Compaction trades fidelity for room. Anything summarised away is gone, so what gets compacted is a product decision, not a technical one.",
          "Streaming makes the interface feel immediate and makes every failure partial. The client has to be able to render a turn that stopped halfway.",
        ],
      },
      {
        title: "Implementation notes",
        body: [
          "React and TypeScript on the front end; the session API runs on Bun with Express-compatible routing; Redis carries both the queue and the event streams.",
          "Workspace lifecycle is driven through the Kubernetes API — create, expose, expire — rather than through a bespoke scheduler.",
          "The agent loop is a plain state machine over the message list, which keeps it testable without a model in the loop.",
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
    concepts: [
      "In-memory matching",
      "Event-driven architecture",
      "Single-writer ordering",
      "Idempotent consumers",
      "Replay-based recovery",
      "High-throughput processing",
    ],
    demoUrl: null,
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
          "Services communicate only through Redis Streams. An order enters through the REST API, which validates it and checks margin, then appends an ORDER_CREATED event to the order stream. The API’s job ends there.",
          "The matching engine is the single consumer of that stream. It holds the book entirely in memory — price levels in a sorted structure, orders within a level in FIFO order — so matching is a walk over pointers rather than a query. Fills are published to a second stream, from which independent consumers persist trades to PostgreSQL, update positions, and push market data to connected clients.",
          "Nothing downstream can block a match, and nothing upstream needs to know who is listening.",
        ],
      },
      {
        title: "Key engineering decisions",
        body: [
          "One writer per book. Because the engine is the only consumer of one stream, order arrival has a total order and matching is deterministic. Sequencing is delegated to the log, which removes locks from the hot path and consensus from the system entirely.",
          "The book lives in memory; PostgreSQL is a record of what happened, never a participant in deciding what happens next.",
          "Every consumer is idempotent and keyed by event id. A stream gives at-least-once delivery, so duplicate handling is a requirement of every consumer rather than a property of the transport.",
          "Rejections are events. A failed margin check produces ORDER_REJECTED rather than an exception at the API boundary, so the client and the audit trail see the same history.",
        ],
      },
      {
        title: "Failure and recovery",
        body: [
          "Consumers acknowledge after their write commits, not on receipt. A process that dies mid-write replays its message instead of losing it.",
          "A restarted engine reads the stream from its last acknowledged offset, rebuilds the book in memory, and refuses to match until it has caught up. Recovery is replay, not repair.",
          "Unacknowledged entries in a consumer group are claimed after a visibility timeout, so a dead worker’s backlog is picked up by a live one rather than stranded.",
          "Because the log is the source of truth, a corrupted projection can be dropped and rebuilt rather than reconciled.",
        ],
      },
      {
        title: "Performance",
        body: [
          "A limit order costs a lookup of a price level and a walk along a queue. There is no database round trip on the matching path.",
          "Persistence is asynchronous and batched. A slow write shows up as depth in the fill stream, not as latency on a match.",
          "Streams are trimmed to a bounded length, so Redis memory stays flat while the durable history accumulates in PostgreSQL.",
          "Events carry the minimum a consumer needs to act, which keeps serialisation off the critical path as fan-out grows.",
        ],
      },
      {
        title: "Trade-offs",
        body: [
          "Determinism costs horizontal scale. One writer per book bounds an instrument to a single core; the system scales per market, not per instance.",
          "At-least-once delivery pushes correctness into every consumer. Idempotency is not an optimisation here, it is the contract.",
          "In-memory state makes recovery time proportional to replay length. Snapshots bound it, at the cost of one more thing that has to be right.",
          "Eventual consistency is visible to the product: a fill exists before it is durable, so the interface has to represent a state the database has not caught up to yet.",
        ],
      },
      {
        title: "Implementation notes",
        body: [
          "TypeScript throughout. The API and the engine are separate Node processes with no shared runtime state — the only thing between them is the log.",
          "Each service ships as a container; a single compose file brings up Redis, PostgreSQL and the services for a local run.",
          "Event payloads are versioned and consumers ignore fields they do not know, so a producer can add information without a coordinated deploy.",
        ],
      },
    ],
  },
];
