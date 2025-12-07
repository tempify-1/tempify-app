import { component$, useStyles$ } from "@builder.io/qwik";
import type { AnimationProps } from "../animation-types";
import { AppBlockMedia, type AppBlockMediaData } from "../app-block-media/app-block-media";
import styles from "./app-block-logo-ticker.css?inline";

export interface AppBlockLogoTickerData extends AnimationProps {
  logos: AppBlockMediaData[];
  duration?: number;
  reverse?: boolean;
  fadeEdges?: boolean;
  pauseOnHover?: boolean;
  itemWidth?: number;
  repeatCount?: number;
  class?: string;
}

export interface AppBlockLogoTickerProps extends AppBlockLogoTickerData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockLogoTicker = component$<AppBlockLogoTickerProps>((props) => {
  useStyles$(styles);

  const {
    logos,
    duration = 30,
    reverse = false,
    fadeEdges = true,
    pauseOnHover = true,
    itemWidth = 150,
    repeatCount = 4,
    class: className,
    animation = "fade-up",
    animationPlacement = "center-center",
    animationEasing = "ease-in-out-quad",
    columnNumber,
    blockNumber,
  } = props;

  if (!logos || logos.length === 0) {
    return null;
  }

  // Create repeated array of logos to ensure seamless scrolling
  const repeatedLogos: AppBlockMediaData[] = [];
  for (let r = 0; r < repeatCount; r++) {
    repeatedLogos.push(...logos);
  }

  const containerClasses = [
    "logo-ticker",
    fadeEdges ? "logo-ticker--fade-edges" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const trackClasses = [
    "logo-ticker-track",
    reverse ? "logo-ticker-track--reverse" : "",
    pauseOnHover ? "" : "pointer-events-none",
  ]
    .filter(Boolean)
    .join(" ");

  // Calculate animation duration based on number of logos
  const adjustedDuration = (duration / 4) * repeatCount;

  return (
    <div
      class={containerClasses}
      style={{
        "--ticker-duration": `${adjustedDuration}s`,
        "--ticker-item-width": `${itemWidth}px`,
      }}
      data-aos={animation}
      data-aos-placement={animationPlacement}
      data-aos-easing={animationEasing}
      data-aos-delay={columnNumber * blockNumber * 50}
    >
      <div class={trackClasses}>
        {/* First set of repeated logos */}
        {repeatedLogos.map((logo, index) => (
          <div key={`logo-${index}`} class="logo-ticker-item">
            <AppBlockMedia
              {...logo}
              columnNumber={columnNumber}
              blockNumber={blockNumber}
            />
          </div>
        ))}
        {/* Duplicate set for seamless infinite scroll */}
        {repeatedLogos.map((logo, index) => (
          <div key={`logo-dup-${index}`} class="logo-ticker-item">
            <AppBlockMedia
              {...logo}
              columnNumber={columnNumber}
              blockNumber={blockNumber}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

