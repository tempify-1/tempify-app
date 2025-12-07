import { Component, createContextId, Signal } from "@builder.io/qwik";
import { Navbar, Dropdown, Link, Sidebar } from "flowbite-qwik";
import { IconProps } from "flowbite-qwik-icons";

type Link = Parameters<typeof Link>[0];
type NavbarLinkProps = Parameters<typeof Navbar.Link>[0];
type DropdownProps = Parameters<typeof Dropdown>[0];
type DropdownItemProps = Parameters<typeof Dropdown.Item>[0];
type SidebarItemGroupProps = Parameters<typeof Sidebar.ItemGroup>[0];
type SidebarItemProps = Parameters<typeof Sidebar.Item>[0];
type SidebarCollapseProps = Parameters<typeof Sidebar.Collapse>[0];
type SidebarCtaProps = Parameters<typeof Sidebar.Cta>[0];

interface BannerConfig {
  id?: string;
  visible?: boolean;
  dismissible?: boolean;
  sticky?: boolean;
  icon: Component<IconProps>;
  content: string;
  link?: {
    text: string;
  } & Link;
}

export type LayoutConfigType = {
  dashboard: Signal<boolean>;
  bannerConfig: BannerConfig | null;
  appNavbarConfig: Array<
    | ({ type: "link"; label: string } & NavbarLinkProps)
    | ({
        type: "dropdown";
        items: Array<{ link: { label: string } & Link } & DropdownItemProps>;
      } & DropdownProps)
  > | null;
  appSidebarConfig: Array<
    | ({
        type: "group";
        navMode: "sidebar" | "navbar" | "mobile" | "both";
        items: Array<{ label: string } & SidebarItemProps>;
      } & SidebarItemGroupProps)
    | ({
        type: "collapse";
        navMode: "sidebar" | "navbar" | "mobile" | "both";
        items: Array<{ label: string } & SidebarItemProps>;
      } & SidebarCollapseProps)
    | ({
        type: "cta";
        navMode: "sidebar" | "navbar" | "mobile" | "both";
        badge: {
          type:
            | "yellow"
            | "red"
            | "green"
            | "blue"
            | "indigo"
            | "purple"
            | "pink";
          content: string;
        };
        description: string;
        actionText: string;
        actionHref: string;
        onClose$: () => void;
      } & SidebarCtaProps)
  > | null;
};

export const LayoutConfig = createContextId<LayoutConfigType>("app.layout-config");
