import type { Field } from "./form-types";
import type { FormStore } from "@modular-forms/qwik";
import { setValue } from "@modular-forms/qwik";
import type { Signal } from "@builder.io/qwik";

export const getInitialFormValues = (
  fields: Field[],
): any => {
  const initialValues: any = {};

  const extractValues = (elements: Field[]) => {
    elements.forEach((element) => {
      if (element.type === "fieldset" && element.fields) {
        extractValues(element.fields);
      } else if ("value" in element && element.name !== "submit") {
        initialValues[element.name] = element.value as any;
      }
    });
  };

  extractValues(fields);
  return { ...initialValues };
};

export const getFieldArrays = (
  fields: Field[],
  parentPath: string = "",
): string[] => {
  const fieldArrayNames: string[] = [];

  const collectFieldArrays = (
    elements: Field[],
    currentPath: string,
    parentFieldArrayName: string = "",
  ) => {
    elements.forEach((element) => {
      // If this element is a fieldArray or combobox, add its name
      if (element.type === "fieldArray" || element.type === "combobox") {
        let fullPath: string;

        // Check if this is a nested field array whose name already contains the parent path
        // e.g., element.name = "rooms.#.travellers" and parentFieldArrayName = "rooms"
        if (parentFieldArrayName && element.name.startsWith(parentFieldArrayName + ".#.")) {
          // Replace .#. with .$ to get the correct wildcard syntax
          fullPath = element.name.replace(".#.", ".$.");
        } else {
          // Standard path construction for non-nested or top-level arrays
          fullPath = currentPath
            ? `${currentPath}.${element.name}`
            : element.name;
        }

        fieldArrayNames.push(fullPath);

        // If this array has nested arrays, register them with wildcard syntax
        if (element.fields && element.fields.length > 0) {
          // Extract the base field name (without path) for nested arrays
          const baseFieldName = fullPath.includes(".$.")
            ? fullPath.split(".$.")[0]
            : fullPath.split(".")[0];
          collectFieldArrays(element.fields, `${fullPath}.$`, baseFieldName);
        }
      } else if (element.fields && element.fields.length > 0) {
        // For fieldsets, continue with current path and parent field array name
        collectFieldArrays(element.fields, currentPath, parentFieldArrayName);
      }
    });
  };

  collectFieldArrays(fields, parentPath);
  return fieldArrayNames;
};

export const setFieldArrayFieldNames = (
  fields: Field[],
  fieldArrayIndex: number,
  arrayDepth: number[],
) => {
  return fields.map((element) => {
    const newArrayDepth = [...arrayDepth, fieldArrayIndex];
    // Replace each .#. with the corresponding arrayDepth value
    let updatedName = element.name;
    newArrayDepth.forEach((depth) => {
      updatedName = updatedName.replace(".#.", "." + depth + ".");
    });
    return {
      ...element,
      arrayDepth: newArrayDepth,
      name: updatedName,
    };
  });
};

/**
 * Helper function to get field paths and values for populating array item fields
 * Used for combobox to prepare nested field values
 * @param name - The field array name
 * @param index - The index of the item in the array
 * @param optionValue - The option value object containing field data
 * @returns Array of {path, value} objects for each field to set
 */
/* export const getArrayItemFieldUpdates = (
  name: string,
  index: number,
  optionValue: Record<string, any>,
): Array<{ path: string; value: any }> => {
  return Object.keys(optionValue)
    .filter((key) => key !== "id" && key !== "key")
    .map((key) => ({
      path: `${name}.${index}.${key}`,
      value: optionValue[key],
    }));
}; */

/**
 * Bidirectional sync utility for form store and local signal
 * Determines which value changed and syncs in the correct direction
 * @param formStoreValue - The tracked value from the form store
 * @param localValue - The tracked value from the local signal
 * @param localSignal - The local signal to update
 * @param formStore - The form store
 * @param name - The field name in the form store
 */
export const syncFormStoreAndLocal = (
  formStoreValue: any,
  localValue: any,
  localSignal: Signal<any>,
  formStore: FormStore<Record<string, any>, undefined>,
  name: string,
  change: "local" | "formStore" = "local",
) => {
  if (formStoreValue !== localValue) {
    if (change === "formStore") {
      localSignal.value = formStoreValue;
    } else {
      setValue(formStore, name, localValue);
    }
  }
};

/**
 * Bidirectional sync utility for date range with two separate signals
 * Handles syncing between form store array and two local date signals
 * @param formStoreValue - The tracked array value from the form store [startDate, endDate]
 * @param startSignal - The local signal for start date
 * @param endSignal - The local signal for end date
 * @param formStore - The form store
 * @param name - The field name in the form store
 * @param change - Direction of change: "local" (signals changed) or "formStore" (form store changed)
 */
export const syncDateRangeFormStoreAndLocal = (
  formStoreValue: string[] | undefined,
  startSignal: Signal<string | undefined>,
  endSignal: Signal<string | undefined>,
  formStore: FormStore<Record<string, any>, undefined>,
  name: string,
  change: "local" | "formStore" = "local",
) => {
  const localArray = [startSignal.value, endSignal.value];
  const formStoreArray = formStoreValue || [undefined, undefined];

  // Compare arrays by stringifying to handle undefined values properly
  const formStoreStr = JSON.stringify(formStoreArray);
  const localStr = JSON.stringify(localArray);

  if (formStoreStr !== localStr) {
    if (change === "formStore") {
      // Form store changed, update local signals
      startSignal.value = formStoreArray[0];
      endSignal.value = formStoreArray[1];
    } else {
      // Local signals changed, update form store
      setValue(formStore, name, localArray);
    }
  }
};
