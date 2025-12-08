import { component$ } from "@builder.io/qwik";
import { Timeline } from "flowbite-qwik";
import { getAosProps, type AnimationProps } from "../animation-types";
import { getIcon, type FlowbiteIconName } from "~/utils/icon-utility";
import { AppBlockRichText, type PayloadRichText } from "../app-block-rich-text/app-block-rich-text";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TimelineItemData {
  title: string;
  titleTag?: HeadingTag;
  time?: string;
  dateTime?: string;
  body?: PayloadRichText;
  icon?: FlowbiteIconName;
}

export interface AppBlockTimelineData extends AnimationProps {
  blockId?: string;
  horizontal?: boolean;
  items: TimelineItemData[];
  class?: string;
}

export interface AppBlockTimelineProps extends AppBlockTimelineData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockTimeline = component$<AppBlockTimelineProps>((props) => {
  const {
    blockId,
    horizontal = false,
    items,
    class: className,
    animation,
    animationPlacement,
    animationEasing,
    columnNumber,
    blockNumber,
  } = props;

  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  return (
    <div id={blockId} {...aosProps}>
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

