import {
  component$,
  useSignal,
  useTask$,
  $,
  useVisibleTask$,
} from "@builder.io/qwik";
import { MfError } from "../mf-error/mf-error";
import type { MfFieldProps } from "../mf-form/form-types";
import { MfTooltip } from "../mf-tooltip/mf-tooltip";
import { MfFormDropdownTrigger } from "../mf-form-dropdown-trigger/mf-form-dropdown-trigger";
import { Checkbox, Dropdown, Textarea } from "flowbite-qwik";
import { IconChevronDownOutline } from "flowbite-qwik-icons";
import {
  FieldStore,
  Field,
  getValue,
  FieldElementProps,
} from "@modular-forms/qwik";
import { syncFormStoreAndLocal } from "../mf-form/form-utils";
import {
  TEXTAREA_CLASS,
  toOptions,
  isArray,
  formatDisplayValue,
  isOptionSelected,
  isOptionDisabled,
  handleOptionToggle,
} from "./mf-multi-select-utils";

export const MfMultiSelect = component$<MfFieldProps>((props) => {
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
      options,
      min,
      max,
      style,
      tooltip,
      value,
      validate,
    },
    formStore,
  } = props;

  const multiSelect = useSignal(toOptions(isArray(value), options || []));
  const multiSelectDisplay = useSignal(formatDisplayValue(multiSelect.value));
  const dropdownRef = useSignal<HTMLDivElement>();

  useTask$(({ track }) => {
    track(() => multiSelect.value);
    multiSelectDisplay.value = formatDisplayValue(multiSelect.value);
    syncFormStoreAndLocal(
      getValue(formStore, name),
      multiSelect.value,
      multiSelect,
      formStore,
      name,
      "local",
    );
  });

  useTask$(({ track }) => {
    const formStoreValue = track(() => getValue(formStore, name));
    syncFormStoreAndLocal(
      formStoreValue,
      multiSelect.value,
      multiSelect,
      formStore,
      name,
      "formStore",
    );
  });
// eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
   if(dropdownRef.value) {
     const button = dropdownRef.value.querySelector('button[aria-haspopup="menu"]');
     if(button) {
      button.setAttribute('type','button');
     }
   }
  });

  return (
    <Field of={formStore} name={name} validate={validate as any}>
      {(
        fieldStore: FieldStore<Record<string, string>, any>,
        fieldProps: FieldElementProps<Record<string, string>, any>,
      ) =>
        fieldStore &&
        fieldProps && (
          <div id="multi-select" class="field-wrapper">
            {style && <style dangerouslySetInnerHTML={style} />}
            <MfTooltip tooltip={tooltip}>
              <MfFormDropdownTrigger dropdownRef={dropdownRef}>
                <Dropdown
                  ref={dropdownRef}
                  class="w-full max-w-full [&>button]:w-full"
                  closeWhenSelect={false}
                  as={
                    <div class="relative flex w-full items-start justify-center">
                      <Textarea
                        id={`${name.replaceAll(".", "-")}-multi-select`}
                        class={
                          TEXTAREA_CLASS + (fieldStore.error ? " error" : "")
                        }
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
                        bind:value={multiSelectDisplay}
                        readOnly={true}
                      />
                      <div class="absolute right-4 bottom-[calc(50%-20px)] opacity-60">
                        <IconChevronDownOutline class="h-2.5 w-2.5" />
                      </div>
                    </div>
                  }
                >
                  {options?.map((option) => {
                    const selected = isOptionSelected(multiSelect.value, option);
                    const disabled = isOptionDisabled(
                      selected,
                      multiSelect.value,
                      min,
                      max,
                    );
                    return (
                      <Dropdown.Item key={option.label}>
                        <Checkbox
                          disabled={disabled}
                          onChange$={$(() =>
                            handleOptionToggle(option, multiSelect),
                          )}
                          checked={selected}
                        >
                          <span class={disabled ? "opacity-50" : ""}>
                            {option.label}
                          </span>
                        </Checkbox>
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown>
              </MfFormDropdownTrigger>
            </MfTooltip>
            <MfError message={fieldStore.error} id={`${name}-error`} />
          </div>
        )
      }
    </Field>
  );
});
