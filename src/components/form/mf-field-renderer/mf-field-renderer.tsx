// 1. Imports
import { component$ } from "@builder.io/qwik";
import type { FormStore } from "@modular-forms/qwik";

// Form element components
import { MfSelect } from "../mf-select/mf-select";
import { MfInput } from "../mf-input/mf-input";
import { MfTextarea } from "../mf-textarea/mf-textarea";
import { MfSubmit } from "../mf-submit/mf-submit";
import { MfFieldset } from "../mf-fieldset/mf-fieldset";
import { MfFieldArray } from "../mf-field-array/mf-field-array";
import { MfArrayCombobox } from "../mf-array-combobox/mf-array-combobox";
import { MfDate } from "../mf-date/mf-date";
import { MfCheckbox } from "../mf-checkbox/mf-checkbox";
import { MfMultiSelect } from "../mf-multi-select/mf-multi-select";
import { MfDateRange } from "../mf-date-range/mf-date-range";
import { MfHidden } from "../mf-hidden/mf-hidden";

// Types
import type { Field } from "../mf-form/form-types";

export interface MfFieldRendererProps {
  fields: Field[];
  formStore: FormStore<Record<string, any>, undefined>;
}

// Field renderer component
export const MfFieldRenderer = component$<MfFieldRendererProps>((props) => {
  const { fields, formStore } = props;

  return (
    <>
      {fields.map((field) => {
        switch (field.type) {
          case "fieldArray":
            return (
              <MfFieldArray
                key={field.name}
                field={field}
                formStore={formStore}
              />
            );

          case "combobox":
            return (
              <MfArrayCombobox
                key={field.name}
                field={field}
                formStore={formStore}
              />
            );

          case "fieldset":
            return (
              <MfFieldset
                key={field.name}
                field={field}
                formStore={formStore}
              />
            );

          case "submit":
            return <MfSubmit key={field.name} field={field} />;

          case "checkbox":
            return <MfCheckbox key={field.name} field={field} formStore={formStore} />;

          case "textarea":
            return <MfTextarea key={field.name} field={field} formStore={formStore} />;

          case "date":
            return <MfDate key={field.name} field={field} formStore={formStore} />;

          case "dateRange":
            return <MfDateRange key={field.name} field={field} formStore={formStore} />;

          case "select":
            return <MfSelect key={field.name} field={field} formStore={formStore} />;

          case "multiSelect":
            return <MfMultiSelect key={field.name} field={field} formStore={formStore} />;
          case "text":
          case "email":
          case "password":
          case "tel":
          case "file":
          case "color":
          case "number":
          case "range":
            return <MfInput key={field.name} field={field} formStore={formStore} />;

          case "hidden":
            return <MfHidden key={field.name} field={field} formStore={formStore} />;

          default:
            console.warn(`Unknown field type: ${field.type}`);
            return null;
        }
      })}
    </>
  );
});

