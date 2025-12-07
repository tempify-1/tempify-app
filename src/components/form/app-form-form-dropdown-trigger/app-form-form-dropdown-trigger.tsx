import { component$, Signal, Slot, useVisibleTask$ } from "@builder.io/qwik";

interface AppFormFormDropdownTriggerProps {
  dropdownRef?: Signal<HTMLDivElement | undefined>;
  wrapperRef?: Signal<HTMLElement | undefined>;
  fieldIdSelector?: string | undefined;
}

export const AppFormFormDropdownTrigger = component$<AppFormFormDropdownTriggerProps>(
  ({ dropdownRef }) => {
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      if (dropdownRef?.value) {
        dropdownRef.value
          .querySelector<HTMLButtonElement>(".dropdown-button")
          ?.setAttribute("type", "button");
      }
    });

    return <Slot />;
  },
);
