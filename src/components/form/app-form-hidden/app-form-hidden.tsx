import {
  component$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import type { AppFormFieldProps } from "../app-form/form-types";
import {
  Field,
  getValue,
  FieldStore,
  FieldElementProps,
} from "@modular-forms/qwik";
import { syncFormStoreAndLocal } from "../app-form/form-utils";

export const AppFormHidden = component$<AppFormFieldProps>((props) => {
  const {
    field: {
      name,
      value,
      validate,
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
    <Field of={formStore} name={name} validate={validate as any}>
      {(
        fieldStore: FieldStore<Record<string, string>, any>,
        fieldProps: FieldElementProps<Record<string, string>, any>,
      ) => (
        fieldStore && fieldProps && (
          <input
            type="hidden"
            id={`${name.replaceAll(".", "-")}-hidden`}
            name={name}
            value={input.value}
          />
        )
      )}
    </Field>
  );
});

