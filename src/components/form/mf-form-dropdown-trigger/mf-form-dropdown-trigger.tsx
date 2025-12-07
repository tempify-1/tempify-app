import { component$, Signal, Slot, useVisibleTask$ } from "@builder.io/qwik";

interface MfFormDropdownTriggerProps {
  dropdownRef?: Signal<HTMLDivElement | undefined>;
  wrapperRef?: Signal<HTMLElement | undefined>;
  fieldIdSelector?: string | undefined;
}

export const MfFormDropdownTrigger = component$<MfFormDropdownTriggerProps>(
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
