import { component$ } from "@builder.io/qwik";
import { Avatar } from "flowbite-qwik";
import type { AnimationProps } from "../animation-types";

type AvatarColor = 'failure' | 'gray' | 'info' | 'pink' | 'purple' | 'success' | 'warning';
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'away' | 'busy' | 'offline' | 'online';
type AvatarStatusPosition = 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right';

/**
 * Data props for Avatar block (used in content definitions)
 * Based on flowbite-qwik Avatar component
 */
export interface AppBlockAvatarData extends AnimationProps {
  /** Alt text for the avatar image */
  alt?: string;
  /** Whether the avatar should have a border */
  bordered?: boolean;
  /** Image URL for the avatar */
  img?: string;
  /** Border/ring color for the avatar */
  color?: AvatarColor;
  /** Whether the avatar should be rounded (circular) */
  rounded?: boolean;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Whether the avatar is part of a stacked group */
  stacked?: boolean;
  /** Status indicator (online, offline, busy, away) */
  status?: AvatarStatus;
  /** Position of the status indicator */
  statusPosition?: AvatarStatusPosition;
  /** Initials to display as placeholder when no image is provided */
  placeholderInitials?: string;
  /** Custom class for the avatar */
  class?: string;
}

/**
 * Full props for Avatar component (includes runtime-injected props)
 */
export interface AppBlockAvatarProps extends AppBlockAvatarData {
  columnNumber: number;
  blockNumber: number;
}

/**
 * AppBlockAvatar component that renders a flowbite-qwik Avatar
 * with support for images, initials placeholders, status indicators, and various sizes
 */
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

