### Prompt

I like the current direction of the Experience section, where my career history is represented as a **timeline/trace** rather than as three disconnected experience blocks. However, the timeline context is not immediately obvious to a first-time visitor.

There are two related issues I want to address:

1. **The timeline/ruler disappears when scrolling.**
   The year ruler currently sits above the first experience, so once the user scrolls down to the second or third experience, that temporal context is lost. The user can see the individual experience bars, but it is no longer immediately clear that they are looking at different segments of one continuous career timeline.

2. **The three experience bars currently use different colors.**
   I think this makes the experiences feel more like separate visual elements rather than segments of the same timeline. I'd prefer a simpler visual system using only **two states**:
   - **Green:** the currently active/in-focus experience.
   - **Gray:** all other experiences.

### Proposed interaction

Keep the **entire career timeline visible as one continuous trace throughout the Experience section**.

The three experiences should always be represented on the same timeline, with their relative positions and durations preserved. The timeline/ruler should remain visible while scrolling through the Experience section, potentially using a sticky treatment if appropriate.

As the user scrolls through the experience content:

- The experience currently in focus — ideally the one closest to the center of the viewport — becomes **green**.
- The other experience segments remain visible but become **gray**.
- As the user scrolls from FreightExchange → Wootag → Pinch / ACL Mobile, the highlighted green segment should move accordingly.
- The year ruler should remain available as a persistent reference, so the user can always understand **where the current experience sits within the overall 2018–2026 timeline**.

For example:

**While viewing FreightExchange:**

`[FreightExchange — GREEN] [Wootag — GRAY] [Pinch/ACL — GRAY]`

**While viewing Wootag:**

`[FreightExchange — GRAY] [Wootag — GREEN] [Pinch/ACL — GRAY]`

**While viewing Pinch / ACL Mobile:**

`[FreightExchange — GRAY] [Wootag — GRAY] [Pinch/ACL — GREEN]`

The important part is that **all three segments remain visible at all times**. Only their active/inactive visual state changes.

### Design goal

The timeline should function as a **persistent visual map of my career**, rather than being something the user has to infer from each individual experience block.

A visitor should be able to enter the section at any scroll position and immediately understand:

> "This is one continuous timeline, these are the three companies/experiences within it, and this is the part of the timeline I'm currently reading."

Please preserve the existing visual language, typography, spacing, and overall technical/engineering aesthetic. This should be an evolution of the current interaction rather than a redesign of the section.

Also keep the interaction subtle — the timeline should provide **context**, not become the primary visual focus or feel overly animated.
