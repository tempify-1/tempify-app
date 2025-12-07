import { component$ } from "@builder.io/qwik";
import { AppButton } from "~/components/ui/app-button/app-button";
import { Button } from "flowbite-qwik";
import { getAosProps, type AnimationProps } from "../animation-types";
import { getIcon, type FlowbiteIconName } from "~/utils/icon-utility";

type ButtonProps = Omit<Parameters<typeof Button>[0], 'prefix' | 'suffix'>;

export interface AppBlockButtonProps extends ButtonProps {
  label: string;
  prefix?: FlowbiteIconName;
  suffix?: FlowbiteIconName;
}

export interface AppBlockButtonRowData extends AnimationProps {
  blockId?: string;
  buttons?: AppBlockButtonProps[];
  class?: string;
}

export interface AppBlockButtonRowProps extends AppBlockButtonRowData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockButtonRow = component$<AppBlockButtonRowProps>((props) => {
  const { buttons, class: className, animation, animationPlacement, animationEasing, columnNumber, blockNumber } = props;

  if (!buttons || buttons.length === 0) {
    return null;
  }

  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  return (
    <div class={`button-row flex flex-wrap gap-2 ${className || ""}`.trim()} {...aosProps}>
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
