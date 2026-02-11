# Clean Architecture - Interview Questions

## Questions (1-10)

### 1. What is Clean Architecture?
**Answer:** Architectural pattern separating business logic from frameworks and infrastructure. Dependency rule: dependencies point inward.

### 2. What are the layers in Clean Architecture?
**Answer:** Entities (business rules), Use Cases (application logic), Interface Adapters (controllers, presenters), Frameworks (UI, DB, web).

### 3. What is the Dependency Rule?
**Answer:** Dependencies point inward. Outer layers depend on inner layers, not vice versa. Inner layers don't know about outer layers.

### 4. What are the benefits of Clean Architecture?
**Answer:** Independence of frameworks, testability, independence of UI, independence of database, independence of external services.

### 5. How does Clean Architecture differ from layered architecture?
**Answer:** Clean Architecture emphasizes dependency rule and independence. Layers are organized by dependency direction, not just separation.

### 6. What are entities in Clean Architecture?
**Answer:** Enterprise-wide business rules. Pure business logic, no dependencies on outer layers, most stable layer.

### 7. What are use cases in Clean Architecture?
**Answer:** Application-specific business rules. Orchestrate entities, define application workflow, implement user stories.

### 8. How do you implement dependency inversion in Clean Architecture?
**Answer:** Define interfaces in inner layers, implement in outer layers. Use dependency injection to provide implementations.

### 9. What is the difference between Clean Architecture and Onion Architecture?
**Answer:** Similar concepts. Clean Architecture has circular layers, Onion Architecture emphasizes domain at center. Both use dependency inversion.

### 10. When would you use Clean Architecture?
**Answer:** Long-term projects, need for testability, multiple teams, changing requirements, complex business logic.

