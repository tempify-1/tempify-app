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

export type GutterSize = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type GutterDirection =
  | `horizontal-${GutterSize}`
  | `vertical-${GutterSize}`
  | `left-${GutterSize}`
  | `right-${GutterSize}`
  | `top-${GutterSize}`
  | `bottom-${GutterSize}`;

export interface ThemeClassPair {
  light: string;
  dark: string;
}

// Section-level gradient backgrounds
export const sectionBackgroundThemeClassMap: Record<ThemeColor, ThemeClassPair> = {
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

// Block-level solid backgrounds
export const blockBackgroundThemeClassMap: Record<ThemeColor, ThemeClassPair> = {
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

// Foreground/text colors
export const foregroundThemeClassMap: Record<ForegroundThemeColor, ThemeClassPair> = {
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
