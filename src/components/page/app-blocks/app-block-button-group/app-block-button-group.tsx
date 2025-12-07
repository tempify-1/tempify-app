import { component$ } from "@builder.io/qwik";
import { Button, ButtonGroup } from "flowbite-qwik";
import type { AnimationProps } from "../animation-types";
import { getIcon, type FlowbiteIconName } from "~/utils/icon-utility";

type ButtonProps = Omit<Parameters<typeof Button>[0], 'prefix' | 'suffix'>;

export interface AppBlockButtonGroupButtonProps extends ButtonProps {
  label: string;
  prefix?: FlowbiteIconName;
  suffix?: FlowbiteIconName;
}

export interface AppBlockButtonGroupData extends AnimationProps {
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
    animation = "fade-up", 
    animationPlacement = "center-center", 
    animationEasing = "ease-in-out-quad", 
    columnNumber, 
    blockNumber 
  } = props;

  if (!buttons || buttons.length === 0) {
    return null;
  }

  return (
    <ButtonGroup 
      outline={outline}
      class={`button-group ${className || ""}`.trim()} 
      data-aos={animation} 
      data-aos-placement={animationPlacement} 
      data-aos-easing={animationEasing} 
      data-aos-delay={(columnNumber * blockNumber) * 50}
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

