import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

export interface AppBackgroundProps {
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
  fixed?: boolean;
}

export const AppBackground = component$((props: AppBackgroundProps) => {
  const { mimeType, url, alt, width, height, focalX, focalY, fixed = false } = props;

  const isImage = mimeType.startsWith("image/");
  const isVideo = mimeType.startsWith("video/");
  const objectPosition = `${focalX}% ${focalY}%`;
  const positionClass = fixed ? "fixed" : "absolute";
  const sizeClasses = fixed ? "w-screen h-screen" : "min-h-full min-w-full";
  const baseClasses = `${positionClass} inset-0 -z-1 ${sizeClasses}`;

  if (isImage) {
    return (
      <Image
        src={url}
        layout="constrained"
        width={width}
        height={height}
        alt={alt}
        style={{ objectPosition }}
        class={baseClasses}
      />
    );
  }

  if (isVideo) {
    return (
      <video
        autoplay
        muted
        loop
        playsInline
        width={width}
        height={height}
        class={baseClasses}
        style={{ objectPosition }}
      >
        <source src={url} type={mimeType} />
        Your browser does not support the video tag.
      </video>
    );
  }

  return null;
});
