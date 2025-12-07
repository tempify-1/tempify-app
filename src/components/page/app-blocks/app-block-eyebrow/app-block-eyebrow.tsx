import { component$ } from "@builder.io/qwik";
import type { AnimationProps } from "../animation-types";

export type EyebrowTag =
  | "p"
  | "span"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export type TextSize = "base" | "sm" | "xs";

/** Data props for Eyebrow block (used in content definitions) */
export interface AppBlockEyebrowData extends AnimationProps {
  tag?: EyebrowTag;
  size?: TextSize;
  content: string;
  class?: string;
  [key: string]: any;
}

/** Full props for Eyebrow component (includes runtime-injected props) */
export interface AppBlockEyebrowProps extends AppBlockEyebrowData {
  columnNumber: number;
  blockNumber: number;
}

const sizeClassMap: Record<TextSize, string> = {
  base: "text-base",
  sm: "text-sm",
  xs: "text-xs",
};

export const AppBlockEyebrow = component$((props: AppBlockEyebrowProps) => {
  const { tag = "p", size = "xs", content, class: className, animation = "fade-up", animationPlacement = "center-center", animationEasing = "ease-in-out-quad", columnNumber, blockNumber, ...restProps } = props;

  const Tag = tag as any;
  const sizeClass = sizeClassMap[size];
  const combinedClasses = `eye-brow uppercase ${sizeClass} ${className || ""}`.trim();

  return (
    <Tag {...restProps} class={combinedClasses} dangerouslySetInnerHTML={content} data-aos={animation} data-aos-placement={animationPlacement} data-aos-easing={animationEasing} data-aos-delay={(columnNumber * blockNumber) * 50}>
    </Tag>
  );
});
