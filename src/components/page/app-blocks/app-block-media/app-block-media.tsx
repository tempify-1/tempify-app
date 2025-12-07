import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import type { AnimationProps } from "../animation-types";

/**
 * Data props for Media block (used in content definitions) - matches Payload CMS media structure
 */
export interface AppBlockMediaData extends AnimationProps {
  id: number;
  alt: string;
  caption?: string | null;
  updatedAt: string;
  createdAt: string;
  url: string;
  thumbnailURL?: string | null;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
}

/**
 * Full props for Media component (includes runtime-injected props)
 */
export interface AppBlockMediaProps extends AppBlockMediaData {
  columnNumber: number;
  blockNumber: number;
}

/**
 * AppBlockMedia component that renders images or videos based on mimeType
 * Supports: image/*, video/*, application/pdf
 */
export const AppBlockMedia = component$((props: AppBlockMediaProps) => {
  const { mimeType, url, alt, width, height, focalX, focalY, animation = "fade-up", animationPlacement = "center-center", animationEasing = "ease-in-out-quad", columnNumber, blockNumber } = props;

  // Determine media type from mimeType
  const isImage = mimeType.startsWith("image/");
  const isVideo = mimeType.startsWith("video/");
  const isPDF = mimeType === "application/pdf";

  // Calculate object position from focal point
  const objectPosition = `${focalX}% ${focalY}%`;

  const aosProps = {
    "data-aos": animation,
    "data-aos-placement": animationPlacement,
    "data-aos-easing": animationEasing,
    "data-aos-delay": (columnNumber * blockNumber) * 50,
  };

  if (isImage) {
    return (
      <div {...aosProps}>
        <Image
          src={url}
          layout="constrained"
          width={width}
          height={height}
          alt={alt}
          style={{ objectPosition }}
        />
      </div>
    );
  }

  if (isVideo) {
    return (
      <video
        controls
        width={width}
        height={height}
        style={{ objectPosition }}
        {...aosProps}
      >
        <source src={url} type={mimeType} />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (isPDF) {
    return (
      <embed
        src={url}
        type="application/pdf"
        width={width}
        height={height}
        {...aosProps}
      />
    );
  }

  // Fallback for unsupported media types
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" {...aosProps}>
      {alt || "Download file"}
    </a>
  );
});

