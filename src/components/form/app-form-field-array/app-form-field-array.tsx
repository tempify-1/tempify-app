import {
  $,
  component$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  remove,
  insert,
  move,
  getValues,
  FieldArray,
  type FormStore,
} from "@modular-forms/qwik";
import type {
  Field,
} from "../app-form/form-types";
import {
  IconCloseSolid,
  IconDotsVerticalOutline,
  IconInfoCircleOutline,
  IconPlusSolid,
} from "flowbite-qwik-icons";
import { AppButton } from "~/components/ui/app-button/app-button";
import Sortable from "sortablejs";
import { withViewTransition } from "~/utils/view-transition";
import { Alert } from "flowbite-qwik";
import { setFieldArrayFieldNames } from "../app-form/form-utils";
import { AppFormFieldRenderer } from "../app-form-field-renderer/app-form-field-renderer";

export interface AppFormFieldArrayProps {
  field: Field;
  formStore: FormStore<Record<string, any>, undefined>;
}

export interface AppFormFieldArrayItemProps {
  field: Field;
  formStore: FormStore<Record<string, any>, undefined>;
  index: number;
  id: string;
}

export const AppFormFieldArray = component$<AppFormFieldArrayProps>(
  ({ formStore, field: config }) => {
    const { name, label, disabled, max, singularLabel, style, value } = config;
    const fieldArrayListRef = useSignal<HTMLElement>();
    const dragState = useSignal({ timestamp: 0, oldIndex: -1, newIndex: -1 });

    const handleAdd = $(() => {
      withViewTransition(() => {
        insert(formStore, name, {
          value: JSON.parse(
            JSON.stringify((value as Array<Record<string, unknown>>)[0]),
          ),
        });
      });
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      if (!fieldArrayListRef.value) return;

      Sortable.create(fieldArrayListRef.value, {
        animation: 160,
        easing: "cubic-bezier(.2,.0,.2,1)",
        ghostClass: "field-array-item--ghost",
        chosenClass: "field-array-item--chosen",
        dragClass: "field-array-item--drag",
        dataIdAttr: "data-id",
        delayOnTouchOnly: true,
        delay: 100,
        forceFallback: true,
        handle: ".handle:not([disabled='true'])",
        onMove: (evt) => {
          dragState.value = {
            timestamp: Date.now(),
            oldIndex: Number(evt.dragged.getAttribute("data-index")),
            newIndex: Number(evt.related.getAttribute("data-index")),
          };
          return false;
        },
        onUnchoose: () => {
          const { timestamp, oldIndex, newIndex } = dragState.value;
          if (
            Date.now() - timestamp <= 200 &&
            oldIndex !== newIndex &&
            oldIndex !== -1
          ) {
            withViewTransition(() =>
              move(formStore, name, { from: oldIndex, to: newIndex }),
            );
          }
        },
      });
    });

    return (
      <FieldArray of={formStore} name={name}>
        {(fieldArray) => (

          fieldArray && (<div class="field-array-wrapper col-span-full row-auto flex w-full flex-col gap-2">
            <style dangerouslySetInnerHTML={style} />
            <div class="field-array-header flex flex-row items-center justify-between">
              <label>{label}</label>
              <AppButton
                type="button"
                onClick$={handleAdd}
                disabled={
                  disabled ||
                  getValues(formStore, name).length >= (max ?? Infinity)
                }
                prefix={IconPlusSolid}
              >
                Add {singularLabel}
              </AppButton>
            </div>
            <div
              ref={fieldArrayListRef}
              class="field-array-list flex flex-col gap-2"
              role="list"
              data-label={singularLabel}
            >
              {fieldArray.items.map((item, index) => (
                <AppFormFieldArrayItem
                  key={String(item)}
                  field={config}
                  formStore={formStore}
                  id={String(item)}
                  index={index}
                ></AppFormFieldArrayItem>
              ))}
              {fieldArray.items.length === 0 && (
                <Alert icon={IconInfoCircleOutline}>
                  <span class="font-medium">Click Add </span>
                  {singularLabel} to add {label}.
                </Alert>
              )}
            </div>
          </div>)
        )}
      </FieldArray>
    );
  },
);

export const AppFormFieldArrayItem = component$<AppFormFieldArrayItemProps>(
  ({ formStore, field: config, index, id }) => {
    const { name, label, disabled, min, singularLabel, fields } = config;

    return (
      <div
        class="field-array-item flex flex-row items-center gap-2 rounded-md border border-gray-200 bg-white px-1 py-3 shadow-xs dark:border-gray-900 dark:bg-gray-800"
        data-index={index}
        data-id={id}
        role="listitem"
        aria-roledescription="sortable item"
        aria-label={`${label} ${index + 1}`}
        style={`view-transition-name:item-${id}`}
      >
        <AppButton class="handle px-1" type="button" color="alternative">
          <IconDotsVerticalOutline />
        </AppButton>
        <label class="text-nowrap">
          {singularLabel} <span>{index + 1}</span>
        </label>
        {fields && (
          <AppFormFieldRenderer
            fields={setFieldArrayFieldNames(fields, index, config.arrayDepth || [])}
            formStore={formStore}
          />
        )}
        <button
          class="button ml-auto inline-flex w-fit cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 focus:outline-hidden dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          type="button"
          onClick$={$(() =>
            withViewTransition(() => remove(formStore, name, { at: index })),
          )}
          disabled={disabled || getValues(formStore, name).length === min}
          aria-label={`Remove ${label} ${index + 1}`}
        >
          <IconCloseSolid aria-hidden="true" />
        </button>
      </div>
    );
  },
);
