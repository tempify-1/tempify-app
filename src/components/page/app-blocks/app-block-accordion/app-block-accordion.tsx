import { component$, useStyles$ } from "@builder.io/qwik";
import { Accordion } from "flowbite-qwik";
import { AppBlockRichText, type PayloadRichText } from "../app-block-rich-text/app-block-rich-text";
import type { AccordionProps as FlowbiteAccordionProps } from "flowbite-qwik";
import { getAosProps, type AnimationProps } from "../animation-types";

export interface AppBlockAccordionItem {
  id: string;
  heading: string;
  richText?: PayloadRichText;
}

export interface AppBlockAccordionData extends Omit<FlowbiteAccordionProps, 'children'>, AnimationProps {
  blockId?: string;
  items?: AppBlockAccordionItem[];
  class?: string;
}

export interface AppBlockAccordionProps extends AppBlockAccordionData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockAccordion = component$<AppBlockAccordionProps>((props) => {
  // Animate accordion content open/close using CSS Grid technique
  useStyles$(`
    .accordion > div > div:last-child {
      display: grid !important;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s ease-out, padding 0.3s ease-out;
    }
    .accordion > div > div:last-child:not(.hidden) {
      grid-template-rows: 1fr;
    }
    .accordion > div > div:last-child.hidden {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
    .accordion > div > div:last-child > * {
      overflow: hidden;
      min-height: 0;
    }
  `);

  const { blockId, items = [], class: className, animation, animationPlacement, animationEasing, columnNumber, blockNumber, ...accordionProps } = props;

  const defaultClass = "accordion";
  const combinedClasses = `${defaultClass} ${className || ""}`.trim();
  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div id={blockId} {...aosProps}>
      <Accordion {...accordionProps} class={combinedClasses}>
      {items.map((item) => (
        <Accordion.Panel key={item.id}>
          <Accordion.Header class="[&>button>svg]:transition [&>button>svg]:duration-200 [&>button>svg]:ease-in-out">{item.heading}</Accordion.Header>
          <Accordion.Content>
            {item.richText && <AppBlockRichText columnNumber={columnNumber} blockNumber={blockNumber} richText={item.richText} />}
          </Accordion.Content>
        </Accordion.Panel>
      ))}
      </Accordion>
    </div>
  );
});

