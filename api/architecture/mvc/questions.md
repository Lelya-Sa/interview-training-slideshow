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

### 111. Where does validation go in MVC?
**Answer:** Validation in Model (domain rules) or Controller (input validation). Prefer Model for business rules; Controller for format and required fields. Use validators or schema.

### 112. What is the difference between MVC and MVI (Model-View-Intent)?
**Answer:** MVI: unidirectional; View sends Intent; Model produces State; View renders State. Similar to Redux. More predictable than classic MVC. Used in Android and reactive UIs.

### 113. How does MVC handle file upload?
**Answer:** Controller receives multipart request; validates type/size; passes to Model or service for storage; returns View with result. Same as other request handling; use middleware for parsing.

### 114. What is the purpose of ViewModel in MVC?
**Answer:** ViewModel (or DTO) shapes data for View; may combine multiple Models or add display logic. Keeps View dumb. Optional; use when View needs different shape than Model.

### 115. Where does authentication go in MVC?
**Answer:** Middleware or filter before Controller; sets user on request. Controller checks user for authorization. Model doesn't know about auth. Same as other cross-cutting.

### 116. Explain MVC and dependency injection.
**Answer:** Controller receives Model/service via constructor or property. Enables testing (mock) and loose coupling. Use DI container or manual injection. Common in modern MVC.

### 117. What is the difference between MVC and Flux?
**Answer:** Flux: unidirectional; Action → Dispatcher → Store → View. No Controller; Store is like Model. Used in React. More explicit flow than classic MVC.

### 118. How does MVC handle redirect?
**Answer:** Controller returns redirect (302/303) to URL; framework sets Location header. Use after POST (PRG pattern) or for auth. View not rendered; client follows redirect.

### 119. Where does logging go in MVC?
**Answer:** Middleware or filter logs request/response; Controller or Model logs business events. Don't log in View. Use structured logging; correlate with request id.

### 120. What is the purpose of Controller base class?
**Answer:** Base class provides common behavior (auth, helpers, error handling). Reduces duplication. Use for shared logic; prefer composition over inheritance when possible.

### 121. How does MVC handle partial views?
**Answer:** View includes partial (fragment); Controller may pass data for partial. Same Model or child Model. Use for headers, footers, reusable components. Framework renders partial.

### 122. What is the difference between MVC and Redux?
**Answer:** Redux: single store; actions; reducers (pure); View subscribes. No Controller; reducer is like Model update. Unidirectional. Used in React. More explicit than MVC.

### 123. Where does caching go in MVC?
**Answer:** Cache in Model/service (data cache) or View (output cache). Controller may set cache headers. Use for performance; invalidate on update. Infrastructure or service layer.

### 124. How does MVC handle WebSocket?
**Answer:** Separate endpoint or middleware; WebSocket handler may use same Model/service. Not classic request-response; Controller pattern may not fit. Use service layer for logic.

### 125. What is the purpose of Model binding?
**Answer:** Framework binds request (body, query, route) to Model or DTO. Controller receives typed object. Reduces boilerplate; validate after binding. Common in web MVC.

### 126. Explain MVC and API (JSON) in same app.
**Answer:** Same Controller can return View (HTML) or JSON by Accept header or route. Same Model; different representation. Use content negotiation or separate API controllers.

### 127. Where does error handling go in MVC?
**Answer:** Global exception handler or filter; catches errors; returns error View or JSON. Controller may throw; handler formats response. Don't swallow in View. Centralize.

### 128. What is the difference between MVC and Clean Architecture?
**Answer:** Clean Architecture: layers (entities, use cases, adapters); MVC can be in presentation layer. Use cases replace fat Controller; Model is entity. Stricter boundaries.

### 129. How does MVC handle CORS?
**Answer:** Middleware sets CORS headers before Controller. Controller doesn't know about CORS. Same as other cross-cutting. Configure allowed origins and methods.

### 130. What is the purpose of View Resolver?
**Answer:** Resolver maps logical view name to template (HTML, JSON). Controller returns view name; resolver picks file or serializer. Use for multiple view technologies. Framework component.

### 131. Where does rate limiting go in MVC?
**Answer:** Middleware or filter before Controller; rejects or delays when over limit. Controller unchanged. Infrastructure concern. Same as auth and logging.

### 132. How does MVC handle session?
**Answer:** Middleware loads session; Controller reads/writes session; View may read for display. Store session id in cookie; store data server-side or in cookie. Don't put large data in session.

### 133. What is the difference between MVC and Hexagonal?
**Answer:** Hexagonal: ports and adapters; core has no framework. MVC can be adapter (HTTP → Controller). Same idea: separate core from delivery. Hexagonal is more explicit.

### 134. Explain MVC and multi-tenant.
**Answer:** Middleware resolves tenant (subdomain, header); Controller uses tenant in Model/service. Model may scope queries by tenant. Use for SaaS. Isolate data per tenant.

### 135. Where does CSRF protection go in MVC?
**Answer:** Middleware validates CSRF token on state-changing requests. Controller receives valid request. View includes token in form. Same as other security. Use for forms.

### 136. What is the purpose of Action Result?
**Answer:** Controller returns ActionResult (ViewResult, RedirectResult, JsonResult). Encapsulates response; framework executes. Use for testability and consistency. Common in ASP.NET.

### 137. How does MVC handle file download?
**Answer:** Controller returns file stream or path; framework sets Content-Disposition attachment. Use Model/service for file access. Same as other response types. Validate path.

### 138. What is the difference between MVC and Server Components?
**Answer:** Server Components (React): render on server; no client JS for that part. Controller-like on server; View is streamed. Hybrid; different from classic MVC. Use for performance.

### 139. Where does request ID go in MVC?
**Answer:** Middleware generates or reads X-Request-Id; sets on request; adds to response and logs. Controller doesn't need to know. Use for tracing. Same as logging.

### 140. How does MVC handle pagination?
**Answer:** Controller receives page/size (query); Model/service returns page of data; View renders list and pagination UI. Use offset or cursor; limit max size. Common pattern.

### 141. What is the purpose of TempData?
**Answer:** TempData holds data for one request (e.g. after redirect). Controller sets; next View reads; then cleared. Use for flash messages. Framework-specific (e.g. ASP.NET, Rails).

### 142. Explain MVC and event sourcing.
**Answer:** Model may append events instead of state; Controller sends command; Model appends; View reads from read model. MVC fits in command/query side. Event sourcing is Model implementation.

### 143. Where does health check go in MVC?
**Answer:** Separate endpoint or middleware; doesn't use main Controller. May check Model/DB. Use for load balancer. Keep fast; no auth. Infrastructure.

### 144. What is the difference between MVC and BFF?
**Answer:** BFF (Backend for Frontend): API tailored per client. BFF can use MVC internally; Controller aggregates backends. MVC is pattern; BFF is architecture. Use BFF for multiple clients.

### 145. How does MVC handle OPTIONS (CORS preflight)?
**Answer:** Middleware responds to OPTIONS with CORS headers; may not reach Controller. Or Controller returns 204 with headers. Same as CORS. Use for browser requests.

### 146. What is the purpose of Layout in MVC?
**Answer:** Layout is wrapper template (header, footer); View is content. Controller returns View; framework merges View into Layout. Use for consistent shell. Common in server-rendered.

### 147. Where does API versioning go in MVC?
**Answer:** Middleware or route prefix (e.g. /v1/); Controller is versioned. Same Model; different Controller or logic. Use for breaking changes. Document and deprecate.

### 148. How does MVC handle streaming response?
**Answer:** Controller returns stream or async iterator; framework streams to client. Use for large response or SSE. Model may stream data. Same as other response types. Handle backpressure.

### 149. What is the difference between MVC and MVP (Passive View)?
**Answer:** Passive View: View is dumb; Presenter updates View directly. No View logic. Controller in MVC is like Presenter but View may observe Model. MVP is stricter for View.

### 150. What is the purpose of Data Annotations in MVC?
**Answer:** Annotations on Model (required, range, etc.) for validation and display. Framework validates before Controller; View can use for labels. Use for declarative validation. Common in ASP.NET.

### 151. Where does WebSocket handler go in MVC?
**Answer:** Separate route or middleware; handler uses Model/service. Not classic Controller; may have Controller-like class. Use for real-time. Same service layer as HTTP.

### 152. How does MVC handle form resubmission (PRG)?
**Answer:** POST redirects to GET (RedirectResult); user sees GET; refresh doesn't resubmit. Controller returns redirect after POST. Use for all state-changing forms. Standard pattern.

### 153. What is the purpose of Tag Helpers (or equivalent)?
**Answer:** Server-side helpers that generate HTML (e.g. form, input with validation). View uses tags; framework renders with Model binding. Use for consistency and less boilerplate. ASP.NET term.

### 154. Explain MVC and CQRS.
**Answer:** Command side: Controller sends command; Model (write) updates. Query side: Controller reads from read model; View. Same MVC; Model split into write/read. Use for scale and clarity.

### 155. Where does compression go in MVC?
**Answer:** Middleware compresses response after Controller. Controller unchanged. Use for bandwidth. Same as other pipeline. Set Vary: Accept-Encoding.

### 156. What is the difference between MVC and Thin Controller?
**Answer:** Thin Controller: Controller only delegates to service; no logic. Same as Clean MVC. Emphasizes Controller as coordinator. Use service layer for logic.

### 157. How does MVC handle conditional GET (304)?
**Answer:** Controller or middleware checks If-None-Match/If-Modified-Since; if not modified returns 304. Model may provide ETag or date. Use for caching. Same as HTTP caching.

### 158. What is the purpose of Area in MVC?
**Answer:** Area groups Controllers and Views by feature (e.g. Admin, Shop). Route prefix per area. Use for large apps. Same pattern in many frameworks. Modular structure.

### 159. Where does request validation go in MVC?
**Answer:** After model binding; before Controller action or in filter. Validate type, required, format; return 400 if invalid. Use schema or annotations. Don't put validation logic in View.

### 160. How does MVC handle static files?
**Answer:** Middleware serves static files; doesn't reach Controller. Or Controller delegates to file handler. Use for assets. Configure path and caching. Same as other frameworks.

### 161. What is the difference between MVC and HMVC?
**Answer:** HMVC: hierarchical MVC; modules have own M-V-C; can call other modules. Use for modular apps. Same pattern at each level. Request can be internal (module to module).

### 162. What is the purpose of View Component?
**Answer:** Reusable UI unit with own logic (mini Controller + View). Controller or View invokes; receives data. Use for widgets. Same as partial with logic. ASP.NET Core term.

### 163. Where does correlation ID go in MVC?
**Answer:** Same as request ID; middleware sets; propagates to logs and downstream. Controller doesn't change. Use for distributed tracing. Same as request id.

### 164. How does MVC handle multipart form?
**Answer:** Framework binds multipart to Model or files; Controller receives. Validate and process; use Model/service for storage. Same as body binding. Use for upload forms.

### 165. What is the purpose of Filters pipeline?
**Answer:** Filters run before/after Controller (and action). Order: auth, logging, validation, action, result. Use for cross-cutting. Same as middleware but Controller-scoped. Configurable order.

### 166. Explain MVC and repository pattern.
**Answer:** Controller uses repository (interface); repository wraps Model/data access. Testable; swap implementation. Model may include repository or separate. Use for data abstraction.

### 167. Where does retry logic go in MVC?
**Answer:** In Model/service (e.g. DB retry); not in Controller. Controller may catch and return 503. Use for resilience. Same as other layers. Don't retry in View.

### 168. How does MVC handle 404?
**Answer:** Framework route not matched → 404; or Controller returns NotFound(). Use custom 404 View. Don't leak info. Same as other status codes. Centralize 404 page.

### 169. What is the difference between MVC and ADR?
**Answer:** ADR (Action-Domain-Responder): Action (Controller), Domain (Model), Responder (View). One action per class. Similar to MVC; more explicit. Use for clarity. Slim framework style.

### 170. What is the purpose of Route constraints?
**Answer:** Constraints limit route match (e.g. id must be int). Framework validates before Controller. Use for type-safe routes. Document constraints. Same in many frameworks.

### 171. Where does feature flag go in MVC?
**Answer:** Middleware or Controller checks flag; branches logic or View. Use for rollout. Don't put in Model for UI flags. Config or service. Same as other apps.

### 172. How does MVC handle cookie?
**Answer:** Controller sets cookie in response; reads from request. Use for session id or preference. HttpOnly, Secure in production. Same as HTTP. Don't put sensitive in cookie.

### 173. What is the purpose of Child Action?
**Answer:** Controller action invoked from View (e.g. render menu). Returns partial. Use for dynamic partials. Can be removed in favor of View Component. Framework-specific.

### 174. Explain MVC and saga (distributed).
**Answer:** Saga coordinates multi-step transaction across services. Controller may start saga; Model/service has saga logic. MVC fits; saga is Model layer. Use for distributed transactions.

### 175. Where does audit logging go in MVC?
**Answer:** Filter or Model/service logs who did what. Controller doesn't log audit; service does after update. Use for compliance. Same as other logging. Include user and resource.

### 176. How does MVC handle Range request?
**Answer:** Controller or middleware reads Range header; returns 206 with partial content. Use for large file download. Model may stream range. Same as HTTP. Support optional.

### 177. What is the difference between MVC and PAC?
**Answer:** PAC (Presentation-Abstraction-Control): hierarchy of PAC triads; each has presentation, abstraction, control. More complex than MVC. Rare. Use for very modular UI.

### 178. What is the purpose of Anti-Forgery token?
**Answer:** Token in form and cookie/session; validated on POST. Prevents CSRF. Controller receives valid request. View includes token. Same as CSRF protection. Use for state-changing forms.

### 179. Where does circuit breaker go in MVC?
**Answer:** In Model/service when calling external service; not in Controller. Controller catches failure and returns 503. Use for resilience. Same as retry. Don't put in View.

### 180. How does MVC handle ETag?
**Answer:** Controller or middleware computes ETag; sets header; on If-None-Match returns 304. Model may provide ETag. Use for caching. Same as conditional GET. Optional.

### 181. What is the purpose of Display/Editor templates?
**Answer:** Templates for how to render Model property (e.g. date, email). View uses template by type. Use for consistency. Framework-specific. Same as component per type.

### 182. Explain MVC and eventual consistency.
**Answer:** Model may be eventually consistent (read model lags). Controller reads; may get stale data. Use for scale. Same MVC; Model implementation detail. Document consistency.

### 183. Where does request timeout go in MVC?
**Answer:** Server or middleware sets timeout; Controller should finish quickly. Don't implement timeout in Controller. Use async and cancellation token. Infrastructure.

### 184. How does MVC handle API key auth?
**Answer:** Middleware validates API key (header); sets user or rejects 401. Controller unchanged. Use for server-to-server. Same as other auth. Store key securely.

### 185. What is the difference between MVC and RMR?
**Answer:** RMR (Resource-Method-Representation): REST-style; resource and method; representation is View. Similar to MVC for API. More REST-centric. Use for HTTP APIs.

### 186. What is the purpose of Output Cache?
**Answer:** Cache rendered View (or action result) by key (route, params). Subsequent requests serve cache. Use for static or semi-static pages. Invalidate on update. Framework feature.

### 187. Where does JWT validation go in MVC?
**Answer:** Middleware validates JWT; sets user on request. Controller uses user. Same as auth. Use for stateless auth. Validate signature and expiry. Don't put in View.

### 188. How does MVC handle content negotiation?
**Answer:** Controller or middleware checks Accept; returns HTML or JSON. Same Model; different View/serializer. Use Accept header. Document supported types. Same as API in same app.

### 189. What is the purpose of Model State?
**Answer:** Holds validation errors and model values after POST. View can show errors and repopulate form. Controller checks IsValid; returns View with model if invalid. Framework concept.

### 190. Explain MVC and DDD.
**Answer:** DDD: domain model, aggregates, repositories. MVC Model can be domain; Controller uses application service. Same layering. Use DDD for complex domain; MVC for delivery.

### 191. Where does rate limit response (429) go in MVC?
**Answer:** Middleware returns 429 when over limit; Controller not reached. Set Retry-After. Use for fair usage. Same as rate limiting. Document limits.

### 192. How does MVC handle HEAD request?
**Answer:** Same as GET but no body; Controller may return same; framework strips body. Use for checking existence or headers. Same as GET. Support optional.

### 193. What is the difference between MVC and Vertical Slice?
**Answer:** Vertical Slice: organize by feature (one slice = request to response). MVC can be inside slice. Slice includes Controller, Model, View for one feature. Use for features.

### 194. What is the purpose of Route attribute?
**Answer:** Attribute on Controller/action defines route (e.g. [Route("api/[controller]")]). Framework uses for routing. Use for explicit routes. Same in many frameworks. Declarative.

### 195. Where does health check dependency go in MVC?
**Answer:** Health endpoint calls Model/DB or service; returns 503 if down. Don't use main Controller. Use for readiness. Keep fast. Same as health check.

### 196. How does MVC handle async?
**Answer:** Controller action async; awaits Model/service. Same flow; non-blocking. Use for I/O. Don't block in Controller. Framework supports async actions. Common pattern.

### 197. What is the purpose of ViewBag/ViewData?
**Answer:** Dynamic bag for passing data from Controller to View (beside Model). Use for one-off data. Prefer Model or ViewModel. Framework-specific. Avoid overuse.

### 198. Explain MVC and microservices.
**Answer:** Each service can use MVC internally; Controller is API; Model is service logic. Services communicate via HTTP/gRPC. MVC is per-service. Use for bounded context.

### 199. Where does CORS preflight go in MVC?
**Answer:** Middleware responds to OPTIONS with CORS headers. Controller may not be hit. Same as CORS. Use for browser. Set Allow-Origin, Methods, Headers. Document.

### 200. How does MVC handle DELETE?
**Answer:** Controller action for DELETE method; calls Model to delete; returns 204 or 200 with body. Same as GET/POST. Use for REST. Idempotent. Validate and authorize.

### 201. What is the difference between MVC and Flux (alternate)?
**Answer:** Flux has Store (Model), View, Dispatcher (no Controller). Unidirectional. MVC has Controller; may have two-way binding. Flux is more constrained. Use for predictable state.

### 202. What is the purpose of Action Name?
**Answer:** Name of action method; maps to URL. Framework uses for routing. Use for clear URLs. Same as route. Can override with attribute. Document action names.

### 203. Where does idempotency go in MVC?
**Answer:** Controller or middleware checks Idempotency-Key; stores result; returns same on replay. Use for POST. Model may be unchanged on replay. Same as API idempotency. Document.

### 204. How does MVC handle PATCH?
**Answer:** Controller receives partial body; updates Model; returns 200 with updated resource. Same as PUT but partial. Validate and merge. Use for REST. Same as other methods.

### 205. What is the purpose of Default Model Binder?
**Answer:** Framework component that binds request to Model. Conventions (e.g. query to property). Customize for complex types. Use for less code. Same in many frameworks. Extensible.

### 206. Explain MVC and event-driven.
**Answer:** Controller may publish event; Model or other services subscribe. Decouples. Same MVC; async communication. Use for side effects. Don't block Controller on subscribers.

### 207. Where does request size limit go in MVC?
**Answer:** Middleware or server config rejects large body; returns 413. Controller not reached. Use for DoS protection. Same as other limits. Document limit.

### 208. How does MVC handle OPTIONS?
**Answer:** Middleware or Controller returns 204 with Allow and CORS headers. Use for preflight. Same as CORS. May not hit Controller. Document allowed methods.

### 209. What is the purpose of Result Filter?
**Answer:** Runs after action, before/after result execution. Use for logging result, modifying response. Same as filter pipeline. Framework concept. Use for cross-cutting on result.

### 210. What is the difference between MVC and Server-Sent Events?
**Answer:** SSE: Controller streams events; View (client) listens. One-way. MVC Controller can be SSE endpoint. Same pattern; different response type. Use for real-time updates.

### 211. Where does API documentation go in MVC?
**Answer:** OpenAPI/Swagger from routes and annotations; separate from Controller code or generated. Use for docs and client gen. Same as other APIs. Document version and deprecation.

### 212. How does MVC handle 500?
**Answer:** Global handler catches unhandled exception; returns 500 and error View or JSON. Don't expose stack in production. Log error. Same as error handling. Centralize.

### 213. What is the purpose of Authorization Filter?
**Answer:** Runs before action; checks permission; returns 403 or redirect if denied. Use for authz. Same as auth middleware but Controller-scoped. Run after auth. Framework concept.

### 214. Explain MVC and read replica.
**Answer:** Model may read from replica; write to primary. Controller unchanged. Use for scale. Same MVC; data access detail. Handle replication lag. Document consistency.

### 215. Where does request validation error format go in MVC?
**Answer:** Controller returns 400 with body (e.g. { errors: [...] }); format consistent. Use from validator. Same as API validation. Document error shape. Don't put in View.

### 216. How does MVC handle conditional request?
**Answer:** Controller checks If-Match/If-None-Match or If-Modified-Since; returns 304 or 412. Model may provide ETag. Use for caching and concurrency. Same as HTTP. Optional.

### 217. What is the purpose of Exception Filter?
**Answer:** Catches exception from action; returns error response or redirect. Use for central error handling. Same as global handler but filter. Log and format. Framework concept.

### 218. What is the difference between MVC and GraphQL?
**Answer:** GraphQL: single endpoint; client queries shape. MVC: multiple endpoints; fixed response. Both can have Model layer. Use GraphQL for flexible query; MVC for simple CRUD.

### 219. Where does correlation ID propagation go in MVC?
**Answer:** Middleware reads or generates; adds to request; passes to downstream (header). Use for tracing. Same as request id. Don't put in Model. Log in each layer.

### 220. How does MVC handle Webhook?
**Answer:** Controller receives POST; validates signature; delegates to Model/service; returns 200 quickly. Use async for processing. Same as other POST. Idempotency-Key optional.

### 221. What is the purpose of Resource Filter?
**Answer:** Runs before model binding; can short-circuit. Use for auth before binding. Same as filter pipeline. Framework-specific. Less common than action filter.

### 222. Explain MVC and CQRS (read model).
**Answer:** Read model is optimized for queries; Controller reads from it; View. Write model for commands. Same MVC; Model split. Use for scale and different shapes. Eventually consistent.

### 223. Where does deprecation header go in MVC?
**Answer:** Middleware or Controller sets Deprecation/Sunset on deprecated route. Use for versioning. Document migration. Same as API deprecation. Optional.

### 224. How does MVC handle TRACE?
**Answer:** Usually disabled for security. If enabled, middleware or Controller echoes request. Rare. Same as HTTP. Don't enable in production without need.

### 225. What is the purpose of Model Metadata?
**Answer:** Metadata about Model (display name, format, validation). Used by View and binding. Use for consistency. Framework concept. Same as data annotations. Extensible.

### 226. What is the difference between MVC and Onion Architecture?
**Answer:** Onion: core has entities; outer layers depend on inner. MVC can be in outer (UI). Controller depends on use case; use case on entity. Same idea: dependency inward.

### 227. Where does request logging go in MVC?
**Answer:** Middleware or filter logs request (method, path, maybe body in dev); after response log status and duration. Use for access log. Same as logging. Don't log PII in prod.

### 228. How does MVC handle versioning in URL?
**Answer:** Route prefix (e.g. /v1/controllers); Controller or set per version. Same Model; different Controller or logic. Use for breaking changes. Document and deprecate.

