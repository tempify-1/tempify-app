import { component$, useSignal, useStyles$ } from "@builder.io/qwik";
import { Tabs } from "flowbite-qwik";
import {
  AppBlockRichText,
  type PayloadRichText,
} from "../app-block-rich-text/app-block-rich-text";
import type { TabsVariant } from "flowbite-qwik";
import { getAosProps, type AnimationProps } from "../animation-types";
import { withViewTransition } from "~/utils/view-transition";

export interface AppBlockTabItem {
  id: string;
  heading: string;
  richText?: PayloadRichText;
  active?: boolean;
  disabled?: boolean;
}

export interface AppBlockTabsData extends AnimationProps {
  blockId?: string;
  items?: AppBlockTabItem[];
  class?: string;
  variant?: TabsVariant;
  directive?: "if" | "show";
}

export interface AppBlockTabsProps extends AppBlockTabsData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockTabs = component$<AppBlockTabsProps>((props) => {
  const {
    blockId,
    items = [],
    class: className,
    variant,
    directive,
    animation,
    animationPlacement,
    animationEasing,
    columnNumber,
    blockNumber,
  } = props;

  const defaultClass = "tabs";
  const combinedClasses = `${className || ""}`.trim();
  const currentTabIndex = useSignal(
    items.findIndex((item) => item.active) ?? 0,
  );
  const tabsContainerRef = useSignal<HTMLDivElement>();
  const slideDirection = useSignal<"tabSlideInLeft" | "tabSlideInRight" | "">(
    "",
  );
  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  useStyles$(`

    .tabs button {
    view-transition-name: none;
    }

    .tabs button.active {
    view-transition-name: tab-active;
    }

    @keyframes tabSlideInLeft {
    from { opacity:0; transform: translateX(50%); filter:blur(4px); }
    to { opacity:1; transform: translateX(0%); filter:blur(0px);  }
    }
    @keyframes tabSlideInRight {
    from { opacity:0; transform: translateX(-50%); filter:blur(4px); }
    to { opacity:1; transform: translateX(0%); filter:blur(0px); }
    }
    `);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      id={blockId}
      class={defaultClass}
      {...aosProps}
      ref={tabsContainerRef}
    >
      <Tabs
        variant={variant}
        directive={directive}
        class={combinedClasses}
        onClickInteraction$={() => {
          const oldTab = tabsContainerRef.value?.querySelector(
            "ul > li:has(.active)",
          );
          setTimeout(() => {
            withViewTransition(() => {
              const newTab = tabsContainerRef.value?.querySelector(
                "ul > li:has(.active)",
              );
              if (oldTab && oldTab.parentNode && newTab && newTab.parentNode) {
                const oldIndex = [...oldTab.parentNode.children].indexOf(
                  oldTab,
                );
                const newIndex = [...newTab.parentNode.children].indexOf(
                  newTab,
                );
                if (oldIndex < newIndex) {
                  slideDirection.value = "tabSlideInLeft";
                } else if (oldIndex > newIndex) {
                  slideDirection.value = "tabSlideInRight";
                }
                currentTabIndex.value = newIndex;
              }
            });
          }, 50);
        }}
      >
        {items.map((item, i) => (
          <Tabs.Tab
            key={item.id}
            title={item.heading}
            active={item.active}
            disabled={item.disabled}
          >
            {item.richText && (
              <div
                class={slideDirection.value !== "" ? "opacity-0 blur-md" : ""}
                style={`animation:${slideDirection.value} 100ms ease-in-out 50ms forwards`}
              >
                <AppBlockRichText
                  columnNumber={columnNumber}
                  blockNumber={blockNumber * (i + 1)}
                  richText={item.richText}
                />
              </div>
            )}
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  );
});
