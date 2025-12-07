import { component$ } from "@builder.io/qwik";
import type { AnimationProps } from "../animation-types";
import { getIcon, type FlowbiteIconName } from "~/utils/icon-utility";

export type IconColor =
  | "blue"
  | "red"
  | "green"
  | "yellow"
  | "purple"
  | "pink"
  | "indigo"
  | "gray";

export type IconSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24 | 28 | 32;

export const colorClassMap: Record<IconColor, string> = {
  blue: "text-blue-600 dark:text-blue-400",
  red: "text-red-600 dark:text-red-400",
  green: "text-green-600 dark:text-green-400",
  yellow: "text-yellow-600 dark:text-yellow-400",
  purple: "text-purple-600 dark:text-purple-400",
  pink: "text-pink-600 dark:text-pink-400",
  indigo: "text-indigo-600 dark:text-indigo-400",
  gray: "text-gray-600 dark:text-gray-400",
};

export const sizeClassMap: Record<IconSize, string> = {
  1: "w-1 h-1",
  2: "w-2 h-2",
  3: "w-3 h-3",
  4: "w-4 h-4",
  5: "w-5 h-5",
  6: "w-6 h-6",
  7: "w-7 h-7",
  8: "w-8 h-8",
  9: "w-9 h-9",
  10: "w-10 h-10",
  11: "w-11 h-11",
  12: "w-12 h-12",
  14: "w-14 h-14",
  16: "w-16 h-16",
  20: "w-20 h-20",
  24: "w-24 h-24",
  28: "w-28 h-28",
  32: "w-32 h-32",
};

export interface AppBlockIconData extends AnimationProps {
  name: FlowbiteIconName;
  color?: IconColor;
  size?: IconSize;
}

export interface AppBlockIconProps extends AppBlockIconData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockIcon = component$<AppBlockIconProps>((props) => {
  const {
    name,
    color,
    size = 6,
    animation = "fade-up",
    animationPlacement = "center-center",
    animationEasing = "ease-in-out-quad",
    columnNumber,
    blockNumber,
  } = props;

  const Icon = getIcon(name);
  const colorClasses = color ? colorClassMap[color] : "";
  const sizeClasses = sizeClassMap[size];
  const combinedClasses = `${sizeClasses} ${colorClasses}`.trim();

  return (
    <div
      data-aos={animation}
      data-aos-placement={animationPlacement}
      data-aos-easing={animationEasing}
      data-aos-delay={(columnNumber * blockNumber) * 50}
    >
      <Icon class={combinedClasses} />
    </div>
  );
});

