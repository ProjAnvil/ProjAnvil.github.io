---
title: "Memory is infrastructure, not a longer prompt"
description: "LadyM's bet: codebase search and long-term memory are one system, not two."
pubDate: 2026-11-05
lang: en
tags: [memory, ladym, mcp]
order: 1
---

Giving an agent a longer context window does not give it memory. It gives it a bigger desk.

## The repeated-discovery problem

Every new session, a coding agent re-reads the same files, re-traces the same call paths and re-learns the same decisions. That work consumes tokens and attention, and none of it survives the session.

LadyM caches the workspace's understanding instead: code analysis, decisions, skills and episodes. The agent recalls it with one keyword. The read path is heuristic, so recall stays fast and predictable — there is no model call on the hot path.

## One store, one activation function

The distinctive design choice is L2: tree-sitter code symbols and plain facts live in the same store, scored by one ACT-R activation function. Memory and codebase search are not two systems that need reconciling. They are one system.

Layers L0 to L4 cover working, episodic, semantic, procedural and associative memory. A background worker distills L5 mental models and L6 forward intents, with a supersedes chain so memories evolve rather than pile up.

## Local first, agent ready

The binary is a single static Go executable with no cgo. SQLite, an in-process vector index and a pure-Go tree-sitter runtime mean there is no network call, no model download and no API key to start.

Any MCP client can use it:

```json
{
  "mcpServers": {
    "ladym": {
      "command": "ladym",
      "args": ["serve", "--db", "/absolute/path/to/ladym.db"]
    }
  }
}
```

The same engine is available as a CLI, a Go SDK and a Claude Code skill. One engine, several front ends.
