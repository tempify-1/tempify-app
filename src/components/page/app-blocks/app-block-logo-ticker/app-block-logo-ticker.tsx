import { component$, useStyles$ } from "@builder.io/qwik";
import { getAosProps, type AnimationProps } from "../animation-types";
import { AppBlockMedia, type AppBlockMediaData } from "../app-block-media/app-block-media";
import styles from "./app-block-logo-ticker.css?inline";

export interface AppBlockLogoTickerData extends AnimationProps {
  blockId?: string;
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
    blockId,
    logos,
    duration = 30,
    reverse = false,
    fadeEdges = true,
    pauseOnHover = true,
    itemWidth = 150,
    repeatCount = 4,
    class: className,
    animation,
    animationPlacement,
    animationEasing,
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
  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  return (
    <div
      id={blockId}
      class={containerClasses}
      style={{
        "--ticker-duration": `${adjustedDuration}s`,
        "--ticker-item-width": `${itemWidth}px`,
      }}
      {...aosProps}
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

