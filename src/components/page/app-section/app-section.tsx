import { component$, useStyles$, type FunctionComponent } from "@builder.io/qwik";
import styles from "./app-section.css?inline";
import { AppColumn } from "../app-column/app-column";
import { AppBackground } from "../app-background/app-background";
import type { GutterSize } from "../types/theme-types";
import { sectionBackgroundThemeClassMap } from "../types/theme-types";
import type { SectionProps } from "../types/section-types";

type DynamicTagComponent = FunctionComponent<Record<string, unknown>>;

export type { ThemeColor, ForegroundThemeColor, GutterSize, GutterDirection } from "../types/theme-types";
export type { ContentBlock, ColumnDefinition, SectionProps } from "../types/section-types";

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

  const Tag = tag as unknown as DynamicTagComponent;

  // Get classes from maps using the prop values
  const shapeClass = shapeClassMap[shape];
  const backgroundThemeClasses = sectionBackgroundThemeClassMap[backgroundTheme];
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
