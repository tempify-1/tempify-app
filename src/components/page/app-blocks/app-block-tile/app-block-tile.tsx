import { component$ } from "@builder.io/qwik";
import { AppBlockRichText, type PayloadRichText } from "../app-block-rich-text/app-block-rich-text";
import type { AnimationProps } from "../animation-types";
import { getIcon, type FlowbiteIconName } from "~/utils/icon-utility";
import { type IconColor, type IconSize, colorClassMap, sizeClassMap } from "../app-block-icon/app-block-icon";

export type ThemeColor =
  | "blue"
  | "red"
  | "green"
  | "yellow"
  | "purple"
  | "pink"
  | "indigo"
  | "gray"
  | "transparent";

export type ForegroundThemeColor = ThemeColor | "white";

export interface TileIconConfig {
  name: FlowbiteIconName;
  color?: IconColor;
  size?: IconSize;
}

export interface AppBlockTileData extends AnimationProps {
  richText?: PayloadRichText;
  backgroundTheme?: ThemeColor;
  foregroundTheme?: ForegroundThemeColor;
  icon?: TileIconConfig;
  sticky?: boolean;
  class?: string;
}

export interface AppBlockTileComponentProps extends AppBlockTileData {
  columnNumber: number;
  blockNumber: number;
}

const backgroundThemeClassMap: Record<ThemeColor, { light: string; dark: string }> = {
  blue: { light: "bg-blue-100", dark: "dark:bg-blue-950" },
  red: { light: "bg-red-100", dark: "dark:bg-red-950" },
  green: { light: "bg-green-100", dark: "dark:bg-green-950" },
  yellow: { light: "bg-yellow-100", dark: "dark:bg-yellow-950" },
  purple: { light: "bg-purple-100", dark: "dark:bg-purple-950" },
  pink: { light: "bg-pink-100", dark: "dark:bg-pink-950" },
  indigo: { light: "bg-indigo-100", dark: "dark:bg-indigo-950" },
  gray: { light: "bg-gray-100", dark: "dark:bg-gray-950" },
  transparent: { light: "bg-transparent", dark: "dark:bg-transparent" },
};

const foregroundThemeClassMap: Record<ForegroundThemeColor, { light: string; dark: string }> = {
  blue: { light: "text-blue-700", dark: "dark:text-blue-200" },
  red: { light: "text-red-700", dark: "dark:text-red-200" },
  green: { light: "text-green-700", dark: "dark:text-green-200" },
  yellow: { light: "text-yellow-700", dark: "dark:text-yellow-200" },
  purple: { light: "text-purple-700", dark: "dark:text-purple-200" },
  pink: { light: "text-pink-700", dark: "dark:text-pink-200" },
  indigo: { light: "text-indigo-700", dark: "dark:text-indigo-200" },
  gray: { light: "text-gray-700", dark: "dark:text-gray-200" },
  transparent: { light: "text-gray-700", dark: "dark:text-gray-200" },
  white: { light: "text-white", dark: "dark:text-white" },
};

export const AppBlockTile = component$<AppBlockTileComponentProps>((props) => {
  const {
    richText,
    backgroundTheme = "gray",
    foregroundTheme = "gray",
    icon,
    sticky = false,
    class: className,
    animation = "fade-up",
    animationPlacement = "center-center",
    animationEasing = "ease-in-out-quad",
    columnNumber,
    blockNumber,
  } = props;

  if (!richText?.root) {
    return null;
  }

  const backgroundClasses = backgroundThemeClassMap[backgroundTheme];
  const foregroundClasses = foregroundThemeClassMap[foregroundTheme];

  const combinedClasses = [
    "app-tile",
    "p-4",
    "rounded-lg",
    backgroundClasses.light,
    backgroundClasses.dark,
    foregroundClasses.light,
    foregroundClasses.dark,
    sticky ? "sticky top-0" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Render icon if provided
  const renderIcon = () => {
    if (!icon) return null;
    const Icon = getIcon(icon.name);
    const iconColorClasses = icon.color ? colorClassMap[icon.color] : "";
    const iconSizeClasses = sizeClassMap[icon.size ?? 6];
    const iconClasses = `${iconSizeClasses} ${iconColorClasses} mb-3`.trim();
    return <Icon class={iconClasses} />;
  };

  // Don't animate sticky tiles - animations interfere with the stacking effect
  const aosProps = sticky ? {} : {
    "data-aos": animation,
    "data-aos-placement": animationPlacement,
    "data-aos-easing": animationEasing,
    "data-aos-delay": (columnNumber * blockNumber) * 50,
  };

  return (
    <div class={combinedClasses} {...aosProps}>
      {renderIcon()}
      <AppBlockRichText columnNumber={columnNumber} blockNumber={blockNumber} richText={richText} />
    </div>
  );
});

