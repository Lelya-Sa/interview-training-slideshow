# C4 Model - Interview Questions

## Overview

### 1. What is the C4 model?
**Answer:** A hierarchical way to describe software architecture: Context (system and users), Containers (applications), Components (inside a container), Code (optional). Each level zooms in.

### 2. What is Level 1 – Context diagram?
**Answer:** Shows the system as one box and its relationships with users and other systems. Answers: who uses it and what external systems it talks to?

### 3. What is Level 2 – Container diagram?
**Answer:** One diagram per system from Context. Each “container” is a runnable unit (e.g. web app, API, DB). Shows how high-level building blocks interact.

### 4. What is Level 3 – Component diagram?
**Answer:** Zooms into one container and shows its main components (modules, services) and how they interact. Good for explaining internal design.

### 5. What is Level 4 – Code (optional)?
**Answer:** Class or module diagrams for selected components. Often omitted; use when you need to explain implementation details.

### 6. Why use C4 instead of one big diagram?
**Answer:** Different audiences need different detail. C4 gives one story at a time (context → containers → components) and keeps diagrams small and focused.

### 7. What is a “container” in C4?
**Answer:** A separately runnable/deployable thing: web app, mobile app, API, database, message queue, etc. Something that can run in its own process.

### 8. What is a “component” in C4?
**Answer:** A logical grouping inside a container (e.g. module, package, namespace). Not necessarily a separate process; it’s the main building block inside one container.

### 9. What notation does C4 use?
**Answer:** Boxes and lines; optional icons. Can be drawn with Structurizr, PlantUML, Mermaid, or pen and paper. Notation is simple so non-devs can follow.

### 10. When would you use C4 in an interview?
**Answer:** To explain a system you designed or worked on: start with Context (who and what), then Containers (main apps and data stores), then Components for one key container.
