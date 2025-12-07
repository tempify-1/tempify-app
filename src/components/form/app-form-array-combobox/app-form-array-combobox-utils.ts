import { Signal } from "@builder.io/qwik";
import type { Option, FieldValueObject } from "../app-form/form-types";
import {
  FormStore,
  getValues,
  remove,
  insert,
  move,
  setValues,
} from "@modular-forms/qwik";
import { withViewTransition } from "~/utils/view-transition";

export const DROPDOWN_OPENED_TIMEOUT = 400;
export const COMBOBOX_CLASS =
  "min-h-[42px] p-1 pr-[42px] dark:border-gray-600 flex gap-1 flex-wrap w-full rounded-lg border border-gray-200 bg-gray-50 dark:bg-gray-700 relative";
export const BADGE_CLASS =
  "chip flex items-center justify-center gap-1 rounded-sm bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-300 pointer-events-auto";

export const getItemLabel = (
  options: Option[] | undefined,
  currentItem: FieldValueObject | undefined,
  singularLabel: string | undefined,
  index: number,
): string => {
  if (!currentItem) return `${singularLabel} ${index + 1}`;

  const matchedOption = options?.find((opt) => {
    const optValue = opt.value;
    if (
      typeof optValue === "object" &&
      optValue !== null &&
      "key" in optValue
    ) {
      return optValue.key === currentItem.key;
    }
    return false;
  });

  return (
    matchedOption?.label ||
    (typeof currentItem === "object" && "label" in currentItem
      ? String(currentItem.label)
      : undefined) ||
    `${singularLabel} ${index + 1}`
  );
};

export const valuesEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (
    typeof a === "object" &&
    a !== null &&
    "key" in a &&
    typeof b === "object" &&
    b !== null &&
    "key" in b
  ) {
    return (a as FieldValueObject).key === (b as FieldValueObject).key;
  }
  return false;
};

export const handlePreventDefault = (event: KeyboardEvent) => {
  if (event.key === "Enter") event.preventDefault();
};

export const handleDropDownOpen = (
  _: PointerEvent,
  element: HTMLDivElement,
  searchInputRef: Signal<HTMLInputElement | undefined>,
) => {
  const formElement = element.closest(".field-wrapper") as HTMLElement;
  setTimeout(() => {
    if (
      searchInputRef?.value &&
      formElement
        .querySelector(".dropdown-button")
        ?.getAttribute("aria-expanded") === "true"
    )
      searchInputRef.value.focus();
    setTimeout(() => {
      searchInputRef.value?.focus();
    }, 0);
  }, DROPDOWN_OPENED_TIMEOUT);
};

export const handleSelectItem = (
  option: Option,
  name: string,
  formStore: FormStore<Record<string, any>, undefined>,
  reselectOptions?: boolean,
  disabled?: boolean,
) => {
  if (!disabled) {
    const currentItems = getValues(formStore, name) as FieldValueObject[];

    if (!reselectOptions) {
      const existingIndex = currentItems?.findIndex((item) =>
        valuesEqual(item, option.value),
      );

      if (existingIndex >= 0) {
        withViewTransition(() =>
          remove(formStore, name, { at: existingIndex }),
        );
        return;
      }
    }

    const optionValue = option.value;
    if (typeof optionValue === "object" && optionValue !== null) {
      insert(formStore, name, { value: { ...optionValue } });
    }
  }
};

export const handleSearchKeyDown = (
  event: KeyboardEvent,
  name: string,
  formStore: FormStore<Record<string, any>, undefined>,
  filteredOptions: Signal<Option[] | undefined>,
  searchInputRef: Signal<HTMLInputElement | undefined>,
  searchValue: Signal<string>,
  reselectOptions?: boolean,
) => {
  if (event.key === "Enter") {
    const firstOption = filteredOptions.value?.[0];
    if (firstOption && searchInputRef.value?.value) {
      handleSelectItem(firstOption, name, formStore, reselectOptions);
    }

    if (searchInputRef.value) {
      searchInputRef.value.value = "";
      searchValue.value = "";
    }
  }
};

export const handleSortableUnchoose = (
  dragState: Signal<{
    timestamp: number;
    sameContainer: boolean;
    oldContainer?: HTMLElement;
    newContainer?: HTMLElement;
    oldIndex?: number;
    newIndex?: number;
  }>,
  formStore: FormStore<Record<string, any>, undefined>,
  group: string | undefined,
  name: string,
): void => {
  const { sameContainer, oldContainer, newContainer, oldIndex, newIndex } =
    dragState.value;
  if (
    Date.now() - dragState.value.timestamp > 200 ||
    oldIndex === undefined ||
    newIndex === undefined
  )
    return;

  if (sameContainer) {
    withViewTransition(() =>
      move(formStore, name, { from: oldIndex, to: newIndex }),
    );
  } else if (group && oldContainer && newContainer) {
    // Check if target container has reached max limit
    const isMaxReached = newContainer.getAttribute("data-is-max-reached");
    if (isMaxReached === "true") return;

    // Universal cross-container approach using data-field-name
    const oldFieldName = oldContainer.getAttribute("data-field-name");
    const newFieldName = newContainer.getAttribute("data-field-name");

    if (!oldFieldName || !newFieldName) return;

    // Get both arrays
    const oldArray = getValues(formStore, oldFieldName as any) as any[];
    const newArray = getValues(formStore, newFieldName as any) as any[];

    if (!oldArray || !newArray) return;

    // Move item between arrays
    const [movedItem] = oldArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, movedItem);

    // Update both arrays with view transition
    withViewTransition(() => {
      setValues(formStore, oldFieldName as any, oldArray);
      setValues(formStore, newFieldName as any, newArray);
    });
  }
};
