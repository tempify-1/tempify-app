import { component$ } from "@builder.io/qwik";
import { Rating, type RatingSize } from "flowbite-qwik";
import { getAosProps, type AnimationProps } from "../animation-types";

export interface AppBlockReviewData extends AnimationProps {
  blockId?: string;
  rating?: number;
  scale?: number;
  size?: RatingSize;
  reviewLink?: {
    href: string;
    text: string;
  };
  class?: string;
}

export interface AppBlockReviewProps extends AppBlockReviewData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockReview = component$<AppBlockReviewProps>((props) => {
  const {
    rating,
    scale = 5,
    size = "md",
    reviewLink,
    class: className,
    animation,
    animationPlacement,
    animationEasing,
    columnNumber,
    blockNumber,
  } = props;

  const defaultClass = "app-block-review";
  const combinedClasses = `${defaultClass} ${className || ""}`.trim();
  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  return (
    <div class={combinedClasses} {...aosProps}>
      <Rating
        rating={rating}
        scale={scale}
        size={size}
        reviewLink={reviewLink}
      />
    </div>
  );
});

