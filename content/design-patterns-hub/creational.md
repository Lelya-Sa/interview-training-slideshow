# Design Patterns Hub — Creational (Python)

### 1) **Singleton** — one shared instance
**Theory:** Ensures a class has **at most one** instance and provides a global access point. In modern Python services, prefer **module-level singletons** or **DI container scopes** over mutable class singletons.
**Answer:** Use when a single shared resource must be coordinated (config bootstrap, connection pool registry). **Pros:** single source of truth, lazy init possible. **Cons:** hidden global state, hard to test/mock, threading needs care.
**Explanation:** Production: Django loads `settings` once per process; logging uses module-level `getLogger` caches. Anti-pattern: `Database()` singleton wrapping raw connections — use **pooling** instead. Prefer `functools.lru_cache` on a factory function for process-wide single instances.
```python
# settings_loader.py — process-wide config (production idiom)
from functools import lru_cache
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    redis_url: str

@lru_cache
def get_settings() -> Settings:
    """One Settings instance per worker process (Gunicorn/Uvicorn)."""
    return Settings()

# FastAPI dependency injection — preferred over class Singleton
from fastapi import Depends

def get_db(settings: Settings = Depends(get_settings)):
    yield SessionLocal(settings.database_url)
```

### 2) **Factory Method** — subclass chooses the product
**Theory:** Define an interface for creating an object but let **subclasses** decide which concrete class to instantiate. Decouples callers from `new ConcreteProduct()`.
**Answer:** Use when creation logic varies by type/environment but usage stays the same. **Pros:** Open/Closed — add products without changing clients. **Cons:** more classes; can grow into factory hierarchy sprawl.
**Explanation:** Django `get_user_model()`, SQLAlchemy dialect-specific engines, and payment provider plugins are factory-method shapes. Simple Factory (one function with `if kind == "stripe"`) is common at app boundaries before you need subclass families.
```python
# notifications/factory.py — payment-style plugin factory (Stripe, Adyen, etc.)
from abc import ABC, abstractmethod

class Notifier(ABC):
    @abstractmethod
    def send(self, user_id: str, message: str) -> None: ...

class EmailNotifier(Notifier):
    def send(self, user_id: str, message: str) -> None:
        ...

class SmsNotifier(Notifier):
    def send(self, user_id: str, message: str) -> None:
        ...

def create_notifier(channel: str) -> Notifier:
    registry = {"email": EmailNotifier, "sms": SmsNotifier}
    try:
        return registry[channel]()
    except KeyError as e:
        raise ValueError(f"Unknown channel: {channel}") from e
```

### 3) **Abstract Factory** — families of related products
**Theory:** Provides an interface for creating **families of related objects** without specifying concrete classes — all products from one factory are compatible (e.g. WinButton + WinScrollBar).
**Answer:** Use when you must guarantee **consistent product sets** across platforms/vendors. **Pros:** swaps entire families at once. **Cons:** adding new product types touches every factory implementation.
**Explanation:** Multi-tenant SaaS with per-tenant storage + queue + auth backends; cloud abstraction (AWS vs GCP client bundles). Django REST `DEFAULT_RENDERER_CLASSES` + parser classes form a renderer/parser family per API style.
```python
# storage/factories.py — tenant-specific backend family
from abc import ABC, abstractmethod

class BlobStore(ABC):
    @abstractmethod
    def put(self, key: str, data: bytes) -> str: ...

class S3BlobStore(BlobStore):
    def put(self, key: str, data: bytes) -> str:
        return f"s3://bucket/{key}"

class LocalBlobStore(BlobStore):
    def put(self, key: str, data: bytes) -> str:
        return f"/var/data/{key}"

class StorageFactory(ABC):
    @abstractmethod
    def blob_store(self) -> BlobStore: ...

class AwsStorageFactory(StorageFactory):
    def blob_store(self) -> BlobStore:
        return S3BlobStore()

class DevStorageFactory(StorageFactory):
    def blob_store(self) -> BlobStore:
        return LocalBlobStore()
```

### 4) **Builder** — step-by-step complex construction
**Theory:** Separates **construction of a complex object** from its representation so the same process can build different variants. Avoids telescoping constructors with 15 optional parameters.
**Answer:** Use for HTTP requests, SQL queries, email MIME messages, report configs. **Pros:** readable fluent API, validation at `build()`. **Cons:** extra builder classes; overkill for simple dataclasses.
**Explanation:** SQLAlchemy query building, `requests.Request` + `PreparedRequest`, Pydantic models with validators, and protobuf builders in gRPC services. In APIs, a `CreateOrderBuilder` enforces “line items before address before payment”.
```python
# orders/builder.py — domain object built in valid steps
from dataclasses import dataclass, field

@dataclass
class Order:
    customer_id: str
    items: list[dict]
    currency: str = "USD"

class OrderBuilder:
    def __init__(self) -> None:
        self._customer_id: str | None = None
        self._items: list[dict] = []

    def for_customer(self, customer_id: str) -> "OrderBuilder":
        self._customer_id = customer_id
        return self

    def add_item(self, sku: str, qty: int) -> "OrderBuilder":
        self._items.append({"sku": sku, "qty": qty})
        return self

    def build(self) -> Order:
        if not self._customer_id or not self._items:
            raise ValueError("customer and at least one item required")
        return Order(customer_id=self._customer_id, items=list(self._items))
```

### 5) **Prototype** — clone instead of reconstruct
**Theory:** Create new objects by **copying a prototype** instance rather than building from scratch — useful when initialization is expensive or configuration is templated.
**Answer:** Use for document templates, game entities, ML pipeline config snapshots. **Pros:** fast duplication, preserves complex state. **Cons:** deep vs shallow copy bugs; shared mutable references.
**Explanation:** `copy.deepcopy` for config templates; Django `Model.objects.get(pk=x)` + duplicate for draft records; Celery task signatures cloned with `.s()` variants. Prototype registry maps `prototype_id → instance` in CMS “duplicate page” features.
```python
import copy
from dataclasses import dataclass, field

@dataclass
class ReportTemplate:
    title: str
    sections: list[dict] = field(default_factory=list)
    filters: dict = field(default_factory=dict)

def clone_report(template: ReportTemplate, *, new_title: str) -> ReportTemplate:
    cloned = copy.deepcopy(template)
    cloned.title = new_title
    return cloned

# CMS: duplicate dashboard from golden template per customer
GOLDEN = ReportTemplate("Executive Summary", sections=[{"type": "kpi"}])
acme = clone_report(GOLDEN, new_title="Acme Q1")
```

### 6) **Object Pool** — reuse expensive instances
**Theory:** Maintains a pool of **reusable objects** (connections, threads, buffers) to avoid repeated create/destroy cost. Not GoF “Creational” in all catalogs but universal in production.
**Answer:** Use for DB connections, HTTP sessions, worker threads. **Pros:** lower latency, caps resource usage. **Cons:** pool sizing, stale connections, leak if not returned.
**Explanation:** `psycopg2.pool`, SQLAlchemy `QueuePool`, `urllib3` connection pools, and `multiprocessing.Pool`. Always return connections via context managers (`with pool.connection() as conn`).
```python
from contextlib import contextmanager
from queue import Queue, Empty
import psycopg2

class PgPool:
    def __init__(self, dsn: str, size: int = 10) -> None:
        self._dsn = dsn
        self._pool: Queue = Queue(maxsize=size)
        for _ in range(size):
            self._pool.put(psycopg2.connect(dsn))

    @contextmanager
    def connection(self):
        conn = self._pool.get()
        try:
            yield conn
        finally:
            self._pool.put(conn)

# Usage in a FastAPI service
# with pool.connection() as conn:
#     with conn.cursor() as cur:
#         cur.execute("SELECT 1")
```
