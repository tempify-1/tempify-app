import { component$ } from "@builder.io/qwik";
import { getAosProps, type AnimationProps } from "../animation-types";
import { AppBlockCard, type AppBlockCardData } from "../app-block-card/app-block-card";
import { Carousel, type CarouselProps } from "~/components/ui/carousel/carousel";

export interface AppBlockCarouselData extends AnimationProps, Omit<CarouselProps, "class"> {
  blockId?: string;
  cards: AppBlockCardData[];
  class?: string;
}

export interface AppBlockCarouselProps extends AppBlockCarouselData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockCarousel = component$<AppBlockCarouselProps>((props) => {
  const {
    blockId,
    cards,
    showArrows = true,
    showDots = true,
    gap = 16,
    snapAlign = "start",
    visibilityThreshold = 0.5,
    ariaLabel = "Card carousel",
    class: className,
    animation,
    animationPlacement,
    animationEasing,
    columnNumber,
    blockNumber,
  } = props;

  if (!cards || cards.length === 0) {
    return null;
  }

  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  return (
    <div id={blockId} {...aosProps}>
      <Carousel
        showArrows={showArrows}
        showDots={showDots}
        gap={gap}
        snapAlign={snapAlign}
        visibilityThreshold={visibilityThreshold}
        ariaLabel={ariaLabel}
        class={className}
      >
        {cards.map((card, index) => (
          <AppBlockCard
            key={index}
            {...card}
            columnNumber={columnNumber}
            blockNumber={index}
            // Override animation since parent carousel handles it
            animation={undefined}
          />
        ))}
      </Carousel>
    </div>
  );
});

