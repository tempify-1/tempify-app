import { component$ } from "@builder.io/qwik";
import type { AnimationProps } from "../animation-types";

/** Data props for Link block (used in content definitions) */
export interface AppBlockLinkData extends AnimationProps {
  href: string;
  text: string;
  newTab?: boolean;
  class?: string;
}

/** Full props for Link component (includes runtime-injected props) */
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
    animation = "fade-up",
    animationPlacement = "center-center",
    animationEasing = "ease-in-out-quad",
    columnNumber,
    blockNumber,
  } = props;

  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      class={`font-bold ${className || ""}`.trim()}
      data-aos={animation}
      data-aos-placement={animationPlacement}
      data-aos-easing={animationEasing}
      data-aos-delay={(columnNumber * blockNumber) * 50}
    >
      {text}
    </a>
  );
});

