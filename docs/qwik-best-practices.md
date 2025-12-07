# Qwik Best Practices

Project-specific coding standards and best practices for this Qwik application.

---

## 1. CODE STYLE

### 1.1. No Comments in TSX Files
Keep component files trim and concise. Self-documenting code is preferred.

```tsx
// ❌ Bad
export const UserCard = component$((props: { name: string }) => {
  // This renders the user's name in a card
  return <div class="card">{props.name}</div>;
});

// ✅ Good
export const UserCard = component$((props: { name: string }) => {
  return <div class="card">{props.name}</div>;
});
```

### 1.2. Named Exports Only
Always use named exports for components. No default exports.

```tsx
// ❌ Bad
export default component$(() => <h1>Hello</h1>);

// ✅ Good
export const MyComponent = component$(() => <h1>Hello</h1>);
```

---

## 2. FILE ORGANIZATION

### 2.1. No Barrel Files
Do not use `index.ts` barrel files to re-export modules. Import directly from source files.

```tsx
// ❌ Bad - barrel file pattern
// components/index.ts
export { Button } from './Button';
export { Card } from './Card';

// ✅ Good - direct imports
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
```

### 2.2. Type Locations

| Type Category | Location |
|---------------|----------|
| **Domain/Shared Types** | `src/types/` directory |
| **Component Props** | Inside the component file |
| **Route-specific Types** | Inside the route file |

```tsx
// ✅ Component interfaces stay in the component
interface UserCardProps {
  name: string;
  email: string;
  avatarUrl?: string;
}

export const UserCard = component$<UserCardProps>((props) => {
  return (
    <div class="card">
      <span>{props.name}</span>
    </div>
  );
});
```

---

## 3. STATE MANAGEMENT

### 3.1. useSignal vs useStore

| Use Case | Hook |
|----------|------|
| Primitives (string, number, boolean) | `useSignal` |
| Simple UI state | `useSignal` |
| Complex objects with nested properties | `useStore` |
| Forms with multiple fields | `useStore` |

```tsx
// ✅ Primitives use useSignal
const count = useSignal(0);
const isOpen = useSignal(false);

// ✅ Complex objects use useStore
const form = useStore({ name: '', email: '', errors: {} });
```

### 3.2. Prefer Signals Over Stores
When possible, prefer `useSignal` for better serialization and performance.

---

## 4. COMPONENT PATTERNS

### 4.1. Keep Components Small
Each component should have a single responsibility.

### 4.2. Props Destructuring
Destructure props directly in the function signature.

```tsx
export const Button = component$<{ label: string; onClick$: QRL<() => void> }>(
  ({ label, onClick$ }) => {
    return <button onClick$={onClick$}>{label}</button>;
  }
);
```

### 4.3. Slots for Composition
Use `<Slot />` for component composition.

```tsx
export const Card = component$(() => {
  return (
    <div class="card">
      <Slot name="header" />
      <Slot />
      <Slot name="footer" />
    </div>
  );
});
```

---

## 5. STYLING (TAILWIND + FLOWBITE)

### 5.1. Use Tailwind Utility Classes
Prefer Tailwind utility classes over custom CSS.

```tsx
// ✅ Good
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Submit
</button>
```

### 5.2. Flowbite Components
Use Flowbite components for complex UI patterns (modals, dropdowns, etc.).

### 5.3. Dark Mode
Always consider dark mode with Tailwind's `dark:` prefix.

```tsx
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>
```

---

## 6. DATA LOADING

### 6.1. Use routeLoader$ for Data
Fetch data server-side with `routeLoader$`.

```tsx
export const useUserData = routeLoader$(async ({ params }) => {
  return await fetchUser(params.id);
});
```

### 6.2. Use routeAction$ for Mutations
Handle form submissions and mutations with `routeAction$`.

---

## 7. PERFORMANCE RULES

1. **Minimize `useVisibleTask$`** - Only use for client-only DOM operations
2. **Keep event handlers small** - Use `onClick$` with minimal inline logic
3. **Lazy load heavy modules** - Import inside event handlers when needed
4. **Use loaders over client fetching** - Prefer `routeLoader$` over `useResource$`
5. **Avoid large shared stores** - Keep stores scoped to where they're needed

---

## 8. SERIALIZATION

### Serializable (Safe to use in state)
- Signals, plain objects, arrays, JSON-friendly primitives

### Not Serializable (Avoid in state)
- DOM nodes, functions, class instances

---

## 9. PROJECT STRUCTURE

```
src/
  routes/           # File-based routing
  components/       # Shared components
    ui/             # Generic UI components
    forms/          # Form components
    layout/         # Layout components
  lib/              # Utilities and helpers
    utils/
    hooks/
  types/            # Shared/domain types
  styles/           # Global styles
```

