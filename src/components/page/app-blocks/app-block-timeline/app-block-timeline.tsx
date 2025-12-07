import { component$ } from "@builder.io/qwik";
import { Timeline } from "flowbite-qwik";
import type { AnimationProps } from "../animation-types";
import { getIcon, type FlowbiteIconName } from "~/utils/icon-utility";
import { AppBlockRichText, type PayloadRichText } from "../app-block-rich-text/app-block-rich-text";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Data for a single timeline item
 */
export interface TimelineItemData {
  /** Title of the timeline item */
  title: string;
  /** Heading tag for the title */
  titleTag?: HeadingTag;
  /** Time/date string displayed */
  time?: string;
  /** ISO datetime for semantic markup */
  dateTime?: string;
  /** Body rich text content */
  body?: PayloadRichText;
  /** Icon name for the timeline point */
  icon?: FlowbiteIconName;
}

/**
 * Data props for Timeline block (used in content definitions)
 */
export interface AppBlockTimelineData extends AnimationProps {
  /** Whether to display the timeline horizontally */
  horizontal?: boolean;
  /** Array of timeline items */
  items: TimelineItemData[];
  /** Custom class for the timeline */
  class?: string;
}

/**
 * Full props for Timeline component (includes runtime-injected props)
 */
export interface AppBlockTimelineProps extends AppBlockTimelineData {
  columnNumber: number;
  blockNumber: number;
}

/**
 * AppBlockTimeline component that renders a flowbite-qwik Timeline
 */
export const AppBlockTimeline = component$<AppBlockTimelineProps>((props) => {
  const {
    horizontal = false,
    items,
    class: className,
    animation = "fade-up",
    animationPlacement = "center-center",
    animationEasing = "ease-in-out-quad",
    columnNumber,
    blockNumber,
  } = props;

  // Don't add AOS props if animation is 'none'
  const aosProps = animation && animation !== "none" ? {
    "data-aos": animation,
    "data-aos-placement": animationPlacement,
    "data-aos-easing": animationEasing,
    "data-aos-delay": (columnNumber * blockNumber) * 50,
  } : {};

  return (
    <div {...aosProps}>
      <Timeline horizontal={horizontal} class={className}>
        {items.map((item, index) => {
          const IconComponent = item.icon ? getIcon(item.icon) : undefined;

          return (
            <Timeline.Item key={index}>
              <Timeline.Point icon={IconComponent} />
              <Timeline.Content>
                {item.time && (
                  <Timeline.Time dateTime={item.dateTime}>
                    {item.time}
                  </Timeline.Time>
                )}
                <Timeline.Title tag={item.titleTag || "h3"}>
                  {item.title}
                </Timeline.Title>
                {item.body && (
                  <AppBlockRichText richText={item.body} animation="none" columnNumber={columnNumber} blockNumber={blockNumber} />
                )}
              </Timeline.Content>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </div>
  );
});

