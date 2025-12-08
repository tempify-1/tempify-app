import { createContextId, Signal } from "@builder.io/qwik";
import type { FlowbiteIconName } from "~/utils/flowbite-icons";

// ============================================================================
// BASIC LINK - Payload-compatible subset (no QRL functions)
// ============================================================================
export interface LinkConfig {
  href: string;
  label: string;
  external?: boolean;
  underline?: boolean;
}

// ============================================================================
// BANNER CONFIG
// ============================================================================
export interface BannerConfig {
  id?: string;
  visible?: boolean;
  dismissible?: boolean;
  sticky?: boolean;
  icon: FlowbiteIconName; // String name, resolved via getIcon()
  content: string;
  link?: LinkConfig;
}

// ============================================================================
// NAVBAR CONFIG
// ============================================================================
export interface NavbarLinkConfig {
  type: "link";
  label: string;
  href: string;
  external?: boolean;
}

export interface NavbarDropdownConfig {
  type: "dropdown";
  label: string;
  icon?: FlowbiteIconName;
  items: LinkConfig[];
}

export type NavbarItemConfig = NavbarLinkConfig | NavbarDropdownConfig;

// ============================================================================
// SIDEBAR CONFIG
// ============================================================================
export type NavMode = "sidebar" | "navbar" | "mobile" | "both";

export interface SidebarItemConfig {
  label: string;
  href?: string;
  icon?: FlowbiteIconName;
}

export interface SidebarGroupConfig {
  type: "group";
  navMode: NavMode;
  items: SidebarItemConfig[];
}

export interface SidebarCollapseConfig {
  type: "collapse";
  navMode: NavMode;
  label: string;
  icon?: FlowbiteIconName;
  items: SidebarItemConfig[];
}

export type BadgeType = "yellow" | "red" | "green" | "blue" | "indigo" | "purple" | "pink";

export interface SidebarCtaConfig {
  type: "cta";
  navMode: NavMode;
  badge: {
    type: BadgeType;
    content: string;
  };
  description: string;
  actionText: string;
  actionHref: string;
  // Note: onClose$ removed - handled by component internally
}

export type SidebarItemGroupConfig = SidebarGroupConfig | SidebarCollapseConfig | SidebarCtaConfig;

// ============================================================================
// LAYOUT CONFIG TYPE
// ============================================================================
export type LayoutConfigType = {
  dashboard: Signal<boolean>;
  bannerConfig: BannerConfig | null;
  appNavbarConfig: NavbarItemConfig[] | null;
  appSidebarConfig: SidebarItemGroupConfig[] | null;
};

export const LayoutConfig = createContextId<LayoutConfigType>("app.layout-config");
