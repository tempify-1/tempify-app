import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { AppLayer } from "../app-layer/app-layer";
import {
  LayersContext,
  LayersContextType,
  parseLayersFromUrl,
  updateUrlWithLayers,
} from "~/contexts/layers-context";

export const AppLayers = component$(() => {
  // Get layers from URL or use defaults
  const location = useLocation();

  const layersContext = useStore<LayersContextType>({
    layers: parseLayersFromUrl(location) || [],
  });
  useContextProvider(LayersContext, layersContext);

  // Update URL whenever layers context changes
  useTask$(({ track }) => {
    const layers = track(() => layersContext.layers);
    track(() =>
      layersContext.layers.map((layer) => ({
        expanded: layer.expanded,
        src: layer.src,
      })),
    );
    updateUrlWithLayers(layers);
  });

  return (
    <>
      <Slot />
      <div class="pointer-events-none fixed inset-0 z-100 h-full w-full perspective-[1000px]">
        {layersContext.layers.map((layer, index) => {
          // Calculate dynamic stacking with perspective
          const zIndex = layersContext.layers.length - index;
          const translateY = index * 8; // 8px offset per layer
          const translateZ = index * -20; // Move layers back in 3D space
          const scale = 1 - index * 0.02; // Slightly scale down each layer
          const opacity = 1 - index * 0.1; // Fade layers slightly

          // Calculate perspective-correct drop shadow
          // As layers move back (higher index), shadows become larger and more diffuse
          const shadowDistance = Math.abs(translateZ); // Distance from viewer
          const shadowBlur = Math.max(8, shadowDistance * 0.8); // Blur increases with distance
          const shadowOffsetY = Math.max(4, shadowDistance * 0.3); // Y offset increases with distance
          const shadowOpacity = Math.max(0.05, (0.3 - index * 0.08) * 0.5); // Shadow fades as layers go back (halved intensity)

          // Create drop-shadow filter (note: drop-shadow doesn't support spread, only offset and blur)
          const dropShadowFilter = `drop-shadow(0 ${shadowOffsetY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity}))`;

          const transformClasses = `
          transform-gpu
          translate-y-[${translateY}px]
          scale-[${scale}]
          opacity-[${Math.max(opacity, 0.7)}]
          transition-transform
          duration-300
          ease-out
        `
            .replace(/\s+/g, " ")
            .trim();

          const layerClasses = `
          fixed
          inset-0
          pointer-events-none
          ${transformClasses}
        `
            .replace(/\s+/g, " ")
            .trim();

          return (
            <div
              key={"layer-" + (index + 1)}
              class={layerClasses}
              style={{
                zIndex: zIndex,
                transform: `translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`,
                opacity: layer.expanded ? 1 : Math.max(opacity, 0.7),
                filter: dropShadowFilter,
                transition: "opacity 100ms ease-out 200ms",
              }}
            >
              <AppLayer layer={layer} index={index} />
            </div>
          );
        })}
      </div>
    </>
  );
});

/* 
/// append layer (layer) removelayer(url:/index ) UpdateLayer(url:/index)
// get title and icon from child 

*/
