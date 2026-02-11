# MVC Model - Interview Questions

## Questions (1-10)

### 1. What is the MVC pattern? Explain its components.
**Answer:** MVC separates application into:
- **Model**: Business logic and data
- **View**: User interface
- **Controller**: Handles input and coordinates Model/View

### 2. Explain the flow of data in MVC.
**Answer:** User → View → Controller → Model → Controller → View → User

### 3. What are the benefits of MVC?
**Answer:** Separation of concerns, maintainability, testability, reusability, scalability

### 4. What is the difference between MVC and MVP?
**Answer:** MVP uses Presenter (handles all logic) instead of Controller. View is passive in MVP.

### 5. What is the difference between MVC and MVVM?
**Answer:** MVVM uses ViewModel with two-way data binding. Common in Angular, Vue.

### 6. Can a Model directly update a View?
**Answer:** No, Model should not know about View. Controller coordinates updates.

### 7. Where does business logic belong in MVC?
**Answer:** Business logic belongs in Model, not Controller or View.

### 8. What is the role of Controller in MVC?
**Answer:** Controller handles user input, processes requests, coordinates Model and View.

### 9. How does MVC improve testability?
**Answer:** Components are separated, can be tested independently with mocks.

### 10. Give an example of MVC in a web application.
**Answer:** 
- **Model**: User data, database queries
- **View**: HTML templates, React components
- **Controller**: Express routes, request handlers

### 11. What is the difference between fat Model and fat Controller?
**Answer:** Fat Model: business logic in Model; Controller is thin (delegates). Fat Controller: logic in Controller; Model is anemic. Prefer fat Model for testability and reuse; thin Controller for coordination only.

### 12. Explain the passive View variant of MVC.
**Answer:** View has no logic; only displays data from Controller. Controller updates View directly (push). Simplifies View; Controller does more. Common in server-rendered MVC (e.g. Rails, Django).

### 13. What is the active Model (observable Model) in MVC?
**Answer:** Model notifies observers (View or Controller) when data changes. View subscribes to Model; updates when Model changes. Reduces Controller responsibility; enables multiple Views.

### 14. How does MVC handle form submission in a web app?
**Answer:** View sends request to Controller; Controller validates, calls Model (e.g. save); Model persists; Controller selects View (success or error) and passes data. View renders response.

### 15. What is the Front Controller in MVC web apps?
**Answer:** Single entry point (e.g. index.php, main router) that receives all requests, routes to appropriate Controller. Handles auth, logging, routing. Part of MVC web architecture.

### 16. Explain the difference between MVC and three-tier architecture.
**Answer:** Three-tier: presentation, business, data (layers). MVC is within presentation (or one tier); Model may map to business+data. MVC is UI pattern; three-tier is deployment/logical layers.

### 17. Where does validation belong in MVC?
**Answer:** Business validation in Model (rules, invariants). Input validation (format, required) can be in Controller or shared validator. View can do client-side validation for UX; server must validate.

### 18. What is the role of the View in MVC?
**Answer:** View renders data for user; no business logic. Receives data from Controller (or Model in active Model); displays and sends user input to Controller. Should be dumb/presentational.

### 19. How does MVC support multiple views of same data?
**Answer:** One Model; multiple Views subscribe or receive data from Controller. Controller updates Model; all Views get updated (observer or Controller pushes to each). Same data, different presentations.

### 20. What is an anemic Model? Why is it discouraged?
**Answer:** Model is only data (getters/setters); no behavior. Logic ends up in Controller (fat Controller). Discouraged: violates OO; harder to maintain. Prefer rich Model with behavior.

### 21. Explain the Application Controller pattern with MVC.
**Answer:** Central object that decides which screen/View to show and which Controller to use (e.g. based on state or flow). Reduces routing logic in Controllers. Common in desktop or wizard UIs.

### 22. How does MVC relate to REST in web APIs?
**Answer:** REST resource can map to Model; Controller handles HTTP methods (GET→read, POST→create); "View" is representation (JSON/XML). Controller is thin; Model holds logic. Same separation idea.

### 23. What is the Supervising Controller variant?
**Answer:** Controller handles complex logic; View can bind to Model for simple cases (e.g. two-way binding). Between passive View and full MVP. View has some intelligence; Controller supervises.

### 24. How does dependency injection fit with MVC?
**Answer:** Controller (and optionally View) receive Model or services via constructor/setter. Enables testing (mock Model) and swapping implementations. Model often created or resolved in Controller or factory.

### 25. What is the difference between MVC and Flux/Redux?
**Answer:** Flux/Redux: unidirectional (action→reducer→store→view); single store. MVC: Controller coordinates Model and View; can be bidirectional (Model notifies View). Redux is more explicit data flow.

### 26. Where does authentication/authorization go in MVC?
**Answer:** Controller (or filter/middleware before Controller) checks auth; grants or denies access. Model may hold user/role; Controller enforces. View can hide UI based on role (Controller passes flag).

### 27. Explain the Page Controller pattern in web MVC.
**Answer:** One Controller per page or action (e.g. UserController, OrderController). Handles request for that page; calls Model; selects View. Common in Rails, Django, Express with routes.

### 28. What is the Template View in MVC?
**Answer:** View is template (e.g. Jinja, EJS) with placeholders; Controller passes data; template renders. No logic in template (or minimal). Standard in server-rendered MVC.

### 29. How does MVC handle errors?
**Answer:** Model throws or returns errors; Controller catches and decides (retry, show error View, redirect). View displays error message from Controller. Don't put error handling in View.

### 30. What is the Transform View variant?
**Answer:** View transforms model data into output (e.g. XSLT, or code that builds HTML). Different from Template View (template + data). Use when output structure is driven by data.

### 31. Explain the Two Step View in MVC.
**Answer:** First step: build logical representation (e.g. XML). Second step: transform to final format (HTML, PDF). Separates content from layout. Use for multiple output formats from same data.

### 32. Where does session management go in MVC?
**Answer:** Controller (or framework) reads/writes session (e.g. current user, cart). Model may be stateless; Controller loads from session and passes to View. Session is cross-request state.

### 33. What is the difference between MVC and PAC (Presentation-Abstraction-Control)?
**Answer:** PAC has hierarchy of triads (P-A-C); each triad has presentation, abstraction, control. More structured than flat MVC. Used in complex UIs (e.g. nested panels). Less common than MVC.

### 34. How does MVC work with SPA (Single Page Application)?
**Answer:** Client has View (React/Vue) and state (Model); routing or container acts as Controller (handles events, updates state, selects view). Server may expose API; client MVC is in browser.

### 35. What is the Model2 (MVC for web) pattern?
**Answer:** Web MVC: request→Controller→Model→Controller selects View→View renders with Model data. View is server-rendered template. Same as classic web MVC (Rails, Spring MVC).

### 36. Explain the Front Controller + Page Controller combination.
**Answer:** Front Controller receives all requests; dispatches to Page Controller (per resource/action). Front Controller does auth, routing; Page Controller does business flow. Common in web frameworks.

### 37. Where does caching belong in MVC?
**Answer:** Model layer (e.g. cache in Repository) or between Controller and Model. View can cache rendered output (HTTP cache or fragment cache). Controller should not contain cache logic; delegate to Model/service.

### 38. What is the role of the Router in MVC web apps?
**Answer:** Router maps URL (and method) to Controller (and action). Part of Front Controller or framework. Controller is selected by router; router is not Controller.

### 39. How does MVC support API and HTML from same app?
**Answer:** Same Model; different Controllers or same Controller with different Views. API Controller returns JSON (View is serializer); HTML Controller returns HTML (View is template). Share Model and services.

### 40. What is the Thin Controller rule?
**Answer:** Controller should be thin: receive request, call Model/service, pass data to View. No business logic in Controller. Keeps Controller testable and focused. Logic in Model or service layer.

### 41. Explain the difference between MVC and HMVC (Hierarchical MVC).
**Answer:** HMVC: MVC triads can be nested; child Controller can be called by parent. Use for modular UI (widgets, partials). Request can go to sub-Controller. Less common than flat MVC.

### 42. Where does logging go in MVC?
**Answer:** Cross-cutting: in Controller (request/response), Model (data access), or middleware. Prefer centralized logger; Controller and Model use it. Don't put in View.

### 43. What is the Service Layer in MVC?
**Answer:** Layer between Controller and Model; contains use cases or application logic. Controller calls Service; Service uses Model(s). Keeps Controller thin and Model focused on domain. Common in large apps.

### 44. How does MVC handle file upload?
**Answer:** View (form) sends file; Controller receives (multipart); Controller validates and passes to Model or service (save file, store path); Model persists metadata. View shows success or error.

### 45. What is the difference between MVC and MVA (Model-View-Adapter)?
**Answer:** MVA: Adapter sits between View and Model; translates. Similar to Controller but Adapter only adapts; no flow control. Rare; MVC is more common.

### 46. Explain the View Model in MVC context.
**Answer:** View Model: DTO for View (shape data for display). Controller or service builds View Model from Model(s); View only sees View Model. Use when View needs different shape than domain Model.

### 47. Where does transaction management go in MVC?
**Answer:** Controller or Service starts transaction; calls Model/Repository; commits or rolls back. Model should not manage transaction; caller (Controller/Service) does. Use Unit of Work in service layer.

### 48. What is the Screen pattern with MVC?
**Answer:** One Controller per screen (full page or major section). Screen Controller owns lifecycle and sub-views. Same as Page Controller in web. Use for clear ownership of UI block.

### 49. How does MVC relate to Clean Architecture?
**Answer:** Clean Architecture has layers (entities, use cases, adapters). MVC View/Controller can be in adapter layer; Model maps to entities or use case output. Same idea: separate UI from domain.

### 50. What is the difference between MVC and RMR (Resource-Method-Representation)?
**Answer:** RMR is REST-oriented: Resource (like Model), Method (action), Representation (like View). Similar to MVC for APIs; Controller becomes Method handler. Less common name.

### 51. Explain the Model-View-Presenter (MVP) vs MVC again.
**Answer:** MVP: View is passive; Presenter handles all logic and updates View. MVC: Controller handles input; Model may notify View (active Model). In MVP, View has no direct link to Model.

### 52. Where does CSRF protection go in MVC?
**Answer:** Controller (or middleware before Controller) validates CSRF token on POST/PUT/DELETE. View includes token in form. Model is unaware. Framework often provides middleware.

### 53. What is the Presentation Model (View Model) pattern?
**Answer:** Presentation Model holds view state and logic; View binds to it. Similar to ViewModel in MVVM but without automatic binding. Controller or Presenter updates Presentation Model; View reads it.

### 54. How does MVC work with WebSocket?
**Answer:** WebSocket message→Controller (or handler); Controller updates Model; Model notifies or Controller pushes to View(s). Same MVC roles; transport is WebSocket instead of HTTP request.

### 55. What is the difference between MVC and MVI (Model-View-Intent)?
**Answer:** MVI: unidirectional; Intent (user action)→Model (state)→View. Similar to Redux. More explicit than classic MVC. Used in Android (Rx) and some web frameworks.

### 56. Where does internationalization (i18n) go in MVC?
**Answer:** View uses translated strings (from resource or service). Controller or middleware sets locale; View receives locale or looks up. Model usually has no locale; only data. Keep strings out of Model.

### 57. Explain the Context Object pattern with MVC.
**Answer:** Context object holds request-scoped data (user, locale, request) passed through layers. Controller creates or receives Context; passes to Model/Service and View. Reduces long parameter lists.

### 58. What is the Intercepting Filter in MVC web?
**Answer:** Filters run before/after Controller (e.g. auth, logging, compression). Part of Front Controller. Controller stays focused; filters handle cross-cutting. Same as middleware in Express.

### 59. How does MVC handle redirects?
**Answer:** Controller returns redirect (302/303) to another URL or action. No View rendered for redirect; browser requests new URL. Use after POST (PRG pattern) or for auth redirect.

### 60. What is the Post-Redirect-Get (PRG) pattern in MVC?
**Answer:** After POST, Controller redirects to GET (e.g. redirect to success page). Prevents duplicate submit on refresh. Controller does process→redirect→GET; GET shows View. Standard web MVC.

### 61. Where does API versioning go in MVC?
**Answer:** Router or Front Controller selects version; dispatches to versioned Controller or same Controller with version in Context. Model can be shared; View (serializer) may vary by version.

### 62. What is the difference between MVC and ADR (Action-Domain-Responder)?
**Answer:** ADR: Action (single class per action), Domain (logic), Responder (output). One class per action vs one Controller with many actions. ADR is more granular; MVC is more traditional.

### 63. Explain the Layout and View composition in MVC.
**Answer:** Layout is shell (header, footer); View is content. Controller selects View; framework wraps in Layout. Or View includes partials. Keeps DRY; Layout and View are both View layer.

### 64. Where does rate limiting go in MVC?
**Answer:** Middleware or filter before Controller; rejects or allows request. Not in Model or View. Controller may check for 429 and handle; usually framework handles.

### 65. What is the Front Controller + Command pattern?
**Answer:** Front Controller parses request; creates Command object (e.g. LoginCommand); executes Command. Command is like Controller action. Encapsulates request handling; good for undo/logging.

### 66. How does MVC handle partial updates (PATCH)?
**Answer:** Controller receives PATCH; validates; loads Model (or calls service); applies partial update; saves. Model or service has method for partial update. View (API) returns updated resource or 204.

### 67. What is the difference between MVC and RVM (Resource-View-Model)?
**Answer:** RVM: REST-style; Resource (URI), View (representation), Model (data). Similar to MVC for REST. Terminology varies; same separation of concerns.

### 68. Where does CORS go in MVC?
**Answer:** Middleware or filter (before Controller) adds CORS headers to response. Not in Model or View. Controller is unaware; framework handles. Same as other cross-cutting concerns.

### 69. Explain the Dispatcher in MVC frameworks.
**Answer:** Dispatcher receives request from Front Controller; finds Controller and action (from route); invokes Controller. Part of routing layer. Controller receives request from Dispatcher.

### 70. What is the difference between server-side MVC and client-side MVC?
**Answer:** Server-side: Controller and View on server; response is HTML. Client-side: Controller and View in browser; server is API. Same roles; different location. SPA often has client-side MVC or similar.

### 71. Where does request validation go in MVC?
**Answer:** Controller (or dedicated validator called by Controller) validates input; returns 400 or error View if invalid. Model may validate business rules; Controller validates format and required. Both layers.

### 72. What is the Application Model in MVC?
**Answer:** Application Model holds application-level state (e.g. current user, config) shared across Controllers. Different from domain Model. Can be in Context or singleton/service.

### 73. Explain the difference between MVC and EE (Entity-Event) pattern.
**Answer:** EE: entities emit events; handlers react. More event-driven than MVC. MVC has explicit Controller; EE is reactive. Use EE for complex event flows; MVC for straightforward CRUD UI.

### 74. Where does WebSocket session map in MVC?
**Answer:** WebSocket connection is like a session; Controller (or handler) is per connection. Model is shared (e.g. chat room). View is client; server pushes updates. Controller handles messages and updates Model.

### 75. What is the View Helper in MVC?
**Answer:** Helper provides view-level utilities (format date, link, etc.) without putting logic in View. Called from template. Keeps View simple; logic in helper. Common in Rails, Laravel.

### 76. How does MVC handle pagination?
**Answer:** Controller receives page/size params; calls Model or service with limit/offset; gets page of data; passes to View. Model or Repository has findPaginated. View renders list and pagination UI.

### 77. What is the difference between MVC and Naked Objects?
**Answer:** Naked Objects: UI is auto-generated from domain objects; no separate View design. User works directly with domain. MVC has explicit View. NO is more radical; MVC is traditional.

### 78. Where does health check go in MVC?
**Answer:** Dedicated Controller (or route) that returns 200/503; no Model or minimal (e.g. DB ping). Or middleware. Keeps health check simple and fast. Not part of business MVC.

### 79. Explain the Resolver (dependency resolution) in MVC.
**Answer:** Framework resolves Controller and dependencies (e.g. from container). Controller receives Model or service via constructor. Resolver is part of Front Controller or DI container; not Controller.

### 80. What is the difference between MVC and Vertical Slice?
**Answer:** Vertical Slice: organize by feature (one folder per feature with handler, logic, view). MVC organizes by layer (all Controllers, all Models). Slice is feature-first; MVC is layer-first.

### 81. Where does audit logging go in MVC?
**Answer:** Controller or middleware logs action (who, what, when). Or Service layer logs. Model should not log; keep persistence separate. Use filter or decorator for audit.

### 82. What is the Input Model (DTO) in MVC?
**Answer:** DTO for request body (e.g. CreateUserRequest). Controller receives Input Model; validates; maps to domain Model or passes to Service. Keeps Controller clean; validation on Input Model.

### 83. Explain the difference between MVC and CQRS at UI level.
**Answer:** CQRS separates read/write. MVC Controller can dispatch to command or query handler; Model splits into read model and write model. MVC is presentation; CQRS is application/domain structure.

### 84. Where does response compression go in MVC?
**Answer:** Middleware or filter after Controller; compresses response body. Not in Model or View. Controller returns response; filter compresses. Same as other response cross-cutting.

### 85. What is the Action Model in MVC?
**Answer:** Some frameworks use Action Model (or command) to represent request: action name, params. Controller receives Action Model; executes. Encapsulates request; useful for logging and testing.

### 86. How does MVC handle OPTIONS (CORS preflight)?
**Answer:** Middleware or dedicated route handles OPTIONS; returns 200 with CORS headers. Controller not involved for OPTIONS. Browser sends OPTIONS before cross-origin request; server must respond.

### 87. What is the difference between MVC and BFF (Backend for Frontend)?
**Answer:** BFF is a backend service per client (e.g. mobile BFF). BFF can be implemented with MVC (Controller calls services, returns View/JSON). MVC is pattern; BFF is architecture role.

### 88. Where does request ID go in MVC?
**Answer:** Middleware generates or reads X-Request-Id; attaches to request/context. Controller and Model can use for logging. Not business logic; cross-cutting. Logger includes request ID.

### 89. Explain the Renderer in MVC frameworks.
**Answer:** Renderer takes View name and data; produces output (HTML, JSON). Controller calls render(view, data). View is template or serializer; Renderer is engine. Part of View layer.

### 90. What is the difference between MVC and Hexagonal at boundaries?
**Answer:** Hexagonal: adapters for UI and persistence; core has no framework. MVC Controller and View can be adapters; Model can be in core. Same idea: UI and persistence are adapters; core is domain.

### 91. Where does feature flag go in MVC?
**Answer:** Controller or middleware checks flag; selects behavior or View. Or service layer. Model usually unaware. Use for A/B test or gradual rollout. Config or feature service.

### 92. What is the Response Model (output DTO) in MVC?
**Answer:** DTO for response (e.g. UserResponse). Controller or service builds from domain Model; View (serializer) uses Response Model. Keeps API contract stable; decouples domain from API shape.

### 93. Explain the difference between MVC and Serverless (Lambda) handlers.
**Answer:** Lambda handler is like Controller (one per function); can use Model/service (e.g. DB). No traditional View for API; response is JSON. Same separation: handler = Controller, logic in layer.

### 94. Where does correlation ID go in MVC?
**Answer:** Middleware reads or generates X-Correlation-Id; adds to context. Controller and services pass along; logger includes. For distributed tracing. Same as request ID but propagated to downstream.

### 95. What is the Invoker in MVC?
**Answer:** Part of framework that invokes Controller action (method). Dispatcher or Router uses Invoker. Controller method is invoked with request/params. Not a separate pattern; framework internals.

### 96. How does MVC handle file download?
**Answer:** Controller sets headers (Content-Disposition, Content-Type); streams file from Model or service (or path). View is not used for binary; Controller writes to response. Model may return stream or path.

### 97. What is the difference between MVC and Micro-frontend?
**Answer:** Micro-frontend: UI is composed of independent apps (each can be MVC). MVC is within one app. Micro-frontend is composition at runtime; MVC is structure within app.

### 98. Where does retry logic go in MVC?
**Answer:** Service layer or infrastructure (e.g. DB retry). Controller should not retry; call service once. Model/Repository may have retry. Keep Controller thin; resilience in lower layers.

### 99. Explain the View Resolver in MVC frameworks.
**Answer:** Resolves view name to actual view (template, component). Controller returns view name; View Resolver finds template and passes data. Part of View layer. Common in Spring, Rails.

### 100. What is the difference between MVC and event-driven UI?
**Answer:** Event-driven: components emit events; others react (e.g. Vue, React). MVC has explicit Controller. Event-driven can be used inside View or as replacement for Controller (reactive). Different style.

### 101. Where does circuit breaker go in MVC?
**Answer:** Service layer or adapter that calls external service. Controller calls service; service uses circuit breaker. Not in Controller or View. Resilience is in infrastructure/service.

### 102. What is the Model Binding in MVC?
**Answer:** Framework binds request (body, query) to object (Model or DTO). Controller receives bound object. Reduces boilerplate (no manual parse). Validation can run on bound model. Common in ASP.NET, Spring.

### 103. Explain the difference between MVC and Redux in terms of state.
**Answer:** Redux: single store; immutable updates; unidirectional. MVC: Model can be multiple; updates can be direct. Redux is stricter; MVC is more flexible. Redux is like MVC with one Model and strict flow.

### 104. Where does API documentation (OpenAPI) go in MVC?
**Answer:** Generated from routes and Controller annotations, or written separately. Not in Model or View. Document Controller (routes, params, response). Serve doc from static or dedicated route.

### 105. What is the Action Filter in MVC?
**Answer:** Filter that runs before/after Controller action (e.g. OnActionExecuting, OnActionExecuted). Use for auth, logging, timing. Same as middleware but action-scoped. ASP.NET term; similar in other frameworks.

### 106. How does MVC handle content negotiation?
**Answer:** Controller or middleware checks Accept header; selects View (HTML vs JSON) or serializer. Same Model data; different View. Or Controller returns format; View Resolver picks template/serializer.

### 107. What is the difference between MVC and Bloc (Business Logic Component)?
**Answer:** Bloc: UI sends events to Bloc; Bloc emits states; View reacts. Similar to MVP or MVI. Bloc is between View and Model. Used in Flutter. More reactive than classic MVC.

### 108. Where does request timeout go in MVC?
**Answer:** Middleware or server config sets timeout. Controller should not implement timeout; finish quickly or delegate to async. Infrastructure concern. Same as other cross-cutting.

### 109. Explain the Result Type (Result object) in MVC.
**Answer:** Controller or service returns Result (success + data or error + message). Controller checks Result and selects View or error response. Keeps error handling consistent. Common in functional style.

### 110. What is the difference between MVC and Clean MVC?
**Answer:** Clean MVC: stricter separation; Controller only coordinates; no logic. Model is domain-only; use cases in service layer. Same idea as Thin Controller + Service Layer. Emphasizes cleanliness.

