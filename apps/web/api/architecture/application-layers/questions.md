# Application Layers - Interview Questions

## Questions (1-10)

### 1. What are application layers?
**Answer:** Logical separation of application into layers: Presentation (UI), Application (use cases), Domain (business logic), Infrastructure (data, external).

### 2. What is the Presentation Layer?
**Answer:** User interface layer. Handles user input, displays data, communicates with Application layer. Web, mobile, API controllers.

### 3. What is the Application Layer?
**Answer:** Orchestrates use cases, coordinates domain objects, handles application logic, manages transactions, defines interfaces.

### 4. What is the Domain Layer?
**Answer:** Core business logic, entities, domain services, business rules. Independent of other layers, most important layer.

### 5. What is the Infrastructure Layer?
**Answer:** Technical implementation details. Database access, external services, file system, email, logging, frameworks.

### 6. Why separate application into layers?
**Answer:** Separation of concerns, maintainability, testability, flexibility, team organization, independent development.

### 7. What is the dependency direction between layers?
**Answer:** Dependencies point inward. Presentation → Application → Domain. Infrastructure → Domain. Domain has no dependencies.

### 8. How do layers communicate?
**Answer:** Through interfaces and DTOs (Data Transfer Objects). Outer layers call inner layers through defined interfaces.

### 9. What is the difference between Application and Domain layers?
**Answer:** Domain: core business rules, entities. Application: use case orchestration, application-specific logic, workflows.

### 10. How do you test layered architecture?
**Answer:** Unit test each layer independently, mock dependencies, integration tests between layers, end-to-end tests for full flow.

