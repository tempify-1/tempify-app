# Config-Based Form System

A declarative, config-driven form library for Qwik using `@modular-forms/qwik` and `flowbite-qwik`.

## Quick Start

```typescript
import { useForm } from "@modular-forms/qwik";
import { AppForm, getInitialFormValues, getFieldArrays } from "~/components/form/app-form/app-form";
import type { Field } from "~/components/form/app-form/form-types";

const fields: Field[] = [
  { name: "email", type: "email", label: "Email", required: true, validate: [required("Required"), email("Invalid")] },
  { name: "submit", type: "submit", label: "Submit" }
];

const [formStore, { Form }] = useForm({ loader: { value: getInitialFormValues(fields) } });

<AppForm formStore={formStore} fields={fields} onSubmit$={handleSubmit} />
```

## Field Types

| Type | Component | Description |
|------|-----------|-------------|
| `text`, `email`, `password`, `tel`, `number`, `range`, `color`, `file` | `AppFormInput` | Standard HTML inputs |
| `textarea` | `AppFormTextarea` | Multi-line text with auto-sizing |
| `date` | `AppFormDate` | Date picker with min/max constraints |
| `dateRange` | `AppFormDateRange` | Two-date range picker |
| `select` | `AppFormSelect` | Single selection dropdown |
| `multiSelect` | `AppFormMultiSelect` | Multi-selection with min/max |
| `checkbox` | `AppFormCheckbox` | Boolean toggle |
| `combobox` | `AppFormArrayCombobox` | Searchable, sortable array with options |
| `fieldArray` | `AppFormFieldArray` | Dynamic add/remove/reorder arrays |
| `fieldset` | `AppFormFieldset` | Grouped fields with legend |
| `hidden` | `AppFormHidden` | Hidden form values |
| `submit` | `AppFormSubmit` | Submit button with loading state |

## Field Interface

```typescript
interface Field {
  name: string;           // Field name (supports nested: "rooms.#.name")
  type: FieldType;        // One of the types above
  label?: string;         // Display label
  subLabel?: string;      // Secondary label (checkbox)
  placeholder?: string;
  tooltip?: string;       // Hover tooltip
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  value?: FieldValue;     // Initial value
  validate?: QRL<ValidateField<any>>[];  // Validation functions
  
  // Number constraints
  min?: number;
  max?: number;
  step?: number;
  
  // Date constraints
  minDate?: Date;
  maxDate?: Date;
  
  // Select/Combobox options
  options?: Option[];
  reselectOptions?: boolean;  // Allow selecting same option multiple times
  editableOptions?: boolean;  // Allow editing option labels
  group?: string;             // Cross-container drag group
  
  // Nested fields (fieldset, fieldArray, combobox)
  fields?: Field[];
  singularLabel?: string;     // "Room" for "Rooms" array
  
  // Styling
  style?: string;             // Raw CSS string
  
  // Accessibility
  ariaLabel?: string;
  ariaDescription?: string;
  ariaDescribedby?: string;
  tabIndex?: number;
}
```

## Nested Field Arrays

Use `#` as a placeholder for array indices:

```typescript
{
  name: "rooms",
  type: "fieldArray",
  label: "Rooms",
  singularLabel: "Room",
  min: 1,
  max: 4,
  value: [{ travellers: [{ key: "adult", name: "" }] }],
  fields: [
    {
      name: "rooms.#.travellers",
      type: "combobox",
      label: "Travellers",
      options: [
        { label: "Adult", value: { key: "adult", name: "" } },
        { label: "Child", value: { key: "child", name: "" } }
      ],
      fields: [
        { name: "rooms.#.travellers.#.key", type: "hidden" },
        { name: "rooms.#.travellers.#.name", type: "text", label: "Name" }
      ]
    }
  ]
}
```

## Utility Functions

```typescript
import { getInitialFormValues, getFieldArrays } from "~/components/form/app-form/app-form";

// Extract initial values from config
const initialValues = getInitialFormValues(fields);

// Get field array paths for modular-forms registration
const fieldArrays = getFieldArrays(fields); // ["rooms", "rooms.$.travellers"]
```

## Validation

Use modular-forms validators wrapped in QRL:

```typescript
import { required, email, minLength } from "@modular-forms/qwik";

{
  name: "email",
  type: "email",
  validate: [
    required<string>("Email is required"),
    email("Invalid email format")
  ]
}
```

## Cross-Container Drag & Drop

Comboboxes with the same `group` allow dragging items between them:

```typescript
{ name: "todos", type: "combobox", group: "todo-group", ... },
{ name: "completedTodos", type: "combobox", group: "todo-group", ... }
```

## Component Architecture

```
AppForm
└── AppFormFieldRenderer
    └── AppFormFieldErrorBoundary (catches render errors)
        └── AppFormInput / AppFormSelect / AppFormDate / etc.
            └── flowbite-qwik UI + modular-forms Field
```

## CSS Grid Layout

Forms use CSS Grid with auto-fit columns:

```css
.modular-form > form {
  --form-min-column-width: 200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--form-min-column-width), 1fr));
}
```

Fields span full width with `col-span-full` class on wrapper.

## Error Handling

- **Validation errors**: Handled by modular-forms, displayed via `AppFormError`
- **Render errors**: Caught by `AppFormFieldErrorBoundary` per field
- **Unknown field types**: Logged to console, returns null

## File Structure

```
src/components/form/
├── app-form/                    # Main form component
│   ├── app-form.tsx
│   ├── app-form.css
│   ├── form-types.ts           # Field interface, FieldType union
│   └── form-utils.ts           # getInitialFormValues, sync utilities
├── app-form-field-renderer/    # Switch-based field routing
├── app-form-field-error-boundary/
├── app-form-input/
├── app-form-select/
├── app-form-date/
├── app-form-date-range/
├── app-form-checkbox/
├── app-form-textarea/
├── app-form-multi-select/
├── app-form-field-array/
├── app-form-array-combobox/
├── app-form-fieldset/
├── app-form-hidden/
├── app-form-submit/
├── app-form-label/
├── app-form-error/
├── app-form-tooltip/
├── app-form-dropdown-trigger/
└── utils/
    ├── constants.ts            # Timing constants
    └── date-utils.ts           # Date formatting
```

