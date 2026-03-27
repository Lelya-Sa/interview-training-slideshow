# LangChain - Interview Questions

Definitions, core concepts, material, training context, examples, and coding for junior developer interview prep.

---

## Definitions

### 1. What is LangChain?
**Answer:** LangChain is an open-source framework for building applications powered by large language models (LLMs). It provides abstractions and integrations for chaining LLM calls with other tools, data sources, and logic (prompts, memory, retrieval, agents) so you can build chatbots, RAG apps, and agents without wiring everything from scratch.

### 2. What is a "chain" in LangChain?
**Answer:** A chain is a sequence of steps (e.g., prompt → LLM → output parser) composed together. In LangChain JS, chains are built with the LangChain Expression Language (LCEL): you pipe runnables together so the output of one step becomes the input of the next.

### 3. What is LCEL (LangChain Expression Language)?
**Answer:** LCEL is the primary way to compose components in LangChain. It uses a Runnable interface: you chain components with `.pipe()` (or `RunnableSequence.from()`), and every step is a runnable. LCEL supports `invoke()`, `batch()`, and `stream()` for execution.

### 4. What is an "agent" in LangChain?
**Answer:** An agent is an LLM-powered component that can use tools (e.g., search, calculator, API calls) to accomplish tasks. The LLM decides which tool to call and with what inputs; the framework runs the tool and feeds the result back to the LLM until the task is done. LangGraph.js extends this with more control over agent flow and memory.

### 5. What is a "prompt template" in LangChain?
**Answer:** A prompt template is a reusable pattern that turns user or runtime input into the exact text (or messages) sent to the LLM. Examples: `PromptTemplate.fromTemplate("Explain {topic} in one sentence.")` for a single string, or `ChatPromptTemplate.fromMessages()` for system/user/assistant message lists with placeholders.

### 6. What is RAG (Retrieval-Augmented Generation)?
**Answer:** RAG is a pattern where you retrieve relevant documents (e.g., from a vector store) based on the user query, then pass those documents plus the query to the LLM so it can answer using that context. LangChain supports this with document loaders, text splitters, vector stores, and retrievers wired into a chain.

### 7. What is a "vector store" in the context of LangChain?
**Answer:** A vector store is a database that stores text (or chunks) as embeddings (numeric vectors). Given a query embedding, it returns the most similar stored chunks. LangChain integrates with stores like Pinecone, Chroma, and in-memory implementations so you can build RAG pipelines.

### 8. What is the difference between a "retriever" and a "vector store" in LangChain?
**Answer:** The vector store is where embeddings and documents are stored and searched. The retriever is the interface that your chain uses to get relevant documents (e.g., "get top 5 chunks for this query"). Often the vector store exposes a `.asRetriever()` method so you can use it directly in a chain.

### 9. What are "embeddings" and why are they used in RAG?
**Answer:** Embeddings are dense vector representations of text (numbers) produced by an embedding model. Similar meaning → similar vectors. In RAG, you embed document chunks and the user query; the vector store finds chunks whose embeddings are closest to the query embedding so the LLM gets relevant context. LangChain has embedding integrations (OpenAI, Cohere, local models, etc.).

### 10. What is the "Runnable" interface in LangChain?
**Answer:** Runnable is the core interface that LCEL uses. Components like prompts, LLMs, parsers, and chains implement it, so they can be composed with `.pipe()` and support `invoke()`, `batch()`, and `stream()`. Anything that is a Runnable can be part of a chain.

### 11. What is an "output parser" in LangChain?
**Answer:** An output parser takes the raw LLM output (text or message) and turns it into a structured form your app needs (e.g., JSON, a list, a specific object). Examples: `JsonOutputParser`, `CommaSeparatedListOutputParser`, or `.withStructuredOutput(schema)` on the LLM. The prompt usually instructs the LLM to respond in the format the parser expects.

---

## Material & Components

### 12. What are document loaders and text splitters used for in LangChain?
**Answer:** Document loaders load content from sources (PDF, web, Notion, etc.) into Document objects. Text splitters break long text into smaller chunks so they fit in context windows and improve retrieval quality. Together they prepare data for embedding and storing in a vector store for RAG.

### 13. What is "memory" in LangChain?
**Answer:** Memory is the component that persists conversation or context across turns. For example, buffer memory keeps a list of past messages; the chain can include that history in the prompt so the LLM has context for follow-up questions.

### 14. What are "callbacks" in LangChain?
**Answer:** Callbacks let you hook into the execution of chains, LLMs, and tools (e.g., for logging, monitoring, or streaming). You pass a callback handler at invoke time or in the constructor; it receives events when steps start/end, when tokens are generated, etc.

### 15. Name three execution methods on a LangChain runnable and what they do.
**Answer:**
- `invoke(input)`: runs the runnable once for a single input and returns the output.
- `batch(inputs)`: runs the runnable for multiple inputs (e.g., in parallel) and returns an array of outputs.
- `stream(input)`: runs the runnable and yields output tokens or chunks as they are produced (e.g., for streaming to the UI).

---

### 16. Why do we chunk documents and what are chunk size and overlap?
**Answer:** We chunk so that (1) each piece fits in the LLM context window and (2) retrieval returns focused segments. Chunk size trades off context (larger) vs precision (smaller). Overlap (e.g., 100 tokens) between chunks avoids splitting a sentence or idea in the middle and can improve retrieval at the edges.

### 17. What is "prompt injection" and how can you mitigate it?
**Answer:** Prompt injection is when user or external input is crafted to change the model’s behavior (e.g., "ignore previous instructions and…"). Mitigations: keep user input clearly separated from system instructions (e.g., in a dedicated "user" message), validate/sanitize input, use structured prompts with delimiters, and avoid putting untrusted content in the system prompt.

### 18. What does the "temperature" parameter control on an LLM?
**Answer:** Temperature controls randomness: lower (e.g., 0) gives more deterministic, focused answers; higher (e.g., 0.7–1) gives more varied, creative output. Use low temperature for factual or structured tasks (RAG, parsing); use higher for brainstorming or diverse generations.

### 19. How can you make a LangChain chain more robust (e.g., handle API failures)?
**Answer:** Use retries and timeouts: many LLM wrappers accept `maxRetries` and a timeout; you can also wrap the runnable with a retry policy. Handle parse errors in output parsers (e.g., try/catch, fallback, or ask the LLM to fix format). For production, add logging/callbacks and consider circuit breakers if calling external APIs.

---

## Training & Practice

### 20. Does LangChain train or fine-tune the LLM?
**Answer:** No. LangChain is an orchestration framework. It calls existing LLMs (via APIs or local models); it does not train or fine-tune them. "Training" in the sense of getting better at interviews means practicing prompts, chains, and RAG/agent design with LangChain.

### 21. What should a junior developer practice first with LangChain?
**Answer:** Start with: (1) a simple chain: prompt template → LLM → output; (2) parsing structured output (e.g., with output parsers); (3) a minimal RAG pipeline: load docs → split → embed → store → retriever → chain with context; (4) one agent with one or two simple tools. Use the official LangChain JS docs and LCEL.

---

## Examples & Concepts

### 22. Describe a minimal RAG flow in LangChain.
**Answer:** Load documents with a loader → split with a text splitter → create embeddings and store in a vector store → create a retriever from the store. For each query: retriever gets relevant chunks → a prompt template formats query + chunks → LLM generates an answer. This can be expressed as a single LCEL chain (e.g., retriever → format prompt → LLM → parser).

### 23. When would you use an agent instead of a simple chain?
**Answer:** Use an agent when the task requires multiple steps, external data, or tools (e.g., search, calculator, API). Use a simple chain when the flow is fixed: one prompt and one LLM call (and maybe parsing). Agents add flexibility and tool use; chains are simpler and more predictable.

### 24. What is a "tool" in LangChain and how does an agent use it?
**Answer:** A tool is a function (with a name and description) that the agent can call. The LLM sees the list of tools and their descriptions, chooses a tool and arguments, and the framework runs the function and returns the result to the LLM. Tools are used for search, calculations, API calls, or any deterministic action.

---

## Coding

### 25. Write a minimal LangChain JS chain: prompt template → LLM → invoke.
**Answer:**

```javascript
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const prompt = PromptTemplate.fromTemplate("In one sentence: {question}");
const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0 });

const chain = prompt.pipe(llm);

const result = await chain.invoke({ question: "What is a closure in JavaScript?" });
console.log(result.content);
```

### 26. How do you stream LLM output in LangChain JS?
**Answer:** Use `.stream()` on the runnable (e.g., the chain). You get an async iterable of chunks; for chat models, each chunk is often a small piece of the message content. Example:

```javascript
const stream = await chain.stream({ question: "Explain promises." });
for await (const chunk of stream) {
  process.stdout.write(chunk.content ?? "");
}
```

### 27. Write a simple tool and pass it to a LangChain agent (pseudocode or high-level).
**Answer:**

```javascript
import { tool } from "@langchain/core/tools";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

const getWeather = tool(
  async (city) => ({ city, temp: 22, unit: "C" }),
  { name: "get_weather", description: "Get current weather for a city" }
);

const llm = new ChatOpenAI({ model: "gpt-4o-mini" });
const agent = createReactAgent({ model: llm, tools: [getWeather] });

const result = await agent.invoke({ messages: [{ role: "user", content: "Weather in London?" }] });
```

The agent decides to call `get_weather` with "London", gets the result, and can summarize it in the response.

### 28. How do you get structured output (e.g., JSON) from an LLM in LangChain?
**Answer:** Use an output parser. For JSON, use `StructuredOutputParser` or bind the LLM to a JSON schema (e.g., with `.withStructuredOutput(schema)`). The prompt should ask the LLM to respond in the required format; the parser then parses the response into an object. Example: chain = prompt.pipe(llm).pipe(new JsonOutputParser()).

### 29. What is the typical structure of a RAG chain in code (high-level)?
**Answer:** Create a retriever from your vector store. Build a prompt template with placeholders for `context` (retrieved docs) and `question`. Chain: (input) => retriever gets docs → format prompt with docs + question → LLM → optional parser. In LCEL this is often: `retriever | formatPrompt | llm | parser`, where formatPrompt is a function or runnable that builds the prompt from the query and retrieved documents.
