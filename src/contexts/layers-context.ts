import { createContextId } from "@builder.io/qwik";
import type { RouteLocation } from "@builder.io/qwik-city";
import rison from "rison-node";

export interface LayerConfig {
  expanded: boolean;
  src: string;
}

export type LayersContextType = {
  layers: LayerConfig[];
};

export const LayersContext =
  createContextId<LayersContextType>("app.layers-context");

/**
 * Utility function to parse layer queries from URL using RISON
 * Gets all 'layer' query parameters, decodes them from RISON format
 * and returns an array of LayerConfig objects
 */
export const parseLayersFromUrl = (location: RouteLocation): LayerConfig[] => {
  const layers: LayerConfig[] = [];

  // Get all 'layer' query parameters
  const layerParams = location.url.searchParams.getAll("layer");

  for (const layerParam of layerParams) {
    try {
      // Decode RISON-encoded layer data
      const decodedLayer = rison.decode(layerParam);

      // Validate and add to layers array
      if (
        decodedLayer &&
        typeof decodedLayer.expanded === "boolean" &&
        typeof decodedLayer.src === "string"
      ) {
        layers.push(decodedLayer as LayerConfig);
      }
    } catch (error) {
      console.warn("Failed to decode layer from URL:", layerParam, error);
    }
  }

  return layers;
};

/**
 * Utility function to update the URL with current layers state using RISON
 * Encodes layers array to RISON format and updates browser URL
 */
export const updateUrlWithLayers = (layers: LayerConfig[]): void => {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);

  // Clear existing layer parameters
  url.searchParams.delete("layer");

  // Manually construct the query string to preserve RISON format
  const existingParams = url.searchParams.toString();
  const layerParams = layers
    .map((layer) => `layer=${rison.encode(layer)}`)
    .join("&");

  // Combine existing params with layer params
  const newSearch = existingParams
    ? `${existingParams}&${layerParams}`
    : layerParams;

  // Construct the new URL manually to avoid double encoding
  const newUrl = `${url.origin}${url.pathname}${newSearch ? `?${newSearch}` : ""}${url.hash}`;

  // Update the URL without triggering a page reload
  window.history.replaceState({}, "", newUrl);
};

export const addLayer = (
  context: LayersContextType,
  layer: LayerConfig,
  index?: number,
): void => {
  context.layers.splice(index || context.layers.length, 0, layer);
};

export const updateLayer = (
  context: LayersContextType,
  layer: LayerConfig,
  currentLayerSrc?: string,
  index?: number,
): void => {
  let updateIndex: number | undefined;
  if (typeof index === "number") {
    updateIndex = index;
  } else if (currentLayerSrc) {
    const found = context.layers.findIndex(
      (layer) => layer.src === currentLayerSrc,
    );
    if (found !== -1) updateIndex = found;
  }

  if (updateIndex !== undefined) {
    context.layers[updateIndex] = { ...layer };
  }
};

export const removeLayer = (
  context: LayersContextType,
  layerSrc?: string,
  index?: number,
): void => {
  let removeIndex: number | undefined;
  if (typeof index === "number") {
    removeIndex = index;
  } else if (layerSrc) {
    const found = context.layers.findIndex((layer) => layer.src === layerSrc);
    if (found !== -1) removeIndex = found;
  }

  if (removeIndex !== undefined) {
    context.layers.splice(removeIndex, 1);
  }
};
