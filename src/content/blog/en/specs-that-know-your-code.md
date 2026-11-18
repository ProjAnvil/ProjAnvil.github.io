---
title: "Specs that know your code"
description: "Why we paired Porto with SCV, and why a spec that ignores your modules is worse than no spec at all."
pubDate: 2026-11-12
lang: en
tags: [porto, scv, workflow]
order: 2
---

A requirements document that ignores the existing system is not a plan. It is a wish list.

Porto was built to fix a specific failure: a PRD goes in, generic boilerplate comes out, and engineering spends the next sprint re-cutting the decomposition. The spec looks complete. It just does not refer to any module that exists.

## Ground the spec in something real

Porto retrieves context from a knowledge base built by SCV. SCV reads the codebase and emits four documents: a positioning README, a five-minute summary, an architecture document with diagrams, and a file-by-file index.

Those documents describe the systems, modules and APIs that actually exist. When Porto generates a subsystem spec, it can point at them. The result is a spec that says "extend the existing ledger service" instead of "add a ledger service".

## Make quality observable

Each spec goes through a generate, critique and refine loop scored on a twelve-point rubric. Template-grade output climbs from roughly 3.2 to 11.4. Every retrieval, tool call and rework decision is recorded, so a reviewer can see why the spec says what it says.

If the model is unavailable, deterministic fallbacks keep the pipeline running. The model is a quality amplifier, not an on/off switch.

## Try it without keys

Both projects run locally. Clone SCV, run `./install.sh`, then point Porto at the generated knowledge base. The full flow works without an API key; adding one improves the writing, not the availability.
