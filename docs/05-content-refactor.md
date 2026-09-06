# Portfolio Content Update — Project Deep Dives Only

## Objective

Update **only the project sections** of the portfolio at `tanujpant.com`.

The goal is to make the two project case studies less dense while preserving their technical depth.

**Do not review, redesign, refactor, or modify the rest of the portfolio.**

The two projects are:

1. AI Coding Platform / Lovable Clone
2. Perpetual Futures Matching Engine

---

# Scope Rules

### You MAY modify

- Project "Engineering" / "Key Engineering Decisions" content
- Project technical deep-dive content
- Headings immediately associated with those sections
- Minor spacing/layout adjustments required because the content structure is changing

### You MUST NOT modify

- Hero section
- Navigation
- Experience section
- Technical Expertise section
- Contact section
- Footer
- Architecture diagrams
- Project descriptions
- Project stack/technology lists
- Project links
- Animations
- Colors
- Typography
- Overall layout/design system
- Any functionality unrelated to the project deep dives

Do not perform a general content cleanup.

---

# Step 1 — Locate the Existing Project Deep Dives

Find the existing deep-dive sections for:

- AI Coding Platform
- Perpetual Futures Matching Engine

Understand the existing component/data structure before editing.

Do not restructure components unless necessary to replace the existing deep-dive content.

---

# Step 2 — Replace "Engineering" With "Key Engineering Decisions"

For each project, replace the existing engineering-concepts list with a section titled:

**Key Engineering Decisions**

These should be presented as **5 numbered decisions**.

Important:

- Use the wording below **exactly**.
- Do not rewrite, shorten, embellish, or substitute terminology.
- Preserve the numbering.
- Each decision should have a short title followed by the provided explanation.
- Do not add additional decisions.

---

# AI Coding Platform

## Key Engineering Decisions

### 01 — Isolated Kubernetes workspace per conversation

Each conversation gets its own Kubernetes pod with a shared PVC, keeping generated project state isolated while allowing the pod to be recreated independently of its lifecycle.

### 02 — Asynchronous agent execution

User messages are persisted first and agent work is queued through Redis, so a long-running coding task isn't tied to the HTTP request or browser connection.

### 03 — Separate agent and app-runner processes

The agent is responsible for reasoning and editing files; a dedicated app-runner container owns dependency installation and the development server. Both operate on the same shared workspace.

### 04 — Persistent state outside the workspace

Conversation history lives in Postgres and chat history is backed up to S3-compatible storage, allowing the system to recreate a failed pod without losing the conversation.

### 05 — Sub-agents work in isolated Git worktrees

Sub-agents can work in parallel without modifying the primary workspace directly. Their changes are returned as diff artifacts that the main agent can selectively apply.

---

# Perpetual Futures Matching Engine

## Key Engineering Decisions

### 01 — Single-instance deterministic matching

All market tickers are processed sequentially through the matching engine so that order execution and balance-dependent decisions replay in exactly the same order after a failure.

### 02 — In-memory matching state

The matching engine keeps the trading state in memory to achieve the low-latency execution path, while the database remains a durable record of transactions and positions.

### 03 — Application-level idempotency

Each originating request receives a correlation ID. Consumers use that ID as the idempotency key rather than relying on the Redis Stream message ID, allowing retries of the same user action to remain safe.

### 04 — Snapshot + stream replay recovery

The engine periodically snapshots its state to S3 and reconstructs the latest state by replaying Redis Stream events after the snapshot.

### 05 — Decoupled execution and persistence

The matching engine publishes results to downstream streams while independent consumers handle database persistence and WebSocket updates, preventing those operations from blocking matching.

---

# Step 3 — Replace Technical Deep Dive Structure

Each project should have **exactly four** technical deep-dive sections.

Do not retain the current six-section structure.

Remove/replace the existing sections as necessary.

The final structure should be:

```text
Key Engineering Decisions

01 ...
02 ...
03 ...
04 ...
05 ...

Technical Deep Dive

Architecture
...

Reliability & Recovery / Determinism & Idempotency
...

Performance & Scalability / Failure & Recovery
...

Trade-offs
...
```

Use the exact project-specific content below.

---

# AI Coding Platform — Technical Deep Dive

## Architecture

A user message is persisted by the backend and pushed onto a Redis queue. An agent worker picks up the job, loads the conversation from Postgres, and executes the agent loop inside the conversation's Kubernetes workspace.

The workspace contains separate agent and app-runner containers sharing a PVC. The agent edits the project while the app-runner owns the development server and exposes the generated application through Kubernetes Service and Ingress. Progress flows through Redis Pub/Sub → backend → WebSocket → browser.

## Reliability & Recovery

The system persists the conversation before agent execution begins, so a failed agent run doesn't lose the user's request.

Conversation state is stored in Postgres rather than process memory, while chat history is also backed up to S3-compatible storage. If a workspace pod fails, it can be recreated and the conversation restored from persistent state rather than relying on the previous pod surviving.

## Performance & Scalability

Long-running agent work is asynchronous, allowing the API and WebSocket layers to remain independent of the execution time of a coding task.

The app-runner is separated from the agent so generated applications can restart independently when files change. Sub-agents can also work on isolated Git worktrees, allowing focused tasks to execute without competing over the primary workspace.

## Trade-offs

A dedicated Kubernetes workspace per conversation provides strong isolation but introduces significant resource overhead.

The shared PVC simplifies communication between the agent and app-runner, but also means workspace lifecycle and storage have to be managed separately from pod lifecycle.

The architecture also deliberately keeps some production concerns open: authorization, secrets management, autoscaling, resource limits, retry/dead-letter handling, and multi-replica WebSocket scaling remain production-readiness work.

---

# Perpetual Futures Matching Engine — Technical Deep Dive

## Architecture

The API backend validates authenticated requests and pushes transactions into Redis Streams. The matching engine consumes those events and maintains the exchange state entirely in memory, handling order matching, margin verification, position tracking, and PnL calculations.

Execution results are consumed independently by the DB writer and WebSocket server, keeping persistence and client updates off the matching path. The services can run as Bun processes or as containerized workloads on Kubernetes.

## Determinism & Idempotency

The engine intentionally processes all tickers sequentially. This avoids distributed coordination around shared user balances and, more importantly, guarantees that replaying the same event sequence produces the same decisions.

For persistence, the system generates a correlation ID at the origin of a user action. The DB writer uses that ID as a unique key inside a database transaction, preventing duplicate mutations even when the same logical operation is delivered multiple times.

## Failure & Recovery

The matching engine periodically serializes its state and stores immutable snapshots in S3. After a restart, it loads the latest snapshot and replays the Redis Stream from the corresponding offset to reconstruct the state.

This gives the system two recovery mechanisms working together: snapshots reduce replay time, while the event stream provides the missing history after the snapshot.

## Performance & Trade-offs

Keeping the matching state in memory avoids database round trips on the critical execution path, with the system targeting sub-millisecond transaction execution.

The trade-off is deliberate: a single sequential engine limits horizontal scaling of the matching path. The design prioritizes deterministic execution and financial consistency over independently scaling multiple matching-engine instances.

---

# Step 4 — Preserve Existing Visual Treatment

The content should fit into the **existing project UI**.

Do not introduce a new card system, accordion, modal, tabs, or separate project pages.

If the current deep dive uses expandable/collapsible sections, retain that interaction.

If it currently displays all sections inline, retain that behavior.

The goal is **content reduction**, not a UI redesign.

---

# Step 5 — Check Typography and Spacing

Because the new content is shorter:

- Ensure headings have appropriate spacing.
- Ensure the five engineering decisions remain visually scannable.
- Ensure the four deep-dive sections don't visually run together.
- Don't increase font sizes unnecessarily.
- Don't introduce new visual treatments.
- Don't add decorative elements.

A recruiter should be able to quickly scan:

```text
Key Engineering Decisions
↓
5 decisions
↓
Technical Deep Dive
↓
4 sections
```

---

# Step 6 — Important Terminology Rules

These rules are mandatory.

### Lovable project

Use:

- **"inspired by Lovable"** if referring to the product inspiration.
- **"Kubernetes workspace"**
- **"shared PVC"**
- **"agent worker"**
- **"app-runner"**
- **"Redis queue"**
- **"Redis Pub/Sub"**
- **"Postgres"**
- **"S3-compatible storage"**
- **"isolated Git worktrees"**

Do **not** replace these with generic terminology such as:

- "cloud workspace"
- "message broker"
- "database"
- "containerized environment"
- "distributed queue"

The concrete terminology is intentional.

### Perps project

Use:

- **"single-instance deterministic matching"**
- **"all market tickers are processed sequentially"**
- **"in-memory matching state"**
- **"correlation ID"**
- **"application-level idempotency"**
- **"Redis Streams"**
- **"snapshot + stream replay recovery"**
- **"S3"**
- **"DB writer"**

Do **not** change "single-instance deterministic matching" to "one writer per book."

Do **not** describe the idempotency mechanism as relying on Redis Stream IDs.

The distinction between **correlation ID** and **Redis Stream message ID** is intentional and technically important.

---

# Step 7 — Remove Obsolete Content

After implementing the new content:

- Remove the old six-section deep-dive structure.
- Remove the old "Implementation Notes" section.
- Remove duplicate explanations that now exist in both Key Engineering Decisions and Technical Deep Dive.
- Remove any old engineering bullets that contradict the new wording.

Do not leave old content hidden in the DOM or unused data structures unless the existing architecture requires it.

---

# Step 8 — Verify

Run the project's normal build/check commands.

Verify:

1. Both projects still render correctly.
2. Architecture diagrams are unchanged.
3. Project descriptions are unchanged.
4. Links are unchanged.
5. Existing expand/collapse interactions still work.
6. No unrelated sections changed.
7. No old deep-dive content remains.
8. Mobile layout still works.
9. No TypeScript/build errors are introduced.

Finally, provide a concise summary containing:

```text
Changed:
- AI Coding Platform: 5 decisions + 4 deep-dive sections
- Perps: 5 decisions + 4 deep-dive sections

Unchanged:
- Project descriptions
- Architecture diagrams
- Stack
- Links
- Rest of portfolio

Validation:
- Build/check result
```

**Do not make any other portfolio changes as part of this task.**
