// 1. Imports
import { component$, useStyles$ } from "@builder.io/qwik";
import { Form, type FormStore } from "@modular-forms/qwik";
import styles from "./mf-form.css?inline";

// Components
import { MfDebug } from "../mf-debug/mf-debug";
import { MfFieldRenderer } from "../mf-field-renderer/mf-field-renderer";

// Types
import type { Field } from "./form-types";

// Utilities
import { FlowbiteProvider } from "flowbite-qwik";

export interface ModularFormProps {
  formStore: FormStore<Record<string, any>, undefined>;
  debug?: boolean;
  showValidationStatus?: boolean;
  class?: string;
  id?: string;
  fields?: Field[];
  onSubmit$?: any; // QRL<SubmitHandler<T>>
  formClass?: string;
}

// Re-export utility functions
export { getInitialFormValues, getFieldArrays, syncFormStoreAndLocal, syncDateRangeFormStoreAndLocal } from "./form-utils";

export const ModularForm = component$((props: ModularFormProps) => {
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
            <MfFieldRenderer fields={fields} formStore={formStore}/>
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

      {debug && <MfDebug formStore={formStore} />}
    </FlowbiteProvider>
  );
});
