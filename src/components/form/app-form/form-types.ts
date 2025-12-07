import type { QRL } from "@builder.io/qwik";
import type { FormStore, ValidateField } from "@modular-forms/qwik";

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
  | "select"
  | "multiSelect"
  | "fieldArray"
  | "combobox"
  | "submit"
  | "fieldset"
  | "hidden";

export type FieldValueObject<T extends object = Record<string, unknown>> = {
  readonly id?: string;
  readonly key: string;
} & Omit<T, "id" | "key">;

export type FieldValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | FieldValueObject
  | FieldValue[]
  | { [key: string]: FieldValue };

export interface Option {
  label: string;
  value: string | number | boolean | FieldValueObject;
  disabled?: boolean;
  selected?: boolean;
  draggable?: boolean;
}

type FieldValidation = QRL<ValidateField<any>> | QRL<ValidateField<any>>[];

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
  value?: FieldValue;
  validate?: FieldValidation;
  style?: string;
  group?: string;
}

// Base interface for form field components with common properties
export interface AppFormFieldProps {
  field: Field;
  formStore: FormStore<Record<string, any>, undefined>;
}
