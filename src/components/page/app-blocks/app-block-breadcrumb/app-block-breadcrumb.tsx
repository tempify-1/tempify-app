import { component$ } from "@builder.io/qwik";
import { Breadcrumb } from "flowbite-qwik";
import { getAosProps, type AnimationProps } from "../animation-types";
import { getIcon, type FlowbiteIconName } from "~/utils/icon-utility";

export interface BreadcrumbItemProps {
  label: string;
  href?: string;
  home?: boolean;
  homeIcon?: FlowbiteIconName;
  arrowIcon?: FlowbiteIconName;
}

export interface AppBlockBreadcrumbData extends AnimationProps {
  blockId?: string;
  items: BreadcrumbItemProps[];
  solid?: boolean;
  class?: string;
}

export interface AppBlockBreadcrumbProps extends AppBlockBreadcrumbData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockBreadcrumb = component$<AppBlockBreadcrumbProps>((props) => {
  const {
    blockId,
    items,
    solid = false,
    class: className,
    animation,
    animationPlacement,
    animationEasing,
    columnNumber,
    blockNumber,
  } = props;

  const defaultClass = "breadcrumb";
  const combinedClasses = `${defaultClass} ${className || ""}`.trim();
  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      id={blockId}
      class={combinedClasses}
      {...aosProps}
    >
      <Breadcrumb solid={solid}>
        {items.map((item, index) => {
          const HomeIcon = item.homeIcon ? getIcon(item.homeIcon) : undefined;
          const ArrowIcon = item.arrowIcon ? getIcon(item.arrowIcon) : undefined;

          return (
            <Breadcrumb.Item
              key={`breadcrumb-${index}`}
              home={item.home}
              href={item.href}
              homeIcon={HomeIcon}
              arrowIcon={ArrowIcon}
            >
              {item.label}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
});

