# AI Agents - Interview Questions

Material and questions to understand AI agents deeply: what they are, how they work, types, design, and how they relate to LangChain.

---

## What Is an AI Agent?

### 1. What is an AI agent (in the context of LLMs)?
**Answer:** An AI agent is a system that uses an LLM as a "brain" to decide what to do next, and can take actions in the world (call APIs, run code, search, use tools). Unlike a single prompt→response call, an agent runs in a loop: it observes state, reasons, chooses an action, gets a result, and repeats until the task is done or it gives a final answer.

### 2. How is an AI agent different from a simple chatbot or one LLM call?
**Answer:** A simple chatbot or single LLM call: one user message → one model response, no tools or loop. An agent: can use tools (search, calculator, database), keeps a loop of reason → act → observe, and may take many steps before returning an answer. So an agent can "do things" (e.g., book a flight) instead of only "say things."

### 3. What does "observe–reason–act" mean for an agent?
**Answer:** It’s the core loop: (1) **Observe**: the agent sees the current state (user input, tool results, conversation history). (2) **Reason**: the LLM thinks about what to do next (e.g., "I need to search for the weather"). (3) **Act**: it picks a tool and arguments, runs the tool, and gets an observation back. Then repeat until the agent decides to respond to the user with a final answer.

---

## How Agents Work: The Loop and Components

### 4. What are the main components of an LLM-based agent?
**Answer:**
- **LLM (brain)**: Decides the next step and interprets results.
- **Tools**: Functions the agent can call (search, calculator, API, database). Each tool has a name and description so the LLM knows when to use it.
- **Memory** (optional): Short- or long-term memory so the agent remembers past turns or facts.
- **Orchestrator/loop**: Runs the observe–reason–act cycle and stops when the agent outputs a final answer.

### 5. What is the "tool use loop" (agent loop)?
**Answer:** The repeated cycle: (1) Build a prompt with the user goal, available tools, and current context (including prior tool results). (2) Call the LLM. (3) If the LLM returns "use tool X with args Y", run the tool and add the result to context. (4) Call the LLM again with the new context. (5) Repeat until the LLM returns a final text answer (no tool call). The loop is what makes the agent multi-step.

### 6. Why do tools need names and descriptions for an agent?
**Answer:** The LLM only sees text. It must know what each tool does and when to use it. So each tool has a **name** (e.g., `get_weather`) and a **description** (e.g., "Returns current weather for a city. Input: city name."). The agent prompt lists these; the LLM chooses a tool and arguments from that list. Good descriptions improve tool selection.

---

## Agent Types and Patterns

### 7. What is the ReAct pattern for agents?
**Answer:** ReAct (Reason + Act) is a pattern where the agent **interleaves** reasoning and action. Each step has: **Thought** (LLM explains what it will do), **Action** (tool name + arguments), **Observation** (tool result). Then repeat. So you get a trace like: Thought → Action → Observation → Thought → Action → Observation → … → Final Answer. This keeps reasoning grounded in real results and reduces hallucination.

### 8. How does Plan-and-Execute differ from ReAct?
**Answer:** In **Plan-and-Execute**, the agent first makes a **full plan** (list of steps), then **executes** the steps one by one (often with an LLM or code). So: plan once → execute in order. In **ReAct**, there is no separate planning phase; the agent decides the next action at each step and can change course based on observations. Plan-and-Execute is more structured; ReAct is more adaptive.

### 9. When would you choose ReAct over Plan-and-Execute (or the other way around)?
**Answer:** Use **ReAct** when the path isn’t clear upfront, you need to adapt to tool results, or the task is exploratory (e.g., research, debugging). Use **Plan-and-Execute** when the task is well-defined and a clear sequence of steps works (e.g., "fetch data → transform → save"). ReAct is flexible but can be less predictable; Plan-and-Execute is more predictable but less flexible.

### 10. What is a "multi-agent" system?
**Answer:** A system with **multiple agents**, each with a role (e.g., researcher, writer, critic). Agents can hand off work to each other, debate, or work in a pipeline. One orchestrator may assign tasks to specialist agents. This is used for complex workflows that benefit from separation of concerns (e.g., one agent searches, another summarizes, another checks facts).

---

## Design, Safety, and Limitations

### 11. When should you use an agent instead of a fixed chain (e.g., RAG)?
**Answer:** Use an **agent** when the task needs **multiple steps**, **different tools** depending on context, or **branching** (e.g., "if search fails, try another source"). Use a **fixed chain** (e.g., RAG: retrieve → prompt → LLM) when the flow is always the same and you want **predictable, fast, and cheaper** behavior. Agents are powerful but slower, less predictable, and more costly (many LLM calls).

### 12. What are common limitations or risks of LLM agents?
**Answer:**
- **Hallucination**: The LLM might invent tool results or steps; grounding with real tool outputs (ReAct) helps.
- **Infinite loops**: The agent might keep calling tools; use a **max steps** limit.
- **Wrong tool or args**: The LLM can pick the wrong tool or bad arguments; clear tool descriptions and validation help.
- **Cost/latency**: Many LLM calls per request; optimize with caching, smaller models for simple steps, or falling back to chains when possible.
- **Safety**: Agents can take real actions (send email, delete data); restrict tools and add human-in-the-loop for sensitive operations.

### 13. What is "human-in-the-loop" for agents?
**Answer:** Instead of the agent acting fully automatically, certain steps require **human approval** before execution (e.g., "confirm before sending email" or "approve this plan"). The agent proposes an action; the system pauses, shows it to the user, and continues only after approval. This is important for safety and compliance when actions have real-world impact.

---

## Memory and Context

### 14. Why do agents need memory, and what kinds exist?
**Answer:** Agents need memory to use past conversation or past steps in the current run. **Short-term (working) memory**: the current conversation and the current run’s thought–action–observation trace. **Long-term memory**: persistent facts or summaries across sessions (e.g., "user prefers metric units"). Without memory, the agent can’t do follow-up questions or learn from earlier in the conversation.

### 15. What is "context window" and why does it matter for agents?
**Answer:** The context window is the maximum input size (in tokens) the LLM can accept. The agent’s prompt includes: system message, tools, conversation history, and all thought–action–observation so far. Long agent runs can **exceed** the context window. You then need to **summarize** old steps, **truncate** history, or use **long-term memory** so the agent stays within the limit while keeping useful context.

---

## Connection to LangChain and LangGraph

### 16. How does LangChain implement an agent?
**Answer:** LangChain gives you an **agent** that wraps an LLM and a list of **tools**. You call `agent.invoke({ input: "..." })`. Under the hood it runs the tool-use loop: prompt (with tool descriptions) → LLM → if tool call then run tool and add observation → LLM again, until the LLM returns a final answer. You can use built-in agent types (e.g., ReAct) or LangGraph for custom flows.

### 17. What is LangGraph and how does it relate to agents?
**Answer:** LangGraph is a library (from the LangChain ecosystem) for building **stateful, multi-step agent workflows**. You define a graph: nodes (LLM, tools, conditional logic) and edges. It supports cycles (the agent loop), branching, and human-in-the-loop. So you can build ReAct-style agents, Plan-and-Execute, or custom flows with more control than a single "agent" abstraction.

### 18. In code, what do you need to define to create a simple agent in LangChain?
**Answer:** You need: (1) an **LLM** (e.g., `ChatOpenAI`), (2) a list of **tools** (each with name, description, and a function), (3) an **agent** that ties them together (e.g., `createReactAgent` with the LLM and tools). Optionally: prompt template, memory. When you invoke the agent with a user message, it runs the loop until it returns a final response.

---

## Examples and Coding

### 19. Describe a simple agent task and how the loop would run step by step.
**Answer:** Task: "What’s the weather in Paris and is it good for a picnic?" Step 1: Thought: need weather for Paris. Action: `get_weather("Paris")`. Observation: "22°C, sunny." Step 2: Thought: 22°C and sunny is good for a picnic. Action: none (final answer). Response: "In Paris it’s 22°C and sunny—good for a picnic." So: one tool call, then the LLM uses the observation to answer.

### 20. How would you prevent an agent from running forever?
**Answer:** (1) **Max steps**: cap the number of tool calls (e.g., 10); after that, force a final answer or error. (2) **Timeout**: limit total time per request. (3) **Structured output**: require the LLM to output a "final answer" format when done; if it keeps outputting tool calls, count them and stop. (4) In LangGraph you can define terminal nodes and max iterations.

### 21. What makes a good tool description for an agent?
**Answer:** Be **specific** about what the tool does and what inputs it expects (e.g., "Get current weather. Input: city (string), optional: unit ('C' or 'F')."). Mention **when** to use it (e.g., "Use when the user asks about weather or temperature."). Avoid vague names; use clear names like `search_web` not `tool_1`. Good descriptions reduce wrong tool choices and bad arguments.

### 22. Single agent vs multi-agent: give a simple example of when multi-agent helps.
**Answer:** **Single agent**: one LLM with many tools (search, calculator, DB). Good for straightforward tasks. **Multi-agent**: e.g., "research report." Agent A only searches and returns raw snippets; Agent B summarizes and structures; Agent C reviews for accuracy. Each agent has a clear role and smaller prompt, which can improve quality and make the pipeline easier to debug and control.
