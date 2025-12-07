import { component$, useStyles$ } from "@builder.io/qwik";
import type { AnimationProps } from "../animation-types";
import { AppBlockMedia, type AppBlockMediaData } from "../app-block-media/app-block-media";
import styles from "./app-block-logo-ticker.css?inline";

/**
 * Data props for LogoTicker block (used in content definitions)
 */
export interface AppBlockLogoTickerData extends AnimationProps {
  /** Array of media items to display as logos */
  logos: AppBlockMediaData[];
  /** Duration of one complete scroll cycle in seconds (default: 30) */
  duration?: number;
  /** Whether to reverse the scroll direction */
  reverse?: boolean;
  /** Whether to show fade edges for seamless look */
  fadeEdges?: boolean;
  /** Whether to pause animation on hover (default: true) */
  pauseOnHover?: boolean;
  /** Fixed width for each logo item in pixels (default: 150) */
  itemWidth?: number;
  /** Number of times to repeat the logo set for seamless scrolling (default: 4) */
  repeatCount?: number;
  /** Custom class for the container */
  class?: string;
}

/**
 * Full props for LogoTicker component (includes runtime-injected props)
 */
export interface AppBlockLogoTickerProps extends AppBlockLogoTickerData {
  columnNumber: number;
  blockNumber: number;
}

/**
 * AppBlockLogoTicker component that displays logos in an infinite horizontal scroll
 * Uses CSS grid for equal-width logos and duplicates them enough to fill the viewport
 */
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

