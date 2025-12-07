import { component$ } from "@builder.io/qwik";
import { AppBlockRichText, type PayloadRichText } from "../app-block-rich-text/app-block-rich-text";
import { getAosProps, type AnimationProps } from "../animation-types";
import { getIcon, type FlowbiteIconName } from "~/utils/icon-utility";
import { type IconColor, type IconSize, colorClassMap, sizeClassMap } from "../app-block-icon/app-block-icon";
import type { ThemeColor, ForegroundThemeColor } from "../../types/theme-types";
import { blockBackgroundThemeClassMap, foregroundThemeClassMap } from "../../types/theme-types";

export interface TileIconConfig {
  name: FlowbiteIconName;
  color?: IconColor;
  size?: IconSize;
}

export interface AppBlockTileData extends AnimationProps {
  blockId?: string;
  richText?: PayloadRichText;
  backgroundTheme?: ThemeColor;
  foregroundTheme?: ForegroundThemeColor;
  icon?: TileIconConfig;
  sticky?: boolean;
  class?: string;
}

export interface AppBlockTileProps extends AppBlockTileData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockTile = component$<AppBlockTileProps>((props) => {
  const {
    richText,
    backgroundTheme = "gray",
    foregroundTheme = "gray",
    icon,
    sticky = false,
    class: className,
    animation,
    animationPlacement,
    animationEasing,
    columnNumber,
    blockNumber,
  } = props;

  if (!richText?.root) {
    return null;
  }

  const backgroundClasses = blockBackgroundThemeClassMap[backgroundTheme];
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
  const aosProps = sticky ? {} : getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  return (
    <div class={combinedClasses} {...aosProps}>
      {renderIcon()}
      <AppBlockRichText columnNumber={columnNumber} blockNumber={blockNumber} richText={richText} />
    </div>
  );
});

