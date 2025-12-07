import { component$ } from "@builder.io/qwik";
import { getAosProps, type AnimationProps } from "../animation-types";

export interface AppBlockLinkData extends AnimationProps {
  blockId?: string;
  href: string;
  text: string;
  newTab?: boolean;
  class?: string;
}

export interface AppBlockLinkProps extends AppBlockLinkData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockLink = component$((props: AppBlockLinkProps) => {
  const {
    href,
    text,
    newTab = false,
    class: className,
    animation,
    animationPlacement,
    animationEasing,
    columnNumber,
    blockNumber,
  } = props;

  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      class={`font-bold ${className || ""}`.trim()}
      {...aosProps}
    >
      {text}
    </a>
  );
});

