---
title: "What a harness agent actually needs"
description: "The model is not the product. The harness around it is. A field guide to the capabilities an agent needs in a real engineering team."
pubDate: 2026-11-18
lang: en
tags: [architecture, agents]
order: 3
---

A demo ends at the clean repository. Production starts at the messy one.

An agent asked to "fix the login bug" in a real codebase needs more than a model and a tool loop. It needs to know which service owns authentication, where the team's conventions are written down, what the API contract says, and what it learned in the previous session. Most of that information is not in the prompt. It is in the infrastructure around the agent.

## The three axes

We use a simple model. An agent's ceiling is set by three things:

- **Command** — what it can do. Tools, permissions, a runtime that can be paused and inspected.
- **Skill** — what it knows. Domain depth packaged so the agent can use it on demand.
- **Connect** — what it can reach. Your APIs, your code and your memory, exposed through MCP.

Most teams focus on the model. We think the larger lever is filling these three axes with fewer, better components.

## From intent to shipped code

The stack follows the path a requirement actually takes:

1. **Porto** turns a PRD into a spec grounded in the current codebase.
2. **SCV** makes that codebase machine-readable in the first place.
3. **Knot** exposes API contracts through MCP, so the agent can query them directly.
4. **LadyM** remembers what the agent learned, instead of rediscovering it.
5. **MindForge** supplies the domain expertise for each stage.
6. **WoCA** drives the loop, with permissions and an inspectable graph.

Each layer has one job. That is the design constraint, and it is why the parts can be used independently.

## Go-first, not Go-only

The runtime, memory, graph engine and SDKs are written in Go. That is deliberate: teams running infrastructure in Go should not have to ship a Python service to get agent capabilities. Where a Python tool is the right fit — analysis, verification, BI — we use it, and we expose it over MCP or HTTP so it plays well with the rest.

Every repository is public and MIT licensed. Nothing here requires a private account to evaluate.
