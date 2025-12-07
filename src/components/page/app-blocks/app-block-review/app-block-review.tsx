import { component$ } from "@builder.io/qwik";
import { Rating, type RatingSize } from "flowbite-qwik";
import type { AnimationProps } from "../animation-types";

export interface AppBlockReviewData extends AnimationProps {
  rating?: number;
  scale?: number;
  size?: RatingSize;
  reviewLink?: {
    href: string;
    text: string;
  };
  class?: string;
}

export interface AppBlockReviewComponentProps extends AppBlockReviewData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockReview = component$<AppBlockReviewComponentProps>((props) => {
  const {
    rating,
    scale = 5,
    size = "md",
    reviewLink,
    class: className,
    animation = "fade-up",
    animationPlacement = "center-center",
    animationEasing = "ease-in-out-quad",
    columnNumber,
    blockNumber,
  } = props;

  const defaultClass = "app-block-review";
  const combinedClasses = `${defaultClass} ${className || ""}`.trim();

  return (
    <div class={combinedClasses} data-aos={animation} data-aos-placement={animationPlacement} data-aos-easing={animationEasing} data-aos-delay={(columnNumber * blockNumber) * 50}>
      <Rating
        rating={rating}
        scale={scale}
        size={size}
        reviewLink={reviewLink}
      />
    </div>
  );
});

