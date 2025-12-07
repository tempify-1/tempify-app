import { createContextId, Signal } from "@builder.io/qwik";
import { LayoutConfigType } from "./layout-config";

export type LayoutStateType = {
  sidebarOpen: Signal<boolean>;
  inlineSidebar : Signal<boolean>;
  windowWidth: Signal<number>;
  navMode: Signal<"navbar" | "sidebar" | "mobile">;
  lastScrollProgress: Signal<number>;
  scrollDirection: Signal<"up" | "down">;
  scrollTop: Signal<boolean>;
  hasScrolled: Signal<boolean>;
  hasScrolledThreshold: Signal<number>;
  bannerOpen: Signal<boolean>;
};

export const LayoutState =
  createContextId<LayoutStateType>("app.layout-state");

export const updateNavMode = (state: LayoutStateType) => {
  if (typeof window === "undefined") {
    return;
  }

  state.windowWidth.value = window.innerWidth;
  state.navMode.value =
    state.windowWidth.value <= 1024
      ? state.windowWidth.value <= 640
        ? "mobile"
        : "sidebar"
      : "navbar";
};

export const updateInlineSidebar = (layoutState: LayoutStateType, layoutConfig: LayoutConfigType) => {
  const value = layoutConfig.dashboard.value && layoutState.windowWidth.value > 1279;
  layoutState.inlineSidebar.value = value;
};

export const updateScrollThreshold = (
  state: LayoutStateType,
  bannerHeight: number = 0,
) => {
  // Set threshold to banner height when open, 0 when collapsed
  state.hasScrolledThreshold.value = bannerHeight;
};

export const detectScrollDirection = (state: LayoutStateType) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    state.scrollTop.value = currentScrollY <= state.hasScrolledThreshold.value;

    if (currentScrollY > state.hasScrolledThreshold.value) {
      state.hasScrolled.value = true;
    }

    if (currentScrollY < state.hasScrolledThreshold.value) {
      state.scrollDirection.value = "up";
    } else if (currentScrollY > lastScrollY) {
      state.scrollDirection.value = "down";
    } else if (currentScrollY < lastScrollY) {
      state.scrollDirection.value = "up";
    }

    lastScrollY = currentScrollY;
    state.lastScrollProgress.value = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
};
