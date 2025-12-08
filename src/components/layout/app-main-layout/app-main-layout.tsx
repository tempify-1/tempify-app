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
import {
  AppBanner,
  AppLayers,
  AppNavbar,
  AppSidebar,
} from "~/components/layout";
import {
  detectScrollDirection,
  LayoutState,
  LayoutStateType,
  updateInlineSidebar,
  updateNavMode,
} from "~/contexts/layout-state";
import { LayoutConfigType, LayoutConfig } from "~/contexts/layout-config";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * Main application layout component
 * Provides the full layout structure with banner, navbar, sidebar, and main content area
 * Used for standard application pages that need the complete navigation structure
 */
export const AppMainLayout = component$(() => {
  // Layout config with navbar configuration - uses icon names (strings) for Payload compatibility
  const layoutConfig = useStore<LayoutConfigType>({
    dashboard: useSignal(false),
    bannerConfig: {
      id: "app-banner",
      visible: true,
      dismissible: true,
      sticky: true,
      icon: "IconShareNodesSolid",
      content: "New brand identity has been launched for the",
      link: {
        label: "Flowbite Library",
        href: "https://flowbite.com",
        underline: true,
      },
    },
    appNavbarConfig: [
      {
        type: "link",
        href: "/navbars",
        label: "Home",
      },
      {
        type: "link",
        href: "/navbars",
        label: "About",
      },
      {
        type: "dropdown",
        label: "Services",
        items: [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings" },
          { label: "Earnings", href: "/earnings" },
        ],
      },
      {
        type: "link",
        href: "/navbars",
        label: "Pricing",
      },
      {
        type: "link",
        href: "/navbars",
        label: "Contact",
      },
    ],
    appSidebarConfig: [
      {
        type: "group",
        navMode: "sidebar",
        items: [
          { label: "Dashboard", icon: "IconHomeOutline", href: "/dashboard" },
          { label: "Inbox", icon: "IconInboxOutline" },
          { label: "Users", icon: "IconUserCircleOutline" },
          { label: "Products", icon: "IconShoppingBagOutline" },
          { label: "Documentation", icon: "IconFileEditSolid" },
          { label: "Help", icon: "IconAdressBookOutline" },
          { label: "Settings", icon: "IconGearSolid" },
          { label: "Details", icon: "IconAtomSolid" },
        ],
      },
      {
        type: "collapse",
        label: "Collapse",
        navMode: "navbar",
        icon: "IconAdjustmentsHorizontalSolid",
        items: [
          { label: "Dashboard" },
          { label: "Inbox" },
          { label: "Users" },
          { label: "Products" },
        ],
      },
      {
        type: "group",
        navMode: "mobile",
        items: [
          { label: "Mobile Dashboard", icon: "IconHomeOutline", href: "/mobile-dashboard" },
          { label: "Quick Actions", icon: "IconGearSolid" },
        ],
      },
      {
        type: "cta",
        navMode: "both",
        badge: {
          type: "blue",
          content: "New",
        },
        description:
          "Preview the new Flowbite dashboard navigation! You can turn the new navigation off for a limited time in your profile.",
        actionText: "Turn new navigation off",
        actionHref: "#",
      },
    ],
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
    bannerOpen: useSignal(layoutConfig.bannerConfig !== null),
  });
  useContextProvider(LayoutState, layoutState);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    () => {
      updateNavMode(layoutState);
      updateInlineSidebar(layoutState, layoutConfig);
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
      updateInlineSidebar(layoutState, layoutConfig);
    }),
  );

  return (
    <div class={`layout ${layoutConfig.dashboard.value ? "dashboard" : ""}`}>
      <AppLayers>
        <AppBanner />
        <AppNavbar />
        <AppSidebar />
        <Slot />
      </AppLayers>
    </div>
  );
});
