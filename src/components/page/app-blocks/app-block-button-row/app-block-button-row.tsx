import { component$ } from "@builder.io/qwik";
import { AppButton } from "~/components/ui/app-button/app-button";
import { Button } from "flowbite-qwik";
import type { AnimationProps } from "../animation-types";
import { getIcon, type FlowbiteIconName } from "~/utils/icon-utility";

type ButtonProps = Omit<Parameters<typeof Button>[0], 'prefix' | 'suffix'>;

export interface AppBlockButtonProps extends ButtonProps {
  label: string;
  prefix?: FlowbiteIconName;
  suffix?: FlowbiteIconName;
}

/** Data props for ButtonRow block (used in content definitions) */
export interface AppBlockButtonRowData extends AnimationProps {
  buttons?: AppBlockButtonProps[];
  class?: string;
}

/** Full props for ButtonRow component (includes runtime-injected props) */
export interface AppBlockButtonRowProps extends AppBlockButtonRowData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockButtonRow = component$<AppBlockButtonRowProps>((props) => {
  const { buttons, class: className, animation = "fade-up", animationPlacement = "center-center", animationEasing = "ease-in-out-quad", columnNumber, blockNumber } = props;

  if (!buttons || buttons.length === 0) {
    return null;
  }

  return (
    <div class={`button-row flex flex-wrap gap-2 ${className || ""}`.trim()} data-aos={animation} data-aos-placement={animationPlacement} data-aos-easing={animationEasing} data-aos-delay={(columnNumber * blockNumber) * 50}>
      {buttons.map((button, index) => {
        const { label, prefix, suffix, ...buttonProps } = button;
        return (
          <AppButton
            key={index}
            {...buttonProps}
            prefix={prefix ? getIcon(prefix) : undefined}
            suffix={suffix ? getIcon(suffix) : undefined}
          >
            {label}
          </AppButton>
        );
      })}
    </div>
  );
});
