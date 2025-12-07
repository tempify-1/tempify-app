import { component$ } from "@builder.io/qwik";
import { Button, ButtonGroup } from "flowbite-qwik";
import { getAosProps, type AnimationProps } from "../animation-types";
import { getIcon, type FlowbiteIconName } from "~/utils/icon-utility";

type ButtonProps = Omit<Parameters<typeof Button>[0], 'prefix' | 'suffix'>;

export interface AppBlockButtonGroupButtonProps extends ButtonProps {
  label: string;
  prefix?: FlowbiteIconName;
  suffix?: FlowbiteIconName;
}

export interface AppBlockButtonGroupData extends AnimationProps {
  blockId?: string;
  buttons?: AppBlockButtonGroupButtonProps[];
  outline?: boolean;
  class?: string;
}

export interface AppBlockButtonGroupProps extends AppBlockButtonGroupData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockButtonGroup = component$<AppBlockButtonGroupProps>((props) => {
  const {
    buttons,
    outline,
    class: className,
    animation,
    animationPlacement,
    animationEasing,
    columnNumber,
    blockNumber
  } = props;

  if (!buttons || buttons.length === 0) {
    return null;
  }

  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  return (
    <ButtonGroup
      outline={outline}
      class={`button-group ${className || ""}`.trim()}
      {...aosProps}
    >
      {buttons.map((button, index) => {
        const { label, prefix, suffix, ...buttonProps } = button;
        return (
          <Button
            key={index}
            {...buttonProps}
            prefix={prefix ? getIcon(prefix) : undefined}
            suffix={suffix ? getIcon(suffix) : undefined}
          >
            {label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
});

