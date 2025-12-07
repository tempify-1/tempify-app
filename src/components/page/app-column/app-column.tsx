import { component$, type Component } from "@builder.io/qwik";
import { AppBlockHeading } from "../app-blocks/app-block-heading/app-block-heading";
import { AppBlockEyebrow } from "../app-blocks/app-block-eyebrow/app-block-eyebrow";
import { AppBlockBadge } from "../app-blocks/app-block-badge/app-block-badge";
import { AppBlockButtonRow } from "../app-blocks/app-block-button-row/app-block-button-row";
import { AppBlockButtonGroup } from "../app-blocks/app-block-button-group/app-block-button-group";
import { AppBlockButtonGrid } from "../app-blocks/app-block-button-grid/app-block-button-grid";
import { AppBlockRichText } from "../app-blocks/app-block-rich-text/app-block-rich-text";
import { AppBlockAccordion } from "../app-blocks/app-block-accordion/app-block-accordion";
import { AppBlockMedia } from "../app-blocks/app-block-media/app-block-media";
import { AppBlockTabs } from "../app-blocks/app-block-tabs/app-block-tabs";
import { AppBlockTile } from "../app-blocks/app-block-tile/app-block-tile";
import { AppBlockReview } from "../app-blocks/app-block-review/app-block-review";
import { AppBlockIcon } from "../app-blocks/app-block-icon/app-block-icon";
import { AppBlockBreadcrumb } from "../app-blocks/app-block-breadcrumb/app-block-breadcrumb";
import { AppBlockLogoTicker } from "../app-blocks/app-block-logo-ticker/app-block-logo-ticker";
import { AppBlockLink } from "../app-blocks/app-block-link/app-block-link";
import { AppBlockCard } from "../app-blocks/app-block-card/app-block-card";
import { AppBlockCarousel } from "../app-blocks/app-block-carousel/app-block-carousel";
import { AppBlockAvatar } from "../app-blocks/app-block-avatar/app-block-avatar";
import { AppBlockTimeline } from "../app-blocks/app-block-timeline/app-block-timeline";
import type { ContentBlock } from "../types/block-types";

type BlockType = ContentBlock["blockType"];

const blockRegistry: Record<BlockType, Component<any>> = {
  accordion: AppBlockAccordion,
  avatar: AppBlockAvatar,
  badge: AppBlockBadge,
  breadcrumb: AppBlockBreadcrumb,
  buttonRow: AppBlockButtonRow,
  buttonGroup: AppBlockButtonGroup,
  buttonGrid: AppBlockButtonGrid,
  card: AppBlockCard,
  carousel: AppBlockCarousel,
  eyebrow: AppBlockEyebrow,
  heading: AppBlockHeading,
  icon: AppBlockIcon,
  link: AppBlockLink,
  logoTicker: AppBlockLogoTicker,
  media: AppBlockMedia,
  review: AppBlockReview,
  richText: AppBlockRichText,
  tabs: AppBlockTabs,
  tile: AppBlockTile,
  timeline: AppBlockTimeline,
};

export interface AppColumnProps {
  contentBlocks?: ContentBlock[];
  colSpan?: {'xs'?: number, 'sm'?: number, 'md'?: number, 'lg'?: number, 'xl'?: number, '2xl'?: number};
  columnNumber:number;
  class?: string;
}

export const AppColumn = component$((props: AppColumnProps) => {
  const { contentBlocks, colSpan, columnNumber, class: className } = props;

  // Map of span values to Tailwind classes (needed for JIT compilation)
  const colSpanClassMap: Record<number, string> = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
  };

  const breakpointColSpanClassMap: Record<string, Record<number, string>> = {
    sm: {
      1: 'sm:col-span-1',
      2: 'sm:col-span-2',
      3: 'sm:col-span-3',
      4: 'sm:col-span-4',
      5: 'sm:col-span-5',
      6: 'sm:col-span-6',
      7: 'sm:col-span-7',
      8: 'sm:col-span-8',
      9: 'sm:col-span-9',
      10: 'sm:col-span-10',
      11: 'sm:col-span-11',
      12: 'sm:col-span-12',
    },
    md: {
      1: 'md:col-span-1',
      2: 'md:col-span-2',
      3: 'md:col-span-3',
      4: 'md:col-span-4',
      5: 'md:col-span-5',
      6: 'md:col-span-6',
      7: 'md:col-span-7',
      8: 'md:col-span-8',
      9: 'md:col-span-9',
      10: 'md:col-span-10',
      11: 'md:col-span-11',
      12: 'md:col-span-12',
    },
    lg: {
      1: 'lg:col-span-1',
      2: 'lg:col-span-2',
      3: 'lg:col-span-3',
      4: 'lg:col-span-4',
      5: 'lg:col-span-5',
      6: 'lg:col-span-6',
      7: 'lg:col-span-7',
      8: 'lg:col-span-8',
      9: 'lg:col-span-9',
      10: 'lg:col-span-10',
      11: 'lg:col-span-11',
      12: 'lg:col-span-12',
    },
    xl: {
      1: 'xl:col-span-1',
      2: 'xl:col-span-2',
      3: 'xl:col-span-3',
      4: 'xl:col-span-4',
      5: 'xl:col-span-5',
      6: 'xl:col-span-6',
      7: 'xl:col-span-7',
      8: 'xl:col-span-8',
      9: 'xl:col-span-9',
      10: 'xl:col-span-10',
      11: 'xl:col-span-11',
      12: 'xl:col-span-12',
    },
    '2xl': {
      1: '2xl:col-span-1',
      2: '2xl:col-span-2',
      3: '2xl:col-span-3',
      4: '2xl:col-span-4',
      5: '2xl:col-span-5',
      6: '2xl:col-span-6',
      7: '2xl:col-span-7',
      8: '2xl:col-span-8',
      9: '2xl:col-span-9',
      10: '2xl:col-span-10',
      11: '2xl:col-span-11',
      12: '2xl:col-span-12',
    },
  };

  // Build colSpan classes for each breakpoint
  const buildColSpanClasses = () => {
    if (!colSpan) return "";

    const classes: string[] = [];

    // Handle xs (no prefix)
    if (colSpan.xs !== undefined && colSpanClassMap[colSpan.xs]) {
      classes.push(colSpanClassMap[colSpan.xs]);
    }

    // Handle other breakpoints
    const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
    breakpoints.forEach((bp) => {
      const span = colSpan[bp];
      if (span !== undefined && breakpointColSpanClassMap[bp]?.[span]) {
        classes.push(breakpointColSpanClassMap[bp][span]);
      }
    });

    return classes.join(' ');
  };

  const colSpanClasses = buildColSpanClasses();

  const renderContentBlock = (block: ContentBlock, index: number) => {
    const BlockComponent = blockRegistry[block.blockType];
    if (!BlockComponent) return null;
    return (
      <BlockComponent
        key={`block-${index}`}
        {...block}
        columnNumber={columnNumber}
        blockNumber={index + 1}
      />
    );
  };

  const combinedClasses = `flex flex-col gap-2 ${colSpanClasses} ${className || ""}`.trim();

  return (
    <div class={combinedClasses}>
      {contentBlocks && contentBlocks.length > 0 ? (
        contentBlocks.map((block, index) => renderContentBlock(block, index))
      ) : null}
    </div>
  );
});
