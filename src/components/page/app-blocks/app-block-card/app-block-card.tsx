import { component$ } from "@builder.io/qwik";
import { Card } from "flowbite-qwik";
import type { AnimationProps } from "../animation-types";
import { AppBlockMedia, type AppBlockMediaData } from "../app-block-media/app-block-media";
import { AppBlockRichText, type PayloadRichText } from "../app-block-rich-text/app-block-rich-text";

export interface AppBlockCardData extends AnimationProps {
  blockId?: string;
  horizontal?: boolean;
  href?: string;
  media?: AppBlockMediaData;
  richText?: PayloadRichText;
  sticky?: boolean;
  class?: string;
}

export interface AppBlockCardProps extends AppBlockCardData {
  columnNumber: number;
  blockNumber: number;
}

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

