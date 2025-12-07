import { $, component$, useSignal, useComputed$ } from "@builder.io/qwik";
import { remove, getValues } from "@modular-forms/qwik";
import type { AppFormFieldArrayItemProps } from "../app-form-field-array/app-form-field-array";
import type { FieldValueObject } from "../app-form/form-types";
import {
  IconCloseOutline,
  IconDotsVerticalOutline,
  IconPenSolid,
} from "flowbite-qwik-icons";
import { withViewTransition } from "~/utils/view-transition";
import { AppFormArrayComboboxModal } from "./app-form-array-combobox-modal";
import { AppButton } from "~/components/ui/app-button/app-button";
import { BADGE_CLASS, getItemLabel } from "./app-form-array-combobox-utils";

export const AppFormArrayComboboxItem = component$<AppFormFieldArrayItemProps>(
  ({ formStore, field: config, index, id }) => {
    const {
      name,
      label,
      disabled,
      min,
      singularLabel,
      options,
      editableOptions,
    } = config;
    const modalVisible = useSignal(false);

    const currentItems = useComputed$(
      () => getValues(formStore, name) as FieldValueObject[],
    );
    const itemLabel = useComputed$(() => {
      const currentItem = currentItems.value?.[index];
      return getItemLabel(options, currentItem, singularLabel, index);
    });

    const draggableOrRemovable = useComputed$(
      () => currentItems.value.length > (min || 0),
    );

    return (
      <>
        <span
          class={BADGE_CLASS}
          data-index={index}
          data-id={id}
          role="listitem"
          aria-label={`${label} ${index + 1}`}
          style={`view-transition-name:item-${id}; cursor: pointer;`}
        >
          {draggableOrRemovable.value ? (
            <AppButton
              class="handle min-w-5 bg-transparent px-0"
              type="button"
              color="alternative"
              size="xs"
              disabled={disabled}
              aria-hidden="true"
            >
              <IconDotsVerticalOutline />
            </AppButton>
          ) : null}
          {editableOptions !== false ? (
            <AppButton
              type="button"
              color="alternative"
              class="badge-button min-w-5 bg-transparent px-0"
              aria-label={`Edit ${itemLabel.value}`}
              size="xs"
              aria-expanded={modalVisible.value}
              onClick$={() => {
                modalVisible.value = true;
              }}
            >
              <div class="flex cursor-pointer items-center justify-center gap-1">
                <span>{itemLabel.value}</span>
                <IconPenSolid class="h-2 w-2" />
              </div>
            </AppButton>
          ) : (
            <span>{itemLabel.value}</span>
          )}

          {draggableOrRemovable.value ? (
            <span
              onClick$={$((event) => {
                event.stopPropagation();
                withViewTransition(() =>
                  remove(formStore, name, { at: index }),
                );
              })}
            >
              <AppButton
                type="button"
                color="alternative"
                size="xs"
                class="min-w-5 bg-transparent px-0"
                aria-label={`Remove ${label} ${index + 1}`}
              >
                <IconCloseOutline class="h-2 w-2" />
                <span class="sr-only">Remove badge</span>
              </AppButton>
            </span>
          ) : null}
        </span>
        <div class="z-50 pointer-events-auto">
          <AppFormArrayComboboxModal
            fields={config}
            formStore={formStore}
            index={index}
            modalVisible={modalVisible}
          />
        </div>
      </>
    );
  },
);
