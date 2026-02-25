# Onion Architecture - Interview Questions

## Questions (1-10)

### 1. What is Onion Architecture?
**Answer:** Architectural pattern with domain at center, dependencies pointing inward. Layers: Domain, Application, Infrastructure, UI.

### 2. What are the layers in Onion Architecture?
**Answer:** Domain (core, entities), Application (use cases, interfaces), Infrastructure (implementations), UI (presentation).

### 3. What is the core principle of Onion Architecture?
**Answer:** Dependencies point inward. Inner layers don't depend on outer layers. Domain is independent.

### 4. How does Onion Architecture differ from traditional layered architecture?
**Answer:** Traditional: top-down dependencies. Onion: dependencies point inward, domain at center, independent of infrastructure.

### 5. What is the domain layer?
**Answer:** Innermost layer, contains entities and business logic. No dependencies on other layers, pure business rules.

### 6. What is dependency inversion in Onion Architecture?
**Answer:** Define interfaces in inner layers, implement in outer layers. Domain defines interfaces, infrastructure implements them.

### 7. What are the benefits of Onion Architecture?
**Answer:** Testability, maintainability, independence from frameworks, business logic focus, flexibility to change infrastructure.

### 8. How do you test Onion Architecture?
**Answer:** Test domain layer independently, mock interfaces for application layer, integration tests for infrastructure.

### 9. What is the difference between Onion and Hexagonal Architecture?
**Answer:** Similar concepts. Onion emphasizes layers, Hexagonal emphasizes ports and adapters. Both isolate domain.

### 10. When would you use Onion Architecture?
**Answer:** Domain-driven design, complex business logic, need for testability, long-term maintenance, team collaboration.

