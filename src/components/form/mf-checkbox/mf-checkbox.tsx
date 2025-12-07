// 1. Imports
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { MfError } from "../mf-error/mf-error";
import type { MfFieldProps } from "../mf-form/form-types";
import { Checkbox } from "flowbite-qwik";
import { MfTooltip } from "../mf-tooltip/mf-tooltip";
import { FieldStore, Field, getValue, FieldElementProps } from "@modular-forms/qwik";
import { syncFormStoreAndLocal } from "../mf-form/form-utils";


export const MfCheckbox = component$<MfFieldProps>((props) => {
  const {
    field: {
      name,
      type,
      label,
      required,
      disabled,
      ariaLabel,
      ariaDescribedby,
      tabIndex,
      hidden,
      placeholder,
      min,
      max,
      step,
      ariaDescription,
      value,
      validate,
      style,
      tooltip,
    },
    formStore,
  } = props;

  const input = useSignal(Boolean(value === 'true'? true : false));

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
  /* error message */
  return (
    <>
      <Field of={formStore} name={name} validate={validate as any}>
        {(
          fieldStore: FieldStore<Record<string, string>, any>,
          fieldProps: FieldElementProps<Record<string, string>, any>,
        ) => (
          fieldStore && fieldProps && (
            <div class="field-wrapper items-center pt-7" style={style}>
              <MfTooltip tooltip={tooltip}>
                <Checkbox
                  id={`${name.replaceAll(".", "-")}-${type}`}
                  type={type}
                  class={"field " + (fieldStore.error && "error")}
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
                  min={min}
                  max={max}
                  step={step}
                  placeholder={placeholder}
                  bind:checked={input}
                >
                  {label}
                </Checkbox>
              </MfTooltip>

              <MfError message={fieldStore.error} id={`${name}-error`} />
            </div>
          )
        )}
      </Field>
    </>
  );
});
