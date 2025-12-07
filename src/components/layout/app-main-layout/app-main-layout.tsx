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
import { getIcon } from "~/utils/icon-utility";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * Main application layout component
 * Provides the full layout structure with banner, navbar, sidebar, and main content area
 * Used for standard application pages that need the complete navigation structure
 */
export const AppMainLayout = component$(() => {
  // Layout config with navbar configuration /* move to service.
  const layoutConfig = useStore<LayoutConfigType>({
    dashboard: useSignal(false),
    bannerConfig: {
      id: "app-banner",
      visible: true,
      dismissible: true,
      sticky: true,
      icon: getIcon("IconShareNodesSolid"),
      content: "New brand identity has been launched for the",
      link: {
        text: "Flowbite Library",
        href: "https://flowbite.com",
        underline: true,
      },
    },
    appNavbarConfig: [
      {
        type: "link",
        href: "/navbars",
        label: "Home",
        active: true,
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
          {
            link: { label: "Dashboard", href: "/dashboard" },
          },
          {
            link: { label: "Settings", href: "/settings" },
          },
          {
            link: { label: "Earnings", href: "/earnings" },
          },
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
          {
            label: "Dashboard",
            icon: getIcon("IconHomeOutline"),
            href: "/dashboard",
          },
          {
            label: "Inbox",
            icon: getIcon("IconInboxOutline"),
          },
          {
            label: "Users",
            icon: getIcon("IconUserCircleOutline"),
          },
          {
            label: "Products",
            icon: getIcon("IconShoppingBagOutline"),
          },
          {
            label: "Documentation",
            icon: getIcon("IconFileEditSolid"),
          },
          {
            label: "Help",
            icon: getIcon("IconAdressBookOutline"),
          },
          {
            label: "Settings",
            icon: getIcon("IconGearSolid"),
          },
          {
            label: "Details",
            icon: getIcon("IconAtomSolid"),
          },
        ],
      },

      {
        type: "collapse",
        label: "Collapse",
        navMode: "navbar",
        icon: getIcon("IconAdjustmentsHorizontalSolid"),
        items: [
          {
            label: "Dashboard",
          },
          {
            label: "Inbox",
          },
          {
            label: "Users",
          },
          {
            label: "Products",
          },
        ],
      },

      {
        type: "group",
        navMode: "mobile",
        items: [
          {
            label: "Mobile Dashboard",
            icon: getIcon("IconHomeOutline"),
            href: "/mobile-dashboard",
          },
          {
            label: "Quick Actions",
            icon: getIcon("IconGearSolid"),
          },
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
        onClose$: $(undefined),
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
