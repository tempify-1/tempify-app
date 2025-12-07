import { component$, useContext, useSignal, $ } from "@builder.io/qwik";
import { Sidebar, Badge } from "flowbite-qwik";
import { LayoutConfig } from "~/contexts/layout-config";
import { LayoutState } from "~/contexts/layout-state";

export const AppSidebar = component$(() => {
  const layoutState = useContext(LayoutState);
  const layoutConfig = useContext(LayoutConfig);
  const isCtaVisible = useSignal(true);
  const inlineSidebarOpen = useSignal(false);

  // Helper function to check if section should render based on navMode
  const shouldRenderSection = (
    sectionNavMode: "sidebar" | "navbar" | "mobile" | "both",
  ) => {
    return (
      sectionNavMode === "both" ||
      sectionNavMode === layoutState.navMode.value
    );
  };

  // Utility method to get sidebar translation class
  const getSidebarSidebarClass = () => {
    const baseClasses =
      "bg-transparent border-transparent dark:bg-transparent dark:border-transparent p-0 [&>nav]:p-0 [&>nav]:bg-transparent [&>nav]:border-transparent dark:[&>nav]:bg-transparent dark:[&>nav]:border-transparent transition-all duration-200 ease-in-out";
    let translateClass = layoutState.sidebarOpen.value
      ? "sm:translate-x-0 opacity-100"
      : "sm:-translate-x-full opacity-0";

    if (layoutState.inlineSidebar.value) {
      translateClass = "inline-sidebar sm:translate-x-0";
    }

    return `${translateClass} ${baseClasses}`;
  };

  // Utility method to get sidebar content class
  const getSidebarContentClass = () => {
    const baseClasses =
      "bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-md border-gray-200 px-3 py-4 h-full transition-all duration-200 ease-in-out";
    let translateClass: string;
    if (layoutState.bannerOpen.value && layoutState.scrollTop.value) {
      translateClass = "ml-2 rounded-sm translate-y-36 max-h-[calc(100%-(var(--spacing)*38))]";
    } else if (layoutState.scrollDirection.value === "up") {
      translateClass = "ml-2 rounded-sm translate-y-20 max-h-[calc(100%-(var(--spacing)*22))]";
    } else {
      translateClass = "ml-2 rounded-sm translate-y-2 max-h-[calc(100%-(var(--spacing)*4))]";
    }

    return `${baseClasses} ${translateClass}`;
  };

  return (
    <Sidebar
      class={getSidebarSidebarClass()}
      collapsed={
        layoutState.inlineSidebar.value
          ? inlineSidebarOpen
          : layoutState.sidebarOpen
      }
      highlight
    >
      <div class={getSidebarContentClass()}>
        {layoutConfig.appSidebarConfig?.map((section, sectionIndex) => {
          // Check if section should render based on navMode
          if (!shouldRenderSection(section.navMode)) {
            return null;
          }

          if (section.type === "group") {
            return (
              <Sidebar.ItemGroup key={sectionIndex}>
                {section.items.map((item, itemIndex) => {
                  const { label, ...itemProps } = item;
                  return (
                    <Sidebar.Item key={itemIndex} {...itemProps}>
                      <span class="text-sm">{label}</span>
                    </Sidebar.Item>
                  );
                })}
              </Sidebar.ItemGroup>
            );
          } else if (section.type === "collapse") {
            return (
              <Sidebar.ItemGroup key={sectionIndex}>
                <Sidebar.Collapse
                  class="text-sm [&>svg]:h-4 [&>svg]:w-4"
                  label={section.label}
                  icon={section.icon}
                >
                  {section.items.map((collapseItem, collapseItemIndex) => {
                    const { label, ...collapseItemProps } = collapseItem;
                    return (
                      <Sidebar.Item
                        key={collapseItemIndex}
                        {...collapseItemProps}
                      >
                        <span class="text-sm">{label}</span>
                      </Sidebar.Item>
                    );
                  })}
                </Sidebar.Collapse>
              </Sidebar.ItemGroup>
            );
          } else if (section.type === "cta" && isCtaVisible.value) {
            return (
              <Sidebar.Cta
                key={sectionIndex}
                onClose$={$(() => {
                  isCtaVisible.value = false;
                })}
              >
                <Badge
                  q:slot="badge"
                  type={section.badge.type}
                  content={section.badge.content}
                />
                <p class="mb-3 text-sm text-blue-800 dark:text-blue-400">
                  {section.description}
                </p>
                <a
                  class="text-sm font-medium text-blue-800 underline hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  href={section.actionHref}
                >
                  {section.actionText}
                </a>
              </Sidebar.Cta>
            );
          }
          return null;
        })}
      </div>
    </Sidebar>
  );
});
