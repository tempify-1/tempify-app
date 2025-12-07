import {
  Component,
  component$,
  useContext,
  useSignal,
  useTask$,
  $,
  Signal,
} from "@builder.io/qwik";
import { Drawer, Button, useDarkMode } from "flowbite-qwik";
import {
  IconChevronUpSolid,
  IconCloseSolid,
  IconProps,
} from "flowbite-qwik-icons";
import { LayerConfig, LayersContext } from "~/contexts/layers-context";
import { LayoutState, LayoutStateType } from "~/contexts/layout-state";
import { FlowbiteIconName, getIcon } from "~/utils/icon-utility";

interface AppLayerProps {
  layer: LayerConfig;
  index: number;
}

export const AppLayer = component$<AppLayerProps>(({ layer, index }) => {
  const layoutState = useContext(LayoutState);
  const layersContext = useContext(LayersContext);
  const expanded = useSignal(layer.expanded || false);
  const { isDark } = useDarkMode();
  const iframeRef = useSignal<Element>();
  const iframeTitle = useSignal("Layer");
  const iframeIcon: Signal<Component<IconProps> | undefined> =
    useSignal(undefined);

  // Handle iframe load to extract title
  const handleIframeLoad = $(() => {
    const iframe = iframeRef.value as HTMLIFrameElement;

    try {
      // Since iframe is from same domain, we can access its document
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeTitle.value = iframeDoc.title || "";
        const icon =
          iframeDoc
            .querySelector("[data-embed-icon]")
            ?.getAttribute("data-embed-icon") || null;
        if (icon) {
          iframeIcon.value = getIcon(icon as FlowbiteIconName);
        }
      }
    } catch (error) {
      console.warn("Could not access iframe title:", error);
    }
  });

  useTask$(({ track }) => {
    const localExpanded = track(() => expanded.value);
    if (layer) {
      layer.expanded = localExpanded;
    }
  });

  useTask$(({ track }) => {
    const layerExpanded = track(() => layer?.expanded);
    if (layerExpanded !== undefined) {
      expanded.value = layerExpanded;
    }
  });

  return (
    <Drawer
      bind:open={expanded}
      position="bottom-edge"
      backdrop={false}
      preventBodyScroll={false}
      title={iframeTitle.value}
      titleIcon={iframeIcon.value}
      class={getAppLayerClasses({
        expanded: layer.expanded,
        layoutState,
      })}
    >
      <div class="absolute top-0 right-0 flex h-14 items-center gap-2 px-3">
        <Button
          square
          color="light"
          onClick$={() => {
            layer.expanded = !layer.expanded;
          }}
        >
          <IconChevronUpSolid
            class={
              "size-5 transition-transform duration-300 ease-in-out " +
              (layer.expanded ? " rotate-180" : "")
            }
          />
          <span class="sr-only">Collapse Drawer</span>
        </Button>

        <Button
          square
          color="light"
          onClick$={() => {
            layer.expanded = false;
            setTimeout(() => {
              layersContext.layers.splice(index, 1);
            }, 300);
          }}
        >
          <IconCloseSolid class="size-5" />
          <span class="sr-only">Close Drawer</span>
        </Button>
      </div>
      {layer.expanded && (
        <iframe
          ref={iframeRef}
          class="h-[calc(100vh-105px)] w-full"
          title={iframeTitle.value}
          src={
            layer.src +
            "?" +
            (isDark.value ? "colorMode=dark" : "colorMode=light")
          }
          onLoad$={handleIframeLoad}
        />
      )}
    </Drawer>
  );
});

interface AppLayerClassesOptions {
  expanded: boolean;
  layoutState: LayoutStateType;
}

const getAppLayerClasses = ({
  expanded,
  layoutState,
}: AppLayerClassesOptions) => {
  const baseClasses =
    "pointer-events-auto mx-auto h-screen max-w-(--breakpoint-xl) transition-transform duration-300 ease-in-out";

  if (!expanded) {
    return baseClasses;
  }

  // Determine the translation class based on layout state
  let translateClass: string;

  if (layoutState.bannerOpen.value && layoutState.scrollTop.value) {
    translateClass = "translate-y-32";
  } else if (layoutState.scrollDirection.value === "up") {
    translateClass = "translate-y-16";
  } else {
    translateClass = "translate-y-8";
  }

  const expandedClasses = "";

  return `${translateClass} ${baseClasses} ${expandedClasses}`;
};
