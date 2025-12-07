import {
  $,
  component$,
  useSignal,
  useComputed$,
  useVisibleTask$,
  useTask$,
} from "@builder.io/qwik";
import { getValues, FieldArray } from "@modular-forms/qwik";
import Sortable from "sortablejs";
import type { AppFormFieldArrayProps } from "../app-form-field-array/app-form-field-array";
import { IconChevronDownOutline } from "flowbite-qwik-icons";
import { AppFormLabel } from "../app-form-label/app-form-label";
import { AppFormTooltip } from "../app-form-tooltip/app-form-tooltip";
import { Dropdown, Input } from "flowbite-qwik";
import { AppFormArrayComboboxItem } from "./app-form-array-combobox-item";
import {
  COMBOBOX_CLASS,
  handlePreventDefault,
  handleDropDownOpen,
  handleSelectItem,
  handleSearchKeyDown,
  handleSortableUnchoose,
} from "./app-form-array-combobox-utils";
import { AppFormFormDropdownTrigger } from "../app-form-form-dropdown-trigger/app-form-form-dropdown-trigger";

export const AppFormArrayCombobox = component$<AppFormFieldArrayProps>(
  ({ formStore, field }) => {
    const {
      name,
      singularLabel,
      style,
      tooltip,
      ariaLabel,
      ariaDescribedby,
      tabIndex,
      hidden,
      ariaDescription,
      required,
      options,
      reselectOptions,
      group,
      min,
      max,
      type,
    } = field;

    const searchValue = useSignal("");
    const searchInputRef = useSignal<HTMLInputElement>();
    const filteredOptions = useComputed$(() =>
      options?.filter((opt) =>
        opt.label.toLowerCase().includes(searchValue.value.toLowerCase()),
      ),
    );
    const wrapperRef = useSignal<HTMLDivElement>();
    const chipListRef = useSignal<HTMLElement>();
    const dropdownRef = useSignal<HTMLDivElement>();
    const dragState = useSignal({
      timestamp: 0,
      sameContainer: false,
      oldContainer: undefined as HTMLElement | undefined,
      newContainer: undefined as HTMLElement | undefined,
      oldIndex: undefined as number | undefined,
      newIndex: undefined as number | undefined,
    });

    useTask$(({ track }) => {
      track(() => searchInputRef.value);
      searchInputRef.value?.focus();
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      if (!chipListRef.value) return;
      Sortable.create(chipListRef.value, {
        animation: 150,
        easing: "cubic-bezier(.2,.0,.2,1)",
        ghostClass: "chip--ghost",
        chosenClass: "chip--chosen",
        dragClass: "chip--drag",
        delayOnTouchOnly: true,
        delay: 0,
        forceFallback: true,
        direction: "horizontal",
        group,
        handle: ".handle:not([disabled='true'])",
        onMove: (evt) => {
          dragState.value = {
            timestamp: Date.now(),
            oldContainer: evt.from,
            newContainer: evt.to,
            sameContainer:
              evt.from.getAttribute("data-field-name") ===
              evt.to.getAttribute("data-field-name"),
            oldIndex: Number(evt.dragged.getAttribute("data-index")),
            newIndex: Number(evt.related.getAttribute("data-index")),
          };
          evt.from.closest(".field-array-item")?.classList.add("z-10", "z-20");
          return false;
        },
        onUnchoose: () =>
          handleSortableUnchoose(dragState, formStore, group, name),
      });
    });

    return (
      <FieldArray of={formStore} name={name}>
        {(fieldArray) => {
          return (
            fieldArray && (
              <div
                id={`${name.replaceAll(".", "-")}-${type}`}
                ref={wrapperRef}
                class="field-wrapper"
                onKeyDown$={$((event) =>
                  handleSearchKeyDown(
                    event,
                    name,
                    formStore,
                    filteredOptions,
                    searchInputRef,
                    searchValue,
                    reselectOptions,
                  ),
                )}
              >
                {style && <style dangerouslySetInnerHTML={style} />}
                <AppFormTooltip tooltip={tooltip}>
                  <div
                    class="relative flex w-full items-start justify-center"
                    onClick$={$(() => {})}
                  >
                    <div class="field pointer-events-none relative z-20 flex grow flex-col">
                      <AppFormLabel field={field} />
                      <div
                        ref={chipListRef}
                        role="list"
                        data-label={singularLabel}
                        data-field-name={name}
                        data-max={max}
                        data-is-max-reached={
                          max && max <= getValues(formStore, name).length
                            ? "true"
                            : "false"
                        }
                        data-min={min}
                        id={name}
                        class={
                          COMBOBOX_CLASS + (fieldArray.error ? " error" : "")
                        }
                        aria-label={ariaLabel}
                        aria-description={ariaDescription}
                        aria-describedby={
                          fieldArray.error
                            ? `${name}-error ${ariaDescribedby || ""}`
                            : ariaDescribedby
                        }
                        aria-required={required}
                        aria-invalid={fieldArray.error ? "true" : undefined}
                        aria-hidden={hidden}
                        tabIndex={tabIndex}
                        hidden={hidden}
                      >
                        {fieldArray.items.map((item, index) => (
                          <AppFormArrayComboboxItem
                            key={String(item)}
                            field={field}
                            formStore={formStore}
                            id={String(item)}
                            index={index}
                          ></AppFormArrayComboboxItem>
                        ))}
                        <IconChevronDownOutline class="pointer-events-none absolute top-0 right-4 flex min-h-4 w-2.5 grow-0 h-full items-center justify-center opacity-60 " />
                      </div>
                    </div>
                    <AppFormFormDropdownTrigger dropdownRef={dropdownRef}>
                      <Dropdown
                        ref={dropdownRef}
                        onKeyDown$={$(handlePreventDefault)}
                        onClick$={$((event, element) =>
                          handleDropDownOpen(event, element, searchInputRef),
                        )}
                        as={
                          <button
                            type="button"
                            title="Open combobox"
                            aria-label="Open combobox options"
                            class="transparent min-h-full min-w-full"
                          ></button>
                        }
                        class="transparent absolute z-10 flex min-h-full min-w-full"
                        closeWhenSelect={false}
                      >
                        <Dropdown.Item header>
                          <Input
                            ref={searchInputRef}
                            class="combobox-input"
                            placeholder="Search..."
                            bind:value={searchValue}
                            onKeyDown$={$(handlePreventDefault)}
                          />
                        </Dropdown.Item>
                        {filteredOptions.value?.map((option) => {
                          const disabled =
                            getValues(formStore, name).length >=
                              (max || Infinity) || false;
                          return (
                            <Dropdown.Item
                              key={option.label}
                              aria-disabled={disabled}
                              onClick$={() =>
                                !disabled &&
                                handleSelectItem(
                                  option,
                                  name,
                                  formStore,
                                  reselectOptions,
                                  disabled,
                                )
                              }
                            >
                              <label class={disabled ? "opacity-50" : ""}>
                                {option.label}
                              </label>
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown>
                    </AppFormFormDropdownTrigger>
                  </div>
                </AppFormTooltip>
              </div>
            )
          );
        }}
      </FieldArray>
    );
  },
);
