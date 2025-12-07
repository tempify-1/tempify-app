import { Signal } from "@builder.io/qwik";
import type { Option, FieldValueObject } from "../mf-form/form-types";

// Constants
export const TEXTAREA_CLASS =
  "field min-h-10 grow [&>span>textarea]:pr-10 [&>span>textarea]:min-h-[42px]";

// Helper functions
export const hasKeyProperty = (value: any): value is FieldValueObject =>
  typeof value === "object" && value !== null && "key" in value;

export const valuesEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (hasKeyProperty(a) && hasKeyProperty(b)) return a.key === b.key;
  return false;
};

export const formatDisplayValue = (options: Option[] | undefined): string =>
  options?.map((opt) => opt.label).join(", ") || "";

export const isArray = (value: any): any[] => (Array.isArray(value) ? value : []);

export const createOptionWithId = (option: Option): Option => {
  const value = option.value as FieldValueObject;
  return {
    ...option,
    value: { key: value.key, id: crypto.randomUUID() },
  } as Option;
};

export const toOptions = (values: any[], availableOptions: Option[]): Option[] => {
  if (!values?.length) return [];
  return values
    .map((value) =>
      availableOptions.find((opt) => valuesEqual(opt.value, value)),
    )
    .filter((opt): opt is Option => !!opt)
    .map(createOptionWithId);
};

export const isOptionSelected = (selectedOptions: Option[], option: Option): boolean =>
  selectedOptions?.some((sel) => valuesEqual(sel.value, option.value)) ?? false;

export const isOptionDisabled = (
  selected: boolean,
  selectedOptions: Option[] | undefined,
  min?: number,
  max?: number,
): boolean => {
  if (!selectedOptions) return false;
  if (max && selectedOptions.length >= max && !selected) return true;
  if (min && selectedOptions.length <= min && selected) return true;
  return false;
};

export const handleOptionToggle = (option: Option, multiSelect: Signal<Option[]>) => {
  multiSelect.value = isOptionSelected(multiSelect.value, option)
    ? multiSelect.value.filter((sel) => !valuesEqual(sel.value, option.value))
    : [...multiSelect.value, createOptionWithId(option)];
};


