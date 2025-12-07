import { component$ } from "@builder.io/qwik";
import { Dropdown } from "flowbite-qwik";

export const AppProfileDropdown = component$(() => {
  return (
    <Dropdown
      class="h-10"
      as={
        // eslint-disable-next-line qwik/jsx-img
        <img
          class="h-10 w-10 rounded-full"
          src="https://res.cloudinary.com/dkht4mwqi/image/upload/f_auto,q_auto/v1718462568/flowbite-qwik/jpnykkz8ojq7ojgg4qta.jpg"
          alt="user photo"
        />
      }
    >
      <Dropdown.Item header>
        <span class="block text-sm">Bonnie Green</span>
        <span class="block truncate text-sm font-medium">
          name@flowbite.com
        </span>
      </Dropdown.Item>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Item divider />
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
  );
});
