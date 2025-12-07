import { component$ } from "@builder.io/qwik";
import { Badge } from "flowbite-qwik";
import type { AnimationProps } from "../animation-types";
import { getIcon, type FlowbiteIconName } from "~/utils/icon-utility";

type BadgeType = 'blue' | 'dark' | 'green' | 'red' | 'yellow' | 'indigo' | 'purple' | 'pink' | 'default';
type BadgeSize = 'xs' | 'sm';

/** Data props for Badge block (used in content definitions) */
export interface AppBlockBadgeData extends AnimationProps {
  content: string;
  type?: BadgeType;
  size?: BadgeSize;
  bordered?: boolean;
  href?: string;
  icon?: FlowbiteIconName;
  class?: string;
}

/** Full props for Badge component (includes runtime-injected props) */
export interface AppBlockBadgeProps extends AppBlockBadgeData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockBadge = component$<AppBlockBadgeProps>((props) => {
  const { class: className, icon, animation = "fade-up", animationPlacement = "center-center", animationEasing = "ease-in-out-quad", columnNumber, blockNumber, ...restProps } = props;

  const defaultClass = "badge";
  const combinedClasses = `${defaultClass} ${className || ""}`.trim();
  const IconComponent = icon ? getIcon(icon) : undefined;

  return <Badge {...restProps} icon={IconComponent} class={combinedClasses} data-aos={animation} data-aos-placement={animationPlacement} data-aos-easing={animationEasing} data-aos-delay={(columnNumber * blockNumber) * 50} />;
});

