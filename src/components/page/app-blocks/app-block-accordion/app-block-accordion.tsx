import { component$, useStyles$ } from "@builder.io/qwik";
import { Accordion } from "flowbite-qwik";
import { AppBlockRichText, type PayloadRichText } from "../app-block-rich-text/app-block-rich-text";
import type { AccordionProps as FlowbiteAccordionProps } from "flowbite-qwik";
import type { AnimationProps } from "../animation-types";

/**
 * Individual accordion item structure
 */
export interface AppBlockAccordionItem {
  id: string;
  heading: string;
  richText?: PayloadRichText;
}

/**
 * Data props for Accordion block (used in content definitions)
 */
export interface AppBlockAccordionData extends Omit<FlowbiteAccordionProps, 'children'>, AnimationProps {
  items?: AppBlockAccordionItem[];
  class?: string;
}

/**
 * Full props for Accordion component (includes runtime-injected props)
 */
export interface AppBlockAccordionComponentProps extends AppBlockAccordionData {
  columnNumber: number;
  blockNumber: number;
}

/**
 * AppBlockAccordion component that wraps Flowbite's Accordion
 * Each accordion item has a heading/title and an AppBlockRichText content block
 */
export const AppBlockAccordion = component$<AppBlockAccordionComponentProps>((props) => {
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

  const { items = [], class: className, animation = "fade-up", animationPlacement = "center-center", animationEasing = "ease-in-out-quad", columnNumber, blockNumber, ...accordionProps } = props;

  const defaultClass = "accordion";
  const combinedClasses = `${defaultClass} ${className || ""}`.trim();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Accordion {...accordionProps} class={combinedClasses} data-aos={animation} data-aos-placement={animationPlacement} data-aos-easing={animationEasing} data-aos-delay={(columnNumber * blockNumber) * 50}>
      {items.map((item) => (
        <Accordion.Panel key={item.id}>
          <Accordion.Header class="[&>button>svg]:transition [&>button>svg]:duration-200 [&>button>svg]:ease-in-out">{item.heading}</Accordion.Header>
          <Accordion.Content>
            {item.richText && <AppBlockRichText columnNumber={columnNumber} blockNumber={blockNumber} richText={item.richText} />}
          </Accordion.Content>
        </Accordion.Panel>
      ))}
    </Accordion>
  );
});

