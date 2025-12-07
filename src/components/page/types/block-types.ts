import type { AppBlockEyebrowData } from "../app-blocks/app-block-eyebrow/app-block-eyebrow";
import type { AppBlockHeadingData } from "../app-blocks/app-block-heading/app-block-heading";
import type { AppBlockMediaData } from "../app-blocks/app-block-media/app-block-media";
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

export interface AppBlockAccordionBlockProps extends AppBlockAccordionData {
  blockType: "accordion";
}

export interface AppBlockAvatarBlockProps extends AppBlockAvatarData {
  blockType: "avatar";
}

export interface AppBlockBadgeBlockProps extends AppBlockBadgeData {
  blockType: "badge";
}

export interface AppBlockBreadcrumbBlockProps extends AppBlockBreadcrumbData {
  blockType: "breadcrumb";
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

export interface AppBlockCardBlockProps extends AppBlockCardData {
  blockType: "card";
}

export interface AppBlockCarouselBlockProps extends AppBlockCarouselData {
  blockType: "carousel";
}

export interface AppBlockEyebrowBlockProps extends AppBlockEyebrowData {
  blockType: "eyebrow";
}

export interface AppBlockHeadingBlockProps extends AppBlockHeadingData {
  blockType: "heading";
}

export interface AppBlockIconBlockProps extends AppBlockIconData {
  blockType: "icon";
}

export interface AppBlockLinkBlockProps extends AppBlockLinkData {
  blockType: "link";
}

export interface AppBlockLogoTickerBlockProps extends AppBlockLogoTickerData {
  blockType: "logoTicker";
}

export interface AppBlockMediaBlockProps extends AppBlockMediaData {
  blockType: "media";
}

export interface AppBlockReviewBlockProps extends AppBlockReviewData {
  blockType: "review";
}

export interface AppBlockRichTextBlockProps extends AppBlockRichTextData {
  blockType: "richText";
}

export interface AppBlockTabsBlockProps extends AppBlockTabsData {
  blockType: "tabs";
}

export interface AppBlockTileBlockProps extends AppBlockTileData {
  blockType: "tile";
}

export interface AppBlockTimelineBlockProps extends AppBlockTimelineData {
  blockType: "timeline";
}

export type ContentBlock =
  | AppBlockAccordionBlockProps
  | AppBlockAvatarBlockProps
  | AppBlockBadgeBlockProps
  | AppBlockBreadcrumbBlockProps
  | AppBlockButtonRowBlockProps
  | AppBlockButtonGroupBlockProps
  | AppBlockButtonGridBlockProps
  | AppBlockCardBlockProps
  | AppBlockCarouselBlockProps
  | AppBlockEyebrowBlockProps
  | AppBlockHeadingBlockProps
  | AppBlockIconBlockProps
  | AppBlockLinkBlockProps
  | AppBlockLogoTickerBlockProps
  | AppBlockMediaBlockProps
  | AppBlockReviewBlockProps
  | AppBlockRichTextBlockProps
  | AppBlockTabsBlockProps
  | AppBlockTileBlockProps
  | AppBlockTimelineBlockProps;

