import { component$, type FunctionComponent } from "@builder.io/qwik";
import { getAosProps, type AnimationProps } from "../animation-types";
import { sanitizeHtml } from "~/utils/sanitize-html";

type DynamicTagComponent = FunctionComponent<Record<string, unknown>>;

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

export interface AppBlockEyebrowData extends AnimationProps {
  blockId?: string;
  tag?: EyebrowTag;
  size?: TextSize;
  content: string;
  class?: string;
}

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
  const { tag = "p", size = "xs", content, class: className, animation, animationPlacement, animationEasing, columnNumber, blockNumber, ...restProps } = props;

  const Tag = tag as unknown as DynamicTagComponent;
  const sizeClass = sizeClassMap[size];
  const combinedClasses = `eye-brow uppercase ${sizeClass} ${className || ""}`.trim();
  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  return (
    <Tag {...restProps} class={combinedClasses} dangerouslySetInnerHTML={sanitizeHtml(content)} {...aosProps}>
    </Tag>
  );
});
