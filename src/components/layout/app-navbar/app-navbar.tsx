import { component$, useContext, useStyles$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Button, Dropdown, Navbar, useDarkMode } from "flowbite-qwik";
import {
  IconChartBars3FromLeftSolid,
  IconCloseSolid,
  IconMoonSolid,
  IconSunSolid,
} from "flowbite-qwik-icons";
import { LayoutState, LayoutStateType } from "~/contexts/layout-state";
import { LayoutConfig } from "~/contexts/layout-config";
import { AppProfileDropdown } from "~/components/layout";

const getNavbarClasses = (layoutState: LayoutStateType) => {
  const transformClass =
    !layoutState.scrollTop.value &&
    layoutState.scrollDirection.value === "down"
      ? "-translate-y-[100%]"
      :  "translate-y-2";

  const textClass =
    layoutState.scrollTop.value && !layoutState.sidebarOpen.value
      ? "[body:has(>.layout>header.text-white)_&]:text-white "
      : "";

  const backgroundClass =
    layoutState.scrollTop.value && !layoutState.sidebarOpen.value
      ? "bg-transparent dark:bg-transparent"
      : "bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-md";

  const websiteClass = "ml-2 mr-2 max-w-[calc(100%-1rem)]";

  return `${transformClass} ${textClass}  ${backgroundClass} ${websiteClass} sticky transition-all duration-200 ease-in-out`;
};

export const AppNavbar = component$(() => {
  useStyles$(`
    .nav-dropdown button { font-size: inherit; line-height: inherit;}
  `);

  const { isDark, setDarkModeValue } = useDarkMode();
  const layoutState = useContext(LayoutState);
  const layoutConfig = useContext(LayoutConfig);
  const collapsed = layoutState.sidebarOpen;

  return (
    <Navbar
      fullWidth
      fluid
      rounded
      sticky
      class={getNavbarClasses(layoutState)}
      /*       style="transition:color 200ms ease-in-out 250ms, background-color 200ms ease-in-out 250ms;" */
    >
      <Navbar.Brand class="brand" tag={Link} href="https://flowbite-qwik.com/">
        <img
          src="https://flowbite-qwik.com/logo.svg"
          alt="Flowbite qwik logo"
          width="306"
          height="306"
          class="h-8 w-auto"
        />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          Flowbite Qwik
        </span>
      </Navbar.Brand>
      {(!layoutState.inlineSidebar.value ||
        !layoutConfig.dashboard.value) && (
        <div class="menu mr-auto ml-2 flex shrink content-center items-center justify-start gap-3">
          <button
            onClick$={() => {
              collapsed.value = !collapsed.value;
            }}
          >
            {collapsed.value ? (
              <IconCloseSolid class="size-5" />
            ) : (
              <IconChartBars3FromLeftSolid class="size-5" />
            )}
            <span class="sr-only">Open sidebar</span>
          </button>
        </div>
      )}

      {layoutState.navMode.value === "navbar" && (
        <ul class="mr-1 ml-2 flex grow content-center items-center justify-center gap-3">
          {layoutConfig.appNavbarConfig?.map((link, index) => (
            <li key={index}>
              {link.type === "link" ? (
                <Navbar.Link class="text-inherit" {...link}>
                  {link.label}
                </Navbar.Link>
              ) : link.type === "dropdown" ? (
                <Navbar.Link tag="div" class="text-inherit [&>*]:text-inherit">
                  <Dropdown {...link} class="nav-dropdown" inline size={"l"}>
                    {link.items?.map((item, itemIndex) => (
                      <Dropdown.Item key={itemIndex} {...item}>
                        <Link class="text-inherit" href={item.link.href}>
                          {item.link.label}
                        </Link>
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                </Navbar.Link>
              ) : null}
            </li>
          ))}
        </ul>
      )}
      <div class="flex content-center items-center justify-center gap-2 text-2xl">
        <Button
          onClick$={() => {
            setDarkModeValue(isDark.value ? "light" : "dark");
          }}
          square
          color={isDark.value ? "dark" : "light"}
          size="lg"
          title="Toggle dark mode"
        >
          {isDark.value ? (
            <IconSunSolid class="w-4 h-4" />
          ) : (
            <IconMoonSolid class="h-4 w-4" />
          )}
        </Button>
        <Button>Get Started</Button>
        <Button outline>Login</Button>
        <AppProfileDropdown />
      </div>
    </Navbar>
  );
});
