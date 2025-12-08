# Payload CMS Form Collection - Compatible with AppForm System

## Overview

This document provides a Payload CMS collection config that outputs form field structures compatible with your `Field` interface in `form-types.ts`.

---

## Quick Start: Custom Forms Collection

Instead of using the Form Builder Plugin, create a **custom collection** that directly matches your `Field` interface:

```typescript
// collections/Forms.ts
import type { CollectionConfig, Block } from 'payload'

// Field type options matching your FieldType union
const fieldTypeOptions = [
  { label: 'Text', value: 'text' },
  { label: 'Email', value: 'email' },
  { label: 'Password', value: 'password' },
  { label: 'Date', value: 'date' },
  { label: 'Date Range', value: 'dateRange' },
  { label: 'Tel', value: 'tel' },
  { label: 'Textarea', value: 'textarea' },
  { label: 'File', value: 'file' },
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Color', value: 'color' },
  { label: 'Number', value: 'number' },
  { label: 'Range', value: 'range' },
  { label: 'Select', value: 'select' },
  { label: 'Multi Select', value: 'multiSelect' },
  { label: 'Combobox', value: 'combobox' },
  { label: 'Hidden', value: 'hidden' },
]

// Option block for select/multiSelect/combobox fields
const OptionFields: Block = {
  slug: 'option',
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'value', type: 'text', required: true },
    { name: 'disabled', type: 'checkbox', defaultValue: false },
    { name: 'selected', type: 'checkbox', defaultValue: false },
  ],
}

// Recursive field block (for nested fields/fieldsets/fieldArrays)
const FormField: Block = {
  slug: 'field',
  fields: [
    // Core required fields
    { name: 'name', type: 'text', required: true, admin: { description: 'Field name (used as form key)' } },
    { name: 'type', type: 'select', options: fieldTypeOptions, required: true },
    
    // Labels & display
    { name: 'label', type: 'text' },
    { name: 'subLabel', type: 'text' },
    { name: 'placeholder', type: 'text' },
    { name: 'tooltip', type: 'text' },
    { name: 'singularLabel', type: 'text', admin: { condition: (_, { type }) => type === 'fieldArray' } },
    
    // State
    { name: 'required', type: 'checkbox', defaultValue: false },
    { name: 'disabled', type: 'checkbox', defaultValue: false },
    { name: 'hidden', type: 'checkbox', defaultValue: false },
    
    // Number constraints
    {
      type: 'row',
      fields: [
        { name: 'min', type: 'number', admin: { width: '33%', condition: (_, { type }) => ['number', 'range'].includes(type) } },
        { name: 'max', type: 'number', admin: { width: '33%', condition: (_, { type }) => ['number', 'range'].includes(type) } },
        { name: 'step', type: 'number', admin: { width: '33%', condition: (_, { type }) => ['number', 'range'].includes(type) } },
      ],
    },
    
    // Options for select/multiSelect/combobox/radio
    {
      name: 'options',
      type: 'array',
      admin: { condition: (_, { type }) => ['select', 'multiSelect', 'combobox'].includes(type) },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'disabled', type: 'checkbox' },
        { name: 'selected', type: 'checkbox' },
      ],
    },
    
    // Default value (stored as JSON for flexibility)
    { name: 'value', type: 'json', admin: { description: 'Default value (JSON format)' } },
    
    // Accessibility
    { name: 'ariaLabel', type: 'text' },
    { name: 'ariaDescription', type: 'text' },
    
    // Styling
    { name: 'style', type: 'text', admin: { description: 'CSS classes or inline styles' } },
    { name: 'group', type: 'text', admin: { description: 'Field group identifier' } },
  ],
}

export const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'URL-friendly identifier' } },
    
    // Form fields array - matches your Field[] structure
    {
      name: 'fields',
      type: 'array',
      required: true,
      minRows: 1,
      fields: FormField.fields,
      admin: {
        description: 'Form fields configuration',
      },
    },
    
    // Submit button config
    { name: 'submitLabel', type: 'text', defaultValue: 'Submit' },
    
    // Form settings
    {
      name: 'settings',
      type: 'group',
      fields: [
        { name: 'successMessage', type: 'textarea' },
        { name: 'redirectUrl', type: 'text' },
      ],
    },
  ],
}

export default Forms
```

---

## Form Submissions Collection

```typescript
// collections/FormSubmissions.ts
import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    defaultColumns: ['form', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true, // Allow public form submissions
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'submissionData',
      type: 'json',
      required: true,
      admin: {
        description: 'Form submission values as JSON object',
      },
    },
  ],
}

export default FormSubmissions
```

---

## API Response → AppForm Mapper

Use this utility on your Qwik frontend to convert Payload API response to your `Field[]`:

```typescript
// utils/payload-form-mapper.ts
import type { Field, FieldType, Option } from '~/components/form/app-form/form-types'

interface PayloadFormField {
  name: string
  type: string
  label?: string
  subLabel?: string
  placeholder?: string
  tooltip?: string
  singularLabel?: string
  required?: boolean
  disabled?: boolean
  hidden?: boolean
  min?: number
  max?: number
  step?: number
  options?: { label: string; value: string; disabled?: boolean; selected?: boolean }[]
  value?: any
  ariaLabel?: string
  ariaDescription?: string
  style?: string
  group?: string
}

interface PayloadForm {
  id: string
  title: string
  slug: string
  fields: PayloadFormField[]
  submitLabel?: string
}

export function mapPayloadToAppForm(payloadForm: PayloadForm): Field[] {
  return payloadForm.fields.map((pf) => ({
    name: pf.name,
    type: pf.type as FieldType,
    label: pf.label,
    subLabel: pf.subLabel,
    placeholder: pf.placeholder,
    tooltip: pf.tooltip,
    singularLabel: pf.singularLabel,
    required: pf.required,
    disabled: pf.disabled,
    hidden: pf.hidden,
    min: pf.min,
    max: pf.max,
    step: pf.step,
    options: pf.options as Option[],
    value: pf.value,
    ariaLabel: pf.ariaLabel,
    ariaDescription: pf.ariaDescription,
    style: pf.style,
    group: pf.group,
  }))
}

// Add submit button from form config
export function mapPayloadFormWithSubmit(payloadForm: PayloadForm): Field[] {
  const fields = mapPayloadToAppForm(payloadForm)
  fields.push({
    name: 'submit',
    type: 'submit',
    label: payloadForm.submitLabel || 'Submit',
  })
  return fields
}
```

---

## Nested Fields / FieldArrays

For `fieldset` and `fieldArray` types with nested fields, extend the collection:

```typescript
// Add to FormField.fields array:
{
  name: 'fields',
  type: 'array',
  admin: {
    condition: (_, { type }) => ['fieldset', 'fieldArray'].includes(type),
    description: 'Nested fields for fieldset/fieldArray',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'type', type: 'select', options: fieldTypeOptions, required: true },
    { name: 'label', type: 'text' },
    { name: 'placeholder', type: 'text' },
    { name: 'required', type: 'checkbox' },
    // Add other fields as needed...
  ],
}
```

---

## Validation (Registry Pattern)

Since validation functions (`QRL<ValidateField>`) can't be stored in a database, use a **validation registry** pattern: store validation rule names in Payload, resolve them to actual validators on the frontend.

### Step 1: Add Validation Fields to Payload Collection

Add these fields to the `FormField.fields` array:

```typescript
// Add to FormField.fields array (after 'required' field):
{
  name: 'validation',
  type: 'select',
  hasMany: true,
  options: [
    { label: 'Required', value: 'required' },
    { label: 'Email Format', value: 'email' },
    { label: 'Phone Format', value: 'phone' },
    { label: 'URL Format', value: 'url' },
    { label: 'Min Length', value: 'minLength' },
    { label: 'Max Length', value: 'maxLength' },
    { label: 'Min Value', value: 'minValue' },
    { label: 'Max Value', value: 'maxValue' },
    { label: 'Pattern (Regex)', value: 'pattern' },
  ],
  admin: { description: 'Validation rules to apply' },
},
{
  name: 'validationParams',
  type: 'json',
  admin: {
    description: 'Validation parameters as JSON, e.g., { "minLength": 5, "pattern": "^[A-Z]" }',
    condition: (_, { validation }) => validation?.length > 0,
  },
},
{
  name: 'validationMessage',
  type: 'text',
  admin: {
    description: 'Custom error message (optional)',
    condition: (_, { validation }) => validation?.length > 0,
  },
},
```

### Step 2: Create Validation Registry (Frontend)

```typescript
// utils/validation-registry.ts
import { $ } from '@builder.io/qwik'
import type { QRL } from '@builder.io/qwik'
import type { ValidateField } from '@modular-forms/qwik'

type ValidatorFactory = (params?: any, customMessage?: string) => QRL<ValidateField<any>>

const validators: Record<string, ValidatorFactory> = {
  required: (_, msg) => $((value) =>
    !value && value !== 0 ? (msg || 'This field is required') : ''
  ),

  email: (_, msg) => $((value) =>
    value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))
      ? (msg || 'Please enter a valid email address')
      : ''
  ),

  phone: (_, msg) => $((value) =>
    value && !/^\+?[\d\s\-()]+$/.test(String(value))
      ? (msg || 'Please enter a valid phone number')
      : ''
  ),

  url: (_, msg) => $((value) =>
    value && !/^https?:\/\/.+\..+/.test(String(value))
      ? (msg || 'Please enter a valid URL')
      : ''
  ),

  minLength: (params, msg) => $((value) =>
    value && String(value).length < (params?.minLength || 0)
      ? (msg || `Minimum ${params?.minLength} characters required`)
      : ''
  ),

  maxLength: (params, msg) => $((value) =>
    value && String(value).length > (params?.maxLength || Infinity)
      ? (msg || `Maximum ${params?.maxLength} characters allowed`)
      : ''
  ),

  minValue: (params, msg) => $((value) =>
    value !== undefined && Number(value) < (params?.minValue ?? -Infinity)
      ? (msg || `Minimum value is ${params?.minValue}`)
      : ''
  ),

  maxValue: (params, msg) => $((value) =>
    value !== undefined && Number(value) > (params?.maxValue ?? Infinity)
      ? (msg || `Maximum value is ${params?.maxValue}`)
      : ''
  ),

  pattern: (params, msg) => $((value) => {
    if (!value || !params?.pattern) return ''
    const regex = new RegExp(params.pattern)
    return !regex.test(String(value)) ? (msg || 'Invalid format') : ''
  }),
}

export function getValidators(
  rules: string[],
  params?: Record<string, any>,
  customMessage?: string
): QRL<ValidateField<any>>[] {
  return rules
    .map((rule) => validators[rule]?.(params, customMessage))
    .filter(Boolean)
}

// Get single validator
export function getValidator(
  rule: string,
  params?: Record<string, any>,
  customMessage?: string
): QRL<ValidateField<any>> | undefined {
  return validators[rule]?.(params, customMessage)
}
```

### Step 3: Update the Mapper

```typescript
// Update PayloadFormField interface:
interface PayloadFormField {
  name: string
  type: string
  label?: string
  // ... existing fields ...
  validation?: string[]           // Array of validation rule names
  validationParams?: Record<string, any>  // Parameters for validators
  validationMessage?: string      // Custom error message
}

// Update mapPayloadToAppForm function:
import { getValidators } from './validation-registry'

export function mapPayloadToAppForm(payloadForm: PayloadForm): Field[] {
  return payloadForm.fields.map((pf) => ({
    name: pf.name,
    type: pf.type as FieldType,
    label: pf.label,
    subLabel: pf.subLabel,
    placeholder: pf.placeholder,
    tooltip: pf.tooltip,
    singularLabel: pf.singularLabel,
    required: pf.required,
    disabled: pf.disabled,
    hidden: pf.hidden,
    min: pf.min,
    max: pf.max,
    step: pf.step,
    options: pf.options as Option[],
    value: pf.value,
    ariaLabel: pf.ariaLabel,
    ariaDescription: pf.ariaDescription,
    style: pf.style,
    group: pf.group,
    // Map validation rules to actual QRL validators
    validate: pf.validation?.length
      ? getValidators(pf.validation, pf.validationParams, pf.validationMessage)
      : undefined,
  }))
}
```

### Example Usage in Payload Admin

When creating a form field in Payload admin:

| Field Property     | Value                                    |
|--------------------|------------------------------------------|
| name               | `email`                                  |
| type               | `email`                                  |
| label              | `Email Address`                          |
| validation         | `['required', 'email']`                  |
| validationParams   | `{}`                                     |
| validationMessage  | `Please provide a valid email`           |

For a password field with length requirements:

| Field Property     | Value                                    |
|--------------------|------------------------------------------|
| name               | `password`                               |
| type               | `password`                               |
| label              | `Password`                               |
| validation         | `['required', 'minLength', 'maxLength']` |
| validationParams   | `{ "minLength": 8, "maxLength": 128 }`   |
| validationMessage  | _(leave empty for default messages)_     |

---

## Field Type Mapping Reference

| Your FieldType   | Payload Config                          | Notes                          |
|------------------|-----------------------------------------|--------------------------------|
| `text`           | Direct match                            | ✅                             |
| `email`          | Direct match                            | ✅                             |
| `password`       | `type: 'text'` + custom handling        | Handle on frontend             |
| `date`           | Direct match                            | ✅                             |
| `dateRange`      | Custom - two date fields or JSON        | Store as `{ start, end }`      |
| `tel`            | `type: 'text'`                          | Validate on frontend           |
| `textarea`       | Direct match                            | ✅                             |
| `file`           | Relationship to uploads collection      | Needs upload handling          |
| `checkbox`       | Direct match                            | ✅                             |
| `color`          | `type: 'text'`                          | Frontend color picker          |
| `number`         | Direct match                            | ✅                             |
| `range`          | `type: 'number'` + min/max/step         | Frontend range input           |
| `select`         | Direct match + options array            | ✅                             |
| `multiSelect`    | `select` with `hasMany: true`           | ✅                             |
| `combobox`       | Custom - relationship or select         | ✅                             |
| `fieldArray`     | `type: 'array'` with nested fields      | ✅                             |
| `fieldset`       | `type: 'group'` with nested fields      | ✅                             |
| `hidden`         | Any field with `hidden: true`           | ✅                             |

---

## Usage with @shopnex/payload-sdk

```typescript
import { PayloadSDK } from '@shopnex/payload-sdk'
import { mapPayloadFormWithSubmit } from '~/utils/payload-form-mapper'

const sdk = new PayloadSDK({ baseURL: 'https://your-payload-api.com' })

// Fetch form by slug
const payloadForm = await sdk.collections.forms.find({ where: { slug: { equals: 'contact' } } })

// Convert to AppForm Field[]
const formConfig = mapPayloadFormWithSubmit(payloadForm.docs[0])

// Submit form
const submission = await sdk.collections['form-submissions'].create({
  data: {
    form: payloadForm.docs[0].id,
    submissionData: formValues, // Your form values object
  },
})
```

