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
              <AppFormFieldArray
                key={field.name}
                field={field}
                formStore={formStore}
              />
            );

          case "combobox":
            return (
              <AppFormArrayCombobox
                key={field.name}
                field={field}
                formStore={formStore}
              />
            );

          case "fieldset":
            return (
              <AppFormFieldset
                key={field.name}
                field={field}
                formStore={formStore}
              />
            );

          case "submit":
            return <AppFormSubmit key={field.name} field={field} formStore={formStore} />;

          case "checkbox":
            return <AppFormCheckbox key={field.name} field={field} formStore={formStore} />;

          case "textarea":
            return <AppFormTextarea key={field.name} field={field} formStore={formStore} />;

          case "date":
            return <AppFormDate key={field.name} field={field} formStore={formStore} />;

          case "dateRange":
            return <AppFormDateRange key={field.name} field={field} formStore={formStore} />;

          case "select":
            return <AppFormSelect key={field.name} field={field} formStore={formStore} />;

          case "multiSelect":
            return <AppFormMultiSelect key={field.name} field={field} formStore={formStore} />;
          case "text":
          case "email":
          case "password":
          case "tel":
          case "file":
          case "color":
          case "number":
          case "range":
            return <AppFormInput key={field.name} field={field} formStore={formStore} />;

          case "hidden":
            return <AppFormHidden key={field.name} field={field} formStore={formStore} />;

          default:
            console.warn(`Unknown field type: ${field.type}`);
            return null;
        }
      })}
    </>
  );
});

