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

