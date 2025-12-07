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
import type { MfFieldArrayProps } from "../mf-field-array/mf-field-array";
import { IconChevronDownOutline } from "flowbite-qwik-icons";
import { MfLabel } from "../mf-label/mf-label";
import { MfTooltip } from "../mf-tooltip/mf-tooltip";
import { Dropdown, Input } from "flowbite-qwik";
import { MfArrayComboboxItem } from "./mf-array-combobox-item";
import {
  COMBOBOX_CLASS,
  handlePreventDefault,
  handleDropDownOpen,
  handleSelectItem,
  handleSearchKeyDown,
  handleSortableUnchoose,
} from "./mf-array-combobox-utils";
import { MfFormDropdownTrigger } from "../mf-form-dropdown-trigger/mf-form-dropdown-trigger";

export const MfArrayCombobox = component$<MfFieldArrayProps>(
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
                <MfTooltip tooltip={tooltip}>
                  <div
                    class="relative flex w-full items-start justify-center"
                    onClick$={$(() => {})}
                  >
                    <div class="field pointer-events-none relative z-20 flex grow flex-col">
                      <MfLabel field={field} />
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
                          <MfArrayComboboxItem
                            key={String(item)}
                            field={field}
                            formStore={formStore}
                            id={String(item)}
                            index={index}
                          ></MfArrayComboboxItem>
                        ))}
                        <IconChevronDownOutline class="pointer-events-none absolute top-0 right-4 flex min-h-4 w-2.5 grow-0 h-full items-center justify-center opacity-60 " />
                      </div>
                    </div>
                    <MfFormDropdownTrigger dropdownRef={dropdownRef}>
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
                    </MfFormDropdownTrigger>
                  </div>
                </MfTooltip>
              </div>
            )
          );
        }}
      </FieldArray>
    );
  },
);
