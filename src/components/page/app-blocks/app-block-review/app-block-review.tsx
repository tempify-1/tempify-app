import { component$ } from "@builder.io/qwik";
import { Rating, type RatingSize } from "flowbite-qwik";
import type { AnimationProps } from "../animation-types";

/** Data props for Review block (used in content definitions) */
export interface AppBlockReviewData extends AnimationProps {
  /** Rating value (e.g., 4.5 out of 5) */
  rating?: number;
  /** Scale for the rating (default: 5) */
  scale?: number;
  /** Size of the rating stars */
  size?: RatingSize;
  /** Optional review link */
  reviewLink?: {
    href: string;
    text: string;
  };
  /** Additional CSS classes */
  class?: string;
}

/** Full props for Review component (includes runtime-injected props) */
export interface AppBlockReviewComponentProps extends AppBlockReviewData {
  /** Column number from parent */
  columnNumber: number;
  /** Block number (1-indexed) */
  blockNumber: number;
}

/**
 * AppBlockReview component that wraps Flowbite's Rating component
 * Displays a star rating with optional review link
 */
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

