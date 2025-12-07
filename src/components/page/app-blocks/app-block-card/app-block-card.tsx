import { component$ } from "@builder.io/qwik";
import { Card } from "flowbite-qwik";
import type { AnimationProps } from "../animation-types";
import { AppBlockMedia, type AppBlockMediaData } from "../app-block-media/app-block-media";
import { AppBlockRichText, type PayloadRichText } from "../app-block-rich-text/app-block-rich-text";

/**
 * Data props for Card block (used in content definitions)
 * Based on flowbite-qwik Card component
 */
export interface AppBlockCardData extends AnimationProps {
  /** Whether the card should be displayed horizontally */
  horizontal?: boolean;
  /** Optional link URL - makes the card clickable */
  href?: string;
  /** Media data for the card image - uses AppBlockMediaData for consistency with Payload CMS */
  media?: AppBlockMediaData;
  /** Rich text content for the card body */
  richText?: PayloadRichText;
  /** Whether the card should be sticky (enables card stacking effect) */
  sticky?: boolean;
  /** Custom class for the card */
  class?: string;
}

/**
 * Full props for Card component (includes runtime-injected props)
 */
export interface AppBlockCardProps extends AppBlockCardData {
  columnNumber: number;
  blockNumber: number;
}

/**
 * AppBlockCard component that renders a flowbite-qwik Card
 * with optional media (using AppBlockMedia) and rich text content
 */
export const AppBlockCard = component$<AppBlockCardProps>((props) => {
  const {
    horizontal = false,
    href,
    media,
    richText,
    sticky = false,
    class: className,
    animation = "fade-up",
    animationPlacement = "center-center",
    animationEasing = "ease-in-out-quad",
    columnNumber,
    blockNumber,
  } = props;

  const stickyClass = sticky ? "sticky top-0" : "";

  // Build imgAs prop using AppBlockMedia if media is provided
  const renderMedia = () => {
    if (!media) return undefined;

    return (
      <AppBlockMedia
        {...media}
        columnNumber={columnNumber}
        blockNumber={blockNumber}
        // Override animation to none since parent card handles animation
        animation={'none'}
      />
    );
  };

  // Don't animate sticky cards - animations interfere with the stacking effect
  const aosProps = sticky ? {} : {
    "data-aos": animation,
    "data-aos-placement": animationPlacement,
    "data-aos-easing": animationEasing,
    "data-aos-delay": (columnNumber * blockNumber) * 50,
  };

  return (
    <div {...aosProps} class={stickyClass || undefined}>
      <Card
        horizontal={horizontal}
        href={href}
        imgAs={renderMedia()}
        class={className}
      >
        {richText && (
          <AppBlockRichText
            richText={richText}
            columnNumber={columnNumber}
            blockNumber={blockNumber}
            // Override animation to none since parent card handles animation
            animation='none'
          />
        )}
      </Card>
    </div>
  );
});

