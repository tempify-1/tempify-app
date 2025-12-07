
# Qwik Framework Cheatsheet (Ultra-Extended Edition)

This is the most comprehensive Qwik cheatsheet available.  
No domain logic — pure Qwik and Qwik City.

---

# 1. QWIK PHILOSOPHY (CORE CONCEPTS)

## 1.1. Resumability
Resumability = **skip hydration**. After SSR, Qwik:
- Serialises app state into HTML
- Leaves **no JS running on the client**
- Only loads JS when the user *interacts* with something
- Loads only the exact event handler needed

Hydration ≠ Resumability  
Qwik *resumes* instead of *rebuilding* the app.

---

## 1.2. Lazy Execution
Everything in Qwik is lazy:
- Event handlers (`onClick$`)
- Loaders & actions
- Visible tasks
- Computed signals
- Route boundaries

Each lazy boundary becomes an independent chunk.

---

## 1.3. Fine-Grained Reactivity
Qwik uses:
- `useSignal`
- `useStore`
- `useComputed$`
- `useTask$`

Each isolated.  
No global rerenders.  
No VDOM diffing waterfalls.  

---

# 2. PROJECT STRUCTURE (BEST PRACTICE)

```
src/
  routes/
    index.tsx
    layout.tsx
    (group)/
      layout.tsx
      page.tsx
    api/
      auth/
        login/
          index.ts
  components/
    ui/
    forms/
    layout/
  lib/
    utils/
    hooks/
  styles/
    global.css
    tokens.css
```

---

# 3. COMPONENTS

## 3.1 Basic Component
```tsx
import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return <h1>Hello Qwik</h1>;
});
```

---

## 3.2. Components With Props
```tsx
export const UserCard = component$((props: { name: string }) => {
  return <div>{props.name}</div>;
});
```

---

## 3.3. Slots
```tsx
<div>
  <Slot />
</div>
```

Nested:
```tsx
<Slot name="header" />
<Slot />
<Slot name="footer" />
```

Usage:
```tsx
<UserLayout>
  <div q:slot="header">Header</div>
  <main>Main</main>
</UserLayout>
```

---

# 4. SIGNALS (CORE REACTIVITY)

## 4.1. Basic Signal
```tsx
const count = useSignal(0);
```

## 4.2. Increment
```tsx
<button onClick$={() => count.value++}>
  {count.value}
</button>
```

---

## 4.3. `useStore` (Reactive Object)
```tsx
const form = useStore({ name: '', email: '' });
```

---

## 4.4. `useComputed$`
```tsx
const fullName = useComputed$(() => form.first + ' ' + form.last);
```

---

## 4.5. `useSignal` vs `useStore`

| Feature | useSignal | useStore |
|--------|------------|-----------|
| Primitive | Yes | No |
| Object | No | Yes |
| Serialization | Excellent | Good |
| Performance | Best | Good |
| Should use for UI state | Always | Sometimes |

---

# 5. TASKS (SIDE EFFECTS)

## 5.1. useTask$
Runs on server render + client hydration point.

```tsx
useTask$(({ track }) => {
  track(() => count.value);
  console.log('Count changed');
});
```

---

## 5.2. useVisibleTask$
Runs **client-only** after component becomes visible.

```tsx
useVisibleTask$(() => {
  console.log('client-only');
});
```

Options:
```tsx
useVisibleTask$(
  () => {...},
  { strategy: 'intersection-observer' }
);
```

Strategies:
- `"intersection-observer"` (default)
- `"document-ready"`
- `"document-idle"`

---

# 6. ROUTING (QWIK CITY)

## 6.1. Basic Route
```tsx
// routes/about/index.tsx
export default component$(() => <h1>About</h1>);
```

---

## 6.2. Nested Routes
```
routes/
  dashboard/
    layout.tsx
    index.tsx
    users/
      index.tsx
      [id]/
        index.tsx
```

---

## 6.3. Grouping Routes
```
routes/
  (admin)/
    dashboard/
    settings/
```

---

## 6.4. Layouts
```tsx
// routes/layout.tsx
export default component$(() => {
  return (
    <div class="shell">
      <header>Header</header>
      <Slot />
    </div>
  );
});
```

---

## 6.5. Error Boundaries
Create:
```tsx
// routes/error.tsx
export default component$(({ error }) => {
  return <div>Error: {error.message}</div>;
});
```

---

# 7. DATA LOADING (routeLoader$)

## 7.1 Basic
```tsx
export const useData = routeLoader$(async () => {
  return { message: "Hi" };
});
```

Use it:
```tsx
const data = useData();
data.value.message;
```

---

## 7.2 Loader With Params
```tsx
export const useUser = routeLoader$(({ params }) => {
  return getUser(params.id);
});
```

---

## 7.3 Loader With Request
```tsx
export const useData = routeLoader$(({ request }) => {
  const url = new URL(request.url);
  return url.searchParams.get('q');
});
```

---

# 8. ACTIONS (Server Mutations)

## 8.1 Basic Action
```tsx
export const useLogin = routeAction$(async ({ email, password }) => {
  return { success: true };
});
```

Form:
```tsx
<form action={useLogin()}>
  <input name="email" />
</form>
```

---

## 8.2 Action With Validation
```tsx
export const useSignup = routeAction$((data, { fail }) => {
  if (!data.email) return fail(400, { message: "Email required" });
});
```

---

## 8.3 Fail Response
```tsx
throw fail(401, { message: 'Unauthorised' });
```

---

# 9. API ROUTES

## 9.1 GET
```tsx
// routes/api/hello/index.ts
export const onGet = () => new Response("Hello");
```

---

## 9.2 POST
```tsx
export const onPost = async ({ request }) => {
  const body = await request.json();
  return new Response(JSON.stringify(body));
};
```

---

## 9.3 JSON Helpers
```tsx
return json({ ok: true });
```

---

# 10. FORMS (Qwik City Enhanced)

## 10.1 Basic Form
```tsx
<form action={useAction()}>
  <input name="email" />
  <button>Submit</button>
</form>
```

Auto-features:
- Progressive enhancement
- Nice validation
- Action state reflection

---

## 10.2 Form State
```tsx
const action = useLogin();
action.value?.fieldErrors;
```

---

# 11. NAVIGATION

## 11.1 Link Component
```tsx
<Link href="/dashboard">Dashboard</Link>
```

---

## 11.2 Programmatic Navigation
```tsx
const nav = useNavigate();
nav('/profile');
```

---

# 12. STYLING

## Options:
- Global CSS
- Component CSS
- Tailwind
- Open Props
- UnoCSS

## Component CSS
```tsx
import styles from './card.css?inline';
```

```tsx
<style>{styles}</style>
```

---

# 13. CLIENT OPTIMISATION RULES

- Avoid unnecessary `useVisibleTask$`
- Keep `onClick$` handlers tiny
- Prefer lazy imports inside event handlers
- Avoid sharing large stores across the app
- Use loaders instead of fetching in components
- Use signals, not useStore, when possible

---

# 14. CODE SPLITTING

Automatic via:
- Event handlers
- Route boundaries
- Lazy tasks
- Blocks `$` suffix

---

## Manual Lazy Import
```tsx
onClick$={async () => {
  const mod = await import('../heavy');
  mod.doThing();
}}
```

---

# 15. SERIALIZATION RULES

Serializable:
- Signals
- Plain objects
- Arrays
- JSON-friendly objects

Not serializable:
- DOM nodes
- Functions
- Classes

---

# 16. COMMON PATTERNS

## 16.1 Redirect
```tsx
throw redirect(302, '/login');
```

---

## 16.2 Throw Errors
```tsx
throw error(404, "Not found");
```

---

## 16.3 Check Auth in Loader
```tsx
export const useProtected = routeLoader$(({ cookie, redirect }) => {
  const user = cookie.get('session');
  if (!user) throw redirect(302, '/login');
});
```

---

# 17. PERFORMANCE MASTER RULES

1. Keep components small  
2. Move logic to loaders & actions  
3. Run heavy work server-side  
4. Keep client-side code minimal  
5. Use lazy imports inside events  
6. Use signal for simple values  
7. Avoid stores for large objects  
8. Minimise useVisibleTask$  

---

# END OF FILE
