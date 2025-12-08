import { component$ } from "@builder.io/qwik";
import { Avatar } from "flowbite-qwik";
import { getAosProps, type AnimationProps } from "../animation-types";

type AvatarColor = 'failure' | 'gray' | 'info' | 'pink' | 'purple' | 'success' | 'warning';
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'away' | 'busy' | 'offline' | 'online';
type AvatarStatusPosition = 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right';

export interface AppBlockAvatarData extends AnimationProps {
  blockId?: string;
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
    blockId,
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
    animation,
    animationPlacement,
    animationEasing,
    columnNumber,
    blockNumber,
  } = props;

  const defaultClass = "avatar";
  const combinedClasses = `${defaultClass} ${className || ""}`.trim();
  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  return (
    <div id={blockId} {...aosProps}>
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

