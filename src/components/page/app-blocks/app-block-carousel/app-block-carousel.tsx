import { component$ } from "@builder.io/qwik";
import type { AnimationProps } from "../animation-types";
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
    cards,
    showArrows = true,
    showDots = true,
    gap = 16,
    snapAlign = "start",
    visibilityThreshold = 0.5,
    ariaLabel = "Card carousel",
    class: className,
    animation = "fade-up",
    animationPlacement = "center-center",
    animationEasing = "ease-in-out-quad",
    columnNumber,
    blockNumber,
  } = props;

  if (!cards || cards.length === 0) {
    return null;
  }

  const aosProps = {
    "data-aos": animation,
    "data-aos-placement": animationPlacement,
    "data-aos-easing": animationEasing,
    "data-aos-delay": columnNumber * blockNumber * 50,
  };

  return (
    <div {...aosProps}>
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

