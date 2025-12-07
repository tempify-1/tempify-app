import { component$ } from "@builder.io/qwik";
import { getValues, type FormStore } from "@modular-forms/qwik";

export interface AppFormDebugProps {
  formStore: FormStore<Record<string, any>, undefined>;
}

export const AppFormDebug = component$((props: AppFormDebugProps) => {
  const { formStore } = props;

  return (
    <div class="form-debug" aria-label="Form debug information">
      <h3 id="debug-heading">Form State</h3>
      <pre class="debug-display" aria-labelledby="debug-heading">
        {JSON.stringify(
          {
            values: getValues(formStore),
            valid: !formStore.invalid,
            dirty: formStore.dirty,
            touched: formStore.touched,
            submitting: formStore.submitting,
            submitted: formStore.submitted,
            submitCount: formStore.submitCount,
            response: formStore.response,
          },
          null,
          2,
        )}
      </pre>
    </div>
  );
});

