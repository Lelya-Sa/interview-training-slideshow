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

## Self-Verification for Phase 3

- [ ] Answer at least 35/50 without notes.
- [ ] For each answer, explain one practical use case.
- [ ] Implement at least 8 tiny code snippets from this file.
- [ ] Revisit all `Weak` questions within 48 hours.
