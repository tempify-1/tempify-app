import { component$ } from "@builder.io/qwik";
import { Badge } from "flowbite-qwik";
import { getAosProps, type AnimationProps } from "../animation-types";
import { getIcon, type FlowbiteIconName } from "~/utils/icon-utility";

type BadgeType = 'blue' | 'dark' | 'green' | 'red' | 'yellow' | 'indigo' | 'purple' | 'pink' | 'default';
type BadgeSize = 'xs' | 'sm';

export interface AppBlockBadgeData extends AnimationProps {
  blockId?: string;
  content: string;
  type?: BadgeType;
  size?: BadgeSize;
  bordered?: boolean;
  href?: string;
  icon?: FlowbiteIconName;
  class?: string;
}

export interface AppBlockBadgeProps extends AppBlockBadgeData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockBadge = component$<AppBlockBadgeProps>((props) => {
  const { class: className, icon, animation, animationPlacement, animationEasing, columnNumber, blockNumber, ...restProps } = props;

  const defaultClass = "badge";
  const combinedClasses = `${defaultClass} ${className || ""}`.trim();
  const IconComponent = icon ? getIcon(icon) : undefined;
  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  return <Badge {...restProps} icon={IconComponent} class={combinedClasses} {...aosProps} />;
});

