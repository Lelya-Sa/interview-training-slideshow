# Cognyte Interview Question Pack - Phase 3 (Q51-Q100)

Scope for this phase:
- Angular interview questions (core + junior-intermediate)
- JavaScript/TypeScript interview depth
- Each question includes theory, direct answer, explanation, and code

---

## Angular (Q51-Q75)

### 51) What is Angular?
**Theory:** Angular is a full framework, not only a UI library.
**Answer:** Angular is a TypeScript-based frontend framework with built-in routing, DI, forms, and HTTP tools.
**Explanation:** It provides opinionated architecture for large apps.
```ts
@Component({ selector: 'app-root', template: '<h1>Hello</h1>' })
export class AppComponent {}
```

### 52) What is a component in Angular?
**Theory:** UI is composed from reusable units.
**Answer:** A component controls a view template with data and behavior.
**Explanation:** Angular apps are trees of components.
```ts
@Component({ selector: 'app-user', template: '<p>{{name}}</p>' })
export class UserComponent { name = 'Lelya'; }
```

### 53) What is a module (`NgModule`)?
**Theory:** Angular groups app parts into modules.
**Answer:** `NgModule` organizes components, directives, pipes, and imports.
**Explanation:** In modern Angular, standalone components reduce module needs, but module knowledge is still asked.
```ts
@NgModule({
  declarations: [UserComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### 54) Explain one-way data binding.
**Theory:** Data can flow from class to template.
**Answer:** One-way binding displays component data in template using interpolation/property binding.
**Explanation:** UI reflects state changes automatically.
```html
<h2>{{ title }}</h2>
<img [src]="avatarUrl" />
```

### 55) Explain event binding in Angular.
**Theory:** UI events need handlers in component class.
**Answer:** Event binding uses `(eventName)` syntax to call methods.
**Explanation:** It sends user actions back to component logic.
```html
<button (click)="save()">Save</button>
```

### 56) What is two-way binding?
**Theory:** Forms often need model and input to stay synchronized.
**Answer:** Two-way binding combines property + event binding via `[(ngModel)]`.
**Explanation:** Requires `FormsModule`.
```html
<input [(ngModel)]="username" />
<p>{{ username }}</p>
```

### 57) What are lifecycle hooks?
**Theory:** Components have creation/update/destruction phases.
**Answer:** Lifecycle hooks are methods Angular calls at specific component moments.
**Explanation:** Common hooks: `ngOnInit`, `ngOnChanges`, `ngOnDestroy`.
```ts
export class DemoComponent implements OnInit, OnDestroy {
  ngOnInit() { console.log('init'); }
  ngOnDestroy() { console.log('destroy'); }
}
```

### 58) What is `ngOnInit` used for?
**Theory:** Initial side effects belong after input binding.
**Answer:** `ngOnInit` runs once after first component initialization.
**Explanation:** Use it for initial API calls/setup.
```ts
ngOnInit() {
  this.userService.loadUsers();
}
```

### 59) Why use `ngOnDestroy`?
**Theory:** Cleanup avoids leaks/subscription buildup.
**Answer:** `ngOnDestroy` handles teardown such as unsubscribing and clearing timers.
**Explanation:** Important for routed components.
```ts
private sub?: Subscription;
ngOnDestroy() { this.sub?.unsubscribe(); }
```

### 60) What is dependency injection (DI)?
**Theory:** Components should not manually construct all dependencies.
**Answer:** DI lets Angular provide service instances to classes.
**Explanation:** Improves testability and loose coupling.
```ts
constructor(private api: ApiService) {}
```

### 61) What is an Angular service?
**Theory:** Shared business/data logic should be outside components.
**Answer:** Service is a class (usually injectable) for reusable logic and state.
**Explanation:** Keeps components focused on presentation.
```ts
@Injectable({ providedIn: 'root' })
export class AuthService { isLoggedIn() { return true; } }
```

### 62) What is `providedIn: 'root'`?
**Theory:** Angular supports tree-shakable providers.
**Answer:** It registers service as application-wide singleton in root injector.
**Explanation:** Preferred over adding provider manually in many cases.
```ts
@Injectable({ providedIn: 'root' })
export class LoggerService {}
```

### 63) How does Angular routing work?
**Theory:** SPA navigation maps URLs to components.
**Answer:** Router config matches paths to components and renders via `router-outlet`.
**Explanation:** Navigation changes URL without full reload.
```ts
const routes: Routes = [{ path: 'users', component: UsersComponent }];
```

### 64) What is `router-outlet`?
**Theory:** Routed components need insertion point.
**Answer:** `router-outlet` is placeholder where active route component appears.
**Explanation:** Similar to "content slot" for route views.
```html
<nav><a routerLink="/users">Users</a></nav>
<router-outlet></router-outlet>
```

### 65) What is a route guard?
**Theory:** Some routes need auth/permission checks.
**Answer:** Guard decides if navigation can proceed.
**Explanation:** Commonly used for auth-protected pages.
```ts
canActivate(): boolean {
  return this.auth.isLoggedIn();
}
```

### 66) What is lazy loading?
**Theory:** Initial bundle size affects performance.
**Answer:** Lazy loading loads feature modules/components only when route is visited.
**Explanation:** Improves startup speed.
```ts
{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
```

### 67) What is `HttpClient`?
**Theory:** Frontend apps consume backend APIs.
**Answer:** `HttpClient` is Angular service for HTTP requests returning observables.
**Explanation:** Supports interceptors, typed responses, and error handling.
```ts
this.http.get<User[]>('/api/users').subscribe(users => this.users = users);
```

### 68) Observable vs Promise in Angular context?
**Theory:** Angular heavily uses RxJS.
**Answer:** Promise resolves once; Observable can emit multiple values and supports operators/cancellation patterns.
**Explanation:** `HttpClient` returns observables for composition flexibility.
```ts
this.http.get('/api').pipe(map(res => res)).subscribe();
```

### 69) What is RxJS `map` operator?
**Theory:** Stream transformation is common.
**Answer:** `map` transforms each emitted value.
**Explanation:** Similar to array map but for async streams.
```ts
this.http.get<User[]>('/api/users').pipe(
  map(users => users.filter(u => u.active))
);
```

### 70) What is `switchMap` and why used?
**Theory:** New async request should often cancel old one.
**Answer:** `switchMap` switches to latest inner observable and unsubscribes previous.
**Explanation:** Great for search/autocomplete.
```ts
search$.pipe(
  switchMap(term => this.http.get(`/api/search?q=${term}`))
).subscribe();
```

### 71) What is Angular change detection?
**Theory:** Framework must know when to update view.
**Answer:** Change detection checks component data bindings and updates DOM when values changed.
**Explanation:** Runs after async events and user interactions.
```ts
// Angular auto-runs CD after click handlers and async tasks.
```

### 72) Default vs OnPush strategy?
**Theory:** Performance tuning often includes change detection strategy.
**Answer:** Default checks frequently; OnPush checks mainly on input reference changes/events/manual marks.
**Explanation:** OnPush can reduce unnecessary checks.
```ts
@Component({
  selector: 'app-fast',
  template: '{{data.name}}',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FastComponent { @Input() data!: { name: string }; }
```

### 73) Template-driven vs reactive forms?
**Theory:** Angular provides two form styles.
**Answer:** Template-driven is simpler and template-centric; reactive forms are model-driven and scalable for complex validation.
**Explanation:** Interviews often expect reactive form familiarity.
```ts
form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email])
});
```

### 74) What are Angular pipes?
**Theory:** Templates often need display formatting.
**Answer:** Pipes transform values in templates (date, currency, custom).
**Explanation:** Keep template readable and reusable formatting logic.
```html
<p>{{ price | currency:'USD' }}</p>
<p>{{ createdAt | date:'short' }}</p>
```

### 75) What is an HTTP interceptor?
**Theory:** Cross-cutting request logic should be centralized.
**Answer:** Interceptor can modify outgoing requests/incoming responses globally.
**Explanation:** Typical uses: auth token, logging, error normalization.
```ts
intercept(req: HttpRequest<any>, next: HttpHandler) {
  const authReq = req.clone({ setHeaders: { Authorization: 'Bearer token' } });
  return next.handle(authReq);
}
```

---

## Angular Fundamentals Extension (Q166-Q180)

### 166) What is a standalone component in Angular?
**Theory:** Modern Angular reduces module boilerplate.
**Answer:** A standalone component is declared with `standalone: true` and can import dependencies directly without `NgModule`.
**Explanation:** Common in newer Angular apps and interview discussions about modern patterns.
```ts
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: '<p>Profile</p>'
})
export class ProfileComponent {}
```

### 167) What is `@Input()` and when is it used?
**Theory:** Parent-to-child data flow is fundamental.
**Answer:** `@Input()` defines data that parent passes into a child component.
**Explanation:** Use for configuration/state that child renders.
```ts
@Component({ selector: 'app-child', template: '<p>{{title}}</p>' })
export class ChildComponent {
  @Input() title = '';
}
```

### 168) What is `@Output()` and EventEmitter?
**Theory:** Child-to-parent communication should be explicit.
**Answer:** `@Output()` exposes events from child; parent subscribes in template.
**Explanation:** Useful for button clicks, selected value events, etc.
```ts
@Output() saved = new EventEmitter<number>();
save(id: number) { this.saved.emit(id); }
```

### 169) What is `ngOnChanges` and when does it run?
**Theory:** Input-driven components need change awareness.
**Answer:** `ngOnChanges` runs when one or more `@Input` values change.
**Explanation:** Good for reacting to external input updates.
```ts
ngOnChanges(changes: SimpleChanges) {
  if (changes['userId']) {
    this.loadUser(changes['userId'].currentValue);
  }
}
```

### 170) What is the `async` pipe and why prefer it?
**Theory:** Observable subscriptions in templates can leak if unmanaged.
**Answer:** `async` pipe subscribes/unsubscribes automatically and emits latest value.
**Explanation:** Reduces manual subscription code in components.
```html
<ul>
  <li *ngFor="let user of users$ | async">{{ user.name }}</li>
</ul>
```

### 171) `Subject` vs `BehaviorSubject` in RxJS?
**Theory:** State streams often need latest value replay.
**Answer:** `Subject` emits only future values; `BehaviorSubject` stores current value and emits it immediately to new subscribers.
**Explanation:** `BehaviorSubject` is common for shared UI state.
```ts
const state$ = new BehaviorSubject<number>(0);
state$.next(1);
```

### 172) `mergeMap` vs `switchMap` quick difference?
**Theory:** Flattening strategy affects concurrency/cancellation.
**Answer:** `mergeMap` keeps all inner streams; `switchMap` cancels previous inner stream and keeps latest.
**Explanation:** `switchMap` for search; `mergeMap` for parallel independent actions.
```ts
clicks$.pipe(
  mergeMap(id => this.http.get(`/api/item/${id}`))
).subscribe();
```

### 173) What does `debounceTime` solve in Angular apps?
**Theory:** High-frequency events can flood API.
**Answer:** `debounceTime` delays emissions until input pauses for a duration.
**Explanation:** Commonly used with search boxes.
```ts
this.searchControl.valueChanges
  .pipe(debounceTime(300))
  .subscribe(term => this.search(term));
```

### 174) How do you add query params in Angular navigation?
**Theory:** URLs should carry filter/sort/page state.
**Answer:** Use router navigation with `queryParams`.
**Explanation:** Improves shareability and back/forward behavior.
```ts
this.router.navigate(['/users'], { queryParams: { page: 2, sort: 'name' } });
```

### 175) Difference between `setValue` and `patchValue` in reactive forms?
**Theory:** Form updates can be full or partial.
**Answer:** `setValue` requires all controls; `patchValue` updates only provided fields.
**Explanation:** `patchValue` is safer for partial API responses.
```ts
this.form.patchValue({ email: 'a@b.com' });
```

### 176) How do you create a custom validator in Angular?
**Theory:** Built-in validators are not always enough.
**Answer:** Return a function that returns `null` (valid) or error object (invalid).
**Explanation:** Keeps form rules reusable and testable.
```ts
function noSpaces(control: AbstractControl) {
  return /\s/.test(control.value) ? { noSpaces: true } : null;
}
```

### 177) How do you conditionally show validation errors?
**Theory:** Show errors only after user interaction.
**Answer:** Check `touched`/`dirty` with `invalid`.
**Explanation:** Prevents noisy UX on first render.
```html
<input [formControl]="email" />
<p *ngIf="email.touched && email.invalid">Invalid email</p>
```

### 178) What is a resolver in Angular routing?
**Theory:** Some pages need data ready before render.
**Answer:** Resolver fetches route data before component activation.
**Explanation:** Useful for reducing loading flicker on critical routes.
```ts
resolve(): Observable<User[]> {
  return this.api.getUsers();
}
```

### 179) What is `trackBy` in `*ngFor` and why use it?
**Theory:** Large lists rerendering hurts performance.
**Answer:** `trackBy` provides stable identity so Angular reuses DOM nodes efficiently.
**Explanation:** Important for dynamic list updates.
```html
<li *ngFor="let item of items; trackBy: trackById">{{ item.name }}</li>
```

### 180) How do you organize Angular code for maintainability?
**Theory:** Interviewers evaluate architecture decisions too.
**Answer:** Organize by feature, keep services for business logic, and keep components presentation-focused.
**Explanation:** Improves testability and onboarding.
```txt
features/
  users/
    users-page.component.ts
    users.service.ts
    users.routes.ts
```

---

## Angular State Management Extension (Q213-Q224)

### 213) How do you share state between unrelated components in Angular?
**Theory:** Not every relation is parent-child.
**Answer:** Use a singleton injectable service exposed via `providedIn: 'root'` and expose state as `BehaviorSubject`/`Observable` fields.
**Explanation:** This is the idiomatic “lightweight store” before NgRx.
```ts
@Injectable({ providedIn: 'root' })
export class CartStore {
  private items$ = new BehaviorSubject<Item[]>([]);
  readonly items = this.items$.asObservable();
  add(item: Item) { this.items$.next([...this.items$.value, item]); }
}
```

### 214) Why is `BehaviorSubject` common for UI state?
**Theory:** New subscribers need the latest value immediately.
**Answer:** `BehaviorSubject` keeps a current value and emits it on subscribe, unlike a plain `Subject`.
**Explanation:** Fits selected tab, current user snapshot, filters.
```ts
private tab$ = new BehaviorSubject<'a'|'b'>('a');
```

### 215) How do you avoid components subscribing manually when possible?
**Theory:** Manual `subscribe` often causes leaks or boilerplate.
**Answer:** Prefer `async` pipe in templates for presentation reads; for imperative work use `takeUntil` cleanup.
**Explanation:** Interview expects mention of `takeUntil` in components when not using `async`.
```html
<div *ngIf="user$ | async as user">{{ user.name }}</div>
```

### 216) What is a simple “facade” service pattern?
**Theory:** Component should orchestrate UX, not micro-manage streams.
**Answer:** Facade service groups related API/observable logic behind a clear component-facing API.
**Explanation:** Keeps components thin and testable.
```ts
@Injectable({ providedIn: 'root' })
export class UsersFacade {
  users$ = this.http.get<User[]>('/api/users');
  constructor(private http: HttpClient) {}
}
```

### 217) How does `OnPush` relate to state updates?
**Theory:** Immutable patterns pair with OnPush.
**Answer:** OnPush runs change detection when inputs change by reference, events fire, or async pipe emits—so state updates should create new references when needed.
**Explanation:** Mutating arrays in place can miss UI updates under OnPush.
```ts
this.items = [...this.items, newItem]; // new reference
```

### 218) Can you use reactive forms as a state container?
**Theory:** Forms have their own model (`FormGroup` value).
**Answer:** Yes for form-heavy screens; you listen to `valueChanges` for reactive flows.
**Explanation:** Know that form state is separate from arbitrary component fields.
```ts
this.form.valueChanges.pipe(debounceTime(200)).subscribe(v => this.saveDraft(v));
```

### 219) When would a team introduce NgRx (junior expectation)?
**Theory:** Interview checks awareness, not expert config.
**Answer:** Large apps, strict unidirectional data flow, DevTools, many writers, predictable side effects—otherwise service + `BehaviorSubject` may suffice.
**Explanation:** Say you would follow team standards and learn store patterns incrementally.
```txt
NgRx: actions/reducers/effects when complexity justifies it.
```

### 220) How do `@Input()` setters interact with state?
**Theory:** Side effects in setters must stay small.
**Answer:** Use setters when input change should refresh local derived state, but avoid heavy work or hidden network calls without clarity.
**Explanation:** Interviewers look for discipline.
```ts
@Input() set userId(v: string) { this._id = v; this.reload(); }
```

### 221) What is wrong with storing huge app state only in component fields?
**Theory:** Survives navigation poorly and duplicates truth.
**Answer:** Routed components destroy/recreate—persistent cross-route state belongs in services or store.
**Explanation:** Explain lifecycle impact.
```txt
Route A -> Route B loses local fields unless persisted externally.
```

### 222) How do outputs (`@Output`) help keep state ownership clear?
**Theory:** Child emits intent; parent owns mutation.
**Answer:** Child emits events; parent updates model of truth.
**Explanation:** Mirrors single source of truth.
```ts
@Output() quantityChange = new EventEmitter<number>();
```

### 223) Why prefer `providedIn: 'root'` for shared state services?
**Theory:** Singleton by design across lazy modules.
**Answer:** One instance app-wide, tree-shakable provider registration.
**Explanation:** Safer than duplicating providers in many modules.
```ts
@Injectable({ providedIn: 'root' })
export class SessionStore {}
```

### 224) How do you test a simple stateful service?
**Theory:** Services are easy unit-test targets.
**Answer:** Instantiate service (or use `TestBed`), act on methods, subscribe/`getValue` on `BehaviorSubject` and assert.
**Explanation:** Shows junior testing maturity.
```ts
const s = new CartStore();
s.add({ id: 1 } as any);
s.items.subscribe(vals => expect(vals.length).toBe(1));
```

---

## JavaScript/TypeScript Depth (Q76-Q100)

### 76) What is TypeScript and why use it?
**Theory:** Large apps need safer contracts.
**Answer:** TypeScript is JavaScript with static typing and tooling support.
**Explanation:** It catches many errors at compile time and improves IDE assistance.
```ts
type User = { id: number; name: string };
const u: User = { id: 1, name: 'Lelya' };
```

### 77) Interface vs type in TypeScript?
**Theory:** TS has multiple ways to describe shapes.
**Answer:** Both define structure; interfaces are great for object contracts and extension, while types are more flexible (unions/intersections/primitives).
**Explanation:** In practice both are valid; choose by use case/team style.
```ts
interface A { id: number }
type B = { name: string } & A;
```

### 78) What are union types?
**Theory:** Values may come in limited multiple forms.
**Answer:** Union type allows variable to be one of several types.
**Explanation:** Often narrowed via `typeof` or discriminant.
```ts
let id: string | number;
id = 10; id = '10';
```

### 79) What are generics?
**Theory:** Reusable functions/classes should preserve type safety.
**Answer:** Generics parameterize types so code works with many types safely.
**Explanation:** Common in utility functions and APIs.
```ts
function identity<T>(value: T): T { return value; }
```

### 80) What is type narrowing?
**Theory:** Union types need runtime checks to safely access fields.
**Answer:** Narrowing is refining broad type to specific subtype via checks.
**Explanation:** Enables safe property/method use.
```ts
function print(x: string | number) {
  if (typeof x === 'string') console.log(x.toUpperCase());
}
```

### 81) What is `unknown` vs `any`?
**Theory:** Dynamic data needs safe typing strategy.
**Answer:** `any` disables type checks; `unknown` requires narrowing before use.
**Explanation:** Prefer `unknown` for safer boundaries (API input).
```ts
let value: unknown = JSON.parse('{}');
if (typeof value === 'object' && value) console.log('safe');
```

### 82) Explain optional properties and optional chaining.
**Theory:** Data may be partial.
**Answer:** Optional properties (`?`) may be absent; optional chaining safely reads nested values.
**Explanation:** Prevents runtime undefined errors.
```ts
type User = { profile?: { city?: string } };
const city = user.profile?.city ?? 'N/A';
```

### 83) What is a type assertion?
**Theory:** Sometimes developer knows more than compiler.
**Answer:** Type assertion tells TS to treat value as specific type.
**Explanation:** Use carefully; wrong assertion can hide bugs.
```ts
const input = document.getElementById('q') as HTMLInputElement;
```

### 84) What are enums and when to avoid/use?
**Theory:** Named constants improve readability.
**Answer:** Enum creates named set of values; string literal unions are often lighter alternative.
**Explanation:** Modern TS often prefers unions + const objects.
```ts
type Role = 'admin' | 'user' | 'guest';
```

### 85) What is `Record<K, V>` utility type?
**Theory:** Key-value object typing is common.
**Answer:** `Record` maps key type to value type.
**Explanation:** Useful for dictionaries/config maps.
```ts
const scores: Record<string, number> = { js: 90, angular: 85 };
```

### 86) Explain `Partial<T>` and `Pick<T, K>`.
**Theory:** Transforming existing types reduces duplication.
**Answer:** `Partial<T>` makes all props optional; `Pick<T, K>` selects subset of props.
**Explanation:** Great for update payload types.
```ts
type User = { id: number; name: string; email: string };
type UserPatch = Partial<User>;
type UserPreview = Pick<User, 'id' | 'name'>;
```

### 87) What is `readonly` in TypeScript?
**Theory:** Some fields should be immutable after creation.
**Answer:** `readonly` prevents reassignment to a property.
**Explanation:** Useful for data integrity in models.
```ts
type Config = { readonly apiUrl: string };
```

### 88) Explain function overloading in TS.
**Theory:** One function may support multiple input signatures.
**Answer:** Overloading declares multiple call signatures with one implementation.
**Explanation:** Gives better type inference to callers.
```ts
function format(x: number): string;
function format(x: string): string;
function format(x: number | string) { return String(x); }
```

### 89) What is module import/export in ES modules?
**Theory:** Modern JS organizes code via modules.
**Answer:** `export` exposes values; `import` consumes them in other files.
**Explanation:** Supports tree-shaking and maintainability.
```js
// utils.js
export const sum = (a, b) => a + b;
// app.js
import { sum } from './utils.js';
```

### 90) What is default export vs named export?
**Theory:** Modules can export one main item or many explicit items.
**Answer:** Default export has one primary export; named exports require exact names.
**Explanation:** Named exports often improve refactoring clarity.
```js
export default function App() {}
export const VERSION = '1.0.0';
```

### 91) Explain `Promise.all`.
**Theory:** Independent async tasks can run in parallel.
**Answer:** `Promise.all` resolves when all promises resolve, rejects fast on first rejection.
**Explanation:** Useful for concurrent API calls.
```js
const [a, b] = await Promise.all([fetch('/a'), fetch('/b')]);
```

### 92) Explain `Promise.allSettled`.
**Theory:** Sometimes you need all outcomes, not fail-fast.
**Answer:** `allSettled` waits for all promises and returns each status/result.
**Explanation:** Useful for partial success handling.
```js
const results = await Promise.allSettled([p1, p2, p3]);
```

### 93) What is currying?
**Theory:** Functional style can split multi-arg function into chained single-arg functions.
**Answer:** Currying transforms `f(a,b,c)` into `f(a)(b)(c)`.
**Explanation:** Enables partial reuse/composition.
```js
const add = a => b => a + b;
const add5 = add(5);
```

### 94) What is composition in JS?
**Theory:** Build complex behavior from small functions.
**Answer:** Composition combines functions where output of one feeds next.
**Explanation:** Encourages reusable pure utilities.
```js
const compose = (f, g) => x => f(g(x));
```

### 95) Explain prototypal inheritance.
**Theory:** JS objects can inherit from other objects.
**Answer:** Objects inherit properties/methods through prototype chain.
**Explanation:** Class syntax is built on prototypes.
```js
const animal = { speak() { return '...'; } };
const dog = Object.create(animal);
dog.speak();
```

### 96) What is `Object.freeze`?
**Theory:** Sometimes objects should be immutable at runtime.
**Answer:** `Object.freeze` prevents adding/removing/changing top-level properties.
**Explanation:** It is shallow, not deep.
```js
const cfg = Object.freeze({ env: 'prod' });
```

### 97) What is Big-O and why asked in interviews?
**Theory:** Interviewers test algorithmic efficiency understanding.
**Answer:** Big-O describes growth of time/space complexity as input grows.
**Explanation:** Helps choose scalable solutions.
```js
// O(n) single pass
for (const item of arr) { /* ... */ }
```

### 98) Explain difference between `for...of` and `for...in`.
**Theory:** Iteration syntax depends on whether values or keys needed.
**Answer:** `for...of` iterates iterable values; `for...in` iterates object keys.
**Explanation:** Prefer `for...of` for arrays.
```js
for (const v of [10, 20]) console.log(v); // values
for (const k in { a: 1 }) console.log(k); // keys
```

### 99) What is a memory leak in frontend apps?
**Theory:** Unreleased resources degrade long-running app performance.
**Answer:** Memory leak occurs when unused objects remain referenced and cannot be garbage-collected.
**Explanation:** Common causes: uncleaned listeners/timers/subscriptions.
```js
window.addEventListener('resize', onResize);
// later cleanup:
window.removeEventListener('resize', onResize);
```

### 100) How do you answer behavioral technical questions well?
**Theory:** Communication quality is part of interview evaluation.
**Answer:** Use STAR format: Situation, Task, Action, Result with measurable impact.
**Explanation:** Keep answers technical, concise, and outcome-driven.
```js
const starAnswer = {
  situation: "Checkout API failed intermittently during peak traffic.",
  task: "Reduce failures and improve user trust.",
  action: [
    "Added retry with exponential backoff for idempotent calls",
    "Normalized API error handling in one service layer",
    "Added monitoring logs to track failure rate"
  ],
  result: "Error rate dropped from 8% to 2% in one sprint."
};

function presentStar(answer) {
  return `S: ${answer.situation}\nT: ${answer.task}\nA: ${answer.action.join("; ")}\nR: ${answer.result}`;
}
```

---

## Angular HttpClient & RxJS interview set (Q264-Q285)

### 264) What is the RxJS `tap` operator used for?
**Theory:** Side effects belong out of pure `map` transforms.
**Answer:** `tap` runs side effects (logging, mutable updates) without changing the emitted value.
**Explanation:** Keeps `map` predictable; common in debugging and analytics hooks.
```ts
import { tap, map } from "rxjs";
this.http.get<User>("/api/me").pipe(
  tap(u => console.log("loaded", u.id)),
  map(u => u.name)
);
```

### 265) How does `catchError` handle failed HTTP calls in Angular?
**Theory:** Observables need a fallback path or the stream errors out.
**Answer:** `catchError` intercepts errors and returns a replacement observable (e.g. `of(default)`, `EMPTY`, retry logic).
**Explanation:** Juniors should separate transport errors from business validation errors.
```ts
import { catchError, of } from "rxjs";
return this.http.get<Item[]>("/api/items").pipe(
  catchError(() => of([]))
);
```

### 266) When do you use RxJS `finalize`?
**Theory:** Teardown runs whether success or failure.
**Answer:** `finalize` runs a callback when the stream completes or errors—ideal for `loading = false`.
**Explanation:** Prefer over duplicating code in `next` and `error` handlers.
```ts
import { finalize } from "rxjs";
this.loading = true;
this.http.get("/api/x").pipe(
  finalize(() => { this.loading = false; })
).subscribe(/* ... */);
```

### 267) How would you explain `retry` in an Angular HTTP pipeline?
**Theory:** Transient failures benefit from bounded retries.
**Answer:** `retry(n)` resubscribes after error up to `n` times; `retryWhen` allows backoff strategies.
**Explanation:** Only safe for idempotent GET-style calls; mention duplicate POST risk.
```ts
import { retry } from "rxjs";
this.http.get("/api/health").pipe(retry(2));
```

### 268) What is the difference between `debounceTime` and `throttleTime`?
**Theory:** Both reduce noisy streams but with different semantics.
**Answer:** `debounceTime` waits for silence; `throttleTime` emits first then enforces a minimum gap.
**Explanation:** Search-as-you-type often uses debounce; scroll handlers often throttle.
```ts
import { debounceTime, throttleTime } from "rxjs";
search$.pipe(debounceTime(300));
scroll$.pipe(throttleTime(100));
```

### 269) When do you choose `combineLatest` vs `forkJoin`?
**Theory:** Parallel vs latest combinations matter for UI state.
**Answer:** `combineLatest` emits whenever any source emits with latest from all; `forkJoin` waits for all to complete once and emits an array/object of finals.
**Explanation:** `forkJoin` fits one-shot parallel requests; `combineLatest` fits linked form fields.
```ts
import { combineLatest, forkJoin } from "rxjs";
combineLatest([a$, b$]);
forkJoin([this.http.get("/a"), this.http.get("/b")]);
```

### 270) What is the `takeUntil` unsubscribe pattern?
**Theory:** Long-lived subscriptions leak memory without cleanup.
**Answer:** Emit on a `Subject` in `ngOnDestroy` and pipe `takeUntil(destroy$)`.
**Explanation:** Preferred over manual `subscription.unsubscribe()` when many streams exist.
```ts
private destroy$ = new Subject<void>();
ngOnInit() {
  this.svc.data$.pipe(takeUntil(this.destroy$)).subscribe();
}
ngOnDestroy() {
  this.destroy$.next(); this.destroy$.complete();
}
```

### 271) Why does `async` pipe reduce subscription boilerplate?
**Theory:** Angular manages subscription lifecycle when template binds to observable.
**Answer:** `async` pipe subscribes/unsubscribes automatically as the view is created/destroyed.
**Explanation:** Compare to manual subscribe in component for interview clarity.
```html
<p>{{ user$ | async }}</p>
```

### 272) How do you pass query params with `HttpClient.get`?
**Theory:** APIs use query strings for filters/pagination.
**Answer:** Pass `{ params: new HttpParams().set("page","2").set("q", q) }` in options.
**Explanation:** Keeps URLs encoded correctly vs string concatenation.
```ts
import { HttpParams } from "@angular/common/http";
const params = new HttpParams().set("limit", "20");
this.http.get<Item[]>("/api/items", { params });
```

### 273) What does `observe: 'response'` change in `HttpClient`?
**Theory:** Sometimes you need status headers, not only JSON body.
**Answer:** With `observe: 'response'`, `HttpClient` returns `HttpResponse<T>` including `status` and `headers`.
**Explanation:** Useful for pagination headers like `Link` or custom metadata.
```ts
this.http.get("/api/x", { observe: "response" }).subscribe(res => {
  console.log(res.status, res.body);
});
```

### 274) How are immutable `HttpHeaders` updated in Angular?
**Theory:** Headers are immutable; each change returns a new instance.
**Answer:** `headers.set('X-Req-Id', id)` or `headers.append`—reassign to a new variable and pass in options.
**Explanation:** Junior pitfall is mutating a shared header object incorrectly.
```ts
let h = new HttpHeaders();
h = h.set("Authorization", `Bearer ${token}`);
this.http.get("/api/me", { headers: h });
```

### 275) What is `HttpParams` used for beyond simple strings?
**Theory:** Parameter encoding repeats keys for arrays in APIs.
**Answer:** `HttpParams` builder handles encoding; `fromObject` accepts plain objects.
**Explanation:** Mention `append` for repeated keys if API expects `tag=a&tag=b`.
```ts
HttpParams.fromObject({ sort: "name", dir: "asc" });
```

### 276) What is a common HTTP interceptor responsibility?
**Theory:** Cross-cutting concerns should not scatter across every service.
**Answer:** Attach auth header, normalize errors, log requests, or inject correlation IDs.
**Explanation:** `intercept(req, next)` returns `next.handle(modifiedReq)`.
```ts
intercept(req: HttpRequest<unknown>, next: HttpHandler) {
  const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${this.token}` } });
  return next.handle(cloned);
}
```

### 277) How do you model loading flags with RxJS cleanly?
**Theory:** UI loading should track stream lifecycle.
**Answer:** Use `finalize`, `startWith`, or `tap` with a `BehaviorSubject` for loading/errors.
**Explanation:** Avoid setting loading in multiple branches when `finalize` exists.
```ts
this.loading$.next(true);
this.http.get("/api/x").pipe(
  finalize(() => this.loading$.next(false))
).subscribe(v => this.data$.next(v));
```

### 278) What is a route resolver and why use it?
**Theory:** Some routes should not render until data exists.
**Answer:** Resolver preloads data before activation; component reads resolved data via `ActivatedRoute.data`.
**Explanation:** Reduces empty-first-render flashes vs static `*ngIf` loading.
```ts
resolve: { user: UserResolver }
// component: this.route.data.pipe(map(d => d["user"]))
```

### 279) What can `canActivate` return besides `boolean`?
**Theory:** Guards integrate with router navigation.
**Answer:** `CanActivate` can return `boolean`, `UrlTree`, `Observable<boolean|UrlTree>`, or `Promise<...>`.
**Explanation:** `UrlTree` redirects without imperative `router.navigate`.
```ts
if (!this.auth.ok) return this.router.parseUrl("/login");
return true;
```

### 280) What is the difference between `paramMap` and `queryParamMap`?
**Theory:** Route data splits path params vs query string.
**Answer:** `paramMap` reads `/user/:id`; `queryParamMap` reads `?tab=settings`.
**Explanation:** Both are observables on `ActivatedRoute` in modern Angular.
```ts
this.route.paramMap.subscribe(p => p.get("id"));
this.route.queryParamMap.subscribe(q => q.get("tab"));
```

### 281) Why pair `valueChanges` with `distinctUntilChanged` on forms?
**Theory:** Reactive forms emit duplicate consecutive values.
**Answer:** `distinctUntilChanged` avoids redundant work when the same value re-emits.
**Explanation:** Mention reference equality for objects vs deep compare gap.
```ts
this.form.get("email")!.valueChanges.pipe(
  distinctUntilChanged()
).subscribe(/* ... */);
```

### 282) What does `shareReplay(1)` provide for HTTP responses?
**Theory:** Multiple subscribers can re-trigger network calls.
**Answer:** `shareReplay({ bufferSize: 1, refCount: true })` multicasts the last value to late subscribers (often used to cache GET).
**Explanation:** Warn that caching POST or auth-sensitive endpoints needs care.
```ts
const users$ = this.http.get<User[]>("/api/users").pipe(
  shareReplay({ bufferSize: 1, refCount: true })
);
```

### 283) When do you return `EMPTY` vs `of([])` from `catchError`?
**Theory:** Stream completion semantics differ for consumers.
**Answer:** `of([])` emits one empty value then completes; `EMPTY` completes immediately with no emission—choose based on what subscribers expect.
**Explanation:** UI lists often prefer `of([])` so async pipe still updates once.
```ts
import { EMPTY, of } from "rxjs";
catchError(() => of([] as Item[]));
```

### 284) What is a quick way to explain cold vs hot observables?
**Theory:** Interviewers check if you know producer timing.
**Answer:** Cold observable starts producer per subscriber; hot observable shares one producer (late subscribers may miss early values unless replayed).
**Explanation:** `HttpClient` calls are typically cold until shared.
```txt
Cold: each subscribe triggers new work; hot: multicast (Subject, shared HTTP with shareReplay).
```

### 285) Why pick `BehaviorSubject` over plain `Subject` for component state broadcasts?
**Theory:** New subscribers often need the latest value immediately.
**Answer:** `BehaviorSubject` stores current value; `Subject` has no initial value and emits only future events.
**Explanation:** State stores and selected-id streams commonly use `BehaviorSubject`.
```ts
private state$ = new BehaviorSubject<UiState>({ filter: "" });
```

---

## Self-Verification for Phase 3

- [ ] Answer at least 35/50 without notes.
- [ ] For each answer, explain one practical use case.
- [ ] Implement at least 8 tiny code snippets from this file.
- [ ] Revisit all `Weak` questions within 48 hours.
