import { component$, Signal, Slot, useVisibleTask$ } from "@builder.io/qwik";

interface AppFormDropdownTriggerProps {
  dropdownRef?: Signal<HTMLDivElement | undefined>;
  wrapperRef?: Signal<HTMLElement | undefined>;
  fieldIdSelector?: string | undefined;
}

export const AppFormDropdownTrigger = component$<AppFormDropdownTriggerProps>(
  ({ dropdownRef }) => {
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      if (dropdownRef?.value) {
        dropdownRef.value
          .querySelector<HTMLButtonElement>("button[aria-haspopup='menu']")
          ?.setAttribute("type", "button");
      }
    });

    return <Slot />;
  },
);

