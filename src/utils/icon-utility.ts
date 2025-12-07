/**
 * Simple Icon Utility for Flowbite Icons
 *
 * Provides a simple way to get Flowbite icons by string name.
 * Icons are lazy-loaded by Qwik automatically - only used icons are downloaded.
 */

import { Component } from "@builder.io/qwik";
import { IconExclamationCircleSolid, IconProps } from "flowbite-qwik-icons";
import type { FlowbiteIconName } from "~/utils/flowbite-icons";

// Import all icons - Qwik will automatically code-split these
import * as FlowbiteIcons from "flowbite-qwik-icons";

/**
 * Icon mapping object - creates references but doesn't load icons until used
 * Each icon becomes its own micro-bundle that loads on-demand
 */
const iconMap: Record<FlowbiteIconName, Component<IconProps>> = {
  // Create the mapping from all exported icons
  ...Object.keys(FlowbiteIcons)
    .filter((key): key is FlowbiteIconName => key.startsWith("Icon"))
    .reduce(
      (acc, iconName) => {
        acc[iconName] = (FlowbiteIcons as any)[iconName];
        return acc;
      },
      {} as Record<FlowbiteIconName, Component<IconProps>>,
    ),
};

export function getIcon(iconName: FlowbiteIconName): Component<IconProps> {
  return iconMap[iconName] || IconExclamationCircleSolid;
}

// Re-export types for convenience
export type { FlowbiteIconName, IconProps };
