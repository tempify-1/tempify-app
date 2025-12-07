import type { AppBackgroundProps } from "../app-background/app-background";
import type { ThemeColor, ForegroundThemeColor, GutterDirection } from "./theme-types";

export type { ContentBlock } from "./block-types";
import type { ContentBlock } from "./block-types";

export interface ColumnDefinition {
  contentBlocks: ContentBlock[];
  colSpan?: {'xs'?: number, 'sm'?: number, 'md'?: number, 'lg'?: number, 'xl'?: number, '2xl'?: number};
  class?: string;
}

export interface SectionProps {
  id?: string;
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
}

