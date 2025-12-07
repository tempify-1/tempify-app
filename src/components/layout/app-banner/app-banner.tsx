import {
  component$,
  useContext,
  $,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Banner, Link } from "flowbite-qwik";
import { IconCloseOutline } from "flowbite-qwik-icons";
import {
  LayoutState,
  updateScrollThreshold,
} from "~/contexts/layout-state";
import { LayoutConfig } from "~/contexts/layout-config";

export const AppBanner = component$(() => {
  const bannerRef = useSignal<Element>();
  const layoutState = useContext(LayoutState);
  const layoutConfig = useContext(LayoutConfig);

  // Data-driven banner configuration following the navbar/sidebar pattern
  const bannerConfig = layoutConfig.bannerConfig;

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    () => {
      const bannerHeight = bannerRef.value?.getBoundingClientRect().height || 0;
      updateScrollThreshold(layoutState, bannerHeight);
    },
    { strategy: "document-ready" },
  );

  const handleCollapseClick = $(() => {
    layoutState.bannerOpen.value = false;
    updateScrollThreshold(layoutState);
  });

  return (
    bannerConfig &&
    layoutState.bannerOpen.value && (
      <Banner
        ref={bannerRef}
        id={bannerConfig.id || "app-banner"}
        sticky={bannerConfig.sticky ? "top" : undefined}
        class="relative"
      >
        <div class="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
          <div class="mx-auto flex items-center">
            <p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              <bannerConfig.icon class="mr-4 h-4 w-4" />
              <span class="[&_p]:inline">
                {bannerConfig.content}
                {bannerConfig.link && (
                  <>
                    &nbsp;
                    <Link {...bannerConfig.link}>{bannerConfig.link.text}</Link>
                  </>
                )}
              </span>
            </p>
          </div>
          {bannerConfig.dismissible && (
            <Banner.CollapseButton
              color="light"
              class="border-0 bg-transparent text-gray-500 dark:text-gray-400"
              onClick$={handleCollapseClick}
            >
              <IconCloseOutline class="h-4 w-4" />
            </Banner.CollapseButton>
          )}
        </div>
      </Banner>
    )
  );
});
