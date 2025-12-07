import {
  $,
  component$,
  Slot,
  useContextProvider,
  useOnWindow,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { RouteLocation, useLocation } from "@builder.io/qwik-city";
import {
  detectScrollDirection,
  LayoutState,
  LayoutStateType,
  updateNavMode,
} from "~/contexts/layout-state";
import { useDarkMode } from "flowbite-qwik";
import { LayoutConfigType, LayoutConfig } from "~/contexts/layout-config";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * Embed application layout component
 * Used for nested Iframes
 */
export const AppEmbedLayout = component$(() => {
  const location = useLocation();
  const { setDarkModeValue } = useDarkMode();
  setDarkModeValue(parseColorModeFromUrl(location));

  // Layout config with navbar configuration /* move to service.
  const layoutConfig = useStore<LayoutConfigType>({
    dashboard: useSignal(false),
    bannerConfig: null,
    appNavbarConfig: null,
    appSidebarConfig: null,
  });

  useContextProvider(LayoutConfig, layoutConfig);

  const layoutState = useStore<LayoutStateType>({
    sidebarOpen: useSignal(false),
    inlineSidebar: useSignal(false),
    windowWidth: useSignal(0),
    navMode: useSignal<"navbar" | "sidebar" | "mobile">("sidebar"),
    lastScrollProgress: useSignal(0),
    scrollDirection: useSignal<"up" | "down">("up"),
    scrollTop: useSignal(true),
    hasScrolled: useSignal(false),
    hasScrolledThreshold: useSignal(0),
    bannerOpen: useSignal(layoutConfig.bannerConfig !== undefined),
  });
  useContextProvider(LayoutState, layoutState);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    () => {
      updateNavMode(layoutState);
      detectScrollDirection(layoutState);

      // Initialize AOS only if user doesn't prefer reduced motion
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        AOS.init();
      }
    },
    { strategy: "document-ready" },
  );

  useOnWindow(
    "resize",
    $(() => {
      updateNavMode(layoutState);
    }),
  );

  return (
    <div class="layout">
      <Slot />
    </div>
  );
});

export const parseColorModeFromUrl = (
  location: RouteLocation,
): "light" | "dark" => {
  const colorMode = location.url.searchParams.get("colorMode");

  if (colorMode === "light" || colorMode === "dark") {
    return colorMode;
  }

  return "light";
};
