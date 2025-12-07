import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";
import { AppFormError } from "../app-form-error/app-form-error";
import type { AppFormFieldProps } from "../app-form/form-types";
import { DatePicker } from "flowbite-qwik";
import { AppFormTooltip } from "../app-form-tooltip/app-form-tooltip";
import { AppFormLabel } from "../app-form-label/app-form-label";
import { FieldStore, Field, getValue, FieldElementProps } from "@modular-forms/qwik";
import { syncFormStoreAndLocal } from "../app-form/form-utils";
import { formatDate } from "../utils/date-utils";

export const AppFormDate = component$<AppFormFieldProps>(({ field, formStore }) => {
  const { name, required, disabled, ariaLabel, ariaDescribedby, tabIndex, hidden, placeholder, ariaDescription, minDate, maxDate, style, tooltip, value, validate } = field;
  const dateValue = useSignal<string | undefined>(value as string | undefined);
  const displayValue = useComputed$(() => formatDate(dateValue.value));

  // Track form store changes and sync TO local signal
  useTask$(({ track }) => {
    const formStoreValue = track(() => getValue(formStore, name));
    syncFormStoreAndLocal(formStoreValue, dateValue.value, dateValue, formStore, name, 'formStore');
  });

  // Track local signal changes and sync TO form store
  useTask$(({ track }) => {
    const localValue = track(() => dateValue.value);
    syncFormStoreAndLocal(getValue(formStore, name), localValue, dateValue, formStore, name, 'local');
  });

  return (
    <Field of={formStore} name={name} validate={validate as any}>
      {(
        fieldStore: FieldStore<Record<string, string>, any>,
        fieldProps: FieldElementProps<Record<string, string>, any>,
      ) => (
        fieldStore && fieldProps && (
          <div class="field-wrapper" style={style}>
            <style dangerouslySetInnerHTML={style} />
            <AppFormTooltip tooltip={tooltip}>
              <AppFormLabel field={field} />
              <DatePicker
                id={`${name.replaceAll(".", "-")}-date`}
                class={"field " + (fieldStore.error && "error")}
                placeholder={placeholder || "Select a date"}
                required={required}
                disabled={disabled}
                aria-label={ariaLabel}
                aria-description={ariaDescription}
                aria-describedby={fieldStore.error ? `${name}-error ${ariaDescribedby || ""}` : ariaDescribedby}
                aria-required={required}
                aria-invalid={fieldStore.error ? "true" : undefined}
                aria-hidden={hidden}
                tabIndex={tabIndex}
                hidden={hidden}
                minDate={minDate}
                maxDate={maxDate}
                defaultDate={new Date(dateValue.value as string || new Date())}
                onSelectedDateChanged$={(date: Date) => {
                  dateValue.value = new Date(date).toISOString();
                }}
                bind:value={displayValue}
              />
            </AppFormTooltip>
            <AppFormError message={fieldStore.error} id={`${name}-error`} />
          </div>
        )
      )}
    </Field>
  );
});