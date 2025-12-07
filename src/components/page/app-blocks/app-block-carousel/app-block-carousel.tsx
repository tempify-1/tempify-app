import { component$ } from "@builder.io/qwik";
import type { AnimationProps } from "../animation-types";
import { AppBlockCard, type AppBlockCardData } from "../app-block-card/app-block-card";
import { Carousel, type CarouselProps } from "~/components/ui/carousel/carousel";

/**
 * Data props for Carousel block (used in content definitions)
 * Extends CarouselProps (excluding class which we handle separately) and AnimationProps
 */
export interface AppBlockCarouselData extends AnimationProps, Omit<CarouselProps, "class"> {
  /** Array of card data to display in the carousel */
  cards: AppBlockCardData[];
  /** Custom class for the carousel container */
  class?: string;
}

/**
 * Full props for Carousel component (includes runtime-injected props)
 */
export interface AppBlockCarouselProps extends AppBlockCarouselData {
  columnNumber: number;
  blockNumber: number;
}

/**
 * AppBlockCarousel component that renders cards in a horizontal scrolling carousel
 * Uses the Carousel component with scroll-snap and Intersection Observer
 */
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

