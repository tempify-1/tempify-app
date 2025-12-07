import { component$, type FunctionComponent } from "@builder.io/qwik";
import { getAosProps, type AnimationProps } from "../animation-types";
import { sanitizeHtml } from "~/utils/sanitize-html";

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type DynamicTagComponent = FunctionComponent<Record<string, unknown>>;

export type TextSize =
  | "9xl"
  | "8xl"
  | "7xl"
  | "6xl"
  | "5xl"
  | "4xl"
  | "3xl"
  | "2xl"
  | "xl"
  | "lg"
  | "base"
  | "sm";

export interface AppBlockHeadingData extends AnimationProps {
  blockId?: string;
  tag?: HeadingTag;
  size?: TextSize;
  content: string;
  class?: string;
}

export interface AppBlockHeadingProps extends AppBlockHeadingData {
  columnNumber: number;
  blockNumber: number;
}

const sizeClassMap: Record<TextSize, string> = {
  "9xl": "text-9xl",
  "8xl": "text-8xl",
  "7xl": "text-7xl",
  "6xl": "text-6xl",
  "5xl": "text-5xl",
  "4xl": "text-4xl",
  "3xl": "text-3xl",
  "2xl": "text-2xl",
  "xl": "text-xl",
  "lg": "text-lg",
  "base": "text-base",
  "sm": "text-sm",
};

export const AppBlockHeading = component$((props: AppBlockHeadingProps) => {
  const { tag = "h2", size = "2xl", content, class: className, animation, animationPlacement, animationEasing, columnNumber, blockNumber, ...restProps } = props;

  const Tag = tag as unknown as DynamicTagComponent;
  const sizeClass = sizeClassMap[size];
  const combinedClasses = `heading ${sizeClass} ${className || ""}`.trim();
  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  return (
    <Tag {...restProps} class={combinedClasses} dangerouslySetInnerHTML={sanitizeHtml(content)} {...aosProps}>
    </Tag>
  );
});

