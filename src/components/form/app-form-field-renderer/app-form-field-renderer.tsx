// 1. Imports
import { component$ } from "@builder.io/qwik";
import type { FormStore } from "@modular-forms/qwik";

// Form element components
import { AppFormSelect } from "../app-form-select/app-form-select";
import { AppFormInput } from "../app-form-input/app-form-input";
import { AppFormTextarea } from "../app-form-textarea/app-form-textarea";
import { AppFormSubmit } from "../app-form-submit/app-form-submit";
import { AppFormFieldset } from "../app-form-fieldset/app-form-fieldset";
import { AppFormFieldArray } from "../app-form-field-array/app-form-field-array";
import { AppFormArrayCombobox } from "../app-form-array-combobox/app-form-array-combobox";
import { AppFormDate } from "../app-form-date/app-form-date";
import { AppFormCheckbox } from "../app-form-checkbox/app-form-checkbox";
import { AppFormMultiSelect } from "../app-form-multi-select/app-form-multi-select";
import { AppFormDateRange } from "../app-form-date-range/app-form-date-range";
import { AppFormHidden } from "../app-form-hidden/app-form-hidden";
import { AppFormFieldErrorBoundary } from "../app-form-field-error-boundary/app-form-field-error-boundary";

// Types
import type { Field } from "../app-form/form-types";

export interface AppFormFieldRendererProps {
  fields: Field[];
  formStore: FormStore<Record<string, any>, undefined>;
}

// Field renderer component
export const AppFormFieldRenderer = component$<AppFormFieldRendererProps>((props) => {
  const { fields, formStore } = props;

  return (
    <>
      {fields.map((field) => {
        switch (field.type) {
          case "fieldArray":
            return (
              <AppFormFieldErrorBoundary key={field.name} fieldName={field.name}>
                <AppFormFieldArray field={field} formStore={formStore} />
              </AppFormFieldErrorBoundary>
            );

          case "combobox":
            return (
              <AppFormFieldErrorBoundary key={field.name} fieldName={field.name}>
                <AppFormArrayCombobox field={field} formStore={formStore} />
              </AppFormFieldErrorBoundary>
            );

          case "fieldset":
            return (
              <AppFormFieldErrorBoundary key={field.name} fieldName={field.name}>
                <AppFormFieldset field={field} formStore={formStore} />
              </AppFormFieldErrorBoundary>
            );

          case "submit":
            return (
              <AppFormFieldErrorBoundary key={field.name} fieldName={field.name}>
                <AppFormSubmit field={field} formStore={formStore} />
              </AppFormFieldErrorBoundary>
            );

          case "checkbox":
            return (
              <AppFormFieldErrorBoundary key={field.name} fieldName={field.name}>
                <AppFormCheckbox field={field} formStore={formStore} />
              </AppFormFieldErrorBoundary>
            );

          case "textarea":
            return (
              <AppFormFieldErrorBoundary key={field.name} fieldName={field.name}>
                <AppFormTextarea field={field} formStore={formStore} />
              </AppFormFieldErrorBoundary>
            );

          case "date":
            return (
              <AppFormFieldErrorBoundary key={field.name} fieldName={field.name}>
                <AppFormDate field={field} formStore={formStore} />
              </AppFormFieldErrorBoundary>
            );

          case "dateRange":
            return (
              <AppFormFieldErrorBoundary key={field.name} fieldName={field.name}>
                <AppFormDateRange field={field} formStore={formStore} />
              </AppFormFieldErrorBoundary>
            );

          case "select":
            return (
              <AppFormFieldErrorBoundary key={field.name} fieldName={field.name}>
                <AppFormSelect field={field} formStore={formStore} />
              </AppFormFieldErrorBoundary>
            );

          case "multiSelect":
            return (
              <AppFormFieldErrorBoundary key={field.name} fieldName={field.name}>
                <AppFormMultiSelect field={field} formStore={formStore} />
              </AppFormFieldErrorBoundary>
            );

          case "text":
          case "email":
          case "password":
          case "tel":
          case "file":
          case "color":
          case "number":
          case "range":
            return (
              <AppFormFieldErrorBoundary key={field.name} fieldName={field.name}>
                <AppFormInput field={field} formStore={formStore} />
              </AppFormFieldErrorBoundary>
            );

          case "hidden":
            return (
              <AppFormFieldErrorBoundary key={field.name} fieldName={field.name}>
                <AppFormHidden field={field} formStore={formStore} />
              </AppFormFieldErrorBoundary>
            );

          default:
            console.warn(`Unknown field type: ${field.type}`);
            return null;
        }
      })}
    </>
  );
});

