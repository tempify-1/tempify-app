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
import { AppFormFormDropdownTrigger } from "../app-form-form-dropdown-trigger/app-form-form-dropdown-trigger";
import { IconCalendarMonthOutline } from "flowbite-qwik-icons";


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
              <AppFormFormDropdownTrigger dropdownRef={dropdownRef}>
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
                            endDateDisplayValue.value && (
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
                            )}
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
                              200,
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
                              200,
                            );
                          }}
                          showClearButton={false}
                          showTodayButton={false}
                        />
                      </div>
                    </div>
                  </Dropdown.Item>
                </Dropdown>
              </AppFormFormDropdownTrigger>
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

const MONTH_NAMES_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTH_NAMES_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getOrdinalSuffix = (num: number): string => {
  if (num > 3 && num < 21) return "th";
  return ["th", "st", "nd", "rd"][num % 10] || "th";
};

const formatDate = (
  dateString: string | undefined,
  shortMonth = false,
  shortYear = false,
): string | undefined => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = date.getDate();
  const month = (shortMonth ? MONTH_NAMES_SHORT : MONTH_NAMES_LONG)[
    date.getMonth()
  ];
  const year = shortYear ? date.getFullYear() % 100 : date.getFullYear();
  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};