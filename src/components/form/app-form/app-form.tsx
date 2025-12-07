// 1. Imports
import { component$, useStyles$, type QRL } from "@builder.io/qwik";
import { Form, type FormStore, type SubmitHandler } from "@modular-forms/qwik";
import styles from "./app-form.css?inline";

// Components
import { AppFormDebug } from "../app-form-debug/app-form-debug";
import { AppFormFieldRenderer } from "../app-form-field-renderer/app-form-field-renderer";

// Types
import type { Field } from "./form-types";

// Utilities
import { FlowbiteProvider } from "flowbite-qwik";

export interface AppFormProps {
  formStore: FormStore<Record<string, any>, undefined>;
  debug?: boolean;
  showValidationStatus?: boolean;
  class?: string;
  id?: string;
  fields?: Field[];
  onSubmit$?: QRL<SubmitHandler<any>>;
  formClass?: string;
}

// Re-export utility functions
export { getInitialFormValues, getFieldArrays, syncFormStoreAndLocal, syncDateRangeFormStoreAndLocal } from "./form-utils";

export const AppForm = component$((props: AppFormProps) => {
  useStyles$(styles);
  const { debug, showValidationStatus, id, onSubmit$, fields, formClass } =
    props;
  const formStore = { ...props.formStore };

  return (
    <FlowbiteProvider theme="blue">
      <div
        class={`modular-form ${props.class || ""}`}
        id={id}
        role="form"
        aria-live="polite"
        data-valid={!formStore.invalid ? "" : undefined}
        data-dirty={formStore.dirty ? "" : undefined}
        data-submitting={formStore.submitting ? "" : undefined}
        data-submitted={formStore.submitted ? "" : undefined}
      >
        {onSubmit$ && fields ? (
          <Form
            of={formStore}
            onSubmit$={onSubmit$}
            class={formClass || "max-w-300"}
          >
            <AppFormFieldRenderer fields={fields} formStore={formStore}/>
          </Form>
        ) : null}

        {showValidationStatus && (
          <div
            class={`form-validation-status ${!formStore.invalid ? "valid" : "invalid"} ${formStore.dirty ? "dirty" : "pristine"}`}
            aria-live="polite"
          >
            <p>
              {!formStore.invalid
                ? "Form is valid"
                : "Form has validation errors"}
              {formStore.dirty && " (modified)"}
              {formStore.submitting && " (submitting...)"}
            </p>
          </div>
        )}
      </div>

      {debug && <AppFormDebug formStore={formStore} />}
    </FlowbiteProvider>
  );
});
