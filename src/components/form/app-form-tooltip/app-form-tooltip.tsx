/**
 * Form Tooltip Wrapper Component
 *
 * A component that conditionally wraps children in a Tooltip based on whether a tooltip prop is provided.
 */

import { component$, Slot } from "@builder.io/qwik";
import { Tooltip } from "flowbite-qwik";

export interface AppFormTooltipProps {
  tooltip?: string;
  class?: string;
}

export const AppFormTooltip = component$<AppFormTooltipProps>((props) => {

  if (!props.tooltip) {
    return <Slot />;
  }

  return (
    <Tooltip class={props.class || "tooltip"} style="dark" placement="bottom">
      <span q:slot="trigger">
        <Slot />
      </span>
      <div q:slot="content">{props.tooltip}</div>
    </Tooltip>
  );
});
