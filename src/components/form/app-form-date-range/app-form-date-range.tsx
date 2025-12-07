import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { AppFormError } from "../app-form-error/app-form-error";
import type { AppFormFieldProps } from "../app-form/form-types";
import { Badge, Button, DatePicker, Dropdown } from "flowbite-qwik";
import { AppFormTooltip } from "../app-form-tooltip/app-form-tooltip";
import { AppFormLabel } from "../app-form-label/app-form-label";
import {
  FieldStore,
  Field,
  getValue,
  FieldElementProps,
} from "@modular-forms/qwik";
import { syncDateRangeFormStoreAndLocal } from "../app-form/form-utils";
import { AppFormDropdownTrigger } from "../app-form-dropdown-trigger/app-form-dropdown-trigger";
import { IconCalendarMonthOutline } from "flowbite-qwik-icons";
import { formatDate } from "../utils/date-utils";
import { CALENDAR_SWITCH_DELAY_MS } from "../utils/constants";


export const AppFormDateRange = component$<AppFormFieldProps>(({ field, formStore }) => {
  const {
    name,
    required,
    disabled,
    ariaLabel,
    ariaDescribedby,
    tabIndex,
    hidden,
    placeholder,
    ariaDescription,
    minDate,
    maxDate,
    style,
    tooltip,
    value,
    validate,
  } = field;

  const startDateValue = useSignal((value as string[] | undefined)?.[0]);
  const endDateValue = useSignal((value as string[] | undefined)?.[1]);
  const startDateDisplayValue = useComputed$(() =>
    formatDate(startDateValue.value),
  );
  const endDateDisplayValue = useComputed$(() =>
    formatDate(endDateValue.value),
  );
  const currentCalendar = useSignal<"start" | "end">("start");
  const dropdownRef = useSignal<HTMLDivElement>();

  // Track form store changes and sync TO local signals
  useTask$(({ track }) => {
    const formStoreValue = track(() => getValue(formStore, name)) as
      | string[]
      | undefined;
    syncDateRangeFormStoreAndLocal(
      formStoreValue,
      startDateValue,
      endDateValue,
      formStore,
      name,
      "formStore",
    );
  });

  // Track local signal changes and sync TO form store
  useTask$(({ track }) => {
    track(() => startDateValue.value);
    track(() => endDateValue.value);
    const formStoreValue = getValue(formStore, name) as string[] | undefined;
    syncDateRangeFormStoreAndLocal(
      formStoreValue,
      startDateValue,
      endDateValue,
      formStore,
      name,
      "local",
    );
  });

  return (
    <Field of={formStore} name={name} validate={validate as any}>
      {(
        fieldStore: FieldStore<Record<string, string>, any>,
        fieldProps: FieldElementProps<Record<string, string>, any>,
      ) =>
        fieldStore &&
        fieldProps && (
          <div id="date-range" class="field-wrapper">
            <style dangerouslySetInnerHTML={style} />
            <AppFormTooltip tooltip={tooltip}>
              <AppFormDropdownTrigger dropdownRef={dropdownRef}>
                <Dropdown
                  ref={dropdownRef}
                  class="w-full max-w-full [&>button]:w-full"
                  closeWhenSelect={false}
                  as={
                    <div class="relative flex w-full items-start justify-center">
                      <div class="field relative flex grow flex-col">
                        <AppFormLabel field={field} />
                        <div
                          id={`${name.replaceAll(".", "-")}-date-range`}
                          class={
                            DATERANGE_CLASS + (fieldStore.error ? " error" : "")
                          }
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
                        >
                                           <div class="absolute top-0 left-0 flex h-full items-center justify-center pl-3">
                          <IconCalendarMonthOutline class="w-4 h-4" />
                        </div>
                          {startDateDisplayValue.value &&
                            endDateDisplayValue.value ?  (
                              <>
                                <Badge
                                  pills
                                  content={startDateDisplayValue.value}
                                />
                                <Badge
                                  pills
                                  content={endDateDisplayValue.value}
                                />
                              </>
                            ) : (<span class="flex items-center text-md">{placeholder}</span>)}
                        </div>
                      </div>
                    </div>
                  }
                >
                  <Dropdown.Item header>
                    <div class="flex p-2">
                      <Button
                        type="button"
                        class="flex-grow rounded-r-none text-sm"
                        outline={currentCalendar.value !== "start"}
                        color="blue"
                        onClick$={() => (currentCalendar.value = "start")}
                      >
                        Start Date
                      </Button>
                      <Button
                        type="button"
                        class="flex-grow rounded-l-none text-sm"
                        outline={currentCalendar.value !== "end"}
                        color="blue"
                        onClick$={() => (currentCalendar.value = "end")}
                      >
                        End Date
                      </Button>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item header>
                    <div
                      id="datepicker-scroll-container"
                      class="mx-auto -mt-4 flex max-w-[280px] overflow-x-hidden"
                    >
                      <div
                        class={
                          "flex w-[560px] flex-row transition duration-300 ease-in-out " +
                          (currentCalendar.value === "start"
                            ? "translate-x-[0%]"
                            : "translate-x-[-50%]")
                        }
                      >
                        <DatePicker
                          id="start-date"
                          class="date-range max-w-[280px]"
                          inline
                          placeholder={placeholder || "Select a date"}
                          required={required}
                          disabled={disabled}
                          tabIndex={tabIndex}
                          minDate={minDate}
                          maxDate={
                            endDateValue.value
                              ? new Date(endDateValue.value)
                              : undefined
                          }
                          defaultDate={
                            new Date(startDateValue.value || new Date())
                          }
                          onSelectedDateChanged$={(date: Date) => {
                            startDateValue.value = new Date(date).toISOString();
                            setTimeout(
                              () => (currentCalendar.value = "end"),
                              CALENDAR_SWITCH_DELAY_MS,
                            );
                          }}
                          showClearButton={false}
                          showTodayButton={false}
                        />
                        <DatePicker
                          id="end-date"
                          class="date-range max-w-[280px]"
                          inline
                          placeholder={placeholder || "Select a date"}
                          required={required}
                          disabled={disabled}
                          tabIndex={tabIndex}
                          minDate={
                            startDateValue.value
                              ? new Date(startDateValue.value)
                              : undefined
                          }
                          maxDate={maxDate}
                          defaultDate={
                            new Date(endDateValue.value || new Date())
                          }
                          onSelectedDateChanged$={(date: Date) => {
                            endDateValue.value = new Date(date).toISOString();
                            setTimeout(
                              () => (currentCalendar.value = "start"),
                              CALENDAR_SWITCH_DELAY_MS,
                            );
                          }}
                          showClearButton={false}
                          showTodayButton={false}
                        />
                      </div>
                    </div>
                  </Dropdown.Item>
                </Dropdown>
              </AppFormDropdownTrigger>
            </AppFormTooltip>

            <AppFormError message={fieldStore.error} id={`${name}-error`} />
          </div>
        )
      }
    </Field>
  );
});

const DATERANGE_CLASS =
  "relative min-h-[42px] p-1 pl-[42px] dark:border-gray-600 flex gap-1 flex-wrap w-full rounded-lg border border-gray-200 bg-gray-50 dark:bg-gray-700 text-sm";