import { component$ } from "@builder.io/qwik";
import { AppButton } from "~/components/ui/app-button/app-button";
import { Button } from "flowbite-qwik";
import { getAosProps, type AnimationProps } from "../animation-types";
import { getIcon, type FlowbiteIconName } from "~/utils/icon-utility";

type ButtonProps = Omit<Parameters<typeof Button>[0], 'prefix' | 'suffix'>;

export interface AppBlockButtonGridButtonProps extends ButtonProps {
  label: string;
  prefix?: FlowbiteIconName;
  suffix?: FlowbiteIconName;
}

export interface AppBlockButtonGridData extends AnimationProps {
  blockId?: string;
  buttons?: AppBlockButtonGridButtonProps[];
  class?: string;
}

export interface AppBlockButtonGridProps extends AppBlockButtonGridData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockButtonGrid = component$<AppBlockButtonGridProps>((props) => {
  const { buttons, class: className, animation, animationPlacement, animationEasing, columnNumber, blockNumber } = props;

  if (!buttons || buttons.length === 0) {
    return null;
  }

  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  return (
    <div class={`button-grid grid grid-cols-[repeat(auto-fit,280px)] gap-2 ${className || ""}`.trim()} {...aosProps}>
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

