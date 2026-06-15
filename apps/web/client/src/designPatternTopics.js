/**
 * Design Patterns hub — creational, structural, behavioral (+ all).
 */
export const DESIGN_PATTERN_TOPICS = [
  {
    slug: 'creational',
    title: 'Creational',
    headline: 'Creational · object creation',
    intro:
      'Singleton, Factory Method, Abstract Factory, Builder, Prototype, and Object Pool — how to create objects flexibly in production Python (Django, SQLAlchemy, Celery, connection pools).',
    bestPractices: [
      'Prefer dependency injection over hand-rolled Singleton globals.',
      'Factory when callers should not know concrete classes.',
      'Builder when construction has many optional steps or validation.',
      'Name factories after what they produce, not how they work internally.'
    ],
    verify: 'Explain Singleton vs DI, draw Factory vs Abstract Factory, and describe one Builder you have used in a real API or ORM.'
  },
  {
    slug: 'structural',
    title: 'Structural',
    headline: 'Structural · composition & wrappers',
    intro:
      'Adapter, Bridge, Composite, Decorator, Facade, Flyweight, and Proxy — wrapping, simplifying, and composing systems (FastAPI middleware, storage backends, ORM lazy loading).',
    bestPractices: [
      'Adapter at integration boundaries — not as a substitute for clean domain design.',
      'Decorator for cross-cutting behavior; keep each wrapper single-purpose.',
      'Facade orchestrates — it should not become a god service.',
      'Know Decorator vs Proxy vs Adapter — classic interview distinction.'
    ],
    verify: 'Give one Adapter example at a third-party boundary and one Decorator example (middleware or caching) from production.'
  },
  {
    slug: 'behavioral',
    title: 'Behavioral',
    headline: 'Behavioral · communication & flow',
    intro:
      'Observer, Strategy, Command, State, Chain of Responsibility, Iterator, Mediator, Memento, Template Method, Visitor, and Interpreter — events, workflows, and pluggable behavior in Python services.',
    bestPractices: [
      'Strategy for swappable algorithms; State for mode-driven behavior.',
      'Unsubscribe observers / use weak refs to avoid memory leaks.',
      'Command for undo, queues, and audit — Celery tasks are commands.',
      'Chain of Responsibility maps cleanly to middleware pipelines.'
    ],
    verify: 'Compare Strategy vs State; explain Observer with Django signals or an event bus; name one Command-style job you have shipped.'
  },
  {
    slug: 'all',
    title: 'All patterns',
    headline: 'All · full catalog',
    intro:
      'All 24 GoF-style patterns in one list — browse by type in the sidebar filter after opening, or study end-to-end for system design interviews.',
    bestPractices: [
      'Study by category first, then mixed “which pattern fits?” drills.',
      'For each pattern: problem → structure → Python production example → pitfall.',
      'Do not force patterns — name the problem before the pattern name.'
    ],
    verify: 'Pick 5 random patterns and explain problem + Python example without reading notes.'
  }
];

export function getDesignPatternTopic(slug) {
  return DESIGN_PATTERN_TOPICS.find((t) => t.slug === slug) || null;
}
