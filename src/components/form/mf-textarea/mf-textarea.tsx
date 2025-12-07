// 1. Imports
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { MfFieldProps } from "../mf-form/form-types";
import { MfError } from "../mf-error/mf-error";
import { MfTooltip } from "../mf-tooltip/mf-tooltip";
import { Textarea } from "flowbite-qwik";
import { FieldStore, Field, getValue, FieldElementProps } from "@modular-forms/qwik";
import { syncFormStoreAndLocal } from "../mf-form/form-utils";

export const MfTextarea = component$<MfFieldProps>((props) => {
  const {
    field: {
      name,
      label,
      required,
      disabled,
      ariaLabel,
      ariaDescribedby,
      tabIndex,
      hidden,
      placeholder,
      ariaDescription,
      value,
      validate,
      style,
      tooltip,
    },
    formStore,
  } = props;

  const input = useSignal(String(value));

  // Track form store changes and sync TO local signal
  useTask$(({ track }) => {
    const formStoreValue = track(() => getValue(formStore, name));
    syncFormStoreAndLocal(formStoreValue, input.value, input, formStore, name, 'formStore');
  });

  // Track local signal changes and sync TO form store
  useTask$(({ track }) => {
    const localValue = track(() => input.value);
    syncFormStoreAndLocal(getValue(formStore, name), localValue, input, formStore, name, 'local');
  });

  return (
    <>
      <Field of={formStore} name={name} validate={validate as any}>
        {(
          fieldStore: FieldStore<Record<string, string>, any>,
          fieldProps: FieldElementProps<Record<string, string>, any>,
        ) => (
          fieldStore && fieldProps && (
            <div class="field-wrapper" style={style}>
              <MfTooltip tooltip={tooltip}>
                <Textarea
                  id={`${name.replaceAll(".", "-")}-textarea`}
                  class={"field " + (fieldStore.error && "error")}
                  label={label}
                  required={required}
                  disabled={disabled}
                  aria-label={ariaLabel}
                  aria-description={ariaDescription}
                  aria-describedby={
                    fieldStore.error
                      ? `${name}-error ${ariaDescribedby || ""}`
                      : ariaDescribedby
                  }
                  aria-required={required}
                  aria-invalid={fieldStore.error ? "true" : undefined}
                  aria-hidden={hidden}
                  tabIndex={tabIndex}
                  hidden={hidden}
                  placeholder={placeholder}
                  bind:value={input}
                />
              </MfTooltip>

              <MfError message={fieldStore.error} id={`${name}-error`} />
            </div>
          )
        )}
      </Field>
    </>
  );
});
