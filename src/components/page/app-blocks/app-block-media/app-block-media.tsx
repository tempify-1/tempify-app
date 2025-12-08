import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import { getAosProps, type AnimationProps } from "../animation-types";

export interface AppBlockMediaData extends AnimationProps {
  blockId?: string;
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

export interface AppBlockMediaProps extends AppBlockMediaData {
  columnNumber: number;
  blockNumber: number;
}

export const AppBlockMedia = component$((props: AppBlockMediaProps) => {
  const { blockId, mimeType, url, alt, width, height, focalX, focalY, animation, animationPlacement, animationEasing, columnNumber, blockNumber } = props;

  // Determine media type from mimeType
  const isImage = mimeType.startsWith("image/");
  const isVideo = mimeType.startsWith("video/");
  const isPDF = mimeType === "application/pdf";

  // Calculate object position from focal point
  const objectPosition = `${focalX}% ${focalY}%`;

  // Use centralized getAosProps utility
  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  if (isImage) {
    return (
      <div id={blockId} {...aosProps}>
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
        id={blockId}
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
        id={blockId}
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
    <a id={blockId} href={url} target="_blank" rel="noopener noreferrer" {...aosProps}>
      {alt || "Download file"}
    </a>
  );
});

