# Design Patterns Hub — Structural (Python)

### 7) **Adapter** — make incompatible interfaces work together
**Theory:** Converts the interface of a class into another interface clients expect. Lets classes work together that could not otherwise because of incompatible APIs.
**Answer:** Use at **integration boundaries** (legacy SOAP, vendor SDK, old internal module). **Pros:** no fork of third-party code; isolates ugliness. **Cons:** can become a permanent patch if boundary never gets cleaned up.
**Explanation:** Wrapping a legacy XML equipment API behind your `DeviceClient` protocol; adapting Stripe’s SDK to your `PaymentGateway` interface. In Django, custom storage backends adapt S3/local to Django’s `Storage` API.
```python
# integrations/legacy_adapter.py — semiconductor MES legacy API
from typing import Protocol

class LotReader(Protocol):
    def fetch_yield(self, lot_id: str) -> float: ...

class LegacyMesClient:
    """Vendor SDK returns XML strings and uses snake_case methods."""
    def getLotYieldPercent(self, lotId: str) -> str:
        return "98.5"

class MesLotReaderAdapter:
    def __init__(self, legacy: LegacyMesClient) -> None:
        self._legacy = legacy

    def fetch_yield(self, lot_id: str) -> float:
        raw = self._legacy.getLotYieldPercent(lotId=lot_id)
        return float(raw)
```

### 8) **Bridge** — separate abstraction from implementation
**Theory:** Decouples an **abstraction** from its **implementation** so both can vary independently. Avoids permanent binding between interface hierarchy and platform hierarchy.
**Answer:** Use when you have two dimensions of variation (e.g. notification channel × delivery provider). **Pros:** cleaner than multiplying subclasses (`EmailAws`, `EmailSendgrid`, …). **Cons:** more indirection.
**Explanation:** Django storage backends (`FileSystemStorage` vs `S3Boto3Storage`) bridge domain “save file” to cloud/local. Logging handlers bridge `Logger` API to syslog/files/CloudWatch implementations.
```python
from abc import ABC, abstractmethod

class MetricsSink(ABC):
    @abstractmethod
    def emit(self, name: str, value: float, tags: dict) -> None: ...

class StatsdSink(MetricsSink):
    def emit(self, name: str, value: float, tags: dict) -> None:
        ...

class CloudWatchSink(MetricsSink):
    def emit(self, name: str, value: float, tags: dict) -> None:
        ...

class MetricsClient:
    """Abstraction — business code depends on this, not Statsd/CloudWatch."""
    def __init__(self, sink: MetricsSink) -> None:
        self._sink = sink

    def record_latency(self, endpoint: str, ms: float) -> None:
        self._sink.emit("http.latency", ms, {"endpoint": endpoint})
```

### 9) **Composite** — treat individual and groups uniformly
**Theory:** Composes objects into **tree structures** to represent part-whole hierarchies. Clients treat individual objects and compositions **the same way**.
**Answer:** Use for nested menus, org charts, file trees, permission groups, UI component trees. **Pros:** recursive algorithms (sum, render, validate) stay simple. **Cons:** hard to enforce leaf-only constraints on composite.
**Explanation:** Filesystem walkers, Django admin inlines (parent/children), AST nodes in linters. API response builders that nest `Section` objects containing `Row` or nested `Section`.
```python
from dataclasses import dataclass, field
from typing import Union

@dataclass
class MenuItem:
    label: str
    path: str

@dataclass
class MenuGroup:
    label: str
    children: list[Union["MenuGroup", MenuItem]] = field(default_factory=list)

    def paths(self) -> list[str]:
        result: list[str] = []
        for child in self.children:
            if isinstance(child, MenuItem):
                result.append(child.path)
            else:
                result.extend(child.paths())
        return result

root = MenuGroup("Fab Tools", children=[
    MenuItem("Yield", "/yield"),
    MenuGroup("Equipment", children=[MenuItem("Probers", "/probers")]),
])
```

### 10) **Decorator** — add behavior without subclassing
**Theory:** Attaches additional responsibilities to an object **dynamically**. Alternative to subclassing for extending functionality; wrappers implement the same interface as the wrapped object.
**Answer:** Use for logging, caching, retries, auth checks, rate limits. **Pros:** composable, single responsibility per wrapper. **Cons:** debugging stack depth; order of decorators matters.
**Explanation:** Python `@functools.wraps`, Flask/FastAPI **middleware**, `django.views.decorators.cache.cache_page`, Tenacity retry wrappers, and `unittest.mock.patch`. Middleware is a chain of decorators around the request handler.
```python
import functools
import time
import logging

log = logging.getLogger(__name__)

def log_calls(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        log.info("calling %s", func.__name__)
        return func(*args, **kwargs)
    return wrapper

def retry(times: int = 3):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exc = None
            for _ in range(times):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exc = e
            raise last_exc
        return wrapper
    return decorator

@log_calls
@retry(times=3)
def fetch_lot_status(lot_id: str) -> dict:
    ...
```

### 11) **Facade** — simple interface to a complex subsystem
**Theory:** Provides a **unified, higher-level interface** to a set of interfaces in a subsystem. Facade defines a new simplified API; it does not forbid direct subsystem access.
**Answer:** Use when clients need common workflows across many services (place order, onboard user). **Pros:** reduces coupling for typical use cases. **Cons:** facade can become a “god service” if it accumulates all business logic.
**Explanation:** `boto3` client vs low-level `botocore`; service layer in Django that orchestrates ORM + Celery + email. `OnboardingFacade.complete_signup()` hides 6 internal calls from the view.
```python
# services/onboarding_facade.py
class OnboardingFacade:
    def __init__(self, users, billing, email, audit) -> None:
        self._users = users
        self._billing = billing
        self._email = email
        self._audit = audit

    def register_tenant(self, *, email: str, plan: str) -> str:
        user = self._users.create_admin(email=email)
        self._billing.create_subscription(user_id=user.id, plan=plan)
        self._email.send_welcome(email)
        self._audit.log("tenant_registered", user_id=user.id)
        return user.id
```

### 12) **Flyweight** — share intrinsic state
**Theory:** Uses sharing to support **large numbers of fine-grained objects** efficiently by separating **intrinsic** (shared) state from **extrinsic** (context-specific) state.
**Answer:** Use when millions of similar objects differ only slightly (glyphs, map tiles, icon metadata). **Pros:** memory savings. **Cons:** complexity; thread safety on shared pool; identity semantics change.
**Explanation:** Python **string interning**; caching immutable style/config dicts keyed by ID; game servers sharing mesh data across entities. `functools.lru_cache` on pure functions is a flyweight for computation results.
```python
from dataclasses import dataclass

@dataclass(frozen=True)
class IconGlyph:
    """Intrinsic — shared immutable glyph definition."""
    name: str
    svg_path: str

class IconFactory:
    _cache: dict[str, IconGlyph] = {}

    @classmethod
    def get(cls, name: str, svg_path: str) -> IconGlyph:
        key = name
        if key not in cls._cache:
            cls._cache[key] = IconGlyph(name=name, svg_path=svg_path)
        return cls._cache[key]

# Extrinsic: position/size applied at render time, not stored per glyph clone
```

### 13) **Proxy** — controlled stand-in for another object
**Theory:** Provides a **surrogate or placeholder** to control access to another object. Same interface as the real subject; clients may not know they use a proxy.
**Answer:** Use for lazy loading, access control, caching, remote RPC stubs, instrumentation. **Pros:** defers expensive work; centralizes access policy. **Cons:** latency on first access; debugging indirection.
**Explanation:** SQLAlchemy **lazy-loaded relationships**; lazy S3 object bodies; permission-checking proxy around `Storage`; OpenTelemetry auto-instrumentation wrapping clients. Virtual proxy loads `HeavyReport` only when `.render()` is called.
```python
class Report:
    def __init__(self, lot_id: str) -> None:
        self.lot_id = lot_id
        self._rows: list[dict] | None = None

    def _load(self) -> None:
        if self._rows is None:
            self._rows = expensive_db_query(self.lot_id)

    def row_count(self) -> int:
        self._load()
        return len(self._rows)

class LazyReportProxy:
    def __init__(self, lot_id: str) -> None:
        self._real: Report | None = None
        self._lot_id = lot_id

    def row_count(self) -> int:
        if self._real is None:
            self._real = Report(self._lot_id)
        return self._real.row_count()
```
