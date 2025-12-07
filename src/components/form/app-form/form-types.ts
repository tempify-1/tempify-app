import type { FormStore } from "@modular-forms/qwik";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "date"
  | "dateRange"
  | "tel"
  | "textarea"
  | "file"
  | "checkbox"
  | "color"
  | "number"
  | "range"
  | "radio"
  | "select"
  | "multiSelect"
  | "fieldArray"
  | "combobox"
  | "submit"
  | "fieldset"
  | "hidden"
  | string;

export interface Field {
  name: string;
  type: FieldType;
  label?: string;
  subLabel?: string;
  placeholder?: string;
  singularLabel?: string;
  tooltip?: string;
  required?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  ariaDescribedby?: string;
  ariaDescription?: string;
  tabIndex?: number;
  hidden?: boolean;
  min?: number;
  max?: number;
  step?: number;
  minDate?: Date;
  maxDate?: Date;
  options?: Option[];
  reselectOptions?: boolean;
  editableOptions?: boolean;
  fieldTag?: string | number;
  fields?: Field[];
  arrayDepth?: number[];
  value?:
    | string
    | number
    | boolean
    | Array<string | number | boolean | Record<string, any>>
    | Record<string, any>
    | FieldValueObject[];
  validate?: ((value: unknown) => string | undefined) | Array<any>;
  style?: string;
  group?: string;
}

export type FieldValueObject<T extends object = Record<string, unknown>> = {
  readonly id?: string;
  readonly key: string;
} & Omit<T, "id" | "key">;

export interface Option {
  label: string;
  value: string | number | boolean | FieldValueObject;
  disabled?: boolean;
  selected?: boolean;
  draggable?: boolean;
}

// Base interface for form field components with common properties
export interface AppFormFieldProps {
  field: Field;
  formStore: FormStore<Record<string, any>, undefined>;
}
