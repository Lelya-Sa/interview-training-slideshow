# Questions Coverage Roadmap – Junior Fullstack Interview

**Purpose:** Track that **every topic** in the 75-day schedule has enough questions for progressive daily practice (different questions each day).

---

## Schedule coverage – all topics included

The **75-day schedule** covers **all** of these areas (not just Logic, LeetCode, and Data Structures):

| Area | Topics in schedule |
|------|---------------------|
| **Algorithms** | Logic Questions, LeetCode, Data Structures, Time Complexity, Hash Tables, Binary Trees |
| **Frontend** | **React**, **JavaScript**, HTML, CSS, ES6, Tailwind, SPA/SSR/SSG |
| **Backend** | Node.js, Backend Services, Storage, Queues, Integrations |
| **APIs** | REST, HTTP, HTTPS, GraphQL, gRPC, AJAX, Headers, Webhooks, BFF, API fundamentals |
| **Databases** | SQL vs NoSQL, PostgreSQL, MongoDB, Redis, Data Modeling, Sharding/Replication/Caching |
| **Architecture** | MVC, System Design, Clean Architecture, Onion, Application Layers, System/Project Architecture |
| **Design Patterns** | Singleton, Factory, Observer, Strategy, Adapter, Design Patterns overview |
| **Security** | Authentication/Authorization, JWT, OAuth, OpenID, Secure-by-Design, Security Keys |
| **DevOps** | Docker, CI/CD, Kubernetes, Scaling, Failover/Load Balancing, Observability |
| **Other** | OOP, QA, ADRs, C4 Model, Event Sourcing, CQRS |

Every topic above appears on specific days (see "By category" below). This roadmap ensures each has **enough questions** so you get fresh ones each day.

---

## Critical for junior fullstack (don't skip)

These are especially important for junior fullstack interviews. Make sure they have enough questions:

| Topic | Path | Days in schedule | Min questions | Current | Status | Gap |
|-------|------|------------------|---------------|---------|--------|-----|
| **React** | `frontend/react/questions.md` | 36 | 432 | 275 | ❌ LOW | 157 |
| **Javascript** | `frontend/javascript/questions.md` | 36 | 432 | 250 | ❌ LOW | 182 |
| **Nodejs** | `backend/nodejs/questions.md` | 49 | 588 | 275 | ❌ LOW | 313 |
| **Data Structures** | `algorithms/data-structures/questions.md` | 75 | 375 | 375 | ✅ OK | 0 |
| **Logic Questions** | `algorithms/logic-questions/questions.md` | 75 | 225 | 229 | ✅ OK | 0 |
| **Leetcode** | `algorithms/leetcode/questions.md` | 75 | 150 | 29 | ❌ LOW | 121 |
| **Rest** | `apis/rest/questions.md` | 26 | 312 | 215 | ❌ LOW | 97 |
| **System Design** | `architecture/system-design/questions.md` | 65 | 780 | 230 | ❌ LOW | 550 |

**React** is in the schedule on 36 days (e.g. Days 1–28, 32, 36, 40, 44, 48, 52, 56, 60). Prioritize filling React (and JavaScript, Node.js) questions so the schedule is fully usable.

---

## Rules (questions per day)

- **Logic Questions:** 3/day × days used → min required
- **LeetCode:** 2/day × days used → min required  
- **Data Structures:** 5/day × days used → min required
- **All other topics (including React, JavaScript, Node.js, REST, etc.):** 12/day × days used → min required

**How to refresh:** Run `node scripts/generate-questions-roadmap.js` from `intreview_training`.

**How to use:** Work through topics marked ❌ (LOW). Add questions in `### N. Question` / `**Answer:**` format until count ≥ min required. One topic per session is fine. Start with React, JavaScript, Node.js if you want maximum impact.

---

## Summary

| Status | Count |
|--------|--------|
| ✅ OK (enough questions) | 2 |
| ❌ Need more questions | 64 |
| **Total topics** | **66** |

---

## By category

### Algorithms

| Topic | Path | Days | Per day | Min required | Current | Status | Gap |
|-------|------|------|---------|---------------|---------|--------|-----|
| Binary Trees | `algorithms/binary-trees/questions.md` | 10 | 12 | 120 | 15 | ❌ LOW | 105 |
| Data Structures | `algorithms/data-structures/questions.md` | 75 | 5 | 375 | 375 | ✅ OK | 0 |
| Hash Tables | `algorithms/hash-tables/questions.md` | 10 | 12 | 120 | 15 | ❌ LOW | 105 |
| Leetcode | `algorithms/leetcode/questions.md` | 75 | 2 | 150 | 29 | ❌ LOW | 121 |
| Logic Questions | `algorithms/logic-questions/questions.md` | 75 | 3 | 225 | 229 | ✅ OK | 0 |
| Time Complexity | `algorithms/time-complexity/questions.md` | 15 | 12 | 180 | 15 | ❌ LOW | 165 |

### Frontend

| Topic | Path | Days | Per day | Min required | Current | Status | Gap |
|-------|------|------|---------|---------------|---------|--------|-----|
| Css | `frontend/css/questions.md` | 8 | 12 | 96 | 2 | ❌ LOW | 94 |
| Es6 | `frontend/es6/questions.md` | 9 | 12 | 108 | 15 | ❌ LOW | 93 |
| Html | `frontend/html/questions.md` | 8 | 12 | 96 | 2 | ❌ LOW | 94 |
| Javascript | `frontend/javascript/questions.md` | 36 | 12 | 432 | 250 | ❌ LOW | 182 |
| React | `frontend/react/questions.md` | 36 | 12 | 432 | 275 | ❌ LOW | 157 |
| Spa Ssr Ssg | `frontend/spa-ssr-ssg/questions.md` | 3 | 12 | 36 | 10 | ❌ LOW | 26 |
| Tailwind | `frontend/tailwind/questions.md` | 2 | 12 | 24 | 10 | ❌ LOW | 14 |

### Backend

| Topic | Path | Days | Per day | Min required | Current | Status | Gap |
|-------|------|------|---------|---------------|---------|--------|-----|
| Integrations | `backend/integrations/questions.md` | 5 | 12 | 60 | 10 | ❌ LOW | 50 |
| Nodejs | `backend/nodejs/questions.md` | 49 | 12 | 588 | 275 | ❌ LOW | 313 |
| Queues | `backend/queues/questions.md` | 6 | 12 | 72 | 10 | ❌ LOW | 62 |
| Backend Services | `backend/services/questions.md` | 6 | 12 | 72 | 10 | ❌ LOW | 62 |
| Storage | `backend/storage/questions.md` | 6 | 12 | 72 | 10 | ❌ LOW | 62 |

### APIs

| Topic | Path | Days | Per day | Min required | Current | Status | Gap |
|-------|------|------|---------|---------------|---------|--------|-----|
| Ajax | `apis/ajax/questions.md` | 4 | 12 | 48 | 10 | ❌ LOW | 38 |
| Api | `apis/api/questions.md` | 7 | 12 | 84 | 10 | ❌ LOW | 74 |
| Bff | `apis/bff/questions.md` | 3 | 12 | 36 | 10 | ❌ LOW | 26 |
| Graphql | `apis/graphql-vs-rest/questions.md` | 6 | 12 | 72 | 15 | ❌ LOW | 57 |
| Grpc | `apis/grpc/questions.md` | 3 | 12 | 36 | 10 | ❌ LOW | 26 |
| Headers | `apis/headers/questions.md` | 4 | 12 | 48 | 10 | ❌ LOW | 38 |
| Http | `apis/http/questions.md` | 19 | 12 | 228 | 110 | ❌ LOW | 118 |
| Https | `apis/https/questions.md` | 6 | 12 | 72 | 10 | ❌ LOW | 62 |
| Rest | `apis/rest/questions.md` | 26 | 12 | 312 | 215 | ❌ LOW | 97 |
| Webhooks | `apis/webhooks/questions.md` | 3 | 12 | 36 | 10 | ❌ LOW | 26 |

### Architecture

| Topic | Path | Days | Per day | Min required | Current | Status | Gap |
|-------|------|------|---------|---------------|---------|--------|-----|
| Application Layers | `architecture/application-layers/questions.md` | 6 | 12 | 72 | 10 | ❌ LOW | 62 |
| Clean Architecture | `architecture/clean-architecture/questions.md` | 7 | 12 | 84 | 10 | ❌ LOW | 74 |
| Design Patterns | `architecture/design-patterns/questions.md` | 15 | 12 | 180 | 15 | ❌ LOW | 165 |
| Mvc | `architecture/mvc/questions.md` | 19 | 12 | 228 | 110 | ❌ LOW | 118 |
| Onion Architecture | `architecture/onion-architecture/questions.md` | 5 | 12 | 60 | 10 | ❌ LOW | 50 |
| Project Architecture | `architecture/project-architecture/questions.md` | 5 | 12 | 60 | 10 | ❌ LOW | 50 |
| System Architecture | `architecture/system-architecture/questions.md` | 8 | 12 | 96 | 10 | ❌ LOW | 86 |
| System Design | `architecture/system-design/questions.md` | 65 | 12 | 780 | 230 | ❌ LOW | 550 |

### Databases

| Topic | Path | Days | Per day | Min required | Current | Status | Gap |
|-------|------|------|---------|---------------|---------|--------|-----|
| Data Model | `databases/data-model/questions.md` | 7 | 12 | 84 | 10 | ❌ LOW | 74 |
| Mongodb | `databases/mongodb/questions.md` | 10 | 12 | 120 | 2 | ❌ LOW | 118 |
| Postgresql | `databases/postgresql/questions.md` | 12 | 12 | 144 | 2 | ❌ LOW | 142 |
| Redis | `databases/redis/questions.md` | 9 | 12 | 108 | 10 | ❌ LOW | 98 |
| Sharding Replication Caching | `databases/sharding-replication-caching/questions.md` | 6 | 12 | 72 | 15 | ❌ LOW | 57 |
| Sql Vs Nosql | `databases/sql-vs-nosql/questions.md` | 13 | 12 | 156 | 15 | ❌ LOW | 141 |

### Design Patterns

| Topic | Path | Days | Per day | Min required | Current | Status | Gap |
|-------|------|------|---------|---------------|---------|--------|-----|
| Observer | `design-patterns/behavioral/observer/questions.md` | 7 | 12 | 84 | 25 | ❌ LOW | 59 |
| Strategy | `design-patterns/behavioral/strategy/questions.md` | 7 | 12 | 84 | 25 | ❌ LOW | 59 |
| Factory | `design-patterns/creational/factory/questions.md` | 7 | 12 | 84 | 25 | ❌ LOW | 59 |
| Singleton | `design-patterns/creational/singleton/questions.md` | 7 | 12 | 84 | 25 | ❌ LOW | 59 |
| Design Patterns Overview | `design-patterns/questions.md` | 23 | 12 | 276 | 140 | ❌ LOW | 136 |
| Adapter | `design-patterns/structural/adapter/questions.md` | 6 | 12 | 72 | 25 | ❌ LOW | 47 |

### OOP

| Topic | Path | Days | Per day | Min required | Current | Status | Gap |
|-------|------|------|---------|---------------|---------|--------|-----|
| Oop | `oop/questions.md` | 8 | 12 | 96 | 10 | ❌ LOW | 86 |

### Security

| Topic | Path | Days | Per day | Min required | Current | Status | Gap |
|-------|------|------|---------|---------------|---------|--------|-----|
| Authentication Authorization | `security/authentication-authorization/questions.md` | 6 | 12 | 72 | 2 | ❌ LOW | 70 |
| Jwt | `security/jwt/questions.md` | 6 | 12 | 72 | 15 | ❌ LOW | 57 |
| Oauth | `security/oauth/questions.md` | 5 | 12 | 60 | 10 | ❌ LOW | 50 |
| Openid | `security/openid/questions.md` | 5 | 12 | 60 | 10 | ❌ LOW | 50 |
| Secure By Design | `security/secure-by-design/questions.md` | 4 | 12 | 48 | 10 | ❌ LOW | 38 |
| Security Keys | `security/security-keys/questions.md` | 4 | 12 | 48 | 10 | ❌ LOW | 38 |

### DevOps

| Topic | Path | Days | Per day | Min required | Current | Status | Gap |
|-------|------|------|---------|---------------|---------|--------|-----|
| Cicd | `devops/cicd/questions.md` | 5 | 12 | 60 | 15 | ❌ LOW | 45 |
| Docker | `devops/docker/questions.md` | 5 | 12 | 60 | 15 | ❌ LOW | 45 |
| Failover Load Balancing | `devops/failover-load-balancing/questions.md` | 5 | 12 | 60 | 10 | ❌ LOW | 50 |
| Kubernetes | `devops/kubernetes/questions.md` | 5 | 12 | 60 | 15 | ❌ LOW | 45 |
| Observability | `devops/observability/questions.md` | 5 | 12 | 60 | 10 | ❌ LOW | 50 |
| Scaling | `devops/scaling/questions.md` | 5 | 12 | 60 | 10 | ❌ LOW | 50 |

### QA

| Topic | Path | Days | Per day | Min required | Current | Status | Gap |
|-------|------|------|---------|---------------|---------|--------|-----|
| Qa | `qa/questions.md` | 5 | 12 | 60 | 10 | ❌ LOW | 50 |

### Documentation

| Topic | Path | Days | Per day | Min required | Current | Status | Gap |
|-------|------|------|---------|---------------|---------|--------|-----|
| Adrs | `documentation/adrs/questions.md` | 3 | 12 | 36 | 10 | ❌ LOW | 26 |
| C4 Model | `documentation/c4-model/questions.md` | 3 | 12 | 36 | 10 | ❌ LOW | 26 |

### Advanced Patterns

| Topic | Path | Days | Per day | Min required | Current | Status | Gap |
|-------|------|------|---------|---------------|---------|--------|-----|
| Cqrs | `advanced-patterns/cqrs/questions.md` | 5 | 12 | 60 | 10 | ❌ LOW | 50 |
| Event Sourcing | `advanced-patterns/event-sourcing/questions.md` | 5 | 12 | 60 | 10 | ❌ LOW | 50 |

---

## Priority order (by gap, then by days used)

Use this order to fill questions topic-by-topic (biggest gaps first).

| # | Topic | Path | Gap | Min | Current | Days |
|---|-------|------|-----|-----|---------|------|
| 1 | System Design | `architecture/system-design/questions.md` | 550 | 780 | 230 | 65 |
| 2 | Nodejs | `backend/nodejs/questions.md` | 313 | 588 | 275 | 49 |
| 3 | Javascript | `frontend/javascript/questions.md` | 182 | 432 | 250 | 36 |
| 4 | Time Complexity | `algorithms/time-complexity/questions.md` | 165 | 180 | 15 | 15 |
| 5 | Design Patterns | `architecture/design-patterns/questions.md` | 165 | 180 | 15 | 15 |
| 6 | React | `frontend/react/questions.md` | 157 | 432 | 275 | 36 |
| 7 | Postgresql | `databases/postgresql/questions.md` | 142 | 144 | 2 | 12 |
| 8 | Sql Vs Nosql | `databases/sql-vs-nosql/questions.md` | 141 | 156 | 15 | 13 |
| 9 | Design Patterns Overview | `design-patterns/questions.md` | 136 | 276 | 140 | 23 |
| 10 | Leetcode | `algorithms/leetcode/questions.md` | 121 | 150 | 29 | 75 |
| 11 | Http | `apis/http/questions.md` | 118 | 228 | 110 | 19 |
| 12 | Mvc | `architecture/mvc/questions.md` | 118 | 228 | 110 | 19 |
| 13 | Mongodb | `databases/mongodb/questions.md` | 118 | 120 | 2 | 10 |
| 14 | Binary Trees | `algorithms/binary-trees/questions.md` | 105 | 120 | 15 | 10 |
| 15 | Hash Tables | `algorithms/hash-tables/questions.md` | 105 | 120 | 15 | 10 |
| 16 | Redis | `databases/redis/questions.md` | 98 | 108 | 10 | 9 |
| 17 | Rest | `apis/rest/questions.md` | 97 | 312 | 215 | 26 |
| 18 | Css | `frontend/css/questions.md` | 94 | 96 | 2 | 8 |
| 19 | Html | `frontend/html/questions.md` | 94 | 96 | 2 | 8 |
| 20 | Es6 | `frontend/es6/questions.md` | 93 | 108 | 15 | 9 |
| 21 | System Architecture | `architecture/system-architecture/questions.md` | 86 | 96 | 10 | 8 |
| 22 | Oop | `oop/questions.md` | 86 | 96 | 10 | 8 |
| 23 | Api | `apis/api/questions.md` | 74 | 84 | 10 | 7 |
| 24 | Clean Architecture | `architecture/clean-architecture/questions.md` | 74 | 84 | 10 | 7 |
| 25 | Data Model | `databases/data-model/questions.md` | 74 | 84 | 10 | 7 |
| 26 | Authentication Authorization | `security/authentication-authorization/questions.md` | 70 | 72 | 2 | 6 |
| 27 | Https | `apis/https/questions.md` | 62 | 72 | 10 | 6 |
| 28 | Application Layers | `architecture/application-layers/questions.md` | 62 | 72 | 10 | 6 |
| 29 | Queues | `backend/queues/questions.md` | 62 | 72 | 10 | 6 |
| 30 | Backend Services | `backend/services/questions.md` | 62 | 72 | 10 | 6 |
| 31 | Storage | `backend/storage/questions.md` | 62 | 72 | 10 | 6 |
| 32 | Observer | `design-patterns/behavioral/observer/questions.md` | 59 | 84 | 25 | 7 |
| 33 | Strategy | `design-patterns/behavioral/strategy/questions.md` | 59 | 84 | 25 | 7 |
| 34 | Factory | `design-patterns/creational/factory/questions.md` | 59 | 84 | 25 | 7 |
| 35 | Singleton | `design-patterns/creational/singleton/questions.md` | 59 | 84 | 25 | 7 |
| 36 | Graphql | `apis/graphql-vs-rest/questions.md` | 57 | 72 | 15 | 6 |
| 37 | Sharding Replication Caching | `databases/sharding-replication-caching/questions.md` | 57 | 72 | 15 | 6 |
| 38 | Jwt | `security/jwt/questions.md` | 57 | 72 | 15 | 6 |
| 39 | Cqrs | `advanced-patterns/cqrs/questions.md` | 50 | 60 | 10 | 5 |
| 40 | Event Sourcing | `advanced-patterns/event-sourcing/questions.md` | 50 | 60 | 10 | 5 |
| 41 | Onion Architecture | `architecture/onion-architecture/questions.md` | 50 | 60 | 10 | 5 |
| 42 | Project Architecture | `architecture/project-architecture/questions.md` | 50 | 60 | 10 | 5 |
| 43 | Integrations | `backend/integrations/questions.md` | 50 | 60 | 10 | 5 |
| 44 | Failover Load Balancing | `devops/failover-load-balancing/questions.md` | 50 | 60 | 10 | 5 |
| 45 | Observability | `devops/observability/questions.md` | 50 | 60 | 10 | 5 |
| 46 | Scaling | `devops/scaling/questions.md` | 50 | 60 | 10 | 5 |
| 47 | Qa | `qa/questions.md` | 50 | 60 | 10 | 5 |
| 48 | Oauth | `security/oauth/questions.md` | 50 | 60 | 10 | 5 |
| 49 | Openid | `security/openid/questions.md` | 50 | 60 | 10 | 5 |
| 50 | Adapter | `design-patterns/structural/adapter/questions.md` | 47 | 72 | 25 | 6 |
| 51 | Cicd | `devops/cicd/questions.md` | 45 | 60 | 15 | 5 |
| 52 | Docker | `devops/docker/questions.md` | 45 | 60 | 15 | 5 |
| 53 | Kubernetes | `devops/kubernetes/questions.md` | 45 | 60 | 15 | 5 |
| 54 | Ajax | `apis/ajax/questions.md` | 38 | 48 | 10 | 4 |
| 55 | Headers | `apis/headers/questions.md` | 38 | 48 | 10 | 4 |
| 56 | Secure By Design | `security/secure-by-design/questions.md` | 38 | 48 | 10 | 4 |
| 57 | Security Keys | `security/security-keys/questions.md` | 38 | 48 | 10 | 4 |
| 58 | Bff | `apis/bff/questions.md` | 26 | 36 | 10 | 3 |
| 59 | Grpc | `apis/grpc/questions.md` | 26 | 36 | 10 | 3 |
| 60 | Webhooks | `apis/webhooks/questions.md` | 26 | 36 | 10 | 3 |
| 61 | Adrs | `documentation/adrs/questions.md` | 26 | 36 | 10 | 3 |
| 62 | C4 Model | `documentation/c4-model/questions.md` | 26 | 36 | 10 | 3 |
| 63 | Spa Ssr Ssg | `frontend/spa-ssr-ssg/questions.md` | 26 | 36 | 10 | 3 |
| 64 | Tailwind | `frontend/tailwind/questions.md` | 14 | 24 | 10 | 2 |


---

*Generated by `scripts/generate-questions-roadmap.js` – re-run to update after adding questions.*
