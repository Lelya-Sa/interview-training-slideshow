# Design Patterns Hub — Behavioral (Python)

### 14) **Observer** — notify dependents on change
**Theory:** Defines a **one-to-many dependency** so when one object changes state, all dependents are notified and updated automatically. Publisher does not need to know concrete subscribers.
**Answer:** Use for domain events, UI updates, cache invalidation, metrics hooks. **Pros:** loose coupling; easy to add listeners. **Cons:** unexpected update order; memory leaks if observers not removed; debugging event storms.
**Explanation:** **Django signals** (`post_save`), **Blinker**, Redis pub/sub, Kafka consumers, and WebSocket fan-out. In microservices, outbox pattern publishes events observers consume asynchronously.
```python
from blinker import signal

lot_updated = signal("lot_updated")

def on_lot_updated(sender, lot_id: str, yield_pct: float, **kwargs):
    invalidate_cache(f"lot:{lot_id}")
    notify_dashboard(lot_id, yield_pct)

lot_updated.connect(on_lot_updated)

def update_lot_yield(lot_id: str, yield_pct: float) -> None:
    persist_yield(lot_id, yield_pct)
    lot_updated.send("yield_service", lot_id=lot_id, yield_pct=yield_pct)
```

### 15) **Strategy** — interchangeable algorithms
**Theory:** Defines a family of algorithms, encapsulates each one, and makes them **interchangeable**. Strategy lets the algorithm vary independently from clients that use it.
**Answer:** Use for pricing rules, tax calculation, compression, routing, validation pipelines. **Pros:** Open/Closed; test each strategy in isolation. **Cons:** clients must choose/configure strategy; too many one-method classes.
**Explanation:** Payment methods (card vs invoice), shipping cost calculators, pandas-style pluggable aggregations. Inject strategy via constructor in services — never hard-code `if region == "EU"` across 20 files.
```python
from abc import ABC, abstractmethod

class TaxStrategy(ABC):
    @abstractmethod
    def compute(self, amount: float) -> float: ...

class EuVatStrategy(TaxStrategy):
    def compute(self, amount: float) -> float:
        return amount * 0.20

class UsSalesTaxStrategy(TaxStrategy):
    def __init__(self, rate: float) -> None:
        self._rate = rate
    def compute(self, amount: float) -> float:
        return amount * self._rate

class CheckoutService:
    def __init__(self, tax: TaxStrategy) -> None:
        self._tax = tax

    def total(self, subtotal: float) -> float:
        return subtotal + self._tax.compute(subtotal)
```

### 16) **Command** — encapsulate a request as an object
**Theory:** Encapsulates a request as an object, letting you parameterize clients with different requests, **queue** operations, **log**, and support **undo**.
**Answer:** Use for job queues, transactional workflows, macro replay, audit trails. **Pros:** decouples invoker from receiver; easy to serialize commands. **Cons:** many small command classes.
**Explanation:** **Celery tasks** are commands: `send_invoice.delay(order_id)` enqueues work. CLI tools with undo stacks; CQRS write side as command handlers `CreateOrderCommand` → handler.
```python
from dataclasses import dataclass
from typing import Protocol

class CommandHandler(Protocol):
    def handle(self, cmd: object) -> None: ...

@dataclass
class ArchiveLotCommand:
    lot_id: str
    requested_by: str

class ArchiveLotHandler:
    def handle(self, cmd: ArchiveLotCommand) -> None:
        mark_archived(cmd.lot_id, user=cmd.requested_by)
        audit.log("lot_archived", lot_id=cmd.lot_id, by=cmd.requested_by)

def dispatch(cmd, handler: CommandHandler) -> None:
    handler.handle(cmd)
```

### 17) **State** — behavior changes with internal state
**Theory:** Allows an object to alter its behavior when its **internal state** changes; object appears to change class. Replaces large conditionals on state enums.
**Answer:** Use for workflows (order status, connection state, approval flows). **Pros:** localized transitions; each state class is focused. **Cons:** more classes; transition matrix must be documented.
**Explanation:** `django-fsm` for model state machines; TCP-like connection handlers; document `Draft → Review → Published`. Distinct from Strategy: **State transitions internally**; Strategy is usually chosen externally.
```python
from abc import ABC, abstractmethod

class OrderState(ABC):
    @abstractmethod
    def pay(self, order: "Order") -> None: ...
    @abstractmethod
    def ship(self, order: "Order") -> None: ...

class PendingState(OrderState):
    def pay(self, order: "Order") -> None:
        order._state = PaidState()
    def ship(self, order: "Order") -> None:
        raise ValueError("cannot ship unpaid order")

class PaidState(OrderState):
    def pay(self, order: "Order") -> None:
        raise ValueError("already paid")
    def ship(self, order: "Order") -> None:
        order._state = ShippedState()

class ShippedState(OrderState):
    def pay(self, order: "Order") -> None:
        raise ValueError("already shipped")
    def ship(self, order: "Order") -> None:
        raise ValueError("already shipped")

class Order:
    def __init__(self) -> None:
        self._state: OrderState = PendingState()
    def pay(self) -> None:
        self._state.pay(self)
    def ship(self) -> None:
        self._state.ship(self)
```

### 18) **Chain of Responsibility** — pass request along handlers
**Theory:** Passes a request along a **chain of handlers** until one handles it. Sender does not know which object will process the request.
**Answer:** Use for middleware, auth pipelines, support escalation, exception filters. **Pros:** flexible ordering; add/remove handlers. **Cons:** request may fall through unhandled; order bugs.
**Explanation:** **Django middleware** stack, Flask `before_request`, FastAPI middleware, logging filters. Each handler calls `next()` or stops the chain.
```python
from typing import Callable, Optional

Handler = Callable[[dict], Optional[dict]]

def auth_handler(req: dict, nxt: Handler) -> Optional[dict]:
    if "user_id" not in req:
        return {"status": 401, "error": "unauthorized"}
    return nxt(req)

def rate_limit_handler(req: dict, nxt: Handler) -> Optional[dict]:
    if is_rate_limited(req["user_id"]):
        return {"status": 429, "error": "too many requests"}
    return nxt(req)

def build_chain(*handlers):
    def run(req: dict, i: int = 0):
        if i >= len(handlers):
            return {"status": 200, "ok": True}
        def nxt(r):
            return run(r, i + 1)
        return handlers[i](req, nxt)
    return lambda req: run(req)
```

### 19) **Iterator** — sequential access without exposing internals
**Theory:** Provides a way to access elements of an aggregate object **sequentially** without exposing its underlying representation.
**Answer:** Use for custom collections, pagination, tree traversal, streaming large datasets. **Pros:** uniform traversal; supports lazy/generator patterns. **Cons:** concurrent modification during iteration.
**Explanation:** Python **generators** (`yield`), `iter()` protocol, Django `QuerySet.iterator(chunk_size=...)`, and `itertools`. Production: stream millions of DB rows without loading all into memory.
```python
def iter_lots(batch_size: int = 500):
    last_id = 0
    while True:
        rows = fetch_lots_after(last_id, limit=batch_size)
        if not rows:
            break
        for row in rows:
            yield row
        last_id = rows[-1]["id"]

for lot in iter_lots():
    process(lot)
```

### 20) **Mediator** — centralize colleague communication
**Theory:** Defines how a set of objects interact — promotes **loose coupling** by keeping objects from referring to each other explicitly. Colleagues talk through the mediator.
**Answer:** Use when many-to-many dependencies cause spaghetti (chat rooms, dialog wizards, air-traffic-style coordinators). **Pros:** simplifies object graphs. **Cons:** mediator can become complex.
**Explanation:** WebSocket **hub** routing messages between clients; UI form wizard coordinating steps; orchestration service in event-driven sagas. Contrast with Observer: mediator **routes**; observer **broadcasts**.
```python
class ChatRoom:
    def __init__(self) -> None:
        self._members: dict[str, "User"] = {}

    def join(self, user: "User") -> None:
        self._members[user.name] = user
        user.room = self

    def send(self, from_user: str, message: str) -> None:
        for name, member in self._members.items():
            if name != from_user:
                member.receive(from_user, message)

class User:
    def __init__(self, name: str) -> None:
        self.name = name
        self.room: ChatRoom | None = None

    def say(self, message: str) -> None:
        if self.room:
            self.room.send(self.name, message)

    def receive(self, sender: str, message: str) -> None:
        ...
```

### 21) **Memento** — capture and restore state
**Theory:** Captures and externalizes an object's **internal state** so it can be restored later, without violating encapsulation.
**Answer:** Use for undo/redo, snapshots, draft autosave, game saves. **Pros:** clean rollback. **Cons:** memory for history; versioning mementos when schema changes.
**Explanation:** `django-reversion`, Git commits as mementos of tree state, editor undo stacks storing document snapshots. Store immutable snapshots (JSON/dataclass) not live object references.
```python
from dataclasses import dataclass, asdict
import copy

@dataclass
class EditorMemento:
    content: str

class DocumentEditor:
    def __init__(self) -> None:
        self._content = ""
        self._history: list[EditorMemento] = []

    def write(self, text: str) -> None:
        self._history.append(EditorMemento(self._content))
        self._content = text

    def undo(self) -> None:
        if self._history:
            self._content = self._history.pop().content
```

### 22) **Template Method** — skeleton algorithm with hooks
**Theory:** Defines the **skeleton of an algorithm** in a base class, deferring some steps to subclasses. Subclasses redefine certain steps without changing structure.
**Answer:** Use when workflow is fixed but steps vary (ETL pipelines, test fixtures, scrapy spiders). **Pros:** DRY for workflow; enforces order. **Cons:** inheritance rigidity; hard to compose multiple variants.
**Explanation:** `abc.ABC` with abstract steps; Django class-based views (`dispatch`, `get`, `post`); Scrapy spider `parse` → `parse_item` hooks. Prefer composition (Strategy) when steps vary wildly.
```python
from abc import ABC, abstractmethod

class IngestJob(ABC):
    def run(self) -> None:
        raw = self.fetch()
        parsed = self.parse(raw)
        self.save(parsed)

    @abstractmethod
    def fetch(self) -> bytes: ...

    @abstractmethod
    def parse(self, raw: bytes) -> list[dict]: ...

    def save(self, rows: list[dict]) -> None:
        bulk_insert(rows)

class CsvLotIngest(IngestJob):
    def fetch(self) -> bytes:
        return download_from_sftp("lots.csv")
    def parse(self, raw: bytes) -> list[dict]:
        return parse_csv(raw)
```

### 23) **Visitor** — operations across object structure
**Theory:** Represents an operation to perform on elements of an object structure. Lets you define a **new operation without changing** the classes of the elements.
**Answer:** Use for AST walks, export/report on document trees, lint rules. **Pros:** add operations easily. **Cons:** adding new element types breaks all visitors.
**Explanation:** Python `ast.NodeVisitor` in linters/formatters; compiler passes over IR. Double dispatch: `node.accept(visitor)`.
```python
import ast

class ComplexityVisitor(ast.NodeVisitor):
    def __init__(self) -> None:
        self.complexity = 1

    def visit_If(self, node: ast.If) -> None:
        self.complexity += 1
        self.generic_visit(node)

    def visit_For(self, node: ast.For) -> None:
        self.complexity += 1
        self.generic_visit(node)

def cyclomatic_complexity(source: str) -> int:
    tree = ast.parse(source)
    v = ComplexityVisitor()
    v.visit(tree)
    return v.complexity
```

### 24) **Interpreter** — grammar as classes (DSL)
**Theory:** Given a language, defines a representation for its grammar and an interpreter that uses the representation to interpret sentences.
**Answer:** Use for **small, stable DSLs** — filter expressions, rule engines, config formulas. **Pros:** user-facing flexible rules. **Cons:** niche; security if eval-like; prefer parser libraries for complex grammars.
**Explanation:** SQL WHERE clause builders, Prometheus query parsers, feature-flag rule DSLs. For production, often use `lark`, `pyparsing`, or compile to AST rather than raw `eval`.
```python
from abc import ABC, abstractmethod

class Expr(ABC):
    @abstractmethod
    def eval(self, env: dict) -> bool: ...

class And(Expr):
    def __init__(self, left: Expr, right: Expr) -> None:
        self.left, self.right = left, right
    def eval(self, env: dict) -> bool:
        return self.left.eval(env) and self.right.eval(env)

class Gt(Expr):
    def __init__(self, key: str, value: float) -> None:
        self.key, self.value = key, value
    def eval(self, env: dict) -> bool:
        return float(env[self.key]) > self.value

class Lt(Expr):
    def __init__(self, key: str, value: float) -> None:
        self.key, self.value = key, value
    def eval(self, env: dict) -> bool:
        return float(env[self.key]) < self.value

# Feature-flag style rule: yield > 95 AND chamber temperature < 80
rule = And(Gt("yield", 95), Lt("temperature", 80))
assert rule.eval({"yield": 96, "temperature": 75}) is True
```
