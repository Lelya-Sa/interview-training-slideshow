# LangChain & AI Agents — Learning Plan (2–3 Days)

Use this plan with the question banks in `ai/langchain/questions.md` and `ai/ai-agents/questions.md`. Total: **about 6–8 hours** of focused time over 2–3 days.

---

## Overview

| Day | Focus | Time | Outcome |
|-----|--------|------|--------|
| **Day 1** | LangChain foundations + first chain | 2–3 h | You can explain chains, LCEL, prompts; you’ve built one simple chain. |
| **Day 2** | RAG + AI agents (concepts + one agent) | 2.5–3.5 h | You understand RAG and the agent loop; you’ve built one agent with tools. |
| **Day 3** (optional) | Deeper practice + interview prep | 1.5–2 h | Memory, safety, ReAct vs Plan-and-Execute; you’ve run through the question banks. |

---

## Day 1 — LangChain foundations (2–3 hours)

**Goal:** Know what LangChain is, what a chain is, and run a minimal prompt → LLM → response.

### 1. Read & quiz (45–60 min)

- Read **LangChain** questions **1–11** (definitions: LangChain, chain, LCEL, agent, prompt template, RAG, vector store, retriever, embeddings, Runnable, output parser).
- Read **12–15** (document loaders, text splitters, memory, callbacks, invoke/batch/stream).
- Use the app or a friend to quiz yourself on definitions; focus on: chain, LCEL, prompt template, Runnable.

### 2. Setup (15 min)

- Node project: `npm init -y`, install `@langchain/openai`, `@langchain/core`, `dotenv`. Create `.env` with `OPENAI_API_KEY`.
- Or use the [LangChain JS quickstart](https://js.langchain.com/docs/get_started/quickstart) in the docs.

### 3. Build one chain (45–60 min)

- Implement: **prompt template → LLM → response** (LangChain questions **25** is the pattern).
- Use `PromptTemplate.fromTemplate("... {question}")`, `.pipe(llm)`, then `.invoke({ question: "..." })`.
- Try `.stream()` once (question **26**).
- Optional: add a simple output parser (e.g. comma-separated list) — question **28**.

**Day 1 self-check:** You can explain what a chain and LCEL are, and you have a small script that runs a chain and streams the answer.

---

## Day 2 — RAG + AI agents (2.5–3.5 hours)

**Goal:** Understand RAG and the agent loop; build one RAG-style flow and one agent with tools.

### 1. RAG & agents theory (45–60 min)

- **LangChain:** Read questions **6, 7, 8, 9** (RAG, vector store, retriever, embeddings), **16** (chunking), **21–22** (RAG flow, structure).
- **AI Agents:** Read **1–6** (what is an agent, observe–reason–act, components, tool loop, tool names/descriptions), then **7–9** (ReAct, Plan-and-Execute, when to use which).

### 2. RAG in code (45–60 min)

- Minimal RAG: in-memory vector store (e.g. `MemoryVectorStore`), a few text chunks, embed with OpenAI embeddings, create retriever. Chain: retriever → format prompt (context + question) → LLM → answer (LangChain **22, 29**). Run 2–3 queries.
- If short on time: skip full RAG and only read the flow (questions **21, 29**) and one official RAG tutorial.

### 3. One agent with tools (45–60 min)

- Define **2 tools** (e.g. “get current time”, “multiply two numbers”) with clear **name + description** (AI Agents **6, 21**).
- Create an agent (e.g. `createReactAgent` in LangGraph, or LangChain’s agent factory) with an LLM + those tools. Invoke with: “What time is it and what is 7 times 8?”
- Watch the loop: Thought → Action → Observation → … → Final answer (ReAct, AI Agents **7**).

**Day 2 self-check:** You can describe RAG (retrieve → prompt with context → LLM) and the agent loop (observe–reason–act, tool use); you’ve built one agent that uses at least one tool.

---

## Day 3 (optional) — Deeper practice & interview prep (1.5–2 hours)

**Goal:** Solidify design choices, safety, and run through the full question banks.

### 1. Design & safety (30–40 min)

- **LangChain:** Questions **17** (prompt injection), **18** (temperature), **19** (robustness).
- **AI Agents:** **11** (agent vs chain), **12** (limits/risks), **13** (human-in-the-loop), **20** (prevent infinite runs).

### 2. Memory & context (20 min)

- **AI Agents:** **14** (why memory, short vs long-term), **15** (context window).
- **LangChain:** **13** (memory in LangChain).

### 3. Full pass + LangGraph (30–40 min)

- **AI Agents:** **10** (multi-agent), **16–18** (LangChain agent, LangGraph, what you define in code), **22** (single vs multi-agent).
- Skim [LangGraph docs](https://langchain-ai.github.io/langgraphjs/) “Introduction” and “Quick start” so you know it’s for stateful, multi-step agent graphs.

### 4. Interview run (30 min)

- Go through **LangChain** and **AI Agents** question banks in the app (Day 20 → LangChain, Day 20 → AI Agents). Answer out loud or in writing; review any you miss.

**Day 3 self-check:** You can explain when to use an agent vs a chain, what ReAct is, and how to avoid infinite loops and basic safety issues; you’ve done a full pass on both question banks.

---

## Quick reference: where to find what

| Topic | LangChain questions | AI Agents questions |
|-------|---------------------|----------------------|
| What is a chain / LCEL | 2, 3, 12, 15 | — |
| Prompts, Runnable, parsers | 5, 10, 11, 25–28 | — |
| RAG (concept + code) | 6–9, 16, 21–22, 29 | — |
| What is an agent / loop | 4 | 1–6, 7 |
| ReAct vs Plan-and-Execute | — | 7, 8, 9 |
| Tools (description, use) | — | 6, 21 |
| When agent vs chain | 16 | 11 |
| Safety / limits | 17, 19 | 12, 13, 20 |
| Memory / context | 13 | 14, 15 |
| LangGraph | — | 17, 18 |

---

## Time estimates summary

- **Minimum (2 days):** Day 1 (2.5 h) + Day 2 (3 h) ≈ **5.5 h** — foundations + one chain + one agent.
- **Recommended (3 days):** Add Day 3 (1.5–2 h) ≈ **7–8 h** — adds safety, memory, and full question-bank pass.

If you have only **one day**, do: LangChain 1–15 + AI Agents 1–9 (theory), then build the Day 1 chain and the Day 2 agent (skip full RAG build); total ~4–5 h.
