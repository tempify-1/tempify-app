import { component$, Slot } from "@builder.io/qwik";
import { Button, useDarkMode } from "flowbite-qwik";

type ButtonProps = Parameters<typeof Button>[0];

export const AppButton = component$((props: ButtonProps) => {
  const { class: className, color, ...restProps } = props;
  const { isDark } = useDarkMode();

  const defaultClass = "button";
  const defaultButtonClasses = !color ? 'text-white bg-gray-800 focus:outline-hidden focus:ring-4 focus:ring-gray-300  dark:bg-gray-200 dark:text-gray-900 dark:border-gray-300 dark:focus:ring-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300': '';
  const combinedClasses = `${defaultClass} ${defaultButtonClasses} ${className || ""}`.trim();



  return <Button color={color ?? (isDark.value === true ? "light" : "dark")} {...restProps} class={combinedClasses}><Slot/></Button>;
});

