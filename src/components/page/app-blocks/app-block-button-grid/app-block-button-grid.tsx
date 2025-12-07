import { component$ } from "@builder.io/qwik";
import { AppButton } from "~/components/ui/app-button/app-button";
import { Button } from "flowbite-qwik";
import type { AnimationProps } from "../animation-types";
import { getIcon, type FlowbiteIconName } from "~/utils/icon-utility";

type ButtonProps = Omit<Parameters<typeof Button>[0], 'prefix' | 'suffix'>;

export interface AppBlockButtonGridButtonProps extends ButtonProps {
  label: string;
  prefix?: FlowbiteIconName;
  suffix?: FlowbiteIconName;
}

/** Data props for ButtonGrid block (used in content definitions) */
export interface AppBlockButtonGridData extends AnimationProps {
  buttons?: AppBlockButtonGridButtonProps[];
  class?: string;
}

/** Full props for ButtonGrid component (includes runtime-injected props) */
export interface AppBlockButtonGridProps extends AppBlockButtonGridData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockButtonGrid = component$<AppBlockButtonGridProps>((props) => {
  const { buttons, class: className, animation = "fade-up", animationPlacement = "center-center", animationEasing = "ease-in-out-quad", columnNumber, blockNumber } = props;

  if (!buttons || buttons.length === 0) {
    return null;
  }

  return (
    <div class={`button-grid grid grid-cols-[repeat(auto-fit,280px)] gap-2 ${className || ""}`.trim()} data-aos={animation} data-aos-placement={animationPlacement} data-aos-easing={animationEasing} data-aos-delay={(columnNumber * blockNumber) * 50}>
      {buttons.map((button, index) => {
        const { label, prefix, suffix, ...buttonProps } = button;
        return (
          <AppButton
            key={index}
            {...buttonProps}
            size="lg"
            class="!w-[280px]"
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

