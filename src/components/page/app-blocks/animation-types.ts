export type AnimationType =
  | 'none'
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade-up-right'
  | 'fade-up-left'
  | 'fade-down-right'
  | 'fade-down-left'
  | 'flip-up'
  | 'flip-down'
  | 'flip-left'
  | 'flip-right'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom-in'
  | 'zoom-in-up'
  | 'zoom-in-down'
  | 'zoom-in-left'
  | 'zoom-in-right'
  | 'zoom-out'
  | 'zoom-out-up'
  | 'zoom-out-down'
  | 'zoom-out-left'
  | 'zoom-out-right';

export type AnimationPlacement =
  | 'top-bottom'
  | 'top-center'
  | 'top-top'
  | 'center-bottom'
  | 'center-center'
  | 'center-top'
  | 'bottom-bottom'
  | 'bottom-center'
  | 'bottom-top';

export type AnimationEasing =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'ease-in-back'
  | 'ease-out-back'
  | 'ease-in-out-back'
  | 'ease-in-sine'
  | 'ease-out-sine'
  | 'ease-in-out-sine'
  | 'ease-in-quad'
  | 'ease-out-quad'
  | 'ease-in-out-quad'
  | 'ease-in-cubic'
  | 'ease-out-cubic'
  | 'ease-in-out-cubic'
  | 'ease-in-quart'
  | 'ease-out-quart'
  | 'ease-in-out-quart';

export interface AnimationProps {
  animation?: AnimationType;
  animationPlacement?: AnimationPlacement;
  animationEasing?: AnimationEasing;
}

export const ANIMATION_DELAY_MULTIPLIER = 50;

export interface AosDataAttributes {
  "data-aos"?: AnimationType;
  "data-aos-placement"?: AnimationPlacement;
  "data-aos-easing"?: AnimationEasing;
  "data-aos-delay"?: number;
}

export interface GetAosPropsParams extends AnimationProps {
  columnNumber: number;
  blockNumber: number;
  disabled?: boolean;
}

export const getAosProps = (params: GetAosPropsParams): AosDataAttributes => {
  const {
    animation = "fade-up",
    animationPlacement = "center-center",
    animationEasing = "ease-in-out-quad",
    columnNumber,
    blockNumber,
    disabled = false,
  } = params;

  if (disabled || animation === "none") {
    return {};
  }

  return {
    "data-aos": animation,
    "data-aos-placement": animationPlacement,
    "data-aos-easing": animationEasing,
    "data-aos-delay": columnNumber * blockNumber * ANIMATION_DELAY_MULTIPLIER,
  };
};
