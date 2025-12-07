import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./app-section.css?inline";
import { AppColumn } from "../app-column/app-column";
import type { AppBlockEyebrowData } from "../app-blocks/app-block-eyebrow/app-block-eyebrow";
import type { AppBlockHeadingData } from "../app-blocks/app-block-heading/app-block-heading";
import type { AppBlockMediaData } from "../app-blocks/app-block-media/app-block-media";
import { AppBackground, type AppBackgroundProps } from "../app-background/app-background";
import type { AppBlockRichTextData } from "../app-blocks/app-block-rich-text/app-block-rich-text";
import type { AppBlockButtonRowData } from "../app-blocks/app-block-button-row/app-block-button-row";
import type { AppBlockButtonGroupData } from "../app-blocks/app-block-button-group/app-block-button-group";
import type { AppBlockButtonGridData } from "../app-blocks/app-block-button-grid/app-block-button-grid";
import type { AppBlockBadgeData } from "../app-blocks/app-block-badge/app-block-badge";
import type { AppBlockAccordionData } from "../app-blocks/app-block-accordion/app-block-accordion";
import type { AppBlockTabsData } from "../app-blocks/app-block-tabs/app-block-tabs";
import type { AppBlockTileData } from "../app-blocks/app-block-tile/app-block-tile";
import type { AppBlockReviewData } from "../app-blocks/app-block-review/app-block-review";
import type { AppBlockIconData } from "../app-blocks/app-block-icon/app-block-icon";
import type { AppBlockBreadcrumbData } from "../app-blocks/app-block-breadcrumb/app-block-breadcrumb";
import type { AppBlockLogoTickerData } from "../app-blocks/app-block-logo-ticker/app-block-logo-ticker";
import type { AppBlockLinkData } from "../app-blocks/app-block-link/app-block-link";
import type { AppBlockCardData } from "../app-blocks/app-block-card/app-block-card";
import type { AppBlockCarouselData } from "../app-blocks/app-block-carousel/app-block-carousel";
import type { AppBlockAvatarData } from "../app-blocks/app-block-avatar/app-block-avatar";
import type { AppBlockTimelineData } from "../app-blocks/app-block-timeline/app-block-timeline";

/**
 * Standard Flowbite/Tailwind theme colors plus transparent
 */
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

/**
 * Foreground theme colors - includes white for overlay situations
 */
export type ForegroundThemeColor = ThemeColor | "white";

export type GutterSize = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type GutterDirection =
  | `horizontal-${GutterSize}`
  | `vertical-${GutterSize}`
  | `left-${GutterSize}`
  | `right-${GutterSize}`
  | `top-${GutterSize}`
  | `bottom-${GutterSize}`;

/**
 * Content block prop interfaces (using Data types - no runtime-injected props)
 */
export interface AppBlockAccordionProps extends AppBlockAccordionData {
  blockType: "accordion";
}

export interface AppBlockBadgeBlockProps extends AppBlockBadgeData {
  blockType: "badge";
}

export interface AppBlockButtonRowBlockProps extends AppBlockButtonRowData {
  blockType: "buttonRow";
}

export interface AppBlockButtonGroupBlockProps extends AppBlockButtonGroupData {
  blockType: "buttonGroup";
}

export interface AppBlockButtonGridBlockProps extends AppBlockButtonGridData {
  blockType: "buttonGrid";
}

export interface AppBlockMediaBlockProps extends AppBlockMediaData {
  blockType: "media";
}

export interface AppBlockRichTextBlockProps extends AppBlockRichTextData {
  blockType: "richText";
}

export interface AppBlockTabsBlockProps extends AppBlockTabsData {
  blockType: "tabs";
}

export interface AppBlockEyebrowBlockProps extends AppBlockEyebrowData {
  blockType: "eyebrow";
}

export interface AppBlockHeadingBlockProps extends AppBlockHeadingData {
  blockType: "heading";
}

export interface AppBlockTileBlockProps extends AppBlockTileData {
  blockType: "tile";
}

export interface AppBlockReviewBlockProps extends AppBlockReviewData {
  blockType: "review";
}

export interface AppBlockIconBlockProps extends AppBlockIconData {
  blockType: "icon";
}

export interface AppBlockBreadcrumbBlockProps extends AppBlockBreadcrumbData {
  blockType: "breadcrumb";
}

export interface AppBlockLogoTickerBlockProps extends AppBlockLogoTickerData {
  blockType: "logoTicker";
}

export interface AppBlockLinkBlockProps extends AppBlockLinkData {
  blockType: "link";
}

export interface AppBlockCardBlockProps extends AppBlockCardData {
  blockType: "card";
}

export interface AppBlockCarouselBlockProps extends AppBlockCarouselData {
  blockType: "carousel";
}

export interface AppBlockAvatarBlockProps extends AppBlockAvatarData {
  blockType: "avatar";
}

export interface AppBlockTimelineBlockProps extends AppBlockTimelineData {
  blockType: "timeline";
}

/**
 * Union type of all content blocks with discriminator
 */
export type ContentBlock =
  | AppBlockAccordionProps
  | AppBlockAvatarBlockProps
  | AppBlockBadgeBlockProps
  | AppBlockBreadcrumbBlockProps
  | AppBlockButtonRowBlockProps
  | AppBlockButtonGroupBlockProps
  | AppBlockButtonGridBlockProps
  | AppBlockCardBlockProps
  | AppBlockCarouselBlockProps
  | AppBlockIconBlockProps
  | AppBlockLinkBlockProps
  | AppBlockLogoTickerBlockProps
  | AppBlockTileBlockProps
  | AppBlockTimelineBlockProps
  | AppBlockEyebrowBlockProps
  | AppBlockHeadingBlockProps
  | AppBlockMediaBlockProps
  | AppBlockReviewBlockProps
  | AppBlockRichTextBlockProps
  | AppBlockTabsBlockProps;

/**
 * Column definition with content blocks
 */
export interface ColumnDefinition {
  contentBlocks: ContentBlock[];
  colSpan?: {'xs'?: number, 'sm'?: number, 'md'?: number, 'lg'?: number, 'xl'?: number, '2xl'?: number};
  class?: string;
}

/**
 * Props for the BlockSection component
 */
export interface SectionProps {
  tag?: "header" | "section" | "footer";
  backgroundTheme?: ThemeColor;
  foregroundTheme?: ForegroundThemeColor;
  gutter?: GutterDirection[];
  columnLayout?: {'xs': number, 'sm': number, 'md': number, 'lg': number, 'xl': number, '2xl':number};
  columns?: ColumnDefinition[];
  background?: AppBackgroundProps;
  height?: string;
  shape?: "round" | "rectangle";
  class?: string;
  [key: string]: any;
}

/**
 * Class maps for JIT-compatible Tailwind classes
 * Light mode uses lighter shades (100), dark mode uses darker shades (800)
 */
const backgroundThemeClassMap: Record<ThemeColor, { light: string; dark: string }> = {
  blue: { light: "bg-gradient-to-br from-blue-100 to-indigo-200", dark: "dark:from-blue-900 dark:to-indigo-950" },
  red: { light: "bg-gradient-to-br from-red-100 to-pink-200", dark: "dark:from-red-900 dark:to-pink-950" },
  green: { light: "bg-gradient-to-br from-green-100 to-blue-200", dark: "dark:from-green-900 dark:to-blue-950" },
  yellow: { light: "bg-gradient-to-br from-yellow-100 to-green-200", dark: "dark:from-yellow-900 dark:to-green-950" },
  purple: { light: "bg-gradient-to-br from-purple-100 to-pink-200", dark: "dark:from-purple-900 dark:to-pink-950" },
  pink: { light: "bg-gradient-to-br from-pink-100 to-red-200", dark: "dark:from-pink-900 dark:to-red-950" },
  indigo: { light: "bg-gradient-to-br from-indigo-100 to-purple-200", dark: "dark:from-indigo-900 dark:to-purple-950" },
  gray: { light: "bg-gradient-to-br from-gray-100 to-gray-200", dark: "dark:from-gray-900 dark:to-gray-950" },
  transparent: { light: "bg-transparent", dark: "dark:bg-transparent" },
};

const shapeClassMap = {
  round: "round-shape",
  rectangle: "rectangle-shape",
} as const;



export const AppSection = component$((props: SectionProps) => {
  useStyles$(styles);

  const {
    tag = "section",
    id = "app-section",
    class: classNames,
    height = "40vh",
    shape = "rectangle",
    backgroundTheme = "pink",
    foregroundTheme = "pink",
    gutter = ["horizontal-md", "vertical-md"],
    columnLayout = {xs:1, sm:1, md:2, lg:2, xl:2, '2xl': 2},
    columns,
    background,
    ...restProps
  } = props;

  const Tag = tag as any;

  // Get classes from maps using the prop values
  const shapeClass = shapeClassMap[shape];
  const backgroundThemeClasses = backgroundThemeClassMap[backgroundTheme];
  const backgroundThemeClass = `${backgroundThemeClasses.light} ${backgroundThemeClasses.dark}`;

  // Build CSS variables for grid columns
  const buildGridVariables = () => {
    if (!columnLayout) return "";

    const vars: string[] = [];

    if (columnLayout.xs) vars.push(`--section-grid-template-columns-xs: ${columnLayout.xs}`);
    if (columnLayout.sm) vars.push(`--section-grid-template-columns-sm: ${columnLayout.sm}`);
    if (columnLayout.md) vars.push(`--section-grid-template-columns-md: ${columnLayout.md}`);
    if (columnLayout.lg) vars.push(`--section-grid-template-columns-lg: ${columnLayout.lg}`);
    if (columnLayout.xl) vars.push(`--section-grid-template-columns-xl: ${columnLayout.xl}`);
    if (columnLayout['2xl']) vars.push(`--section-grid-template-columns-2xl: ${columnLayout['2xl']}`);

    return vars.join('; ');
  };

  const gridVariables = buildGridVariables();

  // Add text color class for white foreground
  const foregroundColorClass = foregroundTheme === "white" ? "text-white" : "";

  // Combine all classes
  const combinedClasses = `${backgroundThemeClass} ${shapeClass} ${foregroundColorClass} ${classNames || ""}`.trim();

  // Build padding from gutter array using CSS variables
  const buildPadding = () => {
    // Parse gutter array into a map of direction -> size
    const gutterMap: Record<string, string> = {};

    gutter.forEach((item) => {
      const [direction, size] = item.split('-') as [string, GutterSize];
      gutterMap[direction] = size;
    });

    // Build padding parts (top, right, bottom, left)
    const parts: string[] = [];

    // Top (individual side overrides vertical)
    const topSize = gutterMap.top ?? gutterMap.vertical ?? "none";
    parts.push(`var(--section-vertical-gutter-${topSize})`);

    // Right (individual side overrides horizontal)
    const rightSize = gutterMap.right ?? gutterMap.horizontal ?? "none";
    parts.push(`var(--section-horizontal-gutter-${rightSize})`);

    // Bottom (individual side overrides vertical)
    const bottomSize = gutterMap.bottom ?? gutterMap.vertical ?? "none";
    parts.push(`var(--section-vertical-gutter-${bottomSize})`);

    // Left (individual side overrides horizontal)
    const leftSize = gutterMap.left ?? gutterMap.horizontal ?? "none";
    parts.push(`calc(var(--inline-sidebar-width,0px) + var(--section-horizontal-gutter-${leftSize}))`);

    return parts.join(' ');
  };

  // Hue twist map for accent gradients (matches background theme map, uses only defined colors)
  const accentHueTwistMap: Record<string, string> = {
    blue: "indigo",
    red: "pink",
    green: "blue",
    yellow: "green",
    purple: "pink",
    pink: "red",
    indigo: "purple",
    gray: "gray",
  };

  // Build foreground accent gradient colors - handle special cases for white and transparent
  const getForegroundAccentColors = () => {
    if (foregroundTheme === "white") {
      return {
        lightFrom: "#ffffff",
        lightTo: "#ffffff",
        darkFrom: "#ffffff",
        darkTo: "#ffffff",
      };
    }
    if (foregroundTheme === "transparent") {
      return {
        lightFrom: "var(--color-gray-500)",
        lightTo: "var(--color-gray-600)",
        darkFrom: "var(--color-gray-500)",
        darkTo: "var(--color-gray-600)",
      };
    }
    const toColor = accentHueTwistMap[foregroundTheme] || foregroundTheme;
    return {
      lightFrom: `var(--color-${foregroundTheme}-400)`,
      lightTo: `var(--color-${toColor}-600)`,
      darkFrom: `var(--color-${foregroundTheme}-600)`,
      darkTo: `var(--color-${toColor}-400)`,
    };
  };

  const accentColors = getForegroundAccentColors();

  // Build inline styles including grid variables
  const inlineStyles = `--section-accent-light-from: ${accentColors.lightFrom}; --section-accent-light-to: ${accentColors.lightTo}; --section-accent-dark-from: ${accentColors.darkFrom}; --section-accent-dark-to: ${accentColors.darkTo}; min-height: ${height}; padding: ${buildPadding()}; ${gridVariables}`;

  return (
    <Tag
      {...restProps}
      id={id}
      style={inlineStyles}
      class={`app-section ` +combinedClasses}
    >
      {columns && columns.length > 0 && (
        <div class="section-grid gap-4">
          {columns.map((column, index) => (
            <AppColumn
              key={`column-${index}`}
              contentBlocks={column.contentBlocks}
              colSpan={column.colSpan}
              class={column.class}
              columnNumber={index + 1}
            />
          ))}
        </div>
     )}
      {background && <AppBackground {...background} />}
    </Tag>
  );
});

/* aos animation column * block = delay */
