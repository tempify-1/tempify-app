/**
 * Script to generate TypeScript types for Flowbite icons
 * Run with: tsx src/utils/generate-icon-types.ts
 */

import { writeFileSync } from "fs";
import { join } from "path";

// Read the flowbite-qwik-icons index file to extract all icon names
async function generateIconTypes() {
  try {
    // Import the entire flowbite-qwik-icons module to get all exports
    const flowbiteIcons = await import("flowbite-qwik-icons");

    // Get all exported icon names
    const iconNames = Object.keys(flowbiteIcons).filter((name) =>
      name.startsWith("Icon"),
    );

    console.log(`Found ${iconNames.length} icons`);

    // Generate the TypeScript type
    const typeContent = `/**
 * Auto-generated types for Flowbite icons
 * Generated from flowbite-qwik-icons package
 */

export type FlowbiteIconName = 
${iconNames.map((name) => `  | "${name}"`).join("\n")};

export const FLOWBITE_ICON_NAMES = [
${iconNames.map((name) => `  "${name}"`).join(",\n")}
] as const;
`;

    // Write to types file
    const typesPath = join(
      process.cwd(),
      "src",
      "app",
      "(qwik-frontend)",
      "src",
      "types",
      "flowbite-icons.ts",
    );
    writeFileSync(typesPath, typeContent);

    console.log(
      `✅ Generated types for ${iconNames.length} icons at: ${typesPath}`,
    );

    return iconNames;
  } catch (error) {
    console.error("❌ Error generating icon types:", error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateIconTypes().catch(console.error);
}

export { generateIconTypes };
