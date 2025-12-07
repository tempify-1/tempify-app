import { component$ } from "@builder.io/qwik";
import { Avatar } from "flowbite-qwik";
import type { AnimationProps } from "../animation-types";

type AvatarColor = 'failure' | 'gray' | 'info' | 'pink' | 'purple' | 'success' | 'warning';
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'away' | 'busy' | 'offline' | 'online';
type AvatarStatusPosition = 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right';

export interface AppBlockAvatarData extends AnimationProps {
  alt?: string;
  bordered?: boolean;
  img?: string;
  color?: AvatarColor;
  rounded?: boolean;
  size?: AvatarSize;
  stacked?: boolean;
  status?: AvatarStatus;
  statusPosition?: AvatarStatusPosition;
  placeholderInitials?: string;
  class?: string;
}

export interface AppBlockAvatarProps extends AppBlockAvatarData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockAvatar = component$<AppBlockAvatarProps>((props) => {
  const {
    alt,
    bordered,
    img,
    color,
    rounded,
    size,
    stacked,
    status,
    statusPosition,
    placeholderInitials,
    class: className,
    animation = "fade-up",
    animationPlacement = "center-center",
    animationEasing = "ease-in-out-quad",
    columnNumber,
    blockNumber,
  } = props;

  const defaultClass = "avatar";
  const combinedClasses = `${defaultClass} ${className || ""}`.trim();

  return (
    <div
      data-aos={animation}
      data-aos-placement={animationPlacement}
      data-aos-easing={animationEasing}
      data-aos-delay={(columnNumber * blockNumber) * 50}
    >
      <Avatar
        alt={alt}
        bordered={bordered}
        img={img}
        color={color}
        rounded={rounded}
        size={size}
        stacked={stacked}
        status={status}
        statusPosition={statusPosition}
        placeholderInitials={placeholderInitials}
        class={combinedClasses}
      />
    </div>
  );
});

